from django.db import migrations


def seed_data(apps, schema_editor):
    AcademicYear = apps.get_model('content', 'AcademicYear')
    CourseDriveLink = apps.get_model('content', 'CourseDriveLink')
    ExamResource = apps.get_model('content', 'ExamResource')
    Course = apps.get_model('content', 'Course')
    VideoPlaylist = apps.get_model('content', 'VideoPlaylist')
    SiteSettings = apps.get_model('content', 'SiteSettings')

    # 1) Academic years
    years = [(2021, 2022), (2022, 2023), (2023, 2024), (2024, 2025)]
    year_map = {}
    for s, e in years:
        ay, _ = AcademicYear.objects.get_or_create(start_year=s, end_year=e)
        year_map[f"{s}/{e}"] = ay

    # 2) Course drive links (from previous frontend hardcoded data)
    drive_links = {
        '2021/2022': {
            's5': {
                'isil_b': 'https://drive.google.com/drive/folders/19E3UTHa5JKc76IrjcCdMUR99MPEDFduq',
                'isil_a': 'https://drive.google.com/drive/folders/1jdOPlwaQ5jxUZ4NXJv8OLAuajb12NnNy',
                'acad_a': 'https://drive.google.com/drive/folders/1DRxbFQExfKqHGxXeIqsnJ-kMjqXZlJJD',
                'acad_c': 'https://drive.google.com/drive/folders/1g9PZMLbk_F-PYiYfNyAMJhyOhoRcotC4',
            },
            's6': {
                'isil_b': 'https://drive.google.com/drive/folders/19h6DYl-Q_TprrWEBOx0j9XWmhOodmwmi',
                'isil_a': 'https://drive.google.com/drive/folders/1PtUPmXNOH0TbrZlY-GL6n61vswwXDL7-',
                'acad_c': 'https://drive.google.com/drive/folders/1ELvsGQPzZPXBbezUW86uug0HQ5hSPGNB',
            },
        },
        '2022/2023': {
            's5': {
                'isil_b': 'https://drive.google.com/drive/folders/1fH5ZBlv96QyJeRw0czTIB5gswQ5oFexd',
                'isil_a': 'https://drive.google.com/drive/folders/1VBHs69Mf2Hm9RwiUhPCr0cKoAf8KF_bq',
                'acad_c': 'https://drive.google.com/drive/folders/1jRLsYlc-m8P3JjmFqxfS7X5UCstytLth',
                'acad_b': 'https://drive.google.com/drive/folders/1BGDxUidWkErbyb6jhCGrs73AgbNpvWIQ',
                'acad_a': 'https://drive.google.com/drive/folders/1RgQEEb2FlweRhmAOfyH5eiZ_yK7-c2VI',
            },
            's6': {
                'isil_b': 'https://drive.google.com/drive/folders/1aMizeKw54M2SXW_djQBI_sa7laE4Wm7V',
                'isil_a': 'https://drive.google.com/drive/folders/1JcoibMvex-5Y4WXltl0zxIrQNcmLcNUz',
                'acad_c': 'https://drive.google.com/drive/folders/13cSKvyvZLB2E7anqXimyRJxA8oNDA6_v',
                'acad_b': 'https://drive.google.com/drive/folders/1Bm9nk7-GzK_aFpk4fbzp-q3bWJWVPzUH',
                'acad_a': 'https://drive.google.com/drive/folders/12J6HPnqySKj8bW45uIdANPKKfnyJ0hnE',
            },
        },
        '2023/2024': {
            's5': {
                'isil_b': 'https://drive.google.com/drive/folders/1N69-KxGG1xhvK5bRGEyO12EWh-E1RXTd',
                'isil_a': 'https://drive.google.com/drive/folders/1TWbmp_wjwx6PIy2DTgI5uLUu755BJ0dj',
                'acad_c': 'https://drive.google.com/drive/folders/1RL2jJcStgQ_pFrYJG90elGVU7S7Ow1gX',
                'acad_b': 'https://drive.google.com/drive/folders/1-9sNRynfcUO31LJU_nGNg-V7C0rV9Tdd',
                'acad_a': 'https://drive.google.com/drive/folders/1ITieJY22_M-OL-bEGPVVbGXaiMkBJKo2',
            },
            's6': {
                'isil_b': 'https://drive.google.com/drive/folders/1N6LsIUqDGtyrYFKphr-NsJVdAip0g0oX',
                'isil_a': 'https://drive.google.com/drive/folders/1nXWjTRWoM8bBQ3I-K1TuNm2fuoK2ccIR',
                'acad_c': 'https://drive.google.com/drive/folders/1fpT9LIn5RK5V-85iM49YFAZ9uHJUL8mN',
                'acad_b': 'https://drive.google.com/drive/folders/1s8ZhVPD8nBbmhqFIHQSWRW7hP-jdlmhY',
                'acad_a': 'https://drive.google.com/drive/folders/1HyK6DQY9nGxqNty0FK8-WZDhW39S5jpF',
            },
        },
        '2024/2025': {
            's5': {
                'isil_a': 'https://drive.google.com/drive/u/1/folders/1KsHn0KO2j1sbUJRSWs72UQJcB5STuzfh',
                'isil_b': 'https://drive.google.com/drive/u/1/folders/1UUHbui1E3qWvfME6UunRw80gS8WhGO2z',
                'acad_a': 'https://drive.google.com/drive/u/1/folders/1RoMzavo7NTkU8SIVVpwRAjhcHvbLiDSw',
                'acad_b': 'https://drive.google.com/drive/u/1/folders/1m7ygZ3f91IAPDun3CLkQq55sJbopIlhl',
                'acad_c': 'https://drive.google.com/drive/u/1/folders/1FJ4ix7P9ujr2IajcCtid9PGiBtHhl6l1',
            },
            's6': {
                'isil_a': 'https://drive.google.com/drive/u/1/folders/1K5JK3W6HQjBNEQTx4Hwd5fTPsVbaBPN7',
                'isil_b': 'https://drive.google.com/drive/u/1/folders/1MB_VIIMEGx43a38uqrPNj8x__issuhuS',
            },
        },
    }

    for year_label, sems in drive_links.items():
        ay = year_map.get(year_label)
        if not ay:
            continue
        for sem_key, specs in sems.items():
            for spec_key, url in specs.items():
                CourseDriveLink.objects.get_or_create(
                    academic_year=ay,
                    semester=sem_key,
                    specialization=spec_key,
                    defaults={'url': url},
                )

    # 3) Exam resources (from previous frontend)
    exams = {
        'isil': [
            { 'name': 'Génie Logiciel 2', 'url': 'https://drive.google.com/drive/folders/1jIsqQ0BkFxTPmuwkMdz4jHWKFmv-4CGP', 'color': 'from-blue-500 to-indigo-500' },
            { 'name': "Système d'Exploitation 2", 'url': 'https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1', 'color': 'from-green-500 to-emerald-500' },
            { 'name': 'Base de Données 2', 'url': 'https://drive.google.com/drive/folders/1okK0QiXtTTHmdGeFDTcfUxI4AZ5qNq6_', 'color': 'from-purple-500 to-pink-500' },
            { 'name': "Système d'Informatique 2", 'url': 'https://drive.google.com/drive/folders/1qxTYiMMlvOcVrUOl2zWVuMHxHulS-0qQ', 'color': 'from-orange-500 to-red-500' },
            { 'name': 'Réseaux 1', 'url': 'https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0', 'color': 'from-cyan-500 to-blue-500' },
            { 'name': 'Compilation', 'url': 'https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2', 'color': 'from-indigo-500 to-purple-500' },
        ],
        'acad': [
            { 'name': 'Théorie de Graphe', 'url': 'https://drive.google.com/drive/folders/1bk1WqjIljIUKrYqpIo7kctetD6ixNjXq', 'color': 'from-emerald-500 to-teal-500' },
            { 'name': "Système d'Exploitation 2", 'url': 'https://drive.google.com/drive/folders/1Meq9p2v08Vc-vljtDHbp8XzpoIq7CEL1', 'color': 'from-green-500 to-emerald-500' },
            { 'name': 'Réseaux', 'url': 'https://drive.google.com/drive/folders/1yoq6V6W0FvktJ4RgjO_3uhRdJEwJwvg0', 'color': 'from-cyan-500 to-blue-500' },
            { 'name': 'Génie Logiciel', 'url': 'https://drive.google.com/drive/folders/1F69Eif1Hyp5ubziUBCWm_O_TzVIkGWV_', 'color': 'from-blue-500 to-indigo-500' },
            { 'name': 'Compilation', 'url': 'https://drive.google.com/drive/folders/1Lx-yQvpCv7T9b-8XJflRGxG7tS3cKLd2', 'color': 'from-indigo-500 to-purple-500' },
        ],
    }
    for spec, items in exams.items():
        for it in items:
            ExamResource.objects.get_or_create(
                name=it['name'], specialization=spec, defaults={'url': it['url']}
            )

    # 4) Courses and video playlists (from previous frontend courseData)
    course_data = {
        'isil': {
            's5': [
                {
                    'name': 'Compilation',
                    'videoPlaylists': [
                        { 'title': 'Compilation Playlist 1', 'url': 'https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn' },
                        { 'title': 'Compilation Playlist 2', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5' },
                    ],
                },
                {
                    'name': 'Réseaux',
                    'videoPlaylists': [
                        { 'title': 'Réseaux Playlist 1', 'url': 'https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi' },
                        { 'title': 'Réseaux Playlist 2', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXwL_bVZ29SSIBn' },
                        { 'title': 'Réseaux Playlist 3', 'url': 'https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl' },
                    ],
                },
                {
                    'name': 'Génie Logiciel 2',
                    'videoPlaylists': [
                        { 'title': 'Génie Logiciel 2 Playlist', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIt6kFEr8fOEbY0uJZoIU8MH&si=gt_EpBvg97CAsUhj' },
                    ],
                },
                {
                    'name': "Système d'Exploitation 2",
                    'videoPlaylists': [
                        { 'title': "Système d'Exploitation 2 Playlist 1", 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw' },
                        { 'title': "Système d'Exploitation 2 Playlist 2", 'url': 'https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc' },
                    ],
                },
                {
                    'name': 'Base de Données 2',
                    'videoPlaylists': [
                        { 'title': 'Base de Données 2 Playlist', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIskDw1qPO-G8ZUyyAOiYYTm&si=2CerZpqmnP4plJh9' },
                    ],
                },
                {
                    'name': "Système d'Informatique 2",
                    'videoPlaylists': [
                        { 'title': "Système d'Informatique 2 Playlist 1", 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIvK46CtzzjmmreYAHFeas99&si=hOilJfNf6s5nrD4u' },
                        { 'title': "Système d'Informatique 2 Playlist 2", 'url': 'https://youtube.com/playlist?list=PLx9305BZWH0QuEQcG-5qzpBGFfC0r_QmR&si=hL1a4t3l7LJKBbBS' },
                    ],
                },
            ],
            's6': [
                { 'name': 'ORAD', 'videoPlaylists': [] },
                {
                    'name': 'Réseaux 2',
                    'videoPlaylists': [
                        { 'title': 'Réseaux 2 Playlist', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIteBeqC80ZVch3TJVdiOrev&si=HwUrsAoYNrkZXrG7' },
                    ],
                },
                { 'name': 'PFE', 'videoPlaylists': [] },
                {
                    'name': 'Génie Logiciel 3',
                    'videoPlaylists': [
                        { 'title': 'Génie Logiciel 3 Playlist', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIt4WzPPVYGbGe8zRaxXnUao&si=eaafZGDc5z0FhY34' },
                    ],
                },
            ],
        },
        'acad': {
            's5': [
                {
                    'name': 'Théorie des Graphes',
                    'videoPlaylists': [
                        { 'title': 'Théorie des Graphes Playlist 1', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzFWmq9d0ETF4IDkJWm_1umE&si=kWedENK4Q33M6uzs' },
                        { 'title': 'Théorie des Graphes Playlist 2', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIsiJFlOYOsNGbeNuP8IS8-o&si=IdqithvB0Q2qulB9' },
                        { 'title': 'Théorie des Graphes Playlist 3', 'url': 'https://youtube.com/playlist?list=PLx9305BZWH0Qws8o7z9vkK9EtLUJM_OHJ&si=k2LZViSAyyyQ1qyI' },
                    ],
                },
                {
                    'name': "Système d'Exploitation 2",
                    'videoPlaylists': [
                        { 'title': "Système d'Exploitation 2 Playlist 1", 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzHAB52EQKetfRFm5tZbrGRC&si=d7cFliStFy7QHgUw' },
                        { 'title': "Système d'Exploitation 2 Playlist 2", 'url': 'https://youtube.com/playlist?list=PLx9305BZWH0QKonjijZcCZAwuV24_MPZN&si=RNP0C1c31IawUBxc' },
                    ],
                },
                {
                    'name': 'Réseaux',
                    'videoPlaylists': [
                        { 'title': 'Réseaux Playlist 1', 'url': 'https://youtube.com/playlist?list=PLx9305BZWH0QMgCSQnxozrG5-baIrj0Vd&si=GAl7ICVIvQlm2ohi' },
                        { 'title': 'Réseaux Playlist 2', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzEAG7j0_9Tq7zt5H_0ZzR5X&si=5xXWl_bVZ29SSIBn'.replace('l_', 'L_') },
                        { 'title': 'Réseaux Playlist 3', 'url': 'https://youtube.com/playlist?list=PLSENmhglzJjR10lPQk8HOXYADlHqivX9e&si=KrMiCX2otNd19nJl' },
                    ],
                },
                {
                    'name': 'Génie Logiciel',
                    'videoPlaylists': [
                        { 'title': 'Génie Logiciel Playlist 1', 'url': 'https://youtube.com/playlist?list=PLSENmhglzJjRo7ziNTHkAq9YTezFxtYob&si=Kn41fref4nmf-1y1' },
                        { 'title': 'Génie Logiciel Playlist 2', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzFgIsYqB7wXQxrqcWyylFxc&si=vKcgnkSm6-3kGp2o' },
                        { 'title': 'Génie Logiciel Playlist 3', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPItQz1M8XymauMPF7q2zf2AZ&si=aCHTNU4gqTmU1_E3' },
                    ],
                },
                {
                    'name': 'Compilation',
                    'videoPlaylists': [
                        { 'title': 'Compilation Playlist 1', 'url': 'https://youtube.com/playlist?list=PLSENmhglzJjRNT4RlXr8lB9LbZjcB2Wgl&si=cXjc7iO5bkGSUoZn' },
                        { 'title': 'Compilation Playlist 2', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzHbl_oKYcEN8dje_woFTORi&si=RsctQZ67TIxdy6T5' },
                    ],
                },
                {
                    'name': 'Anglais 3',
                    'videoPlaylists': [
                        { 'title': 'Anglais 3 Playlist', 'url': 'https://youtube.com/playlist?list=PLQyCQ7CblbzHf9_j0j5Y9oUiyYcScd8VC&si=sER3yR3XHzB6zc2z' },
                    ],
                },
            ],
            's6': [
                {
                    'name': 'Programmation Web',
                    'videoPlaylists': [
                        { 'title': 'Programmation Web Playlist 1', 'url': 'https://youtube.com/playlist?list=PLbpBG2OLEPIu59JDvKzkJGtBAdZNdZ5mu&si=noi48A9WWXDTKNdF' },
                        { 'title': 'Programmation Web Playlist 2', 'url': 'https://youtube.com/playlist?list=PLSENmhglzJjTk1cfzvCsWrxKng1GTkOxn&si=IcaL2OJgXDfkHfFb' },
                    ],
                },
                { 'name': 'Doc STR', 'videoPlaylists': [] },
                { 'name': 'PFP', 'videoPlaylists': [] },
                { 'name': 'Admin', 'videoPlaylists': [] },
            ],
        },
    }

    for spec, sems in course_data.items():
        for sem, courses in sems.items():
            for c in courses:
                course, _ = Course.objects.get_or_create(
                    name=c['name'], specialization=spec, semester=sem
                )
                for vp in c.get('videoPlaylists', []):
                    VideoPlaylist.objects.get_or_create(
                        course=course, title=vp['title'], defaults={'url': vp['url']}
                    )

    # 5) Discord invite (site settings)
    SiteSettings.objects.get_or_create(
        discord_invite_url='https://discord.gg/Ef5eeQQpnk'
    )


def unseed_data(apps, schema_editor):
    # Keep data; no-op on reverse
    pass


class Migration(migrations.Migration):
    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_data, unseed_data),
    ]


