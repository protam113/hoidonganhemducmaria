from django_filters import rest_framework as filters
from .models import User
class UserFilterBase(filters.FilterSet):
    first_name = filters.CharFilter(field_name='first_name', lookup_expr='icontains')
    last_name = filters.CharFilter(field_name='last_name', lookup_expr='icontains')

    class Meta:
        model = User
        fields = ['first_name', 'last_name']

class UserAdminFilter(UserFilterBase):
    # Các bộ lọc bổ sung cho admin
    email = filters.CharFilter(field_name='email', lookup_expr='icontains')
    id = filters.NumberFilter(field_name='id')
    username = filters.CharFilter(field_name='username', lookup_expr='icontains')

    class Meta:
        model = User
        fields = UserFilterBase.Meta.fields+['email', 'id', 'username']

