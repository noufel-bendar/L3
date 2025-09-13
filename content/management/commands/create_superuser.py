from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a superuser if one does not exist'

    def add_arguments(self, parser):
        parser.add_argument('--force', action='store_true', help='Force recreate superuser even if exists')

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin1')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'bendarnoufel@gmail.com')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin1234')

        self.stdout.write(f'Attempting to create superuser: {username}')
        self.stdout.write(f'Email: {email}')

        try:
            with transaction.atomic():
                # Check if user exists
                existing_user = User.objects.filter(username=username).first()
                
                if existing_user and not options['force']:
                    self.stdout.write(
                        self.style.WARNING(f'Superuser "{username}" already exists')
                    )
                    # Update password if user exists
                    existing_user.set_password(password)
                    existing_user.is_staff = True
                    existing_user.is_superuser = True
                    existing_user.save()
                    self.stdout.write(
                        self.style.SUCCESS(f'Updated password for existing superuser "{username}"')
                    )
                else:
                    if existing_user and options['force']:
                        existing_user.delete()
                        self.stdout.write(f'Deleted existing user "{username}"')
                    
                    # Create new superuser
                    user = User.objects.create_superuser(username, email, password)
                    self.stdout.write(
                        self.style.SUCCESS(f'Successfully created superuser "{username}" with ID: {user.id}')
                    )
                    
                # Verify the user
                user = User.objects.get(username=username)
                self.stdout.write(f'User verification:')
                self.stdout.write(f'  - Username: {user.username}')
                self.stdout.write(f'  - Email: {user.email}')
                self.stdout.write(f'  - Is staff: {user.is_staff}')
                self.stdout.write(f'  - Is superuser: {user.is_superuser}')
                self.stdout.write(f'  - Is active: {user.is_active}')
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating superuser: {str(e)}')
            )
            raise
