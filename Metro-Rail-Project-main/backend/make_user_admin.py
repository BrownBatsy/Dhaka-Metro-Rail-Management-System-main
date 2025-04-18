import os
import django
import sys

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'metro_project.settings')
django.setup()

from metro.models import User

def make_user_admin(email):
    try:
        user = User.objects.get(email=email)
        user.is_admin = True
        user.is_staff = True  # Required for Django admin access
        user.is_superuser = True  # Full admin privileges
        user.save()
        print(f"Success! Made {user.name} ({user.email}) an admin user.")
        return True
    except User.DoesNotExist:
        print(f"Error: No user found with email '{email}'")
        return False
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

def list_users():
    print("\nAvailable users:")
    print("-" * 50)
    print(f"{'Email':<30} {'Name':<20} {'Admin Status'}")
    print("-" * 50)
    
    for user in User.objects.all().order_by('email'):
        admin_status = "Admin" if user.is_admin else "Regular user"
        print(f"{user.email:<30} {user.name:<20} {admin_status}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python make_user_admin.py <email> or 'list' to see all users")
        list_users()
    elif sys.argv[1].lower() == 'list':
        list_users()
    else:
        email = sys.argv[1]
        make_user_admin(email) 