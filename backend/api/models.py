from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date, datetime

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


class Meeting(models.Model):
    date = models.DateField(default=date.today)
    start_time = models.TimeField(default=datetime.now().time().strftime('%I:%M %p')) # 12-hour format
    end_time = models.TimeField()
    venue = models.CharField(max_length=50)
    agenda = models.TextField(null=True, blank=True)
    highlights = models.TextField(null=True, blank=True)

class MeetingAttendance(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, related_name='attendance')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attending_student')
    status = models.CharField(max_length=10, choices=AttendanceStatus.choices)