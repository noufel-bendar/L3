from django.core.management.base import BaseCommand
from content.models import Course, VideoPlaylist


class Command(BaseCommand):
    help = 'Update the video content structure according to new specifications'

    def handle(self, *args, **options):
        # First, let's clear all existing courses and playlists
        self.stdout.write("Clearing existing video content...")
        VideoPlaylist.objects.all().delete()
        Course.objects.all().delete()
        
        # Define the new course structure with proper ordering
        new_course_structure = [
            # ISIL S5 - Order: 1-6
            {
                "course_name": "Compilation",
                "specialization": "isil_a",
                "semester": "s5",
                "display_order": 1,
                "playlists": [
                    {"title": "Compilation - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn"},
                    {"title": "Compilation - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5"}
                ]
            },
            {
                "course_name": "Réseaux",
                "specialization": "isil_a",
                "semester": "s5",
                "display_order": 2,
                "playlists": [
                    {"title": "Réseaux - Playlist 1", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi"},
                    {"title": "Réseaux - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn"}
                ]
            },
            {
                "course_name": "Génie Logiciel 2",
                "specialization": "isil_a",
                "semester": "s5",
                "display_order": 3,
                "playlists": [
                    {"title": "Génie Logiciel 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIt6kFEr8fOEbY0uJZoIU8MH&si=gt_EpBvg97CAsUhj"}
                ]
            },
            {
                "course_name": "Système d'Exploitation 2",
                "specialization": "isil_a",
                "semester": "s5",
                "display_order": 4,
                "playlists": [
                    {"title": "Système d'Exploitation 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw"},
                    {"title": "Système d'Exploitation 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc"}
                ]
            },
            {
                "course_name": "Système d'Informatique 2",
                "specialization": "isil_a",
                "semester": "s5",
                "display_order": 5,
                "playlists": [
                    {"title": "Système d'Informatique 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIvK46CtzzjmmreYAHFeas99&si=hOilJfNf6s5nrD4u"},
                    {"title": "Système d'Informatique 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QuEQcG-5qzpBGFfC0r_QmR&si=hL1a4t3l7LJKBbBS"}
                ]
            },
            {
                "course_name": "Base de Données 2",
                "specialization": "isil_a",
                "semester": "s5",
                "display_order": 6,
                "playlists": [
                    {"title": "Base de Données 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIskDw1qPO-G8ZUyyAOiYYTm&si=2CerZpqmnP4plJh9"}
                ]
            },
            
            # ISIL S6 - Order: 1-4
            {
                "course_name": "Génie Logiciel 3",
                "specialization": "isil_a",
                "semester": "s6",
                "display_order": 1,
                "playlists": [
                    {"title": "Génie Logiciel 3 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIt4WzPPVYGbGe8zRaxXnUao&si=eaafZGDc5z0FhY34"}
                ]
            },
            {
                "course_name": "Réseaux 2",
                "specialization": "isil_a",
                "semester": "s6",
                "display_order": 2,
                "playlists": [
                    {"title": "Réseaux 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIteBeqC80ZVch3TJVdiOrev&si=HwUrsAoYNrkZXrG7"}
                ]
            },
            {
                "course_name": "PFE",
                "specialization": "isil_a",
                "semester": "s6",
                "display_order": 3,
                "playlists": []
            },
            {
                "course_name": "ORAD",
                "specialization": "isil_a",
                "semester": "s6",
                "display_order": 4,
                "playlists": []
            },
            
            # ACAD S5 - Order: 1-5
            {
                "course_name": "Compilation",
                "specialization": "acad_a",
                "semester": "s5",
                "display_order": 1,
                "playlists": [
                    {"title": "Compilation - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn"},
                    {"title": "Compilation - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5"}
                ]
            },
            {
                "course_name": "Génie Logiciel 1",
                "specialization": "acad_a",
                "semester": "s5",
                "display_order": 2,
                "playlists": [
                    {"title": "Génie Logiciel 1 - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRo7ziNTHkAq9YTezFxtYob&si=Kn41fref4nmf-1y1"},
                    {"title": "Génie Logiciel 1 - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzFgIsYqB7wXQxrqcWyylFxc&si=vKcgnkSm6-3kGp2o"},
                    {"title": "Génie Logiciel 1 - Playlist 3", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPItQz1M8XymauMPF7q2zf2AZ&si=aCHTNU4gqTmU1_E3"}
                ]
            },
            {
                "course_name": "Réseaux",
                "specialization": "acad_a",
                "semester": "s5",
                "display_order": 3,
                "playlists": [
                    {"title": "Réseaux - Playlist 1", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi"},
                    {"title": "Réseaux - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn"},
                    {"title": "Réseaux - Playlist 3", "url": "https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl"}
                ]
            },
            {
                "course_name": "Système d'Exploitation 2",
                "specialization": "acad_a",
                "semester": "s5",
                "display_order": 4,
                "playlists": [
                    {"title": "Système d'Exploitation 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw"},
                    {"title": "Système d'Exploitation 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc"}
                ]
            },
            {
                "course_name": "Théorie des Graphes",
                "specialization": "acad_a",
                "semester": "s5",
                "display_order": 5,
                "playlists": [
                    {"title": "Théorie des Graphes - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzFWmq9d0ETF4IDkJWm_1umE&si=kWedENK4Q33M6uzs"},
                    {"title": "Théorie des Graphes - Playlist 2", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIsiJFlOYOsNGbeNuP8IS8-o&si=IdqithvB0Q2qulB9"},
                    {"title": "Théorie des Graphes - Playlist 3", "url": "https://youtube.com/playlist?list=PLx9305BZWH0Qws8o7z9vkK9EtLUJM_OHJ&si=k2LZViSAyyyQ1qyI"}
                ]
            },
            
            # ACAD S6 - Order: 1-4
            {
                "course_name": "Programmation Web",
                "specialization": "acad_a",
                "semester": "s6",
                "display_order": 1,
                "playlists": [
                    {"title": "Programmation Web - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIu59JDvKzkJGtBAdZNdZ5mu&si=noi48A9WWXDTKNdF"},
                    {"title": "Programmation Web - Playlist 2", "url": "https://youtube.com/playlist?list=PLSENmhglzJjTk1cfzvCsWrxKng1GTkOxn&si=IcaL2OJgXDfkHfFb"}
                ]
            },
            {
                "course_name": "DOC STR",
                "specialization": "acad_a",
                "semester": "s6",
                "display_order": 2,
                "playlists": []
            },
            {
                "course_name": "ADMIN",
                "specialization": "acad_a",
                "semester": "s6",
                "display_order": 3,
                "playlists": []
            },
            {
                "course_name": "PFE",
                "specialization": "acad_a",
                "semester": "s6",
                "display_order": 4,
                "playlists": []
            }
        ]

        created_courses = 0
        created_playlists = 0
        errors = []

        for data in new_course_structure:
            try:
                # Create the course
                course = Course.objects.create(
                    name=data["course_name"],
                    specialization=data["specialization"],
                    semester=data["semester"],
                    display_order=data["display_order"]
                )
                created_courses += 1
                self.stdout.write(f"Created course: {course} (Order: {data['display_order']})")

                # Create playlists for the course
                for playlist_data in data["playlists"]:
                    playlist = VideoPlaylist.objects.create(
                        course=course,
                        title=playlist_data["title"],
                        url=playlist_data["url"]
                    )
                    created_playlists += 1
                    self.stdout.write(f"  Created playlist: {playlist}")

            except Exception as e:
                error_msg = f"Error processing {data['course_name']} ({data['specialization']} {data['semester']}): {str(e)}"
                errors.append(error_msg)
                self.stdout.write(self.style.ERROR(error_msg))

        # Summary
        self.stdout.write(self.style.SUCCESS(f"\n=== Video Structure Update Summary ==="))
        self.stdout.write(f"Courses created: {created_courses}")
        self.stdout.write(f"Playlists created: {created_playlists}")
        
        if errors:
            self.stdout.write(self.style.WARNING(f"\nErrors encountered: {len(errors)}"))
            for error in errors:
                self.stdout.write(self.style.ERROR(f"  - {error}"))
        else:
            self.stdout.write(self.style.SUCCESS("\nAll video content structure updated successfully!"))
