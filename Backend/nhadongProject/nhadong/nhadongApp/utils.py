from django.contrib.auth.hashers import make_password
from django.contrib.contenttypes.models import ContentType
def generate_script(model, validated_data, action):
    raw = ''
    content_type = ContentType.objects.get_for_model(model)
    app_label = content_type.app_label
    table = content_type.model

    # Hash the password if it exists in validated_data
    if 'password' in validated_data:
        validated_data['password'] = make_password(validated_data['password'])

    # Prepare column names and values for the SQL statement
    columns = ', '.join(validated_data.keys())
    values = ', '.join([f"'{value}'" if isinstance(value, str) else str(value) for value in validated_data.values()])

    # Create the SQL script
    if action.upper() == 'INSERT':
        raw = f"INSERT INTO {app_label}_{table} ({columns}) VALUES ({values});"
    if action.upper() == 'UPDATE':
        raw = f"UPDATE FROM {app_label}_{table} ({columns}) VALUES ({values}) WHERE id={validated_data['id']};"

    return raw