# Generated manually to migrate academic year data and remove old models

from django.db import migrations, models


def migrate_academic_year_data(apps, schema_editor):
    """
    Migrate data from AcademicYear model to CourseDriveLink model.
    This will update existing CourseDriveLink entries with the year information.
    """
    AcademicYear = apps.get_model('content', 'AcademicYear')
    CourseDriveLink = apps.get_model('content', 'CourseDriveLink')
    
    # Get all existing academic years
    academic_years = AcademicYear.objects.all()
    
    # Update existing CourseDriveLink entries with year information
    for ay in academic_years:
        # Find CourseDriveLink entries that reference this academic year
        drive_links = CourseDriveLink.objects.filter(academic_year=ay)
        for link in drive_links:
            link.start_year = ay.start_year
            link.end_year = ay.end_year
            link.save()


def reverse_migrate_academic_year_data(apps, schema_editor):
    """
    Reverse migration - not implemented as it would lose data
    """
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_restructure_academic_year'),
    ]

    operations = [
        # First migrate the data
        migrations.RunPython(migrate_academic_year_data, reverse_migrate_academic_year_data),
        
        # Make the year fields non-nullable
        migrations.AlterField(
            model_name='coursedrivelink',
            name='start_year',
            field=models.PositiveIntegerField(help_text='Start year (e.g., 2025)'),
        ),
        migrations.AlterField(
            model_name='coursedrivelink',
            name='end_year',
            field=models.PositiveIntegerField(help_text='End year (e.g., 2026)'),
        ),
        
        # Remove the old academic_year foreign key
        migrations.RemoveField(
            model_name='coursedrivelink',
            name='academic_year',
        ),
        
        # Remove the Lesson model first (it references AcademicYear)
        migrations.DeleteModel(
            name='Lesson',
        ),
        
        # Remove the AcademicYear model
        migrations.DeleteModel(
            name='AcademicYear',
        ),
    ]
