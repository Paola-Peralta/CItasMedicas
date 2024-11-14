from apps.usuario.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"Contraseñas":"Las contraseñas no coinciden"})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
# from apps.usuario.models import User
# from rest_framework import serializers
# from django.contrib.auth.password_validation import validate_password

# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only = True, required=True, validators=[validate_password])
#     password2 = serializers.CharField(write_only = True, required=True)

#     class Meta:
#         model = User
#         fields = ['username','password','password2','first_name', 'last_name']

#         #Validar que ambas contraseña coincidan
#     def validate(self, attrs):
#         if attrs['password'] != attrs['password2']:
#             raise serializers.ValidationError({"Contraseñas":"Las contraseñas no coinciden"})
#         return attrs
        
#         #Crear usuario
#     def create(self, validated_data):
#         user = User(
#             username = validated_data['username'],
#             first_name = validated_data['first_name'],
#             last_name = validated_data['last_name'],

#         )
#         user.set_password(validated_data['password'])
#         user.save
#         return user