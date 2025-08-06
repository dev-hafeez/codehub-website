from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

from django.contrib.auth.hashers import make_password

class SignupView(APIView):
    """
    API endpoint for user registration.

    This view handles the signup process for new users. It accepts a POST request
    with user details and creates a new User record in the database.
    It also creates a related Student profile for users with the 'STUDENT' role.
    It handles cases of duplicate email or username by returning an appropriate error.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Handles POST requests to register a new user.

        Args:
            request (Request): The incoming HTTP request containing user registration data.
                               Expected keys are: 'username', 'email', 'password',
                               'first_name', 'last_name', and 'club'.
                               The 'role' will default to 'STUDENT' for this view.

        Returns:
            Response: A JSON response indicating the outcome of the registration.
                      - **Success (201 CREATED)**: Returns a success message,
                        an authentication token, user ID, username, email, and club.
                      - **Failure (400 BAD_REQUEST)**: If required fields are missing,
                        or if the username or email already exists.
                      - **Failure (500 INTERNAL_SERVER_ERROR)**: For unexpected errors
                        during the registration process.
        """
        data = request.data

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")
        club = data.get("club")

        role = data.get("role")
        if not role:
            return Response({
                "status": "error",
                "message": "Role is required."
            }, status=status.HTTP_400_BAD_REQUEST)

        if role not in [choice[0] for choice in User._meta.get_field('role').choices]:
            return Response({
                "status": "error",
                "message": f"Invalid role '{role}'. Must be one of {[choice[0] for choice in User._meta.get_field('role').choices]}"
            }, status=status.HTTP_400_BAD_REQUEST)


        if not club:
            return Response({
                "status": "error",
                "message": "Club is required."
            }, status=status.HTTP_400_BAD_REQUEST)


        if not username or not email or not password:
            return Response({
                "status": "error",
                "message": "Username, email, and password are required."
            }, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({
                "status": "error",
                "message": "Username already exists"
            }, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({
                "status": "error",
                "message": "Email already exists"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                first_name=first_name,
                last_name=last_name,
                role=role
            )

            if role == "STUDENT":
                student = Student.objects.create(
                    user=user,
                    club=club
                )

            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                "status": "success",
                "message": "Student registered successfully",
                "data": {
                    "token": token.key,
                    "user_id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "club": student.club if role == "STUDENT" else None
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

    This view handles the user login process.
    Users can authenticate using their username and password.
    Upon successful authentication, a unique token is returned for subsequent API requests.
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
                      - **Success (200 OK)**: Returns a success message,
                        the authentication token, user ID, and user role.
                      - **Failure (400 BAD_REQUEST)**: If username or password
                        is missing from the request.
                      - **Failure (401 UNAUTHORIZED)**: If the provided credentials
                        are invalid.
        """
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Please provide both a username and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Use Django's built-in authenticate function to securely verify credentials.
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # If authentication is successful, get or create a token for the user.
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
            # If authenticate() returns None, the credentials were bad.
            return Response(
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )