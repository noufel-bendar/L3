from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from .models import SiteSettings, CourseDriveLink, Course, VideoPlaylist, ExamResource, SummaryResource
from .serializers import SiteSettingsSerializer, CourseDriveLinkSerializer, CourseSerializer, VideoPlaylistSerializer, ExamResourceSerializer, SummaryResourceSerializer
from .permissions import ReadOnlyOrAdmin


class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer
    permission_classes = [ReadOnlyOrAdmin]


class CourseDriveLinkViewSet(viewsets.ModelViewSet):
    queryset = CourseDriveLink.objects.all()
    serializer_class = CourseDriveLinkSerializer
    permission_classes = [ReadOnlyOrAdmin]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().prefetch_related("video_playlists")
    serializer_class = CourseSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['specialization', 'semester']
    ordering = ['specialization', 'semester', 'display_order', 'name']


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
