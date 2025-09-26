from typing import Optional
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from .models import User, Student, Blog, BlogImage, Meeting, MeetingAttendance, Event, EventImage
from rest_framework.exceptions import ValidationError
from django.conf import settings

# Allowed types & default max size (5 MB)
ALLOWED_IMAGE_TYPES = ("image/jpeg", "image/png", "image/webp")
MAX_IMAGE_SIZE = getattr(settings, "MAX_BLOG_IMAGE_SIZE", 5 * 1024 * 1024)  # bytes


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'role']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    roll_no = serializers.RegexField(regex='^(?:FA|SP)[0-9]{2}-B(?:CS|AI|SE)-[0-9]{3}$', max_length=20,
                                     allow_blank=False)
    club = serializers.ChoiceField(choices=[
        'codehub',
        'graphics_and_media',
        'social_media_and_marketing',
        'registration_and_decor',
        'events_and_logistics'
    ],
        allow_blank=False
    )
    title = serializers.CharField(required=False)
    content = serializers.CharField(required=False)

    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data['password'] = make_password(password=user_data['password'])
        user = User.objects.create(**user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student

    # TODO: Override this to handle nested field
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()

        instance.save()
        return instance
    

class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'role']

    def create(self, validated_data):
        password = validated_data.pop('password')

        user = User.objects.create(
            role='ADMIN',
            **validated_data
        )
        user.set_password(password)
        user.save()
        return user

# NOTE: This serializer is for the students list view
class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'username']


class StudentListSerializer(serializers.ModelSerializer):
    user = UserListSerializer()

    class Meta:
        model = Student
        fields = '__all__'

class AdminListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role']




class LoginSerializer(serializers.Serializer):
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


class BlogImageSerializer(serializers.ModelSerializer):
    relative_path = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogImage
        fields = ("id", "relative_path", "image_url")

    def get_relative_path(self, obj) -> str:
        return obj.image.name

    def get_image_url(self, obj) -> Optional[str]:
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class BlogSerializer(serializers.ModelSerializer):
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
    title = serializers.CharField(max_length=255)
    content = serializers.CharField()
    images = serializers.ListField(
        child=serializers.ImageField(),
        allow_empty=False
    )

    def validate_images(self, images):
        for img in images:
            if img.size > MAX_IMAGE_SIZE:
                raise serializers.ValidationError(f"{img.name} exceeds the max size of {MAX_IMAGE_SIZE} bytes.")
            content_type = getattr(img, "content_type", None)
            if content_type not in ALLOWED_IMAGE_TYPES:
                raise serializers.ValidationError(f"{img.name} has invalid content type ({content_type}).")
        return images

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user

        blog = Blog.objects.create(
            title=validated_data["title"],
            content=validated_data["content"],
            createdBy=user
        )

        for img in validated_data["images"]:
            BlogImage.objects.create(blog=blog, image=img)

        return blog


class BlogUpdateSerializer(serializers.ModelSerializer):
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

        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.save()

        if images_to_delete:
            BlogImage.objects.filter(blog=instance, id__in=images_to_delete).delete()

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

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image']

class EventSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)
    images = EventImageSerializer(required=False, many=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'content', 'images', 'date']
        read_only_fields = ['images']

    def create(self, validated_data):
        images_data = validated_data.pop('images', None)
        event = Event.objects.create(**validated_data)
        if images_data:
            for image in images_data:
                EventImage.objects.create(event=event, **image)
        return event

    def update(self, instance, validated_data):
        image_data = validated_data.pop('images', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # The images should only be added to the existing event when using this serializer
        if image_data:
            for image in image_data:
                EventImage.objects.create(event=instance, **image)

        instance.save()
        return instance

    # This adds the `images` field to the `validated_data` dict
    def to_internal_value(self, data):
        internal_values = super().to_internal_value(data)
        images = data.getlist('images')
        if images:
            internal_values['images'] = images
        return internal_values

class EventImageEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = '__all__'
        read_only_fields = ['id', 'event']