from django.core.management.base import BaseCommand
from . import utils
import os
from dotenv import load_dotenv
# Nạp biến môi trường từ file .env
load_dotenv()
from nhadongApp import models
# Khởi tạo các quyền
"""
Thể loại của model
"""
CATEGORIES = [
    {
        'name': 'Nhà dòng',
        'description': 'Tin tức về nhà dòng',
        'file': '',
        'content_type': models.News,
    },
    {
        'name': 'Giáo hội Việt Nam',
        'description': 'Tin tức về giao hội việt nam',
        'file': '',
        'content_type': models.News,
    }
]

"""
danh sách nhóm quyền
"""
ROLES = [
    {
        "name":"admin",
        "description":"Quyền mặc đinh của admin. Không thể sửa đổi, không thể xóa và thêm, xóa người dùng trong quyền.",
    },
    {
        "name":"manager",
        "description":"Quyền mặc đinh của manager. Không thể sửa đổi, không thể xóa quyền này.",
    },
    {
        "name":"user",
        "description":"Quyền mặc đinh của user. Không thể sửa đổi, không thể xóa quyền này.",
    },
]

# Khởi tạo các account của admin
LOGIN = [
    {
        'username': 'admin',
        'email':'admin@example.com',
        'password': '123'
    },
    {
        'username': 'test',
        'email':'admin@example.com',
        'password': '123'
    },
]
# Khởi tạo các account system admin
LOGIN_SYS_ADMIN = [
    {
        'username': 'sysadmin',
        'email':'Xlrdevteam03@gmail.com',
        'password': '123'
    },
]
# Khởi tạo thành viên vào nhóm
USERROLES = [
    {
        'username': 'admin',
        'role': 'admin'
    },
    {
        'username': 'sysadmin',
        'role': 'admin'
    },
    {
        'username': 'test',
        'role': 'admin'
    },
]
"""
cấu hình vstorage
"""
VSTOTE = {
    'username':os.getenv('VSTORAGE_USERNAME'),
    'password':os.getenv('VSTORAGE_PASSWORD'),
    'project_id':os.getenv('VSTORAGE_PROJECT'),
}
class Command(BaseCommand):
    help = 'Khởi tạo quyền và nhóm'

    def handle(self, *args, **kwargs):
        # Khởi tạo Django
        import django
        django.setup()

        # Tạo group từ danh sách ROLES
        utils.create_roles(ROLES)
        self.stdout.write(self.style.SUCCESS('Successfully initialized roles'))

        #tạo staff user
        utils.create_staff_users(LOGIN)
        self.stdout.write(self.style.SUCCESS('Successfully initialized staff users'))

        # tạo super user
        utils.create_super_users(LOGIN_SYS_ADMIN)
        self.stdout.write(self.style.SUCCESS('Successfully initialized super users'))

        # Thêm vai trò cho user
        utils.add_users_for_role(USERROLES)
        self.stdout.write(self.style.SUCCESS('Successfully initialized user role'))

        # lấy token vstorage
        utils.create_categories(CATEGORIES)
        self.stdout.write(self.style.SUCCESS('Successfully initialized category'))

        # khởi tạo website
        # utils.initialize_website()
        # self.stdout.write(self.style.SUCCESS('Successfully initialized website'))

        #khởi tạo tag
        # utils.create_initial_tags(TAGS)
        # self.stdout.write(self.style.SUCCESS('Successfully initialized tag'))

        #khỏi tạo vstorage
        utils.create_vstorage(VSTOTE)
        #lấy token vstorage
        utils.get_vstorage_token(VSTOTE)
        self.stdout.write(self.style.SUCCESS('Successfully initialized vstorage'))