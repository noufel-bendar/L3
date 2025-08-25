from django.core.management.base import BaseCommand
from content.models import Course, VideoPlaylist


class Command(BaseCommand):
    help = 'Populate the database with video content data'

    def handle(self, *args, **options):
        video_content_data = [
            # ACAD S5
            {
                "course_name": "Théorie des Graphes",
                "specialization": "acad_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Théorie des Graphes - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzFWmq9d0ETF4IDkJWm_1umE&si=kWedENK4Q33M6uzs"},
                    {"title": "Théorie des Graphes - Playlist 2", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIsiJFlOYOsNGbeNuP8IS8-o&si=IdqithvB0Q2qulB9"},
                    {"title": "Théorie des Graphes - Playlist 3", "url": "https://youtube.com/playlist?list=PLx9305BZWH0Qws8o7z9vkK9EtLUJM_OHJ&si=k2LZViSAyyyQ1qyI"}
                ]
            },
            {
                "course_name": "Système d'Exploitation 2",
                "specialization": "acad_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Système d'Exploitation 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw"},
                    {"title": "Système d'Exploitation 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc"}
                ]
            },
            {
                "course_name": "Réseaux",
                "specialization": "acad_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Réseaux - Playlist 1", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi"},
                    {"title": "Réseaux - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn"},
                    {"title": "Réseaux - Playlist 3", "url": "https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl"}
                ]
            },
            {
                "course_name": "Génie Logiciel",
                "specialization": "acad_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Génie Logiciel - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRo7ziNTHkAq9YTezFxtYob&si=Kn41fref4nmf-1y1"},
                    {"title": "Génie Logiciel - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzFgIsYqB7wXQxrqcWyylFxc&si=vKcgnkSm6-3kGp2o"},
                    {"title": "Génie Logiciel - Playlist 3", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPItQz1M8XymauMPF7q2zf2AZ&si=aCHTNU4gqTmU1_E3"}
                ]
            },
            {
                "course_name": "Compilation",
                "specialization": "acad_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Compilation - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn"},
                    {"title": "Compilation - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5"}
                ]
            },
            {
                "course_name": "Anglais 3",
                "specialization": "acad_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Anglais 3 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHf9_j0j5Y9oUiyYcScd8VC&si=sER3yR3XHzB6zc2z"}
                ]
            },
            
            # ACAD S6
            {
                "course_name": "Programmation Web",
                "specialization": "acad_a",
                "semester": "s6",
                "playlists": [
                    {"title": "Programmation Web - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIu59JDvKzkJGtBAdZNdZ5mu&si=noi48A9WWXDTKNdF"},
                    {"title": "Programmation Web - Playlist 2", "url": "https://youtube.com/playlist?list=PLSENmhglzJjTk1cfzvCsWrxKng1GTkOxn&si=IcaL2OJgXDfkHfFb"}
                ]
            },
            {
                "course_name": "Doc STR",
                "specialization": "acad_a",
                "semester": "s6",
                "playlists": []
            },
            {
                "course_name": "PFP",
                "specialization": "acad_a",
                "semester": "s6",
                "playlists": []
            },
            {
                "course_name": "Admin",
                "specialization": "acad_a",
                "semester": "s6",
                "playlists": []
            },
            
            # ISIL S5
            {
                "course_name": "Compilation",
                "specialization": "isil_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Compilation - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn"},
                    {"title": "Compilation - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5"}
                ]
            },
            {
                "course_name": "Réseaux",
                "specialization": "isil_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Réseaux - Playlist 1", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi"},
                    {"title": "Réseaux - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn"}
                ]
            },
            {
                "course_name": "Génie Logiciel 2",
                "specialization": "isil_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Génie Logiciel 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIt6kFEr8fOEbY0uJZoIU8MH&si=gt_EpBvg97CAsUhj"}
                ]
            },
            {
                "course_name": "Système d'Exploitation 2",
                "specialization": "isil_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Système d'Exploitation 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw"},
                    {"title": "Système d'Exploitation 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc"}
                ]
            },
            {
                "course_name": "Base de Données 2",
                "specialization": "isil_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Base de Données 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIskDw1qPO-G8ZUyyAOiYYTm&si=2CerZpqmnP4plJh9"}
                ]
            },
            {
                "course_name": "Système d'Informatique 2",
                "specialization": "isil_a",
                "semester": "s5",
                "playlists": [
                    {"title": "Système d'Informatique 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIvK46CtzzjmmreYAHFeas99&si=hOilJfNf6s5nrD4u"},
                    {"title": "Système d'Informatique 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QuEQcG-5qzpBGFfC0r_QmR&si=hL1a4t3l7LJKBbBS"}
                ]
            },
            
            # ISIL S6
            {
                "course_name": "ORAD",
                "specialization": "isil_a",
                "semester": "s6",
                "playlists": []
            },
            {
                "course_name": "Réseaux 2",
                "specialization": "isil_a",
                "semester": "s6",
                "playlists": [
                    {"title": "Réseaux 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIteBeqC80ZVch3TJVdiOrev&si=HwUrsAoYNrkZXrG7"}
                ]
            },
            {
                "course_name": "PFE",
                "specialization": "isil_a",
                "semester": "s6",
                "playlists": []
            },
            {
                "course_name": "Génie Logiciel 3",
                "specialization": "isil_a",
                "semester": "s6",
                "playlists": [
                    {"title": "Génie Logiciel 3 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIt4WzPPVYGbGe8zRaxXnUao&si=eaafZGDc5z0FhY34"}
                ]
            }
        ]

        created_courses = 0
        created_playlists = 0
        updated_courses = 0
        updated_playlists = 0
        errors = []

        for data in video_content_data:
            try:
                # Create or get the course
                course, course_created = Course.objects.get_or_create(
                    name=data["course_name"],
                    specialization=data["specialization"],
                    semester=data["semester"]
                )
                
                if course_created:
                    created_courses += 1
                    self.stdout.write(f"Created course: {course}")
                else:
                    updated_courses += 1
                    self.stdout.write(f"Updated course: {course}")

                # Create playlists for the course
                for playlist_data in data["playlists"]:
                    playlist, playlist_created = VideoPlaylist.objects.get_or_create(
                        course=course,
                        title=playlist_data["title"],
                        defaults={"url": playlist_data["url"]}
                    )
                    
                    if playlist_created:
                        created_playlists += 1
                        self.stdout.write(f"  Created playlist: {playlist}")
                    else:
                        updated_playlists += 1
                        self.stdout.write(f"  Updated playlist: {playlist}")

            except Exception as e:
                error_msg = f"Error processing {data['course_name']} ({data['specialization']} {data['semester']}): {str(e)}"
                errors.append(error_msg)
                self.stdout.write(self.style.ERROR(error_msg))

        # Summary
        self.stdout.write(self.style.SUCCESS(f"\n=== Video Content Population Summary ==="))
        self.stdout.write(f"Courses created: {created_courses}")
        self.stdout.write(f"Courses updated: {updated_courses}")
        self.stdout.write(f"Playlists created: {created_playlists}")
        self.stdout.write(f"Playlists updated: {updated_playlists}")
        
        if errors:
            self.stdout.write(self.style.WARNING(f"\nErrors encountered: {len(errors)}"))
            for error in errors:
                self.stdout.write(self.style.ERROR(f"  - {error}"))
        else:
            self.stdout.write(self.style.SUCCESS("\nAll video content data processed successfully!"))
