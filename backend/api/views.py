from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .permissions import IsLead
from .serializers import StudentSerializer, LoginSerializer

User = get_user_model()
class SignupView(APIView):
    """
    Handles student registration using a nested serializer.
    Only users with the 'Lead' role are allowed to access this endpoint.
    Expects:
        {
            "user": {
                "username": "string",
                "email": "string",
                "password": "string",
                "role": "Student"
            },
            "roll_no": "string",
            "club": "string"
        }

    Returns:
        201 with token and user info on success.
        400 with error details if validation fails.
    """
    
    serializer_class = StudentSerializer
    permission_classes = [IsLead]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            student = serializer.save()
            user = student.user
            token, _ = Token.objects.get_or_create(user=user)
            response_data = {
                "status": "success",
                "message": "User registered successfully",
                "data": {
                    "token": token.key,
                    "user_id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role,
                    "club": student.club,
                    "roll_number": student.roll_no,
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    Authenticates a user and returns an auth token.

    Expects:
        {
            "username": "string",
            "password": "string"
        }

    Returns:
        200 with token and user info on success.
        400 if credentials are invalid.
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "status": "success",
                "message": "Login successful",
                "data": {
                    "token": token.key,
                    "user_id": user.id,
                    "role": user.role
                }
            }, status=status.HTTP_200_OK)

