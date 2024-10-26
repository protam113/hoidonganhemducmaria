from nhadongApp.models import User, Role, Vstorage, Category
from django.contrib.contenttypes.models import ContentType
from django.db.utils import IntegrityError
"""
hàm khởi tạo category
"""
def create_categories(categories):
    category_objects = []
    for category_data in categories:
        # Lấy ContentType từ model
        content_type = ContentType.objects.get_for_model(category_data['content_type'])

        # Tạo danh sách Category object
        category_objects.append(
            Category(
                name=category_data['name'],
                file=category_data['file'],
                content_type=content_type,
            )
        )

        try:
            Category.objects.bulk_create(category_objects, ignore_conflicts=True)
        except IntegrityError:
            pass


"""
hàm tạo quyền
"""
def create_permissions(permissions):

    for perm in permissions:
        try:
            permission, created = Permission.objects.get_or_create(
                name = perm['name'],
                description = perm['description']
            )
            if created:
                print(f"Successfully created permission: {permission.name}")
            else:
                print(f"Permission already exists: {permission.name}")

        except Exception as e:
            print(f"Error creating application: {e}")

"""
hàm khỏi tạo nhóm quyền
"""
def create_roles(roles):
    """
    Tạo các vai trò (Role) và các quyền (Permission) dựa trên danh sách đầu vào.

    :param roles: Danh sách các vai trò cần tạo.
    :type roles: list
    :return: Danh sách các vai trò đã được tạo hoặc cập nhật.
    """
    for rol in roles:
        try:
            # Tạo hoặc lấy vai trò (Role) dựa trên tên
            role, created = Role.objects.get_or_create(
                name=rol['name'],
                defaults={'description': rol['description']}
            )

            # Cập nhật mô tả nếu vai trò đã tồn tại
            if not created:
                role.description = rol['description']
                role.save()

            role.save()

        except Exception as e:
            print(f"Error creating role: {e}")

"""
Hàm phân quyền
"""
def add_users_for_role(user_roles):
    """
    Gán vai trò cho người dùng dựa trên danh sách đầu vào.

    :param user_roles: Danh sách chứa tên người dùng và vai trò tương ứng.
    :type user_roles: list
    """
    for user_role in user_roles:
        try:
            # Lấy user dựa trên username
            user = User.objects.get(username=user_role['username'])

            # Lấy role dựa trên tên vai trò
            role = Role.objects.get(name=user_role['role'])

            # Gán vai trò cho người dùng
            if user.role == role:
                print(f"User {user.username} already has role {role.name}.")
            else:
                # Cập nhật vai trò cho người dùng
                user.role = role
                user.save()
                print(f"Successfully assigned role {role.name} to user {user.username}.")

        except User.DoesNotExist:
            print(f"User {user_role['username']} does not exist.")
        except Role.DoesNotExist:
            print(f"Role {user_role['role']} does not exist.")
        except Exception as e:
            print(f"Error assigning role to user: {e}")

"""
Hàm tạo user thường
"""
def create_staff_users(login_list):
    """
    Tạo các user với is_staff=True và is_superuser=False.

    :param login_list: Danh sách các từ điển chứa thông tin đăng nhập của người dùng.
    :type login_list: list
    """
    for login_info in login_list:
        username = login_info.get('username')
        password = login_info.get('password')
        email = login_info.get('email')
        if not username or not password:
            print("Username and password are required.")
            continue

        try:
            # Kiểm tra xem user có tồn tại không
            user, created = User.objects.get_or_create(
                username=username,
                email=email,
                defaults={
                    'is_staff': True,
                    'is_superuser': False,
                    'is_active':True
                }
            )

            if created:
                user.set_password(password)
                user.save()
                print(f"Successfully created staff user: {username}")
            else:
                print(f"User '{username}' already exists.")

        except Exception as e:
            print(f"Error creating user '{username}': {e}")

"""
Hàm tạo tài khoản admin của hệ thống
"""
def create_super_users(login_list):
    """
    Tạo các user với is_staff=True và is_superuser=True.

    :param login_list: Danh sách các từ điển chứa thông tin đăng nhập của người dùng.
    :type login_list: list
    """
    for login_info in login_list:
        username = login_info.get('username')
        password = login_info.get('password')
        email = login_info.get('email')
        if not username or not password:
            print("Username and password are required.")
            continue

        try:
            # Kiểm tra xem user có tồn tại không
            user, created = User.objects.get_or_create(
                username=username,
                email = email,
                defaults={
                    'is_staff': True,
                    'is_superuser': True,
                    'is_active': True
                }
            )

            if created:
                user.set_password(password)
                user.save()
                print(f"Successfully created staff user: {username}")
            else:
                print(f"User '{username}' already exists.")

        except Exception as e:
            print(f"Error creating user '{username}': {e}")


"""
hàm khỏi tạo tài khoản Vstorage
"""
def create_vstorage(vstote):
    # Extract information from the VSTOTE dictionary
    try:
        username = vstote.get('username')
        password = vstote.get('password')
        project_id = vstote.get('project_id')
        # Create a new Vstorage object and save it to the database
        vstorage = Vstorage.objects.create(
            VstorageCreadentialUsername=username,
            VstorageCreadentialPassword=password,
            ProjectID=project_id,
        )
        print('Initialize Vstorage completed')
    except:
        pass


from datetime import timedelta
from django.utils import timezone
import requests


"""
hàm lấy token của vstorage
"""
def get_vstorage_token(vstorage):
    try:
        vstorage = Vstorage.objects.get(VstorageCreadentialUsername=vstorage['username'])
    except Vstorage.DoesNotExist:
        return {"error": "Vstorage not found"}

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
                        "name": vstorage.VstorageCreadentialUsername,
                        "password": vstorage.VstorageCreadentialPassword
                    }
                }
            },
            "scope": {
                "project": {
                    "domain": {"name": "default"},
                    "id": vstorage.ProjectID
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
        expires_at = timezone.now() + timedelta(hours=1)  # Sử dụng pytz để gán múi giờ UTC

        # Lấy url từ "catalog" -> "endpoints" -> [0] -> "url"
        catalog_url = response_data['token']['catalog'][0]['endpoints'][0]['url']

        # Cập nhật lại Vstorage
        vstorage.X_Subject_Token = x_subject_token
        vstorage.url = catalog_url
        vstorage.expired_at = expires_at
        vstorage.save()

        print("Vstorage updated successfully")
    else:
        print(f"Failed to retrieve token, status code: {response.status_code}")
        print(f"detail:{response.json()}")