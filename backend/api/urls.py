from django.urls import path
from .views import SignupView, OTPView, LoginView, PasswordChangeView, LogoutView, BlogUploadView, BlogListAPIView, \
    BlogEditView, BlogDeleteView, MeetingRUDView, MeetingCreateView, MeetingListView, MeetingAttendanceListView, \
    MeetingAttendanceRUDView, StudentsListView, StudentRUView, api_home

urlpatterns = [
    path('', api_home, name='home'),
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('auth/otp/', OTPView.as_view(), name='otp'),
    path('auth/password/reset', PasswordChangeView.as_view(), name='reset-password'),path('auth/password/reset', PasswordChangeView.as_view(), name='reset-password'),
    path('blogs/', BlogListAPIView.as_view(), name='blog-list'),
    path('blogs/upload/', BlogUploadView.as_view(), name='blog-upload'),
    path('blogs/<int:pk>/edit/', BlogEditView.as_view(), name='blog-edit'),
    path('blogs/<int:pk>/delete/', BlogDeleteView.as_view(), name='blog-delete'),
    path('meetings/', MeetingListView.as_view(), name='meeting-list'),
    path('meetings/create/', MeetingCreateView.as_view(), name='meeting-create'),
    path('meetings/<int:pk>/', MeetingRUDView.as_view(), name='meeting-RUD'),  # Accepted requests (for instance): GET , PUT, PATCH, DELETE
    path('meetings/<int:pk>/attendance/', MeetingAttendanceListView.as_view(), name='attendance-list'),
    path('meetings/<int:pk>/attendance/<int:att_pk>', MeetingAttendanceRUDView.as_view(), name='attendance-RUD'),  # Accepted requests (for instance): GET , PUT, PATCH, DELETE
    path('students/', StudentsListView.as_view(), name='students-list'),
    path('students/<int:pk>', StudentRUView.as_view(), name='student-RU'),
]
