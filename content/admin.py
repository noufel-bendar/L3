from django.contrib import admin
from .models import AcademicYear, Lesson, SiteSettings, CourseDriveLink, Course, VideoPlaylist, ExamResource, SummaryResource


@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    list_display = ("start_year", "end_year", "drive_link")
    list_filter = ("start_year", "end_year")
    search_fields = ("start_year", "end_year")


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "academic_year", "created_at")
    list_filter = ("academic_year",)
    search_fields = ("title", "description")
    autocomplete_fields = ("academic_year",)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("discord_invite_url", "updated_at")


@admin.register(CourseDriveLink)
class CourseDriveLinkAdmin(admin.ModelAdmin):
    list_display = ("academic_year", "semester", "specialization", "url")
    list_filter = ("semester", "specialization", "academic_year")
    search_fields = ("url",)
    autocomplete_fields = ("academic_year",)


class VideoPlaylistInline(admin.TabularInline):
    model = VideoPlaylist
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("name", "specialization", "semester")
    list_filter = ("specialization", "semester")
    search_fields = ("name",)
    inlines = [VideoPlaylistInline]


@admin.register(ExamResource)
class ExamResourceAdmin(admin.ModelAdmin):
    list_display = ("name", "specialization", "url")
    list_filter = ("specialization",)
    search_fields = ("name",)


@admin.register(SummaryResource)
class SummaryResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "url")
    search_fields = ("title",)

# Register your models here.
