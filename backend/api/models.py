from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class UserRole(models.TextChoices):
    STUDENT = "STUDENT", "Student"
    LEAD = "LEAD", "Lead"
    ADMIN = "ADMIN", "Admin"

class User(AbstractUser):
    """
    Custom user model extending Django's built-in AbstractUser.
    Includes additional fields and a user role selector.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=UserRole.choices)

    username = models.CharField(max_length=150, unique=True)
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']
    USERNAME_FIELD = 'username'

    def login(self):
        """
        Handles user login (implementation depends on views, so left empty).
        """
        pass

    def logout(self):
        """
        Handles user logout (implementation depends on views, so left empty).
        """
        pass

    def register(self):
        """
        Handles user registration (implementation depends on views/forms, so left empty).
        """
        pass


class StudentMember(models.Model):
    """
    Model representing a student member. Inherits from User using OneToOne relationship.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_member')
    club = models.CharField(max_length=100)

    def createBlog(self, content):
        """
        Creates a blog with given content. Blog model not implemented yet.
        """
        pass

    def editBlog(self, id):
        """
        Edits a blog with the given ID. Blog model not implemented yet.
        """
        pass


class Lead(models.Model):
    """
    Model representing a lead. Inherits from StudentMember using OneToOne relationship.
    """
    student_member = models.OneToOneField(StudentMember, on_delete=models.CASCADE, related_name='lead')

    def markAttendance(self, memberId, eventId):
        """
        Marks attendance for a member at a specific event.
        Attendance model not implemented yet.
        """
        pass

    def viewAttendance(self, eventId):
        """
        Returns attendance data for a specific event.
        Attendance model not implemented yet.
        """
        pass

    def createBlog(self, content):
        """
        Creates a blog as a lead.
        """
        pass

    def editBlog(self, id):
        """
        Edits a blog as a lead.
        """
        pass


class Admin(models.Model):
    """
    Model representing an admin. Inherits from User using OneToOne relationship.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='admin')

    def createEvent(self, event):
        """
        Creates an event. Event model not implemented yet.
        """
        pass

    def deleteEvent(self, id):
        """
        Deletes an event by ID. Event model not implemented yet.
        """
        pass

    def trackAllMembers(self):
        """
        Tracks all members. Implementation pending.
        """
        pass

    def deleteMember(self, id):
        """
        Deletes a member by ID. Implementation pending.
        """
        pass
