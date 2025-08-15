from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import User, Student, Blog, BlogImage
from rest_framework.exceptions import ValidationError
from django.conf import settings
# from drf_spectacular.utils import extend_schema_serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'role']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    roll_no = serializers.RegexField(regex='^(?:FA|SP)[0-9]{2}-B(?:CS|AI|SE)-[0-9]{3}$', max_length=20, allow_blank=False)
    club = serializers.ChoiceField(choices=[
        'codehub',
        'graphics_and_media',
        'social_media_and_marketing',
        'registration_and_decor',
        'events_and_logistics'
        ],
        allow_blank=False
    )

    class Meta:
        model = Student
        fields = ['user', 'roll_no', 'club']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['password'] = make_password(password=user_data['password'])
        user = User.objects.create(**user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student

class LoginSerializer(serializers.Serializer):
    """
    Handles user authentication by validating usernames and password.
    Fields:
        username: Required string.
        password: Required string (write-only).
    Validates:
        Credentials using Django's `authenticate` function.
        Ensures user is active.
    Returns:
        Authenticated `user` object in `validated_data` on success.
        Raises `ValidationError` on failure.
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                data['user'] = user
                return data
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")


class OTPSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
                raise ValidationError({"email": "User with this email does not exist."})
        return value

class PasswordChangeSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


# Allowed types & default max size (5 MB)
ALLOWED_IMAGE_TYPES = ("image/jpeg", "image/png", "image/webp")
MAX_IMAGE_SIZE = getattr(settings, "MAX_BLOG_IMAGE_SIZE", 5 * 1024 * 1024)  # bytes


class BlogImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = BlogImage
        fields = ("id", "relative_path", "url")

    def get_relative_path(self, obj):
        return obj.image.name  # stored path in DB

    def get_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url


class BlogSerializer(serializers.ModelSerializer):
    images = BlogImageSerializer(many=True, read_only=True)
    created_by = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = ("id", "title", "content", "created_by", "createdAt", "updatedAt", "images")

    def get_created_by(self, obj):
        user = obj.createdBy
        return {"id": user.id, "username": getattr(user, "username", None)}


class BlogUploadSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    content = serializers.CharField()
    images = serializers.ListField(
        child=serializers.ImageField(),
        allow_empty=False
    )

    def validate_images(self, images):
        for img in images:
            # size check
            if img.size > MAX_IMAGE_SIZE:
                raise serializers.ValidationError(f"{img.name} exceeds the max size of {MAX_IMAGE_SIZE} bytes.")
            # content_type check
            content_type = getattr(img, "content_type", None)
            if content_type not in ALLOWED_IMAGE_TYPES:
                raise serializers.ValidationError(f"{img.name} has invalid content type ({content_type}).")
        return images

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user

        # Create the blog
        blog = Blog.objects.create(
            title=validated_data["title"],
            content=validated_data["content"],
            createdBy=user
        )

        # Create related BlogImage objects
        images = validated_data["images"]
        for img in images:
            BlogImage.objects.create(blog=blog, image=img)

        return blog