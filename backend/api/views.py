# # 



# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import get_user_model
# from rest_framework.authtoken.models import Token
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from .permissions import IsLead,IsAdmin
# from .serializers import StudentSerializer, LoginSerializer, OTPSerializer, PasswordChangeSerializer
# from drf_spectacular.utils import OpenApiResponse, extend_schema, OpenApiParameter, OpenApiExample
# from drf_spectacular.types import OpenApiTypes
# from rest_framework_simplejwt.tokens import UntypedToken
# from rest_framework_simplejwt.exceptions import TokenError
# from django.db import transaction
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework import generics
# from .models import Blog, BlogImage
# from .serializers import BlogSerializer, BlogUploadSerializer, BlogUpdateSerializer, InlineImageSerializer
# from django.http import QueryDict
# from rest_framework import permissions
# from rest_framework.exceptions import PermissionDenied
# from .utils import finalize_inline_images

# from .utils import get_tokens_for_user, send_otp

# User = get_user_model()

# @extend_schema(
#     request=StudentSerializer,
#     responses={
#         201: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "status": {"type": "string", "example": "success"},
#                     "message": {"type": "string", "example": "User registered successfully"},
#                     "data": {
#                         "type": "object",
#                         "properties": {
#                             "token": {"type": "string"},
#                             "user_id": {"type": "integer"},
#                             "username": {"type": "string"},
#                             "email": {"type": "string"},
#                             "role": {"type": "string"},
#                             "club": {"type": "string"},
#                             "roll_number": {"type": "string"},
#                         }
#                     }
#                 }
#             },
#             description="User created successfully"
#         ),
#         400: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "status": {"type": "string", "example": "error"},
#                     "message": {"type": "object", "example": {"email": ["Email already exists"]}},
#                     "data": {"type": "null"}
#                 }
#             },
#             description="Validation error"
#         ),
#         403: OpenApiResponse(description="Forbidden - user does not have Lead permissions"),
#     },
#     description='Handles student registration using a nested serializer.\nOnly users with the \'Lead\' role are allowed to access this endpoint.'
# )
# class SignupView(APIView):
#     serializer_class = StudentSerializer
#     permission_classes = [IsLead]

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             student = serializer.save()
#             user = student.user
#             token, _ = Token.objects.get_or_create(user=user)
#             response_data = {
#                 "status": "success",
#                 "message": "User registered successfully",
#                 "data": {
#                     "token": token.key,
#                     "user_id": user.id,
#                     "username": user.username,
#                     "email": user.email,
#                     "role": user.role,
#                     "club": student.club,
#                     "roll_number": student.roll_no,
#                 }
#             }
#             return Response(response_data, status=status.HTTP_201_CREATED)
#         return Response({
#             'status': 'error',
#             'message': serializer.errors,
#             'data': None
#         }, status=status.HTTP_400_BAD_REQUEST)

# @extend_schema(
#     request=LoginSerializer,
#     responses={
#         200: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "status": {"type": "string", "example": "success"},
#                     "message": {"type": "string", "example": "Login successful"},
#                     "data": {
#                         "type": "object",
#                         "properties": {
#                             "token": {"type": "string", "example": "a1b2c3d4e5f6"},
#                             "user_id": {"type": "integer", "example": 42},
#                             "role": {"type": "string", "example": "LEAD"}
#                         }
#                     }
#                 }
#             },
#             description="Login successful"
#         ),
#         400: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "status": {"type": "string", "example": "error"},
#                     "message": {
#                         "type": "object",
#                         "example": {"non_field_errors": ["Invalid username or password"]}
#                     },
#                     "data": {"type": "null"}
#                 }
#             },
#             description="Invalid credentials"
#         ),
#     },
#     description='Authenticates a user and returns an auth token.'
# )
# class LoginView(APIView):
#     serializer_class = LoginSerializer
#     permission_classes = [AllowAny]
    
