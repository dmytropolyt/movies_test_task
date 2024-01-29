import pytest

from django.urls import reverse


@pytest.mark.django_db
class TestReviewAPI:

    def test_create_review(self, api_client_auth, user_auth, movie_factory):
        url = reverse('review-list')
        movie = movie_factory.create()

        test_data = {'movie': movie.pk, 'comment': 'test', 'rating': 4}

        response = api_client_auth.post(url, test_data)
        response_content = response.json()

        assert response.status_code == 201
        assert response_content['user'] == user_auth.username
        for key in test_data:
            assert response_content[key] == test_data[key]

    def test_update_review(self, api_client_auth, user_auth,
                           review_factory, movie_factory):
        review = review_factory.create(user=user_auth)
        new_movie = movie_factory.create()
        url = reverse('review-detail', kwargs={'pk': review.pk})

        update_data = {'movie': new_movie.pk, 'comment': 'test', 'rating': 4}
        response = api_client_auth.put(url, update_data)
        response_content = response.json()

        assert response.status_code == 200
        for key in update_data:
            assert response_content[key] == update_data[key]

    def test_partial_update_review(self, api_client_auth,
                                   user_auth, review_factory):
        review = review_factory.create(user=user_auth)
        url = reverse('review-detail', kwargs={'pk': review.pk})

        update_data = {'comment': 'test'}
        response = api_client_auth.patch(url, update_data)
        response_content = response.json()

        assert response.status_code == 200
        for key in update_data:
            assert response_content[key] == update_data[key]

    def test_destroy_review(self, api_client_auth, user_auth, review_factory):
        review = review_factory.create(user=user_auth)
        url = reverse('review-detail', kwargs={'pk': review.pk})

        response = api_client_auth.delete(url)

        assert response.status_code == 204
