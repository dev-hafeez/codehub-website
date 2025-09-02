from django.db import models
from django.contrib.auth.models import AbstractUser
import os 
import uuid
from django.conf import settings


class UserRole(models.TextChoices):
    STUDENT = "STUDENT", "student"
    LEAD = "LEAD", "lead"
    ADMIN = "ADMIN", "admin"

class User(AbstractUser):
    """
    Custom user model extending Django's built-in AbstractUser.
    Includes additional fields and a user role selector.
    """
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=UserRole.choices)
    username = models.CharField(max_length=150, unique=True)

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
    USERNAME_FIELD = 'username'


class Student(models.Model):
    """
    Model representing a student. Inherits from User using OneToOne relationship.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student')
    roll_no = models.CharField(max_length=20, default="")
    club = models.CharField(max_length=100)


def blog_image_upload_path(instance, filename):
    # Store images under: media/blog_images/<blog_uuid>/<filename>
    return f'blog_images/{instance.blog.id}/{filename}'

class Blog(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

class BlogImage(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=blog_image_upload_path)

    def __str__(self):
        return f'Image for blog {self.blog.id}'
    
def temp_inline_upload_path(instance, filename):
    """
    Store inline images in temp_inline/ with a unique filename
    to prevent collisions.
    """
    ext = os.path.splitext(filename)[1]  # keep extension (.jpg, .png, etc.)
    unique_name = f"{uuid.uuid4().hex}{ext}"
    return f"temp_inline/{unique_name}"

class InlineImage(models.Model):
    image = models.ImageField(upload_to=temp_inline_upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.image.url


# class Event(models.Model):
#     """
#     Model representing an event created by an admin.
#     """   
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=200)
#     date = models.DateTimeField()
#     is_ongoing = models.BooleanField(default=False)
#     created_by = models.ForeignKey(Admin, on_delete=models.SET_NULL, null=True, blank=True)
#
#
# class Attendance(models.Model):
#     """
#     Model representing attendance of a student at an event.
#     """
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     event = models.ForeignKey(Event, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     status = models.BooleanField(default=False)
#     marked_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='marked_attendances')
