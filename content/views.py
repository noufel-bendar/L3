from rest_framework import viewsets, permissions
from .models import AcademicYear, Lesson, SiteSettings, CourseDriveLink, Course, VideoPlaylist, ExamResource, SummaryResource
from .serializers import AcademicYearSerializer, LessonSerializer, SiteSettingsSerializer, CourseDriveLinkSerializer, CourseSerializer, VideoPlaylistSerializer, ExamResourceSerializer, SummaryResourceSerializer
from .permissions import ReadOnlyOrAdmin


class AcademicYearViewSet(viewsets.ModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer
    permission_classes = [ReadOnlyOrAdmin]


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.select_related("academic_year").all()
    serializer_class = LessonSerializer
    permission_classes = [ReadOnlyOrAdmin]


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [ReadOnlyOrAdmin]


class CourseDriveLinkViewSet(viewsets.ModelViewSet):
    queryset = CourseDriveLink.objects.select_related("academic_year").all()
    serializer_class = CourseDriveLinkSerializer
    permission_classes = [ReadOnlyOrAdmin]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().prefetch_related("video_playlists")
    serializer_class = CourseSerializer
    permission_classes = [ReadOnlyOrAdmin]


class VideoPlaylistViewSet(viewsets.ModelViewSet):
    queryset = VideoPlaylist.objects.select_related("course").all()
    serializer_class = VideoPlaylistSerializer
    permission_classes = [ReadOnlyOrAdmin]


class ExamResourceViewSet(viewsets.ModelViewSet):
    queryset = ExamResource.objects.all()
    serializer_class = ExamResourceSerializer
    permission_classes = [ReadOnlyOrAdmin]


class SummaryResourceViewSet(viewsets.ModelViewSet):
    queryset = SummaryResource.objects.all()
    serializer_class = SummaryResourceSerializer
    permission_classes = [ReadOnlyOrAdmin]

# Create your views here.
