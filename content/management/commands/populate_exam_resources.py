from django.core.management.base import BaseCommand
from content.models import ExamResource


class Command(BaseCommand):
    help = 'Populate exam resources with the new structure'

    def handle(self, *args, **options):
        # First, let's clear all existing exam resources
        self.stdout.write("Clearing existing exam resources...")
        ExamResource.objects.all().delete()
        
        # Define the new exam structure
        exam_structure = [
            # ACAD S5
            {
                "name": "Compilation",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 1,
                "url": "https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2"
            },
            {
                "name": "Génie Logiciel",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 2,
                "url": "https://drive.google.com/drive/folders/1F69Eif1Hyp5ubziUBCWm_O_TzVIkGWV_"
            },
            {
                "name": "Réseaux",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 3,
                "url": "https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0"
            },
            {
                "name": "Système d'Exploitation 2",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 4,
                "url": "https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1"
            },
            {
                "name": "Théorie de Graphe",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 5,
                "url": "https://drive.google.com/drive/folders/1bk1WqjIljIUKrYqpIo7kctetD6ixNjXq"
            },
            
            # ISIL S5
            {
                "name": "Base de Données 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 1,
                "url": "https://drive.google.com/drive/folders/1okK0QiXtTTHmdGeFDTcfUxI4AZ5qNq6_"
            },
            {
                "name": "Compilation",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 2,
                "url": "https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2"
            },
            {
                "name": "Génie Logiciel 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 3,
                "url": "https://drive.google.com/drive/folders/1jIsqQ0BkFxTPmuwkMdz4jHWKFmv-4CGP"
            },
            {
                "name": "Réseaux 1",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 4,
                "url": "https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0"
            },
            {
                "name": "Système d'Exploitation 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 5,
                "url": "https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1"
            },
            {
                "name": "Système d'Informatique",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 6,
                "url": "https://drive.google.com/drive/folders/1qxTYiMMlvOcVrUOl2zWVuMHxHulS-0qQ"
            }
        ]

        created_exams = 0
        errors = []

        for data in exam_structure:
            try:
                # Create the exam resource
                exam = ExamResource.objects.create(
                    name=data["name"],
                    specialization=data["specialization"],
                    semester=data["semester"],
                    display_order=data["display_order"],
                    url=data["url"]
                )
                created_exams += 1
                self.stdout.write(f"Created exam: {exam} (Order: {data['display_order']})")

            except Exception as e:
                error_msg = f"Error processing {data['name']} ({data['specialization']} {data['semester']}): {str(e)}"
                errors.append(error_msg)
                self.stdout.write(self.style.ERROR(error_msg))

        # Summary
        self.stdout.write(self.style.SUCCESS(f"\n=== Exam Resources Update Summary ==="))
        self.stdout.write(f"Exams created: {created_exams}")
        
        if errors:
            self.stdout.write(self.style.WARNING(f"\nErrors encountered: {len(errors)}"))
            for error in errors:
                self.stdout.write(self.style.ERROR(f"  - {error}"))
        else:
            self.stdout.write(self.style.SUCCESS("\nAll exam resources updated successfully!"))
