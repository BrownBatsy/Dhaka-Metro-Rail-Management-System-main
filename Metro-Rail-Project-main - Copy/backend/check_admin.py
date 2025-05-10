from django.contrib.auth import get_user_model
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'metro_project.settings')
django.setup()

User = get_user_model()

def check_admin():
    try:
        user = User.objects.get(email='motakim.triplem@gmail.com')
        print(f"User found:")
        print(f"Email: {user.email}")
        print(f"Is admin: {user.is_admin}")
        print(f"Is staff: {user.is_staff}")
        print(f"Is superuser: {user.is_superuser}")
    except User.DoesNotExist:
        print("User not found")

if __name__ == "__main__":
    check_admin()