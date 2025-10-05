from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date, datetime
from django.conf import settings
import os
import uuid


class UserRole(models.TextChoices):
    STUDENT = "STUDENT", "student"
    LEAD = "LEAD", "lead"
    ADMIN = "ADMIN", "admin"

class AttendanceStatus(models.TextChoices):
    PRESENT = 'PRESENT', 'present'
    ABSENT = 'ABSENT', 'absent'
    LEAVE = 'LEAVE', 'leave'

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
    club = models.CharField(max_length=50)
    title = models.CharField(max_length=30, null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', default='profile_pics/default.jpg')
    profile_desc = models.TextField(max_length=200, null=True, blank=True)


def blog_image_upload_path(instance, filename):
    # Store images under: media/blog_images/<blog_uuid>/<filename>
    return f'blog_images/{instance.blog.id}/{filename}'

def event_image_upload_path(instance, filename):
    return f'events/{instance.id}/{filename}'

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

def current_time():
    return datetime.now().time()

class Meeting(models.Model):
    date = models.DateField(default=date.today)
    start_time = models.TimeField(default=current_time) # 12-hour format
    end_time = models.TimeField()
    venue = models.CharField(max_length=50)
    agenda = models.TextField(null=True, blank=True)
    highlights = models.TextField(null=True, blank=True)

class MeetingAttendance(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, related_name='attendance')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attending_student')
    status = models.CharField(max_length=10, choices=AttendanceStatus.choices)

def event_image_upload_path(instance, filename):
    return f'events/{instance.event.id}/{filename}'

class Event(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField(default=date.today)

class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=event_image_upload_path, default=f'{settings.MEDIA_ROOT}/events/default.png', blank=True, null=True)
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