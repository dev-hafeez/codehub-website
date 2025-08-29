from django.urls import path
from .views import SignupView, OTPView, LoginView, PasswordChangeView, LogoutView, BlogUploadView, BlogListAPIView, \
    BlogEditView, BlogDeleteView, EventListCreateView, EventDetailView, AttendanceListCreateView, AttendanceDetailView

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
    path("events/", EventListCreateView.as_view(), name="event-list-create"),
    path("events/<int:pk>/", EventDetailView.as_view(), name="event-detail"),
    path("events/<int:event_id>/attendance/", AttendanceListCreateView.as_view(), name="attendance-list-create"),
    path("events/<int:event_id>/attendance/<int:pk>/", AttendanceDetailView.as_view(), name="attendance-detail"),
]
