# Generated manually to restructure AcademicYear into CourseDriveLink

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_remove_examresource_color_and_more'),
    ]

    operations = [
        # First, add the new fields to CourseDriveLink as nullable
        migrations.AddField(
            model_name='coursedrivelink',
            name='start_year',
            field=models.PositiveIntegerField(help_text='Start year (e.g., 2025)', null=True),
        ),
        migrations.AddField(
            model_name='coursedrivelink',
            name='end_year',
            field=models.PositiveIntegerField(help_text='End year (e.g., 2026)', null=True),
        ),
        
        # Update unique_together constraint to include new fields
        migrations.AlterUniqueTogether(
            name='coursedrivelink',
            unique_together={('start_year', 'end_year', 'semester', 'specialization')},
        ),
        
        # Update ordering
        migrations.AlterModelOptions(
            name='coursedrivelink',
            options={'ordering': ['-start_year', 'semester', 'specialization']},
        ),
    ]
