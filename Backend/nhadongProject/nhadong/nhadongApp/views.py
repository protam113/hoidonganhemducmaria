from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from rest_framework import viewsets, generics, permissions, status
from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import action
import os
from dotenv import load_dotenv
load_dotenv()
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .models import *
from . import my_paginations, serializers, my_permissions, filters
from django.db.models import Q
from django.db import transaction
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from django.db import connection
import json
class Login(TokenObtainPairView):
    """
    login
    """
    serializer_class = CustomTokenObtainPairSerializer


class QueueViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = Queue.objects.all().order_by('-created_date')
    serializer_class = serializers.QueueSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = my_paginations.UserPagination


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = User.objects.filter(is_active=True).order_by('username')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = my_paginations.UserPagination
    parser_classes = [FormParser, MultiPartParser]
    filterset_class = filters.UserFilterBase
    filter_backends = [DjangoFilterBackend]

    # Thêm filter_backends và filterset_fields
    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve']:
            return [my_permissions.HasRole(role_name='admin')]
        if self.action in ['register', 'activate', 'forgot_password']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_object(self):
        return self.request.user

    """
    Tạo manager
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data,status.HTTP_200_OK)

    """
    Đăng ký
    """
    @action(methods=['post'], detail=False, url_path='register')
    def register(self, request):
        # Lấy dữ liệu từ request
        serializer = self.get_serializer(data=request.data)

        # Kiểm tra tính hợp lệ của dữ liệu
        if serializer.is_valid():
            # Gọi hàm register trong serializer để lấy query
            query,validated_data = serializer.register(serializer.validated_data)
            #lưu vào hàng đợi
            try:
                content_type = ContentType.objects.get_for_model(User)
                description = {
                    "action":"đăng ký",
                    "data": validated_data
                }
                json.dumps(description)
                Queue.objects.create(query=query,description=f"{description}",content_type=content_type,action='create')
            except Exception as e:
                return Response({"error":e},status.HTTP_500_INTERNAL_SERVER_ERROR)
            # with connection.cursor() as cursor:
            #     cursor.execute(query)
            return Response({'message': 'Đăng ký thành công vui lòng đợi duyệt'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """
    Xem tất cả user chỉ dành cho admin
    Nếu có role thì kiếm người dùng trong role
    Nếu không có gì nghĩa là lấy tất cả
    """
    def list(self, request, *args, **kwargs):
        role = request.query_params.get('role', None)
        # Khởi tạo biến action để ghi log
        if role:
            # Lấy danh sách người dùng với role cụ thể
            users = User.objects.filter(role=role).order_by('username')
        else:
            # lấy danh sách tất cả người dùng
            users = User.objects.filter(is_active=True).order_by('username')
        # Áp dụng bộ lọc
        filtered_users = filters.UserAdminFilter(request.GET, queryset=users).qs

        # Phân trang danh sách người dùng
        paginator = my_paginations.UserPagination()
        paginated_users = paginator.paginate_queryset(filtered_users, request)

        # Serialize danh sách người dùng
        serializer = self.get_serializer(paginated_users, many=True)

        return paginator.get_paginated_response(serializer.data)

    # """
    # Thay đổi profile
    # """
    # @action(detail=False, methods=['patch'], url_path='update-profile')
    # def update_profile(self, request, *args, **kwargs):
    #     user = self.get_object()
    #     data = request.data.copy()
    #     if 'profile_image' in data and data['profile_image']:
    #         data['profile_image'] = utils.upload_file_to_vstorage(request.FILES.get('profile_image'), 'UserAvatar')
    #     if 'profile_bg' in data and data['profile_bg']:
    #         data['profile_bg'] = utils.upload_file_to_vstorage(request.FILES.get('profile_bg'), 'UserBackground')
    #     serializer = serializers.UserUpdateSerializer(user, data=data, partial=True,
    #                                                   context={'request': request})
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    """
    Lấy thông tin chi tiết user
    """
    def retrieve(self, request, *args, **kwargs):
        user_id = kwargs.get('pk')  # Lấy ID từ URL
        try:
            user = User.objects.get(id=user_id, is_active=True)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class RoleViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Role.objects.all().order_by('id')
    serializer_class = serializers.RoleSerializer  # Bạn cần định nghĩa serializer này
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = my_paginations.RolePagination # Sử dụng phân trang có sẵn của bạn

    def get_queryset(self):
        queryset = self.queryset  # Get the base queryset

        # Check if the action is 'list'
        if self.action in ['list']:

            # Get the 'name' query parameter from the request
            name = self.request.query_params.get('name', None)

            # If 'name' is provided, filter the permissions by name
            if name:
                queryset = queryset.filter(name__icontains=name)

        return queryset

    def get_permissions(self):
        if self.action in ['list']:
            return [my_permissions.HasRole(role_name='admin')]
        if self.action in ['decentralize']:
            return [my_permissions.HasRole(role_name='admin')]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.action in ['list']:
            return serializers.RoleListSerializer
        return self.serializer_class

    """
    Lấy danh sách role
    """
    def list(self, request):
        # Use a dynamic cache key based on the 'name' parameter
        roles = self.get_queryset()  # This will apply the filtering if 'name' is provided

        # Phân trang danh sách sản phẩm
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(roles, request)

        # Serialize danh sách sản phẩm
        serializer = self.get_serializer(page, many=True)

        # Trả về danh sách banner đã phân trang
        return paginator.get_paginated_response(serializer.data)

    """
    Phân quyền user vào role trừ nhóm admin
    Dành cho admin mới có quyền thêm user vào các nhóm khác
    Xử lý: Lấy danh sách id người dùng sau đó update role của user hàng loạt.
    """
    @action(methods=['post'], detail=False, url_path='decentralize')
    def decentralize(self, request, pk=None):
        # Lấy thông tin vai trò từ yêu cầu
        role = request.data.get('role', None)

        # Nếu có vai trò, kiểm tra xem có phải là 'admin' không
        if role:
            try:
                role = Role.objects.get(pk=role)
                if role.name == 'admin':
                    return Response({"error": "Cannot decentralize on admin role."},
                                    status=status.HTTP_400_BAD_REQUEST)
            except Role.DoesNotExist:
                return Response({"error": f"Role '{role}' does not exist."},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            role = None  # Nếu không có vai trò thì đặt thành None

        # Lấy danh sách id người dùng từ yêu cầu
        user_ids = request.data.getlist('user', [])
        if not user_ids:
            return Response({"error": "No user IDs provided."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Cập nhật vai trò cho các người dùng, bỏ qua những người dùng có vai trò là 'admin'
        User.objects.filter(
            Q(pk__in=user_ids) & ~Q(role__name='admin')
        ).update(role=role)

        return Response({"message": f"Successfully updated role for users."},
                        status=status.HTTP_200_OK)