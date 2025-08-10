from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from .models import UserRole

User = get_user_model()


class SignupViewTests(APITestCase):

    def setUp(self):
        self.lead_user = User.objects.create_user(
            username="leaduser",
            password="leadpass123",
            email="lead@example.com",
            role=UserRole.LEAD
        )
        self.token = Token.objects.create(user=self.lead_user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        self.url = reverse('signup')     

    def test_signup_success_by_lead(self):
        """A LEAD can successfully register a student."""
        data = {
            "user": {
                "username": "student1",
                "password": "pass1234",
                "email": "student1@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "role": UserRole.STUDENT
            },
            "roll_no": "FA23-BCS-123",  # ✅ valid format
            "club": "codehub"
        }
        response = self.client.post(
            self.url, data, format='json',
            HTTP_AUTHORIZATION=f"Token {self.token.key}"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["data"]["username"], "student1")

    def test_signup_fails_if_not_lead(self):
        """Non-LEAD users cannot register a student."""
        self.client.credentials()  # clear any previously set credentials
        student_user = User.objects.create_user(
            username="studentuser",
            password="pass123",
            email="student@example.com",
            role=UserRole.STUDENT
        )
        student_token = Token.objects.create(user=student_user)

        data = {
            "user": {
                "username": "student2",
                "password": "pass1234",
                "email": "student2@example.com",
                "first_name": "Jane",
                "last_name": "Doe",
                "role": UserRole.STUDENT
            },
            "roll_no": "FA23-BCS-124",
            "club": "codehub"
        }
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {student_token.key}")
        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_signup_requires_authentication(self):
        self.client.credentials()  # clear credentials
        data = {
            "user": {
                "username": "noauthstudent",
                "password": "pass1234",
                "email": "noauthstudent@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "role": UserRole.STUDENT
            },
            "roll_no": "FA23-BCS-777",
            "club": "codehub"
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_signup_success_creates_user_and_profile(self):
        data = {
            "user": {
                "username": "student_db",
                "password": "pass1234",
                "email": "student_db@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "role": UserRole.STUDENT
            },
            "roll_no": "FA23-BCS-999",
            "club": "codehub"
        }
        # auth header set via self.client.credentials in setUp
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Verify user exists
        user = User.objects.get(username="student_db")
        self.assertEqual(user.email, "student_db@example.com")
        self.assertTrue(user.check_password("pass1234"))
        self.assertEqual(user.role, UserRole.STUDENT)

        # If roll_no stored on a profile model, check that here:
        # from .models import StudentProfile
        # profile = StudentProfile.objects.get(user=user)
        # self.assertEqual(profile.roll_no, "FA23-BCS-999")
        # self.assertEqual(profile.club, "codehub")

    def test_non_lead_forbidden_status_and_message(self):
        student_user = User.objects.create_user(
            username="studentuser2", password="pass123", email="s2@example.com", role=UserRole.STUDENT
        )
        token = Token.objects.create(user=student_user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")

        data = {
            "user": {
                "username": "shouldfail",
                "password": "pass1234",
                "email": "shouldfail@example.com",
                "first_name": "Fail",
                "last_name": "User",
                "role": UserRole.STUDENT
            },
            "roll_no": "FA23-BCS-555",
            "club": "codehub"
        }

        response = self.client.post(self.url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # optional: assert message shape
        self.assertIn('detail', response.data)  # or whichever key your view returns

    def test_signup_duplicate_username_returns_400(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        User.objects.create_user(username="dup", password="x", email="dup@example.com", role=UserRole.STUDENT)
        data = {
            "user": {"username": "dup", "password": "pass", "email": "dup2@example.com", "role": UserRole.STUDENT},
            "roll_no": "FA23-BCS-100",
            "club": "codehub"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data['user'])
        


class LoginViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass123",
            email="test@example.com",
            role=UserRole.STUDENT
        )
        self.url = reverse('login')

    def test_login_success(self):
        """Correct credentials should return a token."""
        data = {"username": "testuser", "password": "testpass123"}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["status"], "success")
        self.assertIn("token", response.data["data"])

    def test_login_invalid_credentials(self):
        """Wrong password should return an error."""
        data = {"username": "testuser", "password": "wrongpass"}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # DRF's default error structure
<<<<<<< HEAD
        self.assertIn("non_field_errors", response.data["message"])

=======
        self.assertIn("non_field_errors", response.data)
>>>>>>> 865d002e84379f1dfbc3a3cf04d2fc903dfe55c8
    def test_login_success_returns_existing_token(self):
        data = {"username": "testuser", "password": "testpass123"}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token_key = response.data["data"]["token"]
        # Verify the token is in DB and belongs to the user
        self.assertTrue(Token.objects.filter(key=token_key, user=self.user).exists())

    def test_login_nonexistent_user_returns_400(self):
        data = {"username": "noone", "password": "whatever"}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