#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid(raise_exception=False):
#             user = serializer.validated_data['user']
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({
#                 "status": "success",
#                 "message": "Login successful",
#                 "data": {
#                     "token": token.key,
#                     "user_id": user.id,
#                     "role": user.role
#                 }
#             }, status=status.HTTP_200_OK)
#         return Response({
#             'status': 'error',
#             'message': serializer.errors,
#             'data': None
#         }, status=status.HTTP_400_BAD_REQUEST)

# @extend_schema(
#     request=OTPSerializer,
#     responses={
#         200: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "token": {
#                         "type": "object",
#                         "properties": {
#                             "refresh": {"type": "string", "example": "eyJ0eXAiOiJKV1QiLC..."},
#                             "access": {"type": "string", "example": "eyJ0eXAiOiJKV1QiLC..."},
#                             "id": {"type": "integer", "example": 1},
#                             "email": {"type": "string", "example": "user@example.com"},
#                             "otp": {"type": "string", "example": "1234"}
#                         }
#                     }
#                 }
#             },
#             description="OTP generated and returned with token"
#         ),
#         400: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "errors": {
#                         "type": "object",
#                         "example": {
#                             "email": ["This field is required."]
#                         }
#                     }
#                 }
#             },
#             description="Validation failed"
#         ),
#     },
#     description=(
#         "Generates a One-Time Password (OTP) for the provided email address. "
#         "If the email is valid and belongs to an existing user, the API returns "
#         "a JWT token set (access & refresh), along with the user's ID, email, "
#         "and the generated OTP. The OTP is intended for verification purposes "
#         "and should be treated as sensitive information."
#     ),
# )
# class OTPView(APIView):
#     permission_classes = [AllowAny]
#     serializer_class = OTPSerializer

#     User = get_user_model()

#     def post(self, request):
#         import random
#         otp = random.randint(1000, 9999)
#         data = request.data
#         serializer = self.serializer_class(data=data)
#         if serializer.is_valid(raise_exception=False):
#             send_otp(data['email'], otp=otp)
#             user = User.objects.get(email=data['email'])
#             token = get_tokens_for_user(user, otp=str(otp))
#             response_data = {
#                 'token': token
#             }
#             return Response(data=response_data, status=status.HTTP_200_OK)
#         return Response({
#             'errors': serializer.errors
#         }, status.HTTP_400_BAD_REQUEST)

# @extend_schema(
#     request=PasswordChangeSerializer,
#     responses={
#         200: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "status": {"type": "string", "example": "success"},
#                     "message": {"type": "string", "example": "Password has been updated."}
#                 }
#             },
#             description="Password updated successfully."
#         ),
#         400: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "errors": {
#                         "type": "object",
#                         "example": {
#                             "token": "Token is invalid"
#                         }
#                     }
#                 }
#             },
#             description="Invalid token or validation error."
#         )
#     },
#     description=(
#         "Resets the user's password using a valid JWT token.\n\n"
#         "The API user must send a valid `token` obtained from `api/auth/otp` "
#         "and the new password."
#     ),
# )
# class PasswordChangeView(APIView):
#     serializer_class = PasswordChangeSerializer

#     def put(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid(raise_exception=False):
#             user_obj = get_user_model()
#             token = serializer.validated_data.get('token')
#             password = serializer.validated_data.get('password')
#             try:
#                 payload = UntypedToken(token) # Decode token if it's valid
#             except TokenError:
#                 return Response({
#                     'errors': {
#                         'token': 'Token is invalid'
#                     }
#                 }, status=status.HTTP_400_BAD_REQUEST)
#             user_id = payload['user_id']
#             user = user_obj.objects.get(pk=user_id)
#             user.set_password(password)
#             user.save()
#             return Response({
#                 'status': 'success',
#                 'message': 'Password has been updated.'
#             }, status=status.HTTP_200_OK)
#         return Response({
#             'errors': serializer.errors
#         }, status=status.HTTP_400_BAD_REQUEST)


# @extend_schema(
#     request=None,
#     responses={
#         200: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "status": {"type": "string", "example": "success"},
#                     "message": {"type": "string", "example": "Logged out successfully"}
#                 }
#             },
#             description="User logged out successfully."
#         ),
#         401: OpenApiResponse(
#             response={
#                 "type": "object",
#                 "properties": {
#                     "detail": {"type": "string", "example": "Authentication credentials were not provided."}
#                 }
#             },
#             description="User is not authenticated."
#         ),
#     },
#     description=(
#         "Logs out the currently authenticated user by deleting their auth token "
#         "(this view is **not** for JWT-based authentication)"
#     ),
# )
# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         request.user.auth_token.delete() # Not JWT
#         return Response({
#             'status': 'success',
#             'message': 'Logged out successfully'
#         }, status=status.HTTP_200_OK)

# @extend_schema(
#     summary="Upload a new blog post with images",
#     description=(
#         "Creates a new blog post. Only authenticated users can create blogs.\n\n"
#         "The request accepts `title`, `content`, and one or more `images`. "
#         "Images must be uploaded as multipart form data."
#     ),
#     request={
#         "multipart/form-data": {
#             "type": "object",
#             "properties": {
#                 "title": {"type": "string", "example": "My First Blog Post"},
#                 "content": {"type": "string", "example": "This is the content of the blog post."},
#                 "images": {
#                     "type": "array",
#                     "items": {"type": "string", "format": "binary"},
#                     "description": "One or more images to attach to the blog post"
#                 },
#             },
#             "required": ["title", "content"]
#         }
#     },
#     responses={
#         201: OpenApiResponse(
#             response=BlogSerializer,
#             description="Blog post created successfully.",
#             examples=[
#                 OpenApiExample(
#                     "Success Example",
#                     value={
#                         "status": "success",
#                         "message": "Blog post created successfully",
#                         "data": {
#                             "id": 1,
#                             "title": "My First Blog Post",
#                             "content": "This is the content of the blog post.",
#                             "images": [
#                                 "http://localhost:8000/media/blog_images/img1.jpg",
#                                 "http://localhost:8000/media/blog_images/img2.jpg"
#                             ],
#                             "created_at": "2025-08-27T12:34:56Z",
#                             "author": {"id": 5, "username": "john_doe"}
#                         }
#                     }
#                 )
#             ]
#         ),
#         400: OpenApiResponse(
#             description="Validation error - invalid input",
#             examples=[
#                 OpenApiExample(
#                     "Error Example",
#                     value={
#                         "status": "error",
#                         "message": {
#                             "title": ["This field is required."],
#                             "images": ["Invalid file type."]
#                         },
#                         "data": None
#                     }
#                 )
#             ]
#         ),
#     }
# )
# class BlogUploadView(APIView):
#     """
#     API endpoint to upload a new blog post with one or more images.

#     Permissions:
#         - Only authenticated users can create a blog post.

#     Parsers:
#         - MultiPartParser and FormParser to handle file uploads.

#     Behavior:
#         - Accepts 'title', 'content', and 'images' via POST request.
#         - Normalizes single or multiple image uploads into a list.
#         - Validates images for type and size using BlogUploadSerializer.
#         - Creates a Blog instance and related BlogImage instances atomically.
#         - Returns serialized blog data including absolute image URLs on success.
#     """
#     permission_classes = [IsAuthenticated]
#     def post(self, request, *args, **kwargs):
#         data = request.data.copy()
#         files = request.FILES.getlist('images')
#         if not files and 'images' in request.FILES:
#             files = [request.FILES['images']]
#         if files:
#             data.setlist('images', files)

#         serializer = BlogUploadSerializer(data=data, context={"request": request})

#         if serializer.is_valid():
#             with transaction.atomic():
#                 blog = serializer.save()

#                 # finalize inline images
#                 updated_content = finalize_inline_images(blog.content, blog.id)
#                 if updated_content != blog.content:
#                     blog.content = updated_content
#                     blog.save(update_fields=["content"])

#             resp = BlogSerializer(blog, context={"request": request})
#             return Response({
#                 "status": "success",
#                 "message": "Blog post created successfully",
#                 "data": resp.data
#             }, status=status.HTTP_201_CREATED)

#         return Response({
#             "status": "error",
#             "message": serializer.errors,
#             "data": None
#         }, status=status.HTTP_400_BAD_REQUEST)


# class InlineImageUploadView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def post(self, request, *args, **kwargs):
#         serializer = InlineImageSerializer(data=request.data)
#         if serializer.is_valid():
#             image = serializer.save()
#             image_url = request.build_absolute_uri(image.image.url)
#             return Response({"url": image_url}, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @extend_schema(
#     summary="List blog posts",
#     description=(
#         "Retrieve a list of blog posts.\n\n"
#         "- **limit** (optional, int): Restrict the number of blog posts returned.\n"
#         "- **student_id** (optional, int): Filter blog posts by the ID of the student who created them.\n\n"
#         "Returns all blog posts by default, ordered by creation date (newest first). "
#         "If `student_id` is provided, only posts from that student are included. "
#         "If `limit` is provided, restricts the number of results."
#     ),
#     parameters=[
#         OpenApiParameter(
#             name="limit",
#             type=OpenApiTypes.INT,
#             location=OpenApiParameter.QUERY,
#             required=False,
#             description="Restrict the number of blog posts returned."
#         ),
#         OpenApiParameter(
#             name="student_id",
#             type=OpenApiTypes.INT,
#             location=OpenApiParameter.QUERY,
#             required=False,
#             description="Filter blog posts by the ID of the student who created them."
#         ),
#     ],
#     responses={
#         200: OpenApiResponse(
#             response=BlogSerializer(many=True),
#             description="List of blog posts retrieved successfully."
#         ),
#         400: OpenApiResponse(description="Bad request. Invalid query parameter."),
#         403: OpenApiResponse(description="Permission denied."),
#     }
# )
# class BlogListAPIView(generics.ListAPIView):
#     serializer_class = BlogSerializer

#     def get_queryset(self):
#         queryset = Blog.objects.all().order_by('-createdAt')

#         student_id = self.request.query_params.get('student_id')
#         if student_id:
#             queryset = queryset.filter(createdBy__id=student_id)

#         limit = self.request.query_params.get('limit')
#         if limit and limit.isdigit():
#             queryset = queryset[:int(limit)]

#         return queryset

# @extend_schema(
#     summary="Edit a blog post",
#     description=(
#         "Allows authenticated users (author/lead/admin) to edit an existing blog post. "
#         "Editing permissions are enforced on the frontend side. "
#         "Supports updating text fields (title, content) and optionally replacing images."
#     ),
#     request=BlogUpdateSerializer,
#     responses={
#         200: OpenApiResponse(
#             response=BlogSerializer,
#             description="Blog post updated successfully",
#             examples=[
#                 OpenApiExample(
#                     "Successful Update",
#                     value={
#                         "status": "success",
#                         "message": "Blog post updated successfully",
#                         "data": {
#                             "id": 1,
#                             "title": "Updated Blog Title",
#                             "content": "Updated content here...",
#                             "images": [
#                                 "http://example.com/media/blogs/updated_image1.jpg"
#                             ],
#                             "createdAt": "2025-08-27T12:34:56Z",
#                             "createdBy": {"id": 5, "username": "student123"},
#                         }
#                     },
#                 )
#             ],
#         ),
#         400: OpenApiResponse(
#             response=OpenApiTypes.OBJECT,
#             description="Validation error",
#             examples=[
#                 OpenApiExample(
#                     "Validation Error",
#                     value={
#                         "status": "error",
#                         "message": {"title": ["This field is required."]},
#                         "data": None,
#                     },
#                 )
#             ],
#         ),
#         404: OpenApiResponse(
#             response=OpenApiTypes.OBJECT,
#             description="Blog post not found",
#             examples=[
#                 OpenApiExample(
#                     "Not Found",
#                     value={
#                         "status": "error",
#                         "message": "Blog post not found",
#                         "data": None,
#                     },
#                 )
#             ],
#         ),
#     },
#     examples=[
#         OpenApiExample(
#             "Update Blog Example",
#             value={
#                 "title": "New Blog Title",
#                 "content": "Updated blog content...",
#                 "images": ["(binary image file)"]
#             },
#             request_only=True,
#             media_type="multipart/form-data",
#         )
#     ],
# )
# class BlogEditView(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def put(self, request, pk, *args, **kwargs):
#         try:
#             blog = Blog.objects.get(pk=pk)
#         except Blog.DoesNotExist:
#             return Response({
#                 "status": "error",
#                 "message": "Blog post not found",
#                 "data": None
#             }, status=status.HTTP_404_NOT_FOUND)

#         data = request.data.copy()
#         files = request.FILES.getlist('images')
#         if files:
#             data.setlist('images', files)

#         serializer = BlogUpdateSerializer(blog, data=data, partial=True, context={"request": request})
#         if serializer.is_valid():
#             serializer.save()
#             resp = BlogSerializer(blog, context={"request": request})
#             return Response({
#                 "status": "success",
#                 "message": "Blog post updated successfully",
#                 "data": resp.data
#             }, status=status.HTTP_200_OK)

#         return Response({
#             "status": "error",
#             "message": serializer.errors,
#             "data": None
#         }, status=status.HTTP_400_BAD_REQUEST)


# @extend_schema(
#     summary="Delete a blog post",
#     description=(
#         "Allows only admins to delete a blog post. "
#         "If the blog does not exist, a 404 error is returned."
#     ),
#     request=None,
#     responses={
#         200: OpenApiResponse(
#             response=OpenApiTypes.OBJECT,
#             description="Blog post deleted successfully",
#             examples=[
#                 OpenApiExample(
#                     "Successful Deletion",
#                     value={
#                         "status": "success",
#                         "message": "Blog post deleted successfully",
#                         "data": None,
#                     },
#                 )
#             ],
#         ),
#         404: OpenApiResponse(
#             response=OpenApiTypes.OBJECT,
#             description="Blog post not found",
#             examples=[
#                 OpenApiExample(
#                     "Not Found",
#                     value={
#                         "status": "error",
#                         "message": "Blog post not found",
#                         "data": None,
#                     },
#                 )
#             ],
#         ),
#     },
# )
# class BlogDeleteView(APIView):
#     permission_classes = [IsAuthenticated, IsAdmin]

#     def delete(self, request, pk, *args, **kwargs):
#         try:
#             blog = Blog.objects.get(pk=pk)
#         except Blog.DoesNotExist:
#             return Response({
#                 "status": "error",
#                 "message": "Blog post not found",
#                 "data": None
#             }, status=status.HTTP_404_NOT_FOUND)

#         blog.delete()
#         return Response({
#             "status": "success",
#             "message": "Blog post deleted successfully",
#             "data": None
#         }, status=status.HTTP_200_OK)
    





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsLead,IsAdmin
from .serializers import StudentSerializer, LoginSerializer, OTPSerializer, PasswordChangeSerializer
from drf_spectacular.utils import OpenApiResponse, extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import TokenError
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from .models import Blog, BlogImage
from .serializers import BlogSerializer, BlogUploadSerializer, BlogUpdateSerializer, InlineImageSerializer
from django.http import QueryDict
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from .utils import finalize_inline_images

from .utils import get_tokens_for_user, send_otp

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
        if serializer.is_valid(raise_exception=False):
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

@extend_schema(
    request=OTPSerializer,
    responses={
        200: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "token": {
                        "type": "object",
                        "properties": {
                            "refresh": {"type": "string", "example": "eyJ0eXAiOiJKV1QiLC..."},
                            "access": {"type": "string", "example": "eyJ0eXAiOiJKV1QiLC..."},
                            "id": {"type": "integer", "example": 1},
                            "email": {"type": "string", "example": "user@example.com"},
                            "otp": {"type": "string", "example": "1234"}
                        }
                    }
                }
            },
            description="OTP generated and returned with token"
        ),
        400: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "errors": {
                        "type": "object",
                        "example": {
                            "email": ["This field is required."]
                        }
                    }
                }
            },
            description="Validation failed"
        ),
    },
    description=(
        "Generates a One-Time Password (OTP) for the provided email address. "
        "If the email is valid and belongs to an existing user, the API returns "
        "a JWT token set (access & refresh), along with the user's ID, email, "
        "and the generated OTP. The OTP is intended for verification purposes "
        "and should be treated as sensitive information."
    ),
)
class OTPView(APIView):
    permission_classes = [AllowAny]
    serializer_class = OTPSerializer

    User = get_user_model()

    def post(self, request):
        import random
        otp = random.randint(1000, 9999)
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=False):
            send_otp(data['email'], otp=otp)
            user = User.objects.get(email=data['email'])
            token = get_tokens_for_user(user, otp=str(otp))
            response_data = {
                'token': token
            }
            return Response(data=response_data, status=status.HTTP_200_OK)
        return Response({
            'errors': serializer.errors
        }, status.HTTP_400_BAD_REQUEST)

