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
from . import my_paginations, serializers, my_permissions, filters,utils
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

    """
    Duyệt danh sách
    """
    @action(methods=['post'],detail=False,url_path='browse')
    def browse(self, request):
        # Khóa phiên
        with transaction.atomic():
            # Lấy trạng thái chuyển đổi và danh sách id từ request
            status_to_change = request.data.get('status')
            queue_ids = request.data.getlist('id')

            # Kiểm tra xem có phải đổi sang 'pending' không
            if status_to_change == Queue.StatusChoices.PENDING:
                return Response({"detail": "You can't change status to pending."}, status=status.HTTP_400_BAD_REQUEST)

            # Kiểm tra nếu status_to_change không nằm trong các lựa chọn hợp lệ của StatusChoices
            if status_to_change not in ['reject','approve']:
                return Response({"detail": "Invalid status value."}, status=status.HTTP_400_BAD_REQUEST)

            # Lấy danh sách queue có trạng thái là 'pending'
            queues_to_update = Queue.objects.select_related('content_type').filter(id__in=queue_ids, status='pending').order_by('content_type', 'action', '-created_date')

            if not queues_to_update.exists():
                return Response({"detail": "No pending queues found for the provided IDs."},
                                status=status.HTTP_404_NOT_FOUND)
            # Thực hiện thay đổi
            result = utils.process_queue(queues_to_update)

            return Response({"detail": "Queue statuses updated successfully.","result":result}, status=status.HTTP_200_OK)




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
        if self.action in ['create', 'list', 'retrieve', 'block']:
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
            validated_data = serializer.register(serializer.validated_data)
            #lưu vào hàng đợi
            try:
                content_type = ContentType.objects.get_for_model(User)
                description = 'đăng ký'
                json.dumps(validated_data)
                Queue.objects.create(data=validated_data,description=description,content_type=content_type,action='create')
            except Exception as e:
                return Response({"error":e},status.HTTP_500_INTERNAL_SERVER_ERROR)
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

    """
    Khóa tài khoản
    """
    @action(methods=['post','delete'], detail=False, url_path='block')
    def block(self, request):
        # Lấy danh sách user ID từ yêu cầu
        user_ids = request.data.getlist('id', None)
        status_block = request.data.get('status','block')
        if user_ids:
            # Lọc ra những user có role không phải là admin
            users_to_block = User.objects.exclude(role__name='admin').filter(id__in=user_ids)

            # Cập nhật trạng thái is_active của những user không phải là admin
            if users_to_block.exists():
                if status_block == 'block':  # Nếu status = true, khóa tài khoản
                    users_to_block.update(is_active=False)
                    return Response({'message': 'Accounts have been successfully blocked.'}, status=status.HTTP_200_OK)
                elif status_block == 'unblock':  # Nếu status = false, mở khóa tài khoản
                    users_to_block.update(is_active=True)
                    return Response({'message': 'Accounts have been successfully unblocked.'},status=status.HTTP_200_OK)
            else:
                return Response({'error': 'No accounts found to block.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'error': 'No user IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)

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



class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView, generics.DestroyAPIView, generics.UpdateAPIView, generics.CreateAPIView):
    queryset = Category.objects.all().order_by('-created_date')
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = my_paginations.CategoryPagination

    def get_permissions(self):
        if self.action in ['list']:
            return [permissions.AllowAny()]
        if self.action in ['create','update','destroy']:
            return [my_permissions.HasRole(role_name='manager')]
        return [permissions.IsAuthenticated()]

    def get_serializer_class(self):
        if self.action in ['list']:
            return serializers.CategoryListSerializer
        return self.serializer_class

    """
    Tạo category
    Xử lý: kiểm tra xem có quyền không mới cho tạo
    """
    def create(self, request, *args, **kwargs):
        if request.user.role.name== 'admin':
            response = super().create(request, *args, **kwargs)
            return response
        else:
            # Lấy dữ liệu từ request
            serializer = self.get_serializer(data=request.data)

            # Kiểm tra tính hợp lệ của dữ liệu
            if serializer.is_valid():
                validated_data = serializer.data
                # lưu vào hàng đợi
                try:
                    content_type = ContentType.objects.get_for_model(User)
                    description = f'{request.user.username} tạo category'
                    json.dumps(validated_data)
                    Queue.objects.create(data=validated_data, description=description, content_type=content_type, action='create')
                except Exception as e:
                    return Response({"error": e}, status.HTTP_500_INTERNAL_SERVER_ERROR)
                return Response({'message': 'Đăng ký thành công vui lòng đợi duyệt'}, status=status.HTTP_200_OK)
        # Xóa cache khi thêm mới danh mục

    """
    Sửa category
    Xử lý: kiểm tra xem có quyền không mới cho sửa
    """
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

    """
    Xóa category
    Xử lý: kiểm tra xem có quyền không mới cho xóa
    """
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return response

    # """
    # Lấy danh sách sản phẩm theo category
    # """
    # @action(methods=['get'], detail=True, url_path='products')
    # def product(self, request, pk=None):
    #
    #     # Lấy danh mục dựa vào pk
    #     category = get_object_or_404(Category, pk=pk)
    #
    #     # Truy vấn để lấy danh sách sản phẩm thuộc category đó
    #     products = Product.objects.prefetch_related(
    #         'medias',
    #         Prefetch('productcategory_set', queryset=ProductCategory.objects.select_related('category'))
    #     ).filter(productcategory__category=category).order_by('-created_date')
    #
    #     # Phân trang danh sách sản phẩm
    #     paginator = my_paginations.ProductPagination()
    #     page = paginator.paginate_queryset(products, request)
    #
    #     # Serialize danh sách sản phẩm
    #     serializer = serializers.ProductListSerializer(page, many=True, context={'request': request})
    #
    #     return paginator.get_paginated_response(serializer.data)


