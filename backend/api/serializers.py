from typing import Optional
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import User, Student, Blog, BlogImage, Meeting, MeetingAttendance
from rest_framework.exceptions import ValidationError
from django.conf import settings

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
    title = serializers.CharField(required=True)

    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['password'] = make_password(password=user_data['password'])
        user = User.objects.create(**user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student

# NOTE: This serializer is for the students list view
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'username']

# NOTE: This serializer is for the students list view
class StudentListSerializer(serializers.ModelSerializer):
    user = UserListSerializer()

    class Meta:
        model = Student
        fields = '__all__'

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
    """
    Serializer for blog images.

    Fields:
        id : Primary key of the image record.
        relative_path : Path stored in DB.
        image_url : Absolute URL of the image file.

    Behavior:
         Uses `get_image_url` to build the absolute URL using the request context.
         Returns None if the image file is missing or request context is not available.
    """
    relative_path = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogImage
        fields = ("id", "relative_path", "image_url")

    def get_relative_path(self, obj) -> str:
        return obj.image.name  # stored path in DB

    def get_image_url(self, obj) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None        


class BlogSerializer(serializers.ModelSerializer):
    """
    Serializer for blog posts.

    Fields:
        id : Primary key of the blog post.
        title : Title of the blog post.
        content : Main text content of the post.
        created_by : Dict with ID and username of the creator.
        createdBy : Human-readable string of the creator (for backward compatibility).
        createdAt, updatedAt : Timestamps.
        images : Related blog images (serialized with BlogImageSerializer).
    """
    images = BlogImageSerializer(many=True, read_only=True)
    created_by = serializers.SerializerMethodField()
    createdBy = serializers.StringRelatedField()

    class Meta:
        model = Blog
        fields = ("id", "title", "content", "created_by", "createdBy", "createdAt", "updatedAt", "images")

    def get_created_by(self, obj) -> dict:
        user = obj.createdBy
        return {"id": user.id, "username": getattr(user, "username", None)}


class BlogUploadSerializer(serializers.Serializer):
    """
    Serializer for uploading new blog posts with images.

    Validates:
        - Image file size (max 5MB by default or settings override)
        - Image file type (JPEG, PNG, WEBP)

    Behavior:
        Creates a Blog instance and related BlogImage records.
    """
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
        for img in validated_data["images"]:
            BlogImage.objects.create(blog=blog, image=img)

        return blog



class BlogUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating blog posts.
    Allows updating title, content, and optionally replacing images.
    """
    images = serializers.ListField(
        child=serializers.ImageField(),
        required=False
    )
    images_to_delete = serializers.ListField(
        child=serializers.IntegerField(),
        required=False,
        write_only=True,
        help_text="IDs of images to delete"
    )

    class Meta:
        model = Blog
        fields = ("title", "content", "images", "images_to_delete")

    def update(self, instance, validated_data):
        new_images = validated_data.pop("images", None)
        images_to_delete = validated_data.pop("images_to_delete", [])

        # Update fields
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.save()

        # Handle image deletions
        if images_to_delete:
            BlogImage.objects.filter(blog=instance, id__in=images_to_delete).delete()

        # Handle new image uploads (append)
        if new_images:
            for img in new_images:
                BlogImage.objects.create(blog=instance, image=img)

        return instance

class MeetingAttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeetingAttendance
        fields = '__all__'

class MeetingSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(format='%I:%M %p')
    end_time = serializers.TimeField(format='%I:%M %p')

    class Meta:
        model = Meeting
        fields = '__all__'