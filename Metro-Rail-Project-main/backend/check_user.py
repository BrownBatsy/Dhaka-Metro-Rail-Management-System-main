import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'metro_project.settings')
django.setup()

from metro.models import User

def check_user_admin_status():
    try:
        # Try to find the testuser
        user = User.objects.get(email="testuser@example.com")
        print(f"User found: {user.username} ({user.email})")
        print(f"Name: {user.name}")
        print(f"Admin status: {user.is_admin}")
        print(f"Staff status: {user.is_staff}")
        print(f"Superuser status: {user.is_superuser}")
        
        # If not admin, make them admin
        if not user.is_admin:
            user.is_admin = True
            user.is_staff = True
            user.is_superuser = True
            user.save()
            print("Updated user to have admin privileges")
            
        # Print auth token
        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user=user)
        print(f"Auth token: {token.key}")
        
    except User.DoesNotExist:
        print("User with email testuser@example.com not found")

if __name__ == "__main__":
    check_user_admin_status() 