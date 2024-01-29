import pytest

from django.urls import reverse


@pytest.mark.django_db
class TestDiscussionAPI:

    def test_list_discussion(self, api_client_auth, movie_factory):
        url = reverse('discussion-list')
        movie_factory.create_batch(5)

        response = api_client_auth.get(url)

        assert response.status_code == 200
        assert len(response.json()) == 5

    def test_retrieve_discussion(self, api_client_auth, movie_factory):
        movie = movie_factory.create()
        discussion = movie.discussion_board.pk
        url = reverse('discussion-detail', kwargs={'pk': discussion})

        response = api_client_auth.get(url)
        response_content = response.json()

        assert response.status_code == 200
        assert response_content['id'] == discussion
        assert response_content['title'] == movie.title
