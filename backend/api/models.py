from django.db import models
from django.contrib.auth.models import AbstractUser

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

class Event(models.Model):
    """
    Model representing an event created by an admin.
    """
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    # is_ongoing = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)


class Attendance(models.Model):
    """
    Model representing attendance of a student at an event.
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    attended = models.BooleanField(default=False)
    # This must be a lead of the club the attending student is in
    marked_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='marked_attendances')
