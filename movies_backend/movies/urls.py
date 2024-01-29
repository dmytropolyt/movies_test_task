from django.urls import path, include

from rest_framework import routers

from .views import MovieViewSet, ReviewViewSet

router = routers.DefaultRouter()
router.register(r'movie', MovieViewSet)
router.register(r'review', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
