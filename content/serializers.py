from rest_framework import serializers
from .models import SiteSettings, CourseDriveLink, Course, VideoPlaylist, ExamResource, SummaryResource


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["id", "discord_invite_url", "updated_at"]


class CourseDriveLinkSerializer(serializers.ModelSerializer):
    academic_year_display = serializers.CharField(source='academic_year_display', read_only=True)

    class Meta:
        model = CourseDriveLink
        fields = [
            "id",
            "start_year",
            "end_year",
            "semester",
            "specialization",
            "url",
            "academic_year_display",
        ]


class VideoPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoPlaylist
        fields = ["id", "title", "url"]


class CourseSerializer(serializers.ModelSerializer):
    videoPlaylists = VideoPlaylistSerializer(source='video_playlists', many=True, read_only=True)

    class Meta:
        model = Course
        fields = ["id", "name", "specialization", "semester", "videoPlaylists"]


class ExamResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamResource
        fields = ["id", "name", "specialization", "url"]


class SummaryResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SummaryResource
        fields = ["id", "title", "url"]

