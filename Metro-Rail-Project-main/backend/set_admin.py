from django.contrib.auth import get_user_model
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'metro_project.settings')
django.setup()

User = get_user_model()

def set_admin():
    try:
        user = User.objects.get(email='motakim.triplem@gmail.com')
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print("Admin privileges granted successfully")
    except User.DoesNotExist:
        print("User not found")

if __name__ == "__main__":
    set_admin()