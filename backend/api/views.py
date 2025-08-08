from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .permissions import IsLead
from .serializers import StudentSerializer, LoginSerializer
from drf_spectacular.utils import OpenApiResponse, extend_schema

User = get_user_model()

@extend_schema(
    request=StudentSerializer,
    responses={
        201: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "status": {"type": "string", "example": "success"},
                    "message": {"type": "string", "example": "User registered successfully"},
                    "data": {
                        "type": "object",
                        "properties": {
                            "token": {"type": "string"},
                            "user_id": {"type": "integer"},
                            "username": {"type": "string"},
                            "email": {"type": "string"},
                            "role": {"type": "string"},
                            "club": {"type": "string"},
                            "roll_number": {"type": "string"},
                        }
                    }
                }
            },
            description="User created successfully"
        ),
        400: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "status": {"type": "string", "example": "error"},
                    "message": {"type": "object", "example": {"email": ["Email already exists"]}},
                    "data": {"type": "null"}
                }
            },
            description="Validation error"
        ),
        403: OpenApiResponse(description="Forbidden - user does not have Lead permissions"),
    },
    description='Handles student registration using a nested serializer.\nOnly users with the \'Lead\' role are allowed to access this endpoint.'
)
class SignupView(APIView):
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
        return Response({
            'status': 'error',
            'message': serializer.errors,
            'data': None
        }, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(
    request=LoginSerializer,
    responses={
        200: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "status": {"type": "string", "example": "success"},
                    "message": {"type": "string", "example": "Login successful"},
                    "data": {
                        "type": "object",
                        "properties": {
                            "token": {"type": "string", "example": "a1b2c3d4e5f6"},
                            "user_id": {"type": "integer", "example": 42},
                            "role": {"type": "string", "example": "LEAD"}
                        }
                    }
                }
            },
            description="Login successful"
        ),
        400: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "status": {"type": "string", "example": "error"},
                    "message": {
                        "type": "object",
                        "example": {"non_field_errors": ["Invalid username or password"]}
                    },
                    "data": {"type": "null"}
                }
            },
            description="Invalid credentials"
        ),
    },
    description='Authenticates a user and returns an auth token.'
)
class LoginView(APIView):
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
        return Response({
            'status': 'error',
            'message': serializer.errors,
            'data': None
        }, status=status.HTTP_400_BAD_REQUEST)
