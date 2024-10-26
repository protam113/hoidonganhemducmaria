from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
from rest_framework import serializers
from .models import Role, User, Queue
from . import utils
from django.utils import timezone
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email', 'phone_number', 'profile_image']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'email': {'required': False},
            'phone_number': {'required': False},
            'profile_image': {'required': False},
        }


    """
    kiểm tra lỗi email tồn tại
    """
    def validate(self, attrs):
        # Check if email already exists for an active user
        email = attrs.get('email')
        if email and User.objects.filter(email=email, is_active=True).exists():
            raise serializers.ValidationError({"email": ["Email already exists for an active user."]})
        return attrs

    """
    tạo manager
    """
    def create(self, validated_data):
        # Tạo người dùng
        validated_data.pop('profile_image', None)
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = True
        user.role = Role.objects.get(name='manager')
        user.save()
        return user

    """
    đăng ký
    """
    def register(self, validated_data):
        # Exclude 'profile_image' from validated_data
        validated_data.pop('profile_image', None)
        validated_data['is_superuser'] = False
        validated_data['is_staff'] = False
        validated_data['is_active'] = False
        validated_data['date_joined'] = timezone.now().strftime('%Y-%m-%d %H:%M:%S')
        validated_data['profile_image'] = "https://hcm03.vstorage.vngcloud.vn/v1/AUTH_ca738c2324784e49be7201dbb159abde/nhadongApp/avatar/DEFAULT_AVATAR.png"
        # Use generate_script to build the SQL query
        query = utils.generate_script(User, validated_data, 'INSERT')
        # Return the generated SQL query
        return query, validated_data

class QueueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Queue
        fields = "__all__"

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Thêm trường expires vào response, chuyển về timestamp
        data['expires'] = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']

        return data

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id','name','description','permissions']
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': True},
            'permissions': {'required': False},
        }

class RoleDetailSerializer(RoleSerializer):
    class Meta(RoleSerializer.Meta):
        fields = RoleSerializer.Meta.fields

class RoleListSerializer(RoleSerializer):
    class Meta(RoleSerializer.Meta):
        fields = ['id','name','description']