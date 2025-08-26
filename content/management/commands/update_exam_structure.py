from django.core.management.base import BaseCommand
from content.models import ExamResource


class Command(BaseCommand):
    help = 'Update exam resources structure to use simplified ACAD/ISIL specialization without sections'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting exam resources structure update...'))
        
        # Clear existing exam resources
        ExamResource.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Cleared existing exam resources'))
        
        # New exam structure based on user requirements
        exam_resources = [
            # ACAD exams (S5)
            {
                "name": "Compilation",
                "specialization": "acad",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2"
            },
            {
                "name": "Génie Logiciel",
                "specialization": "acad",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1F69Eif1Hyp5ubziUBCWm_O_TzVIkGWV_"
            },
            {
                "name": "Réseaux",
                "specialization": "acad",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0"
            },
            {
                "name": "Système d'Exploitation 2",
                "specialization": "acad",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1"
            },
            {
                "name": "Théorie de Graphe",
                "specialization": "acad",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1bk1WqjIljIUKrYqpIo7kctetD6ixNjXq"
            },
            
            # ISIL exams (S5)
            {
                "name": "Base de Données 2",
                "specialization": "isil",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1okK0QiXtTTHmdGeFDTcfUxI4AZ5qNq6_"
            },
            {
                "name": "Compilation",
                "specialization": "isil",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2"
            },
            {
                "name": "Génie Logiciel 2",
                "specialization": "isil",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1jIsqQ0BkFxTPmuwkMdz4jHWKFmv-4CGP"
            },
            {
                "name": "Réseaux 1",
                "specialization": "isil",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0"
            },
            {
                "name": "Système d'Exploitation 2",
                "specialization": "isil",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1"
            },
            {
                "name": "Système d'Informatique",
                "specialization": "isil",
                "semester": "s5",
                "url": "https://drive.google.com/drive/folders/1qxTYiMMlvOcVrUOl2zWVuMHxHulS-0qQ"
            }
        ]
        
        # Create new exam resources
        created_resources = []
        for exam_data in exam_resources:
            exam_resource = ExamResource.objects.create(
                name=exam_data["name"],
                specialization=exam_data["specialization"],
                semester=exam_data["semester"],
                url=exam_data["url"]
            )
            created_resources.append(exam_resource)
            self.stdout.write(f'Created: {exam_resource.name} ({exam_resource.specialization})')
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\nSuccessfully created {len(created_resources)} exam resources!\n'
                f'ACAD S5: {len([r for r in created_resources if r.specialization == "acad" and r.semester=="s5"])}\n'
                f'ISIL S5: {len([r for r in created_resources if r.specialization == "isil" and r.semester=="s5"])}'
            )
        )
