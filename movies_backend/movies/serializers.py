from rest_framework import serializers

from django.core.exceptions import ObjectDoesNotExist

from .models import (
    Movie, Actor, Director, Review,
    Person
)


class PersonSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = ['full_name']

    def get_full_name(self, obj):
        return obj.full_name()


class ActorSerializer(PersonSerializer):
    class Meta:
        model = Actor
        fields = ['full_name']


class DirectorSerializer(PersonSerializer):
    class Meta:
        model = Director
        fields = ['full_name']


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'movie', 'comment', 'rating', 'created_at']
        read_only_fields = ['user', 'created_at']


class MovieSerializer(serializers.ModelSerializer):
    director = serializers.StringRelatedField()
    actors = ActorSerializer(many=True)
    release_year = serializers.DateField(format='%Y-%m-%d')
    movie_url = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'description', 'poster',
            'director', 'actors', 'release_year',
            'movie_url'
        ]

    def get_movie_url(self, obj):
        return f'/movie/{obj.id}/'


class MovieDetailSerializer(MovieSerializer):
    reviews = ReviewSerializer(many=True)
    discussion_url = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'description', 'poster',
            'director', 'actors',
            'release_year', 'reviews', 'discussion_url'
        ]

    def get_discussion_url(self, obj):
        try:
            return f'/discussion/{obj.discussion_board.id}'
        except ObjectDoesNotExist:
            return None
