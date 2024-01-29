import pytest

from django.urls import reverse

from movies.models import Movie


@pytest.mark.django_db
class TestMovieAPI:
    model = Movie

    def test_list_movies(self, api_client, movie_factory):
        url = reverse('movie-list')
        movie_factory.create_batch(5)

        response = api_client.get(url)
        response_content = response.json()

        assert response.status_code == 200
        assert len(response_content) == 5

    def test_retrieve_movie(self, api_client, movie_factory):
        movie = movie_factory.create()
        url = reverse('movie-detail', kwargs={'pk': movie.pk})

        response = api_client.get(url)
        response_content = response.json()

        assert response.status_code == 200
        assert response_content['title'] == movie.title
        assert response_content['description'] == movie.description
        assert response_content['poster'] == f'http://testserver{movie.poster.url}'
        assert response_content['director'] == movie.director.full_name()
