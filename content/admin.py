from django.contrib import admin
from .models import SiteSettings, CourseDriveLink, Course, VideoPlaylist, ExamResource, SummaryResource


@admin.register(CourseDriveLink)
class CourseDriveLinkAdmin(admin.ModelAdmin):
    list_display = ("start_year", "end_year", "semester", "specialization", "url")
    list_filter = ("start_year", "end_year", "semester", "specialization")
    search_fields = ("start_year", "end_year", "url")
    fields = ("start_year", "end_year", "semester", "specialization", "url")


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


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("discord_invite_url", "updated_at")
