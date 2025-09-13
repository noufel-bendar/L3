#!/usr/bin/env python
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_admin():
    username = 'admin1'
    email = 'bendarnoufel@gmail.com'
    password = 'admin1234'
    
    print(f"Creating superuser: {username}")
    
    # Delete existing user if exists
    User.objects.filter(username=username).delete()
    print(f"Deleted any existing user with username: {username}")
    
    # Create new superuser
    user = User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    
    print(f"Successfully created superuser: {username}")
    print(f"User ID: {user.id}")
    print(f"Is staff: {user.is_staff}")
    print(f"Is superuser: {user.is_superuser}")
    print(f"Is active: {user.is_active}")
    
    # Verify password
    if user.check_password(password):
        print("Password verification: SUCCESS")
    else:
        print("Password verification: FAILED")

if __name__ == '__main__':
    create_admin()
