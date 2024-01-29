import factory

from django.contrib.auth import get_user_model

from movies.models import Movie, Person, Director, Actor, Review
from discussions.models import Discussion, Comment


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    username = factory.sequence(lambda n: f'Test{n}')
    password = 'testpass12'


class PersonFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Person

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')


class DirectorFactory(PersonFactory):
    class Meta:
        model = Director


class ActorFactory(PersonFactory):
    class Meta:
        model = Actor

    @factory.post_generation
    def movies(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for movie in extracted:
                self.movies.add(movie)


class MovieFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Movie

    title = factory.sequence(lambda n: f'Title #{n}')
    description = factory.sequence(lambda n: f'Description #{n}')
    poster = factory.django.ImageField(
        filename=factory.LazyAttribute(
            lambda x: f'image{x}.jpg'
        ), width=1024, height=768
    )
    director = factory.SubFactory(DirectorFactory)
    release_year = factory.Faker('date_this_decade')


class ReviewFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Review

    user = factory.SubFactory(UserFactory)
    movie = factory.SubFactory(MovieFactory)
    comment = factory.sequence(lambda n: f'Comment #{n}')
    rating = factory.Faker('random_int', min=1, max=5)
    created_at = factory.Faker('date_time_this_decade', tzinfo=None)


class DiscussionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Discussion

    movie = factory.SubFactory(MovieFactory)


class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    user = factory.SubFactory(UserFactory)
    discussion = factory.SubFactory(DiscussionFactory)
    text = factory.Faker('paragraph')
