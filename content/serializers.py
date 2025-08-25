from rest_framework import serializers
from .models import AcademicYear, Lesson, SiteSettings, CourseDriveLink, Course, VideoPlaylist, ExamResource, SummaryResource


class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = ["id", "start_year", "end_year", "drive_link"]


class LessonSerializer(serializers.ModelSerializer):
    academic_year = AcademicYearSerializer(read_only=True)
    academic_year_id = serializers.PrimaryKeyRelatedField(
        queryset=AcademicYear.objects.all(), source="academic_year", write_only=True
    )

    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "description",
            "youtube_url",
            "academic_year",
            "academic_year_id",
            "created_at",
            "updated_at",
        ]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["id", "discord_invite_url", "updated_at"]


class CourseDriveLinkSerializer(serializers.ModelSerializer):
    academic_year = AcademicYearSerializer(read_only=True)
    academic_year_id = serializers.PrimaryKeyRelatedField(
        queryset=AcademicYear.objects.all(), source="academic_year", write_only=True
    )

    class Meta:
        model = CourseDriveLink
        fields = [
            "id",
            "academic_year",
            "academic_year_id",
            "semester",
            "specialization",
            "url",
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

