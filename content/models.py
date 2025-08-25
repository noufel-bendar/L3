from django.db import models


class AcademicYear(models.Model):
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField()
    drive_link = models.URLField(help_text="Google Drive folder link for this academic year")

    class Meta:
        unique_together = ("start_year", "end_year")
        ordering = ["-start_year"]

    def __str__(self) -> str:
        return f"{self.start_year}-{self.end_year}"


class Lesson(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    youtube_url = models.URLField(blank=True)
    academic_year = models.ForeignKey(
        AcademicYear, related_name="lessons", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class SiteSettings(models.Model):
    discord_invite_url = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Site settings"

    def __str__(self) -> str:
        return "Site Settings"


class CourseDriveLink(models.Model):
    class Semester(models.TextChoices):
        S5 = "s5", "S5"
        S6 = "s6", "S6"

    class Specialization(models.TextChoices):
        ISIL_A = "isil_a", "ISIL A"
        ISIL_B = "isil_b", "ISIL B"
        ACAD_A = "acad_a", "ACAD A"
        ACAD_B = "acad_b", "ACAD B"
        ACAD_C = "acad_c", "ACAD C"

    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name="drive_links")
    semester = models.CharField(max_length=8, choices=Semester.choices)
    specialization = models.CharField(max_length=16, choices=Specialization.choices)
    url = models.URLField()

    class Meta:
        unique_together = ("academic_year", "semester", "specialization")
        ordering = ["-academic_year__start_year", "semester", "specialization"]

    def __str__(self) -> str:
        return f"{self.academic_year} {self.semester} {self.specialization}"


class Course(models.Model):
    class Semester(models.TextChoices):
        S5 = "s5", "S5"
        S6 = "s6", "S6"

    class Specialization(models.TextChoices):
        ISIL = "isil", "ISIL"
        ACAD = "acad", "ACAD"

    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=8, choices=Specialization.choices)
    semester = models.CharField(max_length=8, choices=Semester.choices)

    class Meta:
        unique_together = ("name", "specialization", "semester")
        ordering = ["specialization", "semester", "name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.specialization.upper()} {self.semester.upper()})"


class VideoPlaylist(models.Model):
    course = models.ForeignKey(Course, related_name="video_playlists", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self) -> str:
        return f"{self.title}"


class ExamResource(models.Model):
    class Specialization(models.TextChoices):
        ISIL = "isil", "ISIL"
        ACAD = "acad", "ACAD"

    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=8, choices=Specialization.choices)
    url = models.URLField()

    class Meta:
        unique_together = ("name", "specialization")
        ordering = ["specialization", "name"]

    def __str__(self) -> str:
        return f"{self.name} ({self.specialization})"


class SummaryResource(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()

    class Meta:
        ordering = ["title"]

    def __str__(self) -> str:
        return self.title
