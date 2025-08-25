from django.db import models


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
        ISIL_C = "isil_c", "ISIL C"
        ACAD_A = "acad_a", "ACAD A"
        ACAD_B = "acad_b", "ACAD B"
        ACAD_C = "acad_c", "ACAD C"

    start_year = models.PositiveIntegerField(help_text="Start year (e.g., 2025)")
    end_year = models.PositiveIntegerField(help_text="End year (e.g., 2026)")
    semester = models.CharField(max_length=8, choices=Semester.choices)
    specialization = models.CharField(max_length=16, choices=Specialization.choices)
    url = models.URLField()

    class Meta:
        unique_together = ("start_year", "end_year", "semester", "specialization")
        ordering = ["-start_year", "semester", "specialization"]

    def __str__(self) -> str:
        return f"{self.start_year}-{self.end_year} {self.semester} {self.specialization}"

    @property
    def academic_year_display(self):
        return f"{self.start_year}-{self.end_year}"


class Course(models.Model):
    class Semester(models.TextChoices):
        S5 = "s5", "S5"
        S6 = "s6", "S6"

    class Specialization(models.TextChoices):
        ISIL = "isil", "ISIL"
        ACAD = "acad", "ACAD"

    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=16, choices=Specialization.choices)
    semester = models.CharField(max_length=8, choices=Semester.choices)
    display_order = models.PositiveIntegerField(default=0, help_text="Order in which courses should appear")

    class Meta:
        unique_together = ("name", "specialization", "semester")
        ordering = ["specialization", "semester", "display_order", "name"]

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
    specialization = models.CharField(max_length=16, choices=Specialization.choices)
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