@extend_schema(
    request=PasswordChangeSerializer,
    responses={
        200: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "status": {"type": "string", "example": "success"},
                    "message": {"type": "string", "example": "Password has been updated."}
                }
            },
            description="Password updated successfully."
        ),
        400: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "errors": {
                        "type": "object",
                        "example": {
                            "token": "Token is invalid"
                        }
                    }
                }
            },
            description="Invalid token or validation error."
        )
    },
    description=(
        "Resets the user's password using a valid JWT token.\n\n"
        "The API user must send a valid `token` obtained from `api/auth/otp` "
        "and the new password."
    ),
)
class PasswordChangeView(APIView):
    serializer_class = PasswordChangeSerializer

    def put(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            user_obj = get_user_model()
            token = serializer.validated_data.get('token')
            password = serializer.validated_data.get('password')
            try:
                payload = UntypedToken(token) # Decode token if it's valid
            except TokenError:
                return Response({
                    'errors': {
                        'token': 'Token is invalid'
                    }
                }, status=status.HTTP_400_BAD_REQUEST)
            user_id = payload['user_id']
            user = user_obj.objects.get(pk=user_id)
            user.set_password(password)
            user.save()
            return Response({
                'status': 'success',
                'message': 'Password has been updated.'
            }, status=status.HTTP_200_OK)
        return Response({
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    request=None,
    responses={
        200: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "status": {"type": "string", "example": "success"},
                    "message": {"type": "string", "example": "Logged out successfully"}
                }
            },
            description="User logged out successfully."
        ),
        401: OpenApiResponse(
            response={
                "type": "object",
                "properties": {
                    "detail": {"type": "string", "example": "Authentication credentials were not provided."}
                }
            },
            description="User is not authenticated."
        ),
    },
    description=(
        "Logs out the currently authenticated user by deleting their auth token "
        "(this view is **not** for JWT-based authentication)"
    ),
)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete() # Not JWT
        return Response({
            'status': 'success',
            'message': 'Logged out successfully'
        }, status=status.HTTP_200_OK)

