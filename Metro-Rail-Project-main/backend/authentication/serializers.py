from django.contrib.auth import authenticate
from rest_framework import serializers
from metro.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'name', 'is_admin')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        user.name = validated_data.get('name', '')
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        print(f"Login attempt with email: {data['email']}")
        
        # First try to find user by email
        try:
            user_obj = User.objects.get(email=data['email'])
            username = user_obj.username
        except User.DoesNotExist:
            # If not found by email, use the email as username
            username = data['email']
            print(f"User not found by email, trying username: {username}")
        
        # Try to authenticate
        user = authenticate(username=username, password=data['password'])
        
        if user and user.is_active:
            print(f"Authentication successful for user: {username}")
            return user
            
        print(f"Authentication failed for email: {data['email']}")
        raise serializers.ValidationError("Incorrect Credentials") 