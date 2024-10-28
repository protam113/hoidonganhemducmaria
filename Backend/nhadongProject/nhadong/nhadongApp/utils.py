from django.contrib.contenttypes.models import ContentType
from .models import User, Blog, News, Document, Queue
from django.db.models import Q
from . import serializers
import json

def process_queue(queues):
    users_to_create = []
    users_to_delete = []
    # Dùng để check username trùng
    existing_usernames = []
    # Dùng để check email trùng
    existing_emails = []
    # Duyệt qua từng đối tượng trong queues
    for queue in queues:
        # Nếu mà là User
        if queue.content_type == ContentType.objects.get_for_model(User):
            data = json.loads(
                queue.data.replace("'", '"').replace('False', 'false').replace('True', 'true').replace('None', 'null'))

            # Kiểm tra hành động trong queue là create
            if queue.action == Queue.ActionChoices.CREATE:
                #tạo đối tượng User
                user = User(
                    username=data['username'],
                    password=data['password'],  # Mã hóa mật khẩu
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    email=data['email'],
                    phone_number=data['phone_number'],
                    is_superuser=data['is_superuser'],
                    is_staff=data['is_staff'],
                    is_active=data['is_active'],
                    date_joined=data['date_joined'],
                    profile_image=data['profile_image']
                )
                #kiểm tra lỗi username bị trùng
                if data['username'] in existing_usernames:
                    queue.status = Queue.StatusChoices.ERROR
                    queue.description = 'Đăng ký thất bại do username đã tồn tại'
                    # kiểm tra lỗi username bị trùng
                elif data['email'] in existing_emails:
                    queue.status = Queue.StatusChoices.ERROR
                    queue.description = 'Đăng ký thất bại do email đã tồn tại'
                else:
                    # Tạo mảng users để tạo hàng loạt
                    users_to_create.append(user)
                    queue.status = Queue.StatusChoices.APPROVE
                    queue.description = 'Đăng ký thành công'
                    existing_usernames.append(data['username'])
                    existing_emails.append(data['email'])

            # Kiểm tra hành động trong queue là edit
            elif queue.action == Queue.ActionChoices.EDIT:
                # Lấy đối tượng người dùng dựa trên username
                user = User.objects.get(pk=data['id'])
                serializer = serializers.UserSerializer(user, data=data, partial=True)

                if serializer.is_valid():
                    serializer.save()  # Cập nhật thông tin người dùng
                    queue.status = Queue.StatusChoices.APPROVE
                    queue.description = 'Thay đổi profile thành công'
                else:
                    queue.status = Queue.StatusChoices.ERROR
                    queue.description = str(serializer.errors)

        queue.save()

    # Bắt đầu xử lý dữ liệu
    #Xử lý dữ liệu thêm user
    if users_to_create:
        User.objects.bulk_create(users_to_create)

