from django.urls import path
from .views import SignupView, OTPView, LoginView, PasswordChangeView, LogoutView
from .views import SignupView, OTPView, LoginView, PasswordChangeView, LogoutView, BlogUploadView

urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('auth/otp/', OTPView.as_view(), name='otp'),
    path('auth/password/reset', PasswordChangeView.as_view(), name='reset-password'),
    path("blog/upload/", BlogUploadView.as_view(), name="blog-upload"),
]
