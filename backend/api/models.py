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
    """
    Store blog images inside a folder for each blog ID.
    Example: blog_images/<blog_id>/<filename>
    """
    return os.path.join('blog_images', str(instance.id), filename) 
    
class Blog(models.Model):
    """
    Model representing a blog post created by users (typically students or leads).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def displayPreview(self):
        """
        Returns a preview (first 100 characters) of the blog content.
         """
        return self.content[:100]
      
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
