from django.core.management.base import BaseCommand
from content.models import Course, VideoPlaylist


class Command(BaseCommand):
    help = 'Update video content structure to use simplified ACAD/ISIL specialization without sections'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting video content structure update...'))
        
        # Clear existing video courses and playlists
        VideoPlaylist.objects.all().delete()
        Course.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Cleared existing video content'))
        
        # New course structure with simplified specialization (no sections)
        new_course_structure = [
            # ACAD S5 - Order: 1-6
            {
                "course_name": "Théorie des Graphes",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 1,
                "playlists": [
                    {"title": "Théorie des Graphes - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzFWmq9d0ETF4IDkJWm_1umE&si=kWedENK4Q33M6uzs"},
                    {"title": "Théorie des Graphes - Playlist 2", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIsiJFlOYOsNGbeNuP8IS8-o&si=IdqithvB0Q2qulB9"},
                    {"title": "Théorie des Graphes - Playlist 3", "url": "https://youtube.com/playlist?list=PLx9305BZWH0Qws8o7z9vkK9EtLUJM_OHJ&si=k2LZViSAyyyQ1qyI"}
                ]
            },
            {
                "course_name": "Système d'Exploitation 2",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 2,
                "playlists": [
                    {"title": "Système d'Exploitation 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw"},
                    {"title": "Système d'Exploitation 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc"}
                ]
            },
            {
                "course_name": "Réseaux",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 3,
                "playlists": [
                    {"title": "Réseaux - Playlist 1", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi"},
                    {"title": "Réseaux - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn"},
                    {"title": "Réseaux - Playlist 3", "url": "https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl"}
                ]
            },
            {
                "course_name": "Génie Logiciel 1",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 4,
                "playlists": [
                    {"title": "Génie Logiciel 1 - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRo7ziNTHkAq9YTezFxtYob&si=Kn41fref4nmf-1y1"},
                    {"title": "Génie Logiciel 1 - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzFgIsYqB7wXQxrqcWyylFxc&si=vKcgnkSm6-3kGp2o"},
                    {"title": "Génie Logiciel 1 - Playlist 3", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPItQz1M8XymauMPF7q2zf2AZ&si=aCHTNU4gqTmU1_E3"}
                ]
            },
            {
                "course_name": "Compilation",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 5,
                "playlists": [
                    {"title": "Compilation - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn"},
                    {"title": "Compilation - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5"}
                ]
            },
            {
                "course_name": "Anglais 3",
                "specialization": "acad",
                "semester": "s5",
                "display_order": 6,
                "playlists": [
                    {"title": "Anglais 3 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHf9_j0j5Y9oUiyYcScd8VC&si=sER3yR3XHzB6zc2z"}
                ]
            },
            
            # ACAD S6 - Order: 1-4
            {
                "course_name": "Programmation Web",
                "specialization": "acad",
                "semester": "s6",
                "display_order": 1,
                "playlists": [
                    {"title": "Programmation Web - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIu59JDvKzkJGtBAdZNdZ5mu&si=noi48A9WWXDTKNdF"},
                    {"title": "Programmation Web - Playlist 2", "url": "https://youtube.com/playlist?list=PLSENmhglzJjTk1cfzvCsWrxKng1GTkOxn&si=IcaL2OJgXDfkHfFb"}
                ]
            },
            {
                "course_name": "Doc STR",
                "specialization": "acad",
                "semester": "s6",
                "display_order": 2,
                "playlists": []
            },
            {
                "course_name": "PFP",
                "specialization": "acad",
                "semester": "s6",
                "display_order": 3,
                "playlists": []
            },
            {
                "course_name": "Admin",
                "specialization": "acad",
                "semester": "s6",
                "display_order": 4,
                "playlists": []
            },
            
            # ISIL S5 - Order: 1-6
            {
                "course_name": "Compilation",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 1,
                "playlists": [
                    {"title": "Compilation - Playlist 1", "url": "https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn"},
                    {"title": "Compilation - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5"}
                ]
            },
            {
                "course_name": "Réseaux",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 2,
                "playlists": [
                    {"title": "Réseaux - Playlist 1", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi"},
                    {"title": "Réseaux - Playlist 2", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn"}
                ]
            },
            {
                "course_name": "Génie Logiciel 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 3,
                "playlists": [
                    {"title": "Génie Logiciel 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIt6kFEr8fOEbY0uJZoIU8MH&si=gt_EpBvg97CAsUhj"}
                ]
            },
            {
                "course_name": "Système d'Exploitation 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 4,
                "playlists": [
                    {"title": "Système d'Exploitation 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw"},
                    {"title": "Système d'Exploitation 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc"}
                ]
            },
            {
                "course_name": "Base de Données 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 5,
                "playlists": [
                    {"title": "Base de Données 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIskDw1qPO-G8ZUyyAOiYYTm&si=2CerZpqmnP4plJh9"}
                ]
            },
            {
                "course_name": "Système d'Informatique 2",
                "specialization": "isil",
                "semester": "s5",
                "display_order": 6,
                "playlists": [
                    {"title": "Système d'Informatique 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIvK46CtzzjmmreYAHFeas99&si=hOilJfNf6s5nrD4u"},
                    {"title": "Système d'Informatique 2 - Playlist 2", "url": "https://youtube.com/playlist?list=PLx9305BZWH0QuEQcG-5qzpBGFfC0r_QmR&si=hL1a4t3l7LJKBbBS"}
                ]
            },
            
            # ISIL S6 - Order: 1-4
            {
                "course_name": "ORAD",
                "specialization": "isil",
                "semester": "s6",
                "display_order": 1,
                "playlists": []
            },
            {
                "course_name": "Réseaux 2",
                "specialization": "isil",
                "semester": "s6",
                "display_order": 2,
                "playlists": [
                    {"title": "Réseaux 2 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIteBeqC80ZVch3TJVdiOrev&si=HwUrsAoYNrkZXrG7"}
                ]
            },
            {
                "course_name": "PFE",
                "specialization": "isil",
                "semester": "s6",
                "display_order": 3,
                "playlists": []
            },
            {
                "course_name": "Génie Logiciel 3",
                "specialization": "isil",
                "semester": "s6",
                "display_order": 4,
                "playlists": [
                    {"title": "Génie Logiciel 3 - Playlist 1", "url": "https://youtube.com/playlist?list=PLbpBG2OLEPIt4WzPPVYGbGe8zRaxXnUao&si=eaafZGDc5z0FhY34"}
                ]
            }
        ]
        
        # Create courses and playlists
        created_courses = []
        for course_data in new_course_structure:
            # Create course
            course = Course.objects.create(
                name=course_data["course_name"],
                specialization=course_data["specialization"],
                semester=course_data["semester"],
                display_order=course_data["display_order"]
            )
            created_courses.append(course)
            self.stdout.write(f'Created course: {course.name} ({course.specialization} {course.semester})')
            
            # Create playlists for the course
            for playlist_data in course_data["playlists"]:
                playlist = VideoPlaylist.objects.create(
                    course=course,
                    title=playlist_data["title"],
                    url=playlist_data["url"]
                )
                self.stdout.write(f'  - Created playlist: {playlist.title}')
        
        self.stdout.write(
            self.style.SUCCESS(
                f'\nSuccessfully created {len(created_courses)} courses!\n'
                f'ACAD S5: {len([c for c in created_courses if c.specialization == "acad" and c.semester == "s5"])} courses\n'
                f'ACAD S6: {len([c for c in created_courses if c.specialization == "acad" and c.semester == "s6"])} courses\n'
                f'ISIL S5: {len([c for c in created_courses if c.specialization == "isil" and c.semester == "s5"])} courses\n'
                f'ISIL S6: {len([c for c in created_courses if c.specialization == "isil" and c.semester == "s6"])} courses'
            )
        )
