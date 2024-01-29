import os

from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator

from PIL import Image

User = get_user_model()


class Movie(models.Model):
    def image_upload_to(self, instance=None):
        if instance:
            return os.path.join(
                'posters', str(self.title),
                 str(self.release_year), instance
            )

    title = models.CharField(max_length=60)
    description = models.TextField(max_length=255)
    poster = models.ImageField(upload_to=image_upload_to, null=True, blank=True)
    director = models.ForeignKey('Director', on_delete=models.CASCADE)
    release_year = models.DateField(null=False)

    def save(self, *args, **kwargs):
        super().save()

        img = Image.open(self.poster.path)
        img_height = 500 * 1.5
        img_width = 500

        if img.height > img_height or img.width > img_width:
            img.thumbnail((img_height, img_width))
            img.save(self.poster.path)

    def __str__(self):
        return f'{self.title} - {self.release_year}'


class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    class Meta:
        abstract = True

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.full_name()


class Director(Person):
    pass


class Actor(Person):
    movies = models.ManyToManyField('Movie', related_name='actors')


class Review(models.Model):
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, null=False, related_name='reviews', on_delete=models.CASCADE)
    comment = models.TextField(max_length=255)
    rating = models.PositiveIntegerField(validators=[MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'movie']

    def __str__(self):
        return f'{self.user.username} - {self.movie.title} - {self.rating}'
