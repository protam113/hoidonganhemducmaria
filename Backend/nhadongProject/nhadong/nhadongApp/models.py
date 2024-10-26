from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from datetime import timedelta
from django.utils import timezone
import requests
# Create your models here.
"""
Lớp Abstract để hiện ngày tháng
"""
class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

"""
Lớp Abstract của blog,news,document
Kế thừa lại lớp BaseModel
"""
class BasePost(BaseModel):
    title = models.TextField(null=False)
    description = models.TextField(null=False)
    content = models.TextField(null=False)
    link = models.URLField(null=True,blank=True)
    image = models.URLField(null=True,blank=True)
    class Meta:
        abstract = True

"""
Thể loại
"""
class Category(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    file = models.URLField(null=True,blank=True)
    # dùng ContentTye của django
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'content_type')

    def __str__(self):
        return f"{self.content_type}: {self.name}"

"""
Tin tức
"""
class News(BasePost):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    # Quan hệ nhiều-nhiều với Category thông qua Generic Relation
    categories = models.ManyToManyField(Category, related_name="news")

    def __str__(self):
        return self.title

"""
Bài viết
"""
class Blog(BasePost):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    # Quan hệ nhiều-nhiều với Category thông qua Generic Relation
    categories = models.ManyToManyField(Category, related_name="blogs")

    def __str__(self):
        return self.title

"""
Tài liệu
"""
class Document(BasePost):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    # Quan hệ 1-nhiều với Category
    category = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, blank=True, related_name="documents")

    def __str__(self):
        return self.title

"""
Người dùng
"""
class User(AbstractUser):
    phone_number = models.CharField(max_length=11, null=True, blank=True,unique=False)
    email = models.EmailField(max_length=40, null=True, blank=True, unique=False)
    profile_image = models.URLField(
        max_length=600,
        default="https://hcm03.vstorage.vngcloud.vn/v1/AUTH_ca738c2324784e49be7201dbb159abde/nhadongApp/avatar/DEFAULT_AVATAR.png"
    )
    role = models.ForeignKey('Role', on_delete=models.SET_NULL, null=True, related_name='users')
    def __str__(self):
        return self.username

"""
Nhóm vai trò
"""
class Role(models.Model):
    name = models.CharField(max_length=60, unique=True, blank=False, null=False)
    description = models.CharField(max_length=1000, blank=False, null=False)

    def __str__(self):
        return self.name


"""
Hàng đợi duyệt
"""
class Queue(BaseModel):
    # Trường lưu trữ truy vấn
    query = models.TextField(blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)

    # Trường action với các giá trị: thêm, sửa, xóa
    ACTION_CHOICES = [
        ('create', 'Thêm'),
        ('edit', 'Sửa'),
        ('delete', 'Xóa'),
    ]
    action = models.CharField(max_length=10, choices=ACTION_CHOICES, blank=False)

    # Trường status với các giá trị: approve, reject, pending
    STATUS_CHOICES = [
        ('approve', 'Được duyệt'),
        ('reject', 'Bị từ chối'),
        ('pending', 'Đang chờ'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.query} - {self.get_action_display()} - {self.get_status_display()}"

"""
Thông tin của cloud vStorage
"""
class Vstorage(models.Model):
    VstorageCreadentialUsername = models.CharField(max_length=255, unique=True)
    VstorageCreadentialPassword = models.CharField(max_length=255)
    ProjectID = models.CharField(max_length=255, unique=True)
    X_Subject_Token = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(max_length=500, blank=True, null=True)
    expired_at = models.DateTimeField(null=True, blank=True)  # Thêm trường expired_at

    def __str__(self):
        return self.VstorageCreadentialUsername

    def is_expired(self):
        """Kiểm tra xem token có hết hạn hay chưa."""
        return self.expired_at and timezone.now() >= self.expired_at

    def get_vstorage_token(self):
        """Lấy token từ Vstorage và cập nhật nếu cần thiết."""
        if self.is_expired():
            # URL cho API
            url = "https://hcm03.auth.vstorage.vngcloud.vn/v3/auth/tokens"

            # Header cho request
            headers = {
                'Content-Type': 'application/json'
            }

            # Body của request
            body = {
                "auth": {
                    "identity": {
                        "methods": ["password"],
                        "password": {
                            "user": {
                                "domain": {"name": "default"},
                                "name": self.VstorageCreadentialUsername,
                                "password": self.VstorageCreadentialPassword
                            }
                        }
                    },
                    "scope": {
                        "project": {
                            "domain": {"name": "default"},
                            "id": self.ProjectID
                        }
                    }
                }
            }

            # Thực hiện POST request
            response = requests.post(url, json=body, headers=headers)

            if response.status_code == 201:
                x_subject_token = response.headers.get('X-Subject-Token')
                response_data = response.json()

                # Lấy expires_at = time.now() + 1 tiếng
                expires_at = timezone.now() + timedelta(hours=1)

                # Lấy url từ "catalog" -> "endpoints" -> [0] -> "url"
                catalog_url = response_data['token']['catalog'][0]['endpoints'][0]['url']

                # Cập nhật lại Vstorage
                self.X_Subject_Token = x_subject_token
                self.url = catalog_url
                self.expired_at = expires_at
                self.save()
            else:
                # Raise exception nếu response không thành công
                response.raise_for_status()
