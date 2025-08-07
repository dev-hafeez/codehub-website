from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .permissions import IsLead
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

from django.contrib.auth.hashers import make_password

class SignupView(APIView):
    """
    API endpoint for user registration.

    This view handles the signup process for new users. It accepts a POST request
    with user details and creates a new User record in the database. It also
    creates a related Student profile for users with the 'STUDENT' role.
    Only users with the 'LEAD' role are permitted to access this endpoint.
    It handles cases of duplicate email or username and ensures all required fields are present.
    """
    # Use IsLead permission class instead of AllowAny
    permission_classes = [IsLead]

    def post(self, request):
        """
        Handles POST requests to register a new user.

        Args:
            request (Request): The incoming HTTP request containing user registration data.
                               Expected keys are: 'username', 'email', 'password',
                               'first_name', 'last_name', 'club', 'roll_number', and 'role'.

        Returns:
            Response: A JSON response indicating the outcome of the registration.
                      - Success (201 CREATED): Returns a success message and
                        the new user's details.
                      - Failure (400 BAD_REQUEST): If required fields are missing
                        or if the username, email, or roll number already exists.
                      - Failure (500 INTERNAL_SERVER_ERROR): For unexpected errors.
        """
        data = request.data
        errors = {}

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")
        club = data.get("club")
        roll_number = data.get("roll_number")
        role = data.get("role")
        if not role:
            errors["role"] = "Role is required."
        elif role not in [choice[0] for choice in User._meta.get_field('role').choices]:
            errors["role"] = f"Invalid role '{role}'. Must be one of {[choice[0] for choice in User._meta.get_field('role').choices]}"

        if not username:
            errors["username"] = "Username is required."
        if not email:
            errors["email"] = "Email is required."
        if not password:
            errors["password"] = "Password is required."
        
        # Check if user-name or email already exists
        if username and User.objects.filter(username=username).exists():
            errors["username"] = "Username already exists."
        if email and User.objects.filter(email=email).exists():
            errors["email"] = "Email already exists."
        
        # Additional validation for STUDENT role
        if role == "STUDENT":
            if not club:
                errors["club"] = "Club is required for students."
            if not roll_number:
                errors["roll_number"] = "Roll number is required for students."
            elif Student.objects.filter(roll_no=roll_number).exists(): # Corrected from roll_number to roll_no
                errors["roll_number"] = "A student with this roll number already exists."

        if errors:
            return Response({
                "status": "error",
                "errors": errors
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                user = User.objects.create(
                    username=username,
                    email=email,
                    password=make_password(password),
                    first_name=first_name,
                    last_name=last_name,
                    role=role
                )

                student = None
                if role == "STUDENT":
                    student = Student.objects.create(
                        user=user,
                        club=club,
                        roll_no=roll_number
                    )

                token, _ = Token.objects.get_or_create(user=user)

                return Response({
                    "status": "success",
                    "message": "User registered successfully",
                    "data": {
                        "token": token.key,
                        "user_id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "club": student.club if student else None,
                        "roll_number": student.roll_no if student else None # Corrected from roll_number to roll_no
                    }
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    """
    API endpoint for user login.

    This view handles the user login process. Users can authenticate using
    their username and password. Upon successful authentication, a unique token is
    returned for subsequent API requests. This endpoint is open to all users.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        """
        Handles POST requests for user login.

        Args:
            request (Request): The incoming HTTP request containing login credentials.
                               Expected keys are: 'username' and 'password'.

        Returns:
            Response: A JSON response indicating the login status.
                      - Success (200 OK): Returns a success message, the authentication token,
                        user ID, and user role.
                      - Failure (400 BAD_REQUEST): If username or password is missing.
                      - Failure (401 UNAUTHORIZED): If the provided credentials are invalid.
        """
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Please provide both a username and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "status": "success",
                "message": "Login successful",
                "data": {
                    "token": token.key,
                    "user_id": user.id,
                    "role": user.role
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )