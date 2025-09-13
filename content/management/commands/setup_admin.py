from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Setup admin user with specific credentials'

    def handle(self, *args, **options):
        # Hardcoded credentials to ensure they work
        username = 'admin1'
        email = 'bendarnoufel@gmail.com'
        password = 'admin1234'

        self.stdout.write('Setting up admin user...')
        self.stdout.write(f'Username: {username}')
        self.stdout.write(f'Email: {email}')

        try:
            with transaction.atomic():
                # Delete existing user if exists
                User.objects.filter(username=username).delete()
                self.stdout.write(f'Deleted any existing user with username: {username}')
                
                # Create new superuser
                user = User.objects.create_superuser(
                    username=username,
                    email=email,
                    password=password
                )
                
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created superuser: {username}')
                )
                
                # Verify the user was created correctly
                created_user = User.objects.get(username=username)
                self.stdout.write('User verification:')
                self.stdout.write(f'  - ID: {created_user.id}')
                self.stdout.write(f'  - Username: {created_user.username}')
                self.stdout.write(f'  - Email: {created_user.email}')
                self.stdout.write(f'  - Is staff: {created_user.is_staff}')
                self.stdout.write(f'  - Is superuser: {created_user.is_superuser}')
                self.stdout.write(f'  - Is active: {created_user.is_active}')
                self.stdout.write(f'  - Date joined: {created_user.date_joined}')
                
                # Test password
                if created_user.check_password(password):
                    self.stdout.write(self.style.SUCCESS('Password verification: SUCCESS'))
                else:
                    self.stdout.write(self.style.ERROR('Password verification: FAILED'))
                    
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating superuser: {str(e)}')
            )
            import traceback
            self.stdout.write(traceback.format_exc())
            raise
