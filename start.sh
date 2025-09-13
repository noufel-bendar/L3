#!/bin/bash
set -e

echo "Starting Django application setup..."

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput

# Setup admin user
echo "Setting up admin user..."
python manage.py setup_admin

# Update exam structure
echo "Updating exam structure..."
python manage.py update_exam_structure

# Populate course materials
echo "Populating course materials..."
python manage.py populate_course_materials

# Populate video content
echo "Populating video content..."
python manage.py populate_video_content

# Start the server
echo "Starting Gunicorn server..."
exec gunicorn backend.wsgi --log-file -
