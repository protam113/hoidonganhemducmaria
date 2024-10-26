from rest_framework.pagination import PageNumberPagination
"""
Phân trang quyền
"""
class PermissionPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

"""
Phân trang role
"""
class RolePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

"""
Phân trang user
"""
class UserPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100