@extend_schema(
    summary="Upload a new blog post with images",
    description=(
        "Creates a new blog post. Only authenticated users can create blogs.\n\n"
        "The request accepts `title`, `content`, and one or more `images`. "
        "Images must be uploaded as multipart form data."
    ),
    request={
        "multipart/form-data": {
            "type": "object",
            "properties": {
                "title": {"type": "string", "example": "My First Blog Post"},
                "content": {"type": "string", "example": "This is the content of the blog post."},
                "images": {
                    "type": "array",
                    "items": {"type": "string", "format": "binary"},
                    "description": "One or more images to attach to the blog post"
                },
            },
            "required": ["title", "content"]
        }
    },
    responses={
        201: OpenApiResponse(
            response=BlogSerializer,
            description="Blog post created successfully.",
            examples=[
                OpenApiExample(
                    "Success Example",
                    value={
                        "status": "success",
                        "message": "Blog post created successfully",
                        "data": {
                            "id": 1,
                            "title": "My First Blog Post",
                            "content": "This is the content of the blog post.",
                            "images": [
                                "http://localhost:8000/media/blog_images/img1.jpg",
                                "http://localhost:8000/media/blog_images/img2.jpg"
                            ],
                            "created_at": "2025-08-27T12:34:56Z",
                            "author": {"id": 5, "username": "john_doe"}
                        }
                    }
                )
            ]
        ),
        400: OpenApiResponse(
            description="Validation error - invalid input",
            examples=[
                OpenApiExample(
                    "Error Example",
                    value={
                        "status": "error",
                        "message": {
                            "title": ["This field is required."],
                            "images": ["Invalid file type."]
                        },
                        "data": None
                    }
                )
            ]
        ),
    }
)
class BlogUploadView(APIView):
    """
    API endpoint to upload a new blog post with one or more images.

    Permissions:
        - Only authenticated users can create a blog post.

    Parsers:
        - MultiPartParser and FormParser to handle file uploads.

    Behavior:
        - Accepts 'title', 'content', and 'images' via POST request.
        - Normalizes single or multiple image uploads into a list.
        - Validates images for type and size using BlogUploadSerializer.
        - Creates a Blog instance and related BlogImage instances atomically.
        - Returns serialized blog data including absolute image URLs on success.
    """
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        files = request.FILES.getlist('images')
        if not files and 'images' in request.FILES:
            files = [request.FILES['images']]
        if files:
            data.setlist('images', files)

        serializer = BlogUploadSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            with transaction.atomic():
                blog = serializer.save()

                # finalize inline images
                updated_content = finalize_inline_images(blog.content, blog.id)
                if updated_content != blog.content:
                    blog.content = updated_content
                    blog.save(update_fields=["content"])

            resp = BlogSerializer(blog, context={"request": request})
            return Response({
                "status": "success",
                "message": "Blog post created successfully",
                "data": resp.data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "status": "error",
            "message": serializer.errors,
            "data": None
        }, status=status.HTTP_400_BAD_REQUEST)


class InlineImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = InlineImageSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.save()
            image_url = request.build_absolute_uri(image.image.url)
            return Response({"url": image_url}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="List blog posts",
    description=(
        "Retrieve a list of blog posts.\n\n"
        "- **limit** (optional, int): Restrict the number of blog posts returned.\n"
        "- **student_id** (optional, int): Filter blog posts by the ID of the student who created them.\n\n"
        "Returns all blog posts by default, ordered by creation date (newest first). "
        "If `student_id` is provided, only posts from that student are included. "
        "If `limit` is provided, restricts the number of results."
    ),
    parameters=[
        OpenApiParameter(
            name="limit",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            required=False,
            description="Restrict the number of blog posts returned."
        ),
        OpenApiParameter(
            name="student_id",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            required=False,
            description="Filter blog posts by the ID of the student who created them."
        ),
    ],
    responses={
        200: OpenApiResponse(
            response=BlogSerializer(many=True),
            description="List of blog posts retrieved successfully."
        ),
        400: OpenApiResponse(description="Bad request. Invalid query parameter."),
        403: OpenApiResponse(description="Permission denied."),
    }
)
class BlogListAPIView(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        queryset = Blog.objects.all().order_by('-createdAt')

        student_id = self.request.query_params.get('student_id')
        if student_id:
            queryset = queryset.filter(createdBy__id=student_id)

        limit = self.request.query_params.get('limit')
        if limit and limit.isdigit():
            queryset = queryset[:int(limit)]

        return queryset

@extend_schema(
    summary="Edit a blog post",
    description=(
        "Allows authenticated users (author/lead/admin) to edit an existing blog post. "
        "Editing permissions are enforced on the frontend side. "
        "Supports updating text fields (title, content) and optionally replacing images."
    ),
    request=BlogUpdateSerializer,
    responses={
        200: OpenApiResponse(
            response=BlogSerializer,
            description="Blog post updated successfully",
            examples=[
                OpenApiExample(
                    "Successful Update",
                    value={
                        "status": "success",
                        "message": "Blog post updated successfully",
                        "data": {
                            "id": 1,
                            "title": "Updated Blog Title",
                            "content": "Updated content here...",
                            "images": [
                                "http://example.com/media/blogs/updated_image1.jpg"
                            ],
                            "createdAt": "2025-08-27T12:34:56Z",
                            "createdBy": {"id": 5, "username": "student123"},
                        }
                    },
                )
            ],
        ),
        400: OpenApiResponse(
            response=OpenApiTypes.OBJECT,
            description="Validation error",
            examples=[
                OpenApiExample(
                    "Validation Error",
                    value={
                        "status": "error",
                        "message": {"title": ["This field is required."]},
                        "data": None,
                    },
                )
            ],
        ),
        404: OpenApiResponse(
            response=OpenApiTypes.OBJECT,
            description="Blog post not found",
            examples=[
                OpenApiExample(
                    "Not Found",
                    value={
                        "status": "error",
                        "message": "Blog post not found",
                        "data": None,
                    },
                )
            ],
        ),
    },
    examples=[
        OpenApiExample(
            "Update Blog Example",
            value={
                "title": "New Blog Title",
                "content": "Updated blog content...",
                "images": ["(binary image file)"]
            },
            request_only=True,
            media_type="multipart/form-data",
        )
    ],
)
class BlogEditView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, pk, *args, **kwargs):
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Blog post not found",
                "data": None
            }, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        files = request.FILES.getlist('images')
        if files:
            data.setlist('images', files)

        serializer = BlogUpdateSerializer(blog, data=data, partial=True, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            resp = BlogSerializer(blog, context={"request": request})
            return Response({
                "status": "success",
                "message": "Blog post updated successfully",
                "data": resp.data
            }, status=status.HTTP_200_OK)

        return Response({
            "status": "error",
            "message": serializer.errors,
            "data": None
        }, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    summary="Delete a blog post",
    description=(
        "Allows only admins to delete a blog post. "
        "If the blog does not exist, a 404 error is returned."
    ),
    request=None,
    responses={
        200: OpenApiResponse(
            response=OpenApiTypes.OBJECT,
            description="Blog post deleted successfully",
            examples=[
                OpenApiExample(
                    "Successful Deletion",
                    value={
                        "status": "success",
                        "message": "Blog post deleted successfully",
                        "data": None,
                    },
                )
            ],
        ),
        404: OpenApiResponse(
            response=OpenApiTypes.OBJECT,
            description="Blog post not found",
            examples=[
                OpenApiExample(
                    "Not Found",
                    value={
                        "status": "error",
                        "message": "Blog post not found",
                        "data": None,
                    },
                )
            ],
        ),
    },
)
class BlogDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def delete(self, request, pk, *args, **kwargs):
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Blog post not found",
                "data": None
            }, status=status.HTTP_404_NOT_FOUND)

        blog.delete()
        return Response({
            "status": "success",
            "message": "Blog post deleted successfully",
            "data": None
        }, status=status.HTTP_200_OK)
    