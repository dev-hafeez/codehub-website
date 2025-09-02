from django.urls import path
from .views import SignupView, OTPView, LoginView, PasswordChangeView, LogoutView, BlogUploadView, InlineImageUploadView, BlogListAPIView, BlogEditView, BlogDeleteView

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('auth/otp/', OTPView.as_view(), name='otp'),
    path('auth/password/reset', PasswordChangeView.as_view(), name='reset-password'),path('auth/password/reset', PasswordChangeView.as_view(), name='reset-password'),
    path('blogs/', BlogListAPIView.as_view(), name='blog-list'),
    path("blogs/upload/", BlogUploadView.as_view(), name="blog-upload"),
    path("blogs/<int:pk>/edit/", BlogEditView.as_view(), name="blog-edit"),
    path("blogs/<int:pk>/delete/", BlogDeleteView.as_view(), name="blog-delete"),
    path('blogs/upload-inline-image/', InlineImageUploadView.as_view(), name='inline-image-upload'),
]
