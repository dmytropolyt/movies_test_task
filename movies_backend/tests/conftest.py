import pytest
from pytest_factoryboy import register


from . import factories

register(factories.UserFactory)
register(factories.DirectorFactory)
register(factories.ActorFactory)
register(factories.MovieFactory)
register(factories.ReviewFactory)
register(factories.DiscussionFactory)
register(factories.CommentFactory)


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def user_auth(user_factory):
    user = user_factory.create(username='Test')

    return user


@pytest.fixture
def api_client_auth(api_client, user_auth):
    api_client.force_authenticate(user_auth)

    return api_client
