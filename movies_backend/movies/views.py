from rest_framework import viewsets, mixins
from rest_framework import permissions

from .models import Movie, Review
from .serializers import (
    MovieSerializer, MovieDetailSerializer,
    ReviewSerializer)
from .permissions import IsReviewOwner


class MovieViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [permissions.AllowAny]
    serializer_class = MovieSerializer
    queryset = Movie.objects.all()

    def get_serializer_class(self):
        if self.action != 'list':
            return MovieDetailSerializer
        return super().get_serializer_class()


class ReviewViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet
):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated, IsReviewOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
