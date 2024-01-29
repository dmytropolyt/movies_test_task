import pytest

from django.urls import reverse

from discussions.models import Comment, Discussion


@pytest.mark.django_db
class TestCommentAPI:
    model = Comment

    def test_create_comment(self, api_client_auth, movie_factory):
        url = reverse('comment-list')
        discussion = movie_factory.create().discussion_board.pk

        test_data = {'discussion': discussion, 'text': 'test'}

        response = api_client_auth.post(url, test_data)
        response_content = response.json()

        assert response.status_code == 201
        for key in test_data:
            assert response_content[key] == test_data[key]

    def test_retrieve_comment(self, api_client_auth, user_auth, movie_factory):
        discussion_pk = movie_factory.create().discussion_board.pk
        discussion = Discussion.objects.get(pk=discussion_pk)
        comment = self.model.objects.create(discussion=discussion, text='test', user=user_auth)
        url = reverse('comment-detail', kwargs={'pk': comment.pk})

        response = api_client_auth.get(url)
        response_content = response.json()

        assert response.status_code == 200
        assert response_content['discussion'] == comment.discussion.pk
        assert response_content['text'] == comment.text
        assert response_content['user'] == comment.user.username

    def test_update_comment(self, api_client_auth, user_auth,
                            movie_factory):
        discussion_pk = movie_factory.create().discussion_board.pk
        discussion = Discussion.objects.get(pk=discussion_pk)
        comment = self.model.objects.create(discussion=discussion, text='test', user=user_auth)
        url = reverse('comment-detail', kwargs={'pk': comment.pk})

        test_data = {'discussion': discussion.pk, 'text': 'update'}

        response = api_client_auth.put(url, test_data)
        response_content = response.json()

        assert response.status_code == 200
        for key in test_data:
            assert response_content[key] == test_data[key]

    def test_partial_update_comment(self, user_auth,
                                    api_client_auth, movie_factory):
        discussion_pk = movie_factory.create().discussion_board.pk
        discussion = Discussion.objects.get(pk=discussion_pk)
        comment = self.model.objects.create(discussion=discussion, text='test', user=user_auth)
        url = reverse('comment-detail', kwargs={'pk': comment.pk})

        test_data = {'text': 'update'}

        response = api_client_auth.patch(url, test_data)
        response_content = response.json()

        assert response.status_code == 200
        for key in test_data:
            assert response_content[key] == test_data[key]

    def test_destroy_comment(self, user_auth,
                             api_client_auth, movie_factory):
        discussion_pk = movie_factory.create().discussion_board.pk
        discussion = Discussion.objects.get(pk=discussion_pk)
        comment = self.model.objects.create(discussion=discussion, text='test', user=user_auth)
        url = reverse('comment-detail', kwargs={'pk': comment.pk})

        response = api_client_auth.delete(url)

        assert response.status_code == 204
