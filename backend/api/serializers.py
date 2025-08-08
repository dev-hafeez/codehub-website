from rest_framework import serializers
from .models import User, Student

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'role']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    roll_no = serializers.RegexField(regex='^(?:FA|SP)[0-9]{2}-B(?:CS|AI|SE)-[0-9]{3}$', max_length=20, allow_blank=False)
    club = serializers.ChoiceField(choices=[
        'codehub',
        'graphics_and_media',
        'social_media_and_marketing',
        'registration_and_decor',
        'events_and_logistics'
        ],
        allow_blank=False
    )

    class Meta:
        model = Student
        fields = ['user', 'roll_no', 'club']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student