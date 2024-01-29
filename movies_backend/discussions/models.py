from django.db import models
from django.contrib.auth import get_user_model

from movies.models import Movie

User = get_user_model()


class Discussion(models.Model):
    movie = models.OneToOneField(
        Movie, on_delete=models.CASCADE,
        related_name='discussion_board'
    )

    def __str__(self):
        return f'Discussion - {self.movie.title}'


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    discussion = models.ForeignKey(
        Discussion, on_delete=models.CASCADE,
        related_name='comments'
    )
    text = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
