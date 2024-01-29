from django.urls import path, include

from rest_framework import routers

from .views import DiscussionViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(r'comment', CommentViewSet)
router.register(r'discussion', DiscussionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
