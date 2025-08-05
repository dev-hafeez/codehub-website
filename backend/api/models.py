from django.db import models

class Student(models.Model):
    DESIGNATION = [("General Member", "General Member"), ("Lead", "Lead")]
    CLUB = [("CodeHub", "CodeHub"), ("Media", "Media"), ("Registration", "Registration")]
    name = models.CharField(max_length=100)
    roll_no = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    designation = models.CharField(
        max_length=20,
        choices=DESIGNATION,
        default="General Member"
    )
    club = models.CharField(
        max_length=20,
        choices=CLUB,
        default="CodeHub"
    )

    achievements = models.ManyToManyField('Achievement', through='StudentAchievement', related_name='students')

class Achievement(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

class StudentAchievement(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('student', 'achievement')