# class BlogViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
#     queryset = Blog.objects.all().order_by('-created_date')
#     serializer_class = serializers.BlogSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     pagination_class = my_paginations.BlogPagination
#
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             return [permissions.AllowAny()]
#         # if self.action in ['comment'] and self.request.method == 'GET':
#         #     return [permissions.AllowAny()]
#         return [permissions.IsAuthenticated()]
#
#     def get_serializer_class(self):
#         if self.action in ['list']:
#             return serializers.BlogDetailSerializer
#         return self.serializer_class
#
#     """
#     Lấy chi tiết blog
#     """
#     def retrieve(self, request, pk=None):
#         user = request.user
#         blog = get_object_or_404(Blog,pk=pk)
#         if blog:
#             # Check for private blog visibility
#             if blog.visibility == 'private' and blog.user != user:
#                 return Response({'detail': 'You do not have permission to view this blog.'},
#                                 status=status.HTTP_403_FORBIDDEN)
#             serializer = serializers.BlogDetailSerializer(blog, context={'request': request})
#             return Response(serializer.data)
#         return Response({'detail': 'Blog not found'}, status=status.HTTP_404_NOT_FOUND)
#
#     """
#     Tạo blog
#     """
#     with transaction.atomic():
#         def create(self, request, *args, **kwargs):
#             user = request.user
#             content = request.data.get('content')
#             description = request.data.get('description')
#             visibility = request.data.get('visibility')
#             medias = request.FILES.getlist('media')
#             file_type = request.data.get('file_type', None)
#             # Kiểm tra loại file hợp lệ
#             if file_type not in ['pdf', 'image', None]:
#                 return Response({'detail': 'file_type must be pdf, image, or nothing'},
#                                 status=status.HTTP_400_BAD_REQUEST)
#
#             # Kiểm tra số lượng tệp tin dựa trên loại tệp
#             max_files = 1 if file_type == 'pdf' else 4
#             if file_type and len(medias) > max_files:
#                 return Response({'detail': f'You can upload up to {max_files} {file_type} files.'},
#                                 status=status.HTTP_400_BAD_REQUEST)
#
#             # Kiểm tra các tệp tin dựa trên loại tệp
#             for file in medias:
#                 if not utils.is_valid_file_type(file, file_type):
#                     return Response({'detail': f'Invalid file type for {file_type}.'},
#                                     status=status.HTTP_400_BAD_REQUEST)
#
#             # Tạo blog và upload các tệp
#             blog = Blog.objects.create(
#                 user=user,
#                 content=content,
#                 description=description,
#                 visibility=visibility
#             )
#
#             # Upload files và tạo BlogMedia objects
#             blog_media_list = []
#             for file in medias:
#                 file_url = utils.upload_file_to_vstorage(file, 'Blog')
#                 blog_media_list.append(BlogMedia(blog=blog, file=file_url))
#
#             #tạo hàng loạt blogmedia
#             BlogMedia.objects.bulk_create(blog_media_list)
#
#             # Serialize the response data
#             serializer = serializers.BlogSerializer(blog, context={'request': request})
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#
#     """
#     Chỉnh sửa blog
#     id_media_remove: dùng để xóa media của blog.
#     media: là danh sách media cần thêm vào.
#     """
#     def partial_update(self, request, pk=None):
#         # Lấy blog và các media liên quan trong một truy vấn
#         blog = get_object_or_404(Blog.objects.select_related('user'), pk=pk)
#         if request.user != blog.user:
#             return Response({"detail": "You do not have permission to update this blog."},
#                             status=status.HTTP_403_FORBIDDEN)
#
#         with transaction.atomic():
#             # Xử lý cập nhật blog
#             serializer = self.get_serializer(blog, data=request.data, partial=True)
#             if serializer.is_valid():
#                 updated_blog = serializer.save()
#
#                 # Xử lý xóa media
#                 id_media_remove = request.data.getlist('id_media_remove')
#                 if id_media_remove:
#                     BlogMedia.objects.filter(id__in=id_media_remove, blog=updated_blog).delete()
#
#                 #Kiểm tra file_type
#                 file_type = request.data.get('file_type', None)
#                 if file_type not in ['pdf', 'image', None]:
#                     return Response({'detail': 'file_type must be pdf, image, or nothing'},
#                                     status=status.HTTP_400_BAD_REQUEST)
#
#                 # Xử lý thêm media mới
#                 new_media = request.FILES.getlist('media')
#
#                 # Kiểm tra các tệp tin dựa trên loại tệp
#                 for file in new_media:
#                     if not utils.is_valid_file_type(file, file_type):
#                         return Response({'detail': f'Invalid file type for {file_type}.'},
#                                         status=status.HTTP_400_BAD_REQUEST)
#
#                 #Xử lý thêm media mới
#                 if new_media:
#                     # Kiểm tra số lượng tệp tin dựa trên loại tệp
#                     max_files = 1 if file_type == 'pdf' else 4
#                     # Đếm số lượng media hiện tại của blog
#                     media_counts = BlogMedia.objects.filter(blog=blog).aggregate(
#                         total_count=Count('id'),
#                         pdf_count=Count('id', filter=Q(file__endswith='.pdf')),
#                         image_count=Count('id', filter=~Q(file__endswith='.pdf'))
#                     )
#                     total_count = media_counts['total_count']
#                     pdf_count = media_counts['pdf_count']
#                     image_count = media_counts['image_count']
#                     #kiểm tra số lượng file theo định dạng
#                     #nếu là pdf thì số lượng là 1
#                     if file_type == 'pdf':
#                         # kiểm tra xem có file image nào không ?
#                         if image_count > 0:
#                             return Response({'detail': 'Please delete all image files before uploading PDF.'},
#                                             status=status.HTTP_400_BAD_REQUEST)
#                         #kiểm tra xem số lượng thêm vào có > 1 không?
#                         if len(new_media) + total_count > max_files:
#                             return Response({'detail': f'You can upload up to {max_files} {file_type} files.'},
#                                         status=status.HTTP_400_BAD_REQUEST)
#                     # Nếu là image
#                     elif file_type == 'image':
#                         # kiểm tra xem có file pdf nào không ?
#                         if pdf_count > 0:
#                             return Response({'detail': 'Please delete all PDF files before uploading images.'},
#                                         status=status.HTTP_400_BAD_REQUEST)
#                         #kiểm tra xem số lượng thêm vào có > 4 không?
#                         elif len(new_media) + total_count > max_files:
#                             return Response({'detail': f'You can upload up to {max_files} {file_type} files.'},
#                                         status=status.HTTP_400_BAD_REQUEST)
#
#                     # Upload và thêm các media mới vào blog
#                     blog_media_list = []
#                     for file in new_media:
#                         file_url = utils.upload_file_to_vstorage(file, 'Blog')
#                         blog_media_list.append(BlogMedia(blog=blog, file=file_url))
#
#                     # Sử dụng bulk_create để thêm media mới
#                     BlogMedia.objects.bulk_create(blog_media_list)
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     """
#     Xóa blog
#     Xử lý: nếu là người tạo blog hoặc là người có quyền xóa
#     """
#     def destroy(self, request, pk=None):
#         blog = get_object_or_404(Blog.objects.select_related('user'), pk=pk)
#         if blog.user == request.user or utils.check_user_permission(request.user, 'Xóa blog'):
#             try:
#                 blog.delete()
#                 return Response(status=status.HTTP_204_NO_CONTENT)
#             except Exception as e:
#                 return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({"detail": "You do not have permission to perform this action."},
#                             status=status.HTTP_403_FORBIDDEN)
#
#     """
#     Like bài blog
#     hủy bài blog
#     lấy danh sách người like
#     """
#     @action(detail=True, methods=['post', 'delete'], url_path='like')
#     def like(self, request, pk=None):
#         blog = get_object_or_404(Blog.objects.select_related('user'), pk=pk)
#         user = request.user
#
#         # POST: Like blog
#         if request.method == 'POST':
#             if blog.visibility == 'private' and blog.user != user:
#                 return Response({'detail': 'You can only like your own private posts.'},
#                                 status=status.HTTP_403_FORBIDDEN)
#             like, created = Like.objects.get_or_create(blog=blog, user=user)
#             if not created:
#                 return Response({"detail": "You have already liked this blog."}, status=status.HTTP_400_BAD_REQUEST)
#             return Response({"detail": "Blog liked successfully."}, status=status.HTTP_200_OK)
#
#         #DELETE: unilike blog
#         elif request.method == 'DELETE':
#             if blog.visibility == 'private' and blog.user != user:
#                 return Response({'detail': 'You can only dislike your own private posts.'},
#                                 status=status.HTTP_403_FORBIDDEN)
#             like = get_object_or_404(Like, blog=blog, user=user)
#             like.delete()
#             return Response({"detail": "Blog unliked successfully."}, status=status.HTTP_200_OK)
#
#         if blog.visibility == 'private' and blog.user != user:
#             return Response({'detail': 'You are not authorized to view likes for this post.'},
#                             status=status.HTTP_403_FORBIDDEN)
#
#         # elif request.method == 'GET':
#         #     likes = Like.objects.filter(blog=blog).order_by('-created_date')
#         #     paginator = my_paginations.LikePagination()
#         #     result_page = paginator.paginate_queryset(likes, request)
#         #     serializer = serializers.UserListSerializer([like.user for like in result_page], many=True,
#         #                                                 context={'request': request})
#         #
#         #     return paginator.get_paginated_response(serializer.data)
#
#     """
#     Đăng bình luận
#     Lấy danh sách bình luận
#     """
#     @action(detail=True, methods=['post', 'get'], url_path='comment')
#     def comment(self, request, pk=None):
#         blog = get_object_or_404(Blog.objects.select_related('user'), pk=pk)
#         user = request.user
#
#         # Kiểm tra quyền truy cập dựa vào visibility
#         if blog.visibility == 'private' and blog.user != user:
#             return Response({'detail': 'You do not have permission to view or add comments to this blog.'},
#                             status=status.HTTP_403_FORBIDDEN)
#
#         #POST: Đăng bình luận vào post/ phản hồi bình luận
#         if request.method == 'POST':
#             data = request.data.copy()
#             data['blog'] = blog.id
#             data['user'] = user.id
#
#             # Xử lý comment phản hồi nếu có
#             #lấy id của bình luận cần phản hồi
#             parent_id = data.get('parent')
#             if parent_id:
#                 parent_comment = get_object_or_404(Comment, id=parent_id)
#                 data['parent'] = parent_comment.id
#
#             # Upload file nếu có
#             if 'file' in data and data['file']:
#                 data['file'] = utils.upload_file_to_vstorage(data['file'], 'Comment')
#
#             # Tạo và validate serializer
#             serializer = serializers.CommentSerializer(data=data)
#
#             if serializer.is_valid():
#                 try:
#                     instance = serializer.save()
#                     return Response(serializers.CommentListSerializer(instance).data, status=status.HTTP_201_CREATED)
#                 except Exception as e:
#                     # Log lỗi cụ thể khi gặp lỗi tại bước save
#                     return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#         #GET: Lấy danh sách comment không phải bình luận phản hồi
#         elif request.method == 'GET':
#             #truy vấn lấy danh sách comment
#             comments = blog.comment_set.filter(parent=None).order_by('-created_date')
#
#             #lấy paginator
#             paginator = my_paginations.CommentPagination()
#
#             #phân trang lại cho danh sách comments
#             result_page = paginator.paginate_queryset(comments, request)
#
#             #Serialize dữ liệu trả về
#             serializer = serializers.CommentListSerializer(result_page, many=True, context={'request': request})
#
#             #Trả về kết quả đã được phân trang
#             return paginator.get_paginated_response(serializer.data)