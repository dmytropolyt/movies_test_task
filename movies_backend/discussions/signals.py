from django.db.models.signals import post_save
from django.dispatch import receiver

from movies.models import Movie
from .models import Discussion


@receiver(post_save, sender=Movie)
def create_discussion(sender, instance, created, **kwargs):
    if created:
        Discussion.objects.create(movie=instance)
