import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'metro_project.settings')
django.setup()

from metro.models import User

def make_user_admin():
    try:
        # Option 1: Try to make testuser an admin
        user = User.objects.get(email="testuser@example.com")
        user.is_admin = True
        user.is_staff = True  # Required for Django admin access
        user.is_superuser = True  # Full admin privileges
        user.save()
        print(f"Made {user.name} ({user.email}) an admin with Django admin access")
    except User.DoesNotExist:
        try:
            # Option 2: Try sadmansion user
            user = User.objects.get(username="sadmansion")
            user.is_admin = True
            user.is_staff = True  # Required for Django admin access
            user.is_superuser = True  # Full admin privileges
            user.save()
            print(f"Made {user.name} ({user.email}) an admin with Django admin access")
        except User.DoesNotExist:
            print("No suitable users found to make admin.")
            print("Creating a new admin user...")
            # Create a new admin user
            admin_user = User.objects.create_user(
                username="admin",
                email="admin@example.com",
                password="admin123"
            )
            admin_user.name = "Administrator"
            admin_user.is_admin = True
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            print(f"Created new admin user: admin@example.com (password: admin123)")

if __name__ == "__main__":
    make_user_admin() 