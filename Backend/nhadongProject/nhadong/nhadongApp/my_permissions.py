from django.db.models import Q
from rest_framework.permissions import BasePermission
from .models import User
class HasRole(BasePermission):
    """
    Checks if the user has the specified permission or is an admin/superuser.
    """

    def __init__(self, role_name=None):
        self.role_name = role_name

    def has_permission(self, request, view):
        # Kiểm tra xem người dùng đã đăng nhập chưa
        if not request.user.is_authenticated:
            return False

        # Kiểm tra nếu người dùng là superuser
        if request.user.is_superuser:
            return True

        if self.role_name:
            # Sử dụng Q để kết hợp các điều kiện
            return User.objects.filter(
                #Kiểm tra xem có phải admin không
                Q(pk=request.user.pk, role__name="admin") |
                #Kiểm tra xem có role không
                Q(pk=request.user.pk, role__name=self.role_name)
            ).exists()

        return False