from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Student
from django.db import IntegrityError
from django.db.models import Q
from .permissions import IsLead


class SignupView(APIView):
    permission_classes = [IsLead]

    def post(self, request):
        data = request.data

        try:
            student = Student.objects.create(
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                roll_no=data.get("roll_no"),
                email=data.get("email"),
                password=data.get("password"),
                role=str.lower(data.get("role")),
                designation=str.lower(data.get("designation")),
                club=str.lower(data.get("club"))
            )

            return Response({
                "status": "success",
                "message": "Student registered successfully",
                "data": {
                    "student_id": student.id,
                    "name": student.name,
                    "roll_no": student.roll_no,
                    "email": student.email
                }
            },
            status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({
                "status": "error",
                "message": "Email or roll number already exists",
                "data": None
            }, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    def post(self, request):
        data = request.data
        identifier = data.get("email") or data.get("roll_no")
        password = data.get("password")

        try:
            student = Student.objects.get(
                Q(email=identifier) | Q(roll_no=identifier)
            )

            if student.password == password:
                return Response({
                    "status": "success",
                    "message": "Login successful",
                    "data": {
                        "student_id": student.id
                    }
                },status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": "error",
                    "message": "Invalid credentials",
                    "data": None
                }, status=status.HTTP_401_UNAUTHORIZED)

        except Student.DoesNotExist:
            return Response({
                "status": "error",
                "message": "Student not found",
                "data": None
            },
            status=status.HTTP_404_NOT_FOUND)