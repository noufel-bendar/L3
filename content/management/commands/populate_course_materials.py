from django.core.management.base import BaseCommand
from content.models import CourseDriveLink


class Command(BaseCommand):
    help = 'Populate the database with course materials data'

    def handle(self, *args, **options):
        # Course materials data provided by the user
        course_materials_data = [
            # 2021/2022
            {"start_year": 2021, "end_year": 2022, "semester": "s5", "specialization": "isil_b", "url": "https://drive.google.com/drive/folders/19E3UTHa5JKc76IrjcCdMUR99MPEDFduq"},
            {"start_year": 2021, "end_year": 2022, "semester": "s6", "specialization": "isil_b", "url": "https://drive.google.com/drive/folders/19h6DYl-Q_TprrWEBOx0j9XWmhOodmwmi"},
            {"start_year": 2021, "end_year": 2022, "semester": "s5", "specialization": "isil_a", "url": "https://drive.google.com/drive/folders/1jdOPlwaQ5jxUZ4NXJv8OLAuajb12NnNy"},
            {"start_year": 2021, "end_year": 2022, "semester": "s6", "specialization": "isil_a", "url": "https://drive.google.com/drive/folders/1PtUPmXNOH0TbrZlY-GL6n61vswwXDL7-"},
            {"start_year": 2021, "end_year": 2022, "semester": "s5", "specialization": "acad_a", "url": "https://drive.google.com/drive/folders/1DRxbFQExfKqHGxXeIqsnJ-kMjqXZlJJD"},
            {"start_year": 2021, "end_year": 2022, "semester": "s5", "specialization": "acad_c", "url": "https://drive.google.com/drive/folders/1g9PZMLbk_F-PYiYfNyAMJhyOhoRcotC4"},
            {"start_year": 2021, "end_year": 2022, "semester": "s6", "specialization": "acad_c", "url": "https://drive.google.com/drive/folders/1ELvsGQPzZPXBbezUW86uug0HQ5hSPGNB"},
            
            # 2022/2023
            {"start_year": 2022, "end_year": 2023, "semester": "s5", "specialization": "isil_b", "url": "https://drive.google.com/drive/folders/1fH5ZBlv96QyJeRw0czTIB5gswQ5oFexd"},
            {"start_year": 2022, "end_year": 2023, "semester": "s6", "specialization": "isil_b", "url": "https://drive.google.com/drive/folders/1aMizeKw54M2SXW_djQBI_sa7laE4Wm7V"},
            {"start_year": 2022, "end_year": 2023, "semester": "s5", "specialization": "isil_a", "url": "https://drive.google.com/drive/folders/1VBHs69Mf2Hm9RwiUhPCr0cKoAf8KF_bq"},
            {"start_year": 2022, "end_year": 2023, "semester": "s6", "specialization": "isil_a", "url": "https://drive.google.com/drive/folders/1JcoibMvex-5Y4WXltl0zxIrQNcmLcNUz"},
            {"start_year": 2022, "end_year": 2023, "semester": "s5", "specialization": "acad_c", "url": "https://drive.google.com/drive/folders/1jRLsYlc-m8P3JjmFqxfS7X5UCstytLth"},
            {"start_year": 2022, "end_year": 2023, "semester": "s6", "specialization": "acad_c", "url": "https://drive.google.com/drive/folders/13cSKvyvZLB2E7anqXimyRJxA8oNDA6_v"},
            {"start_year": 2022, "end_year": 2023, "semester": "s5", "specialization": "acad_b", "url": "https://drive.google.com/drive/folders/1BGDxUidWkErbyb6jhCGrs73AgbNpvWIQ"},
            {"start_year": 2022, "end_year": 2023, "semester": "s6", "specialization": "acad_b", "url": "https://drive.google.com/drive/folders/1Bm9nk7-GzK_aFpk4fbzp-q3bWJWVPzUH"},
            {"start_year": 2022, "end_year": 2023, "semester": "s5", "specialization": "acad_a", "url": "https://drive.google.com/drive/folders/1RgQEEb2FlweRhmAOfyH5eiZ_yK7-c2VI"},
            {"start_year": 2022, "end_year": 2023, "semester": "s6", "specialization": "acad_a", "url": "https://drive.google.com/drive/folders/12J6HPnqySKj8bW45uIdANPKKfnyJ0hnE"},
            
            # 2023/2024
            {"start_year": 2023, "end_year": 2024, "semester": "s5", "specialization": "isil_b", "url": "https://drive.google.com/drive/folders/1N69-KxGG1xhvK5bRGEyO12EWh-E1RXTd"},
            {"start_year": 2023, "end_year": 2024, "semester": "s6", "specialization": "isil_b", "url": "https://drive.google.com/drive/folders/1N6LsIUqDGtyrYFKphr-NsJVdAip0g0oX"},
            {"start_year": 2023, "end_year": 2024, "semester": "s5", "specialization": "isil_a", "url": "https://drive.google.com/drive/folders/1TWbmp_wjwx6PIy2DTgI5uLUu755BJ0dj"},
            {"start_year": 2023, "end_year": 2024, "semester": "s6", "specialization": "isil_a", "url": "https://drive.google.com/drive/folders/1nXWjTRWoM8bBQ3I-K1TuNm2fuoK2ccIR"},
            {"start_year": 2023, "end_year": 2024, "semester": "s5", "specialization": "acad_c", "url": "https://drive.google.com/drive/folders/1RL2jJcStgQ_pFrYJG90elGVU7S7Ow1gX"},
            {"start_year": 2023, "end_year": 2024, "semester": "s6", "specialization": "acad_c", "url": "https://drive.google.com/drive/folders/1fpT9LIn5RK5V-85iM49YFAZ9uHJUL8mN"},
            {"start_year": 2023, "end_year": 2024, "semester": "s5", "specialization": "acad_b", "url": "https://drive.google.com/drive/folders/1-9sNRynfcUO31LJU_nGNg-V7C0rV9Tdd"},
            {"start_year": 2023, "end_year": 2024, "semester": "s6", "specialization": "acad_b", "url": "https://drive.google.com/drive/folders/1s8ZhVPD8nBbmhqFIHQSWRW7hP-jdlmhY"},
            {"start_year": 2023, "end_year": 2024, "semester": "s5", "specialization": "acad_a", "url": "https://drive.google.com/drive/folders/1ITieJY22_M-OL-bEGPVVbGXaiMkBJKo2"},
            {"start_year": 2023, "end_year": 2024, "semester": "s6", "specialization": "acad_a", "url": "https://drive.google.com/drive/folders/1HyK6DQY9nGxqNty0FK8-WZDhW39S5jpF"},
            
            # 2024/2025
            {"start_year": 2024, "end_year": 2025, "semester": "s5", "specialization": "isil_a", "url": "https://drive.google.com/drive/u/1/folders/1KsHn0KO2j1sbUJRSWs72UQJcB5STuzfh"},
            {"start_year": 2024, "end_year": 2025, "semester": "s6", "specialization": "isil_a", "url": "https://drive.google.com/drive/u/1/folders/1K5JK3W6HQjBNEQTx4Hwd5fTPsVbaBPN7"},
            {"start_year": 2024, "end_year": 2025, "semester": "s5", "specialization": "isil_b", "url": "https://drive.google.com/drive/u/1/folders/1UUHbui1E3qWvfME6UunRw80gS8WhGO2z"},
            {"start_year": 2024, "end_year": 2025, "semester": "s6", "specialization": "isil_b", "url": "https://drive.google.com/drive/u/1/folders/1MB_VIIMEGx43a38uqrPNj8x__issuhuS"},
            {"start_year": 2024, "end_year": 2025, "semester": "s5", "specialization": "acad_a", "url": "https://drive.google.com/drive/u/1/folders/1RoMzavo7NTkU8SIVVpwRAjhcHvbLiDSw"},
            {"start_year": 2024, "end_year": 2025, "semester": "s5", "specialization": "acad_b", "url": "https://drive.google.com/drive/u/1/folders/1m7ygZ3f91IAPDun3CLkQq55sJbopIlhl"},
            {"start_year": 2024, "end_year": 2025, "semester": "s5", "specialization": "acad_c", "url": "https://drive.google.com/drive/u/1/folders/1FJ4ix7P9ujr2IajcCtid9PGiBtHhl6l1"},
        ]

        created_count = 0
        updated_count = 0
        errors = []

        for data in course_materials_data:
            try:
                # Check if the record already exists
                obj, created = CourseDriveLink.objects.get_or_create(
                    start_year=data["start_year"],
                    end_year=data["end_year"],
                    semester=data["semester"],
                    specialization=data["specialization"],
                    defaults={"url": data["url"]}
                )
                
                if created:
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(
                            f"Created: {obj.start_year}-{obj.end_year} {obj.semester} {obj.specialization}"
                        )
                    )
                else:
                    # Update the URL if it changed
                    if obj.url != data["url"]:
                        obj.url = data["url"]
                        obj.save()
                        updated_count += 1
                        self.stdout.write(
                            self.style.WARNING(
                                f"Updated: {obj.start_year}-{obj.end_year} {obj.semester} {obj.specialization}"
                            )
                        )
                    else:
                        self.stdout.write(
                            f"Already exists: {obj.start_year}-{obj.end_year} {obj.semester} {obj.specialization}"
                        )
                        
            except Exception as e:
                error_msg = f"Error processing {data}: {str(e)}"
                errors.append(error_msg)
                self.stdout.write(self.style.ERROR(error_msg))

        # Summary
        self.stdout.write(
            self.style.SUCCESS(
                f"\nSummary:\n"
                f"Created: {created_count}\n"
                f"Updated: {updated_count}\n"
                f"Errors: {len(errors)}"
            )
        )

        if errors:
            self.stdout.write(self.style.ERROR("\nErrors encountered:"))
            for error in errors:
                self.stdout.write(self.style.ERROR(f"  - {error}"))
