from apps.usuario.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required=True, validator=[validate_password])
    password2 = serializers.CharField(write_only = True, required=True)

    class Meta:
        model = User
        fields = ['username','password','password2','first_name', 'last_name']

        def validate(self, value):
            if value['password'] != value['password2']:
                raise serializers.ValidationError({"Contraseñas":"Las contraseñas no coinciden"})
            return value

        def create(self, validated_data):
            user = User(
                username = validated_data['username'],
                first_name = validated_data['first_name'],
                last_name = validated_data['last_name'],

            )
            user.set_password(validated_data['password'])
            user.save
            return user