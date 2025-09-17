from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student

class StudentInline(admin.StackedInline):
    model = Student
    can_delete = False
    verbose_name_plural = "Student Info"

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Role", {"fields": ("role",)}),
    )
    list_display = ("username", "email", "role", "is_superuser", "is_staff")
    inlines = [StudentInline]  # ✅ Add student info inside User admin

admin.site.register(User, CustomUserAdmin)
