import django_filters.rest_framework

from rest_framework import mixins, viewsets, permissions

from .models import Discussion, Comment
from .serializers import DiscussionSerializer, CommentSerializer
from .permissions import IsCommentOwner


class DiscussionViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [permissions.AllowAny]
    queryset = Discussion.objects.all()
    serializer_class = DiscussionSerializer


class CommentViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    queryset = Comment.objects.all().order_by('created_at')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsCommentOwner]
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['created_at']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
