import rest_framework.utils.serializer_helpers
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User

from .views import UserModelViewSet
from .models import TodoUser
from collections import OrderedDict


class TestUserViewSet(TestCase):

    url = '/api/users'

    def setUp(self) -> None:
        pass

    def test_get_list_factory(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_apiclient(self):
        client = APIClient()
        user = TodoUser.objects.create(username='username', first_name='first_name',
                                       last_name='last_name', email='gxcc@sdasd')
        response = client.get(f'{self.url}/{user.pk}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(
            self.url, {'username': 'username', 'email': 'test@test'}, format='json')
        view = UserModelViewSet.as_view({'post': 'update'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post(
            self.url, {'username': 'username', 'first_name': 'first_name',
                       'last_name': 'last_name', 'email': 'test@test'},
            format='json'
        )
        admin = TodoUser.objects.create_superuser('admin2', 'idi@amin' '1')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_guest(self):
        client = APIClient()
        user = TodoUser.objects.create(username='username', first_name='first_name',
                                       last_name='last_name', email='gxcc@sdasd')
        response = client.put(f'{self.url}/{user.id}/',
                              {'username': 'new_username'})

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        client = APIClient()
        admin = TodoUser.objects.create_superuser('admin2', 'idi@amin' '1')
        user = TodoUser.objects.create(username='old', first_name='old',
                                       last_name='old', email='old@old')
        client.force_login(admin)
        response = client.put(f'{self.url}/{user.id}/',
                              {'username': 'NEW', 'first_name': 'NEW',
                               'last_name': 'NEW', 'email': 'NEW@NEW'})
        updated_user = TodoUser.objects.get(id=user.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(updated_user.username, 'NEW')
        self.assertEqual(updated_user.first_name, 'NEW')
        self.assertEqual(updated_user.email, 'NEW@NEW')

        self.client.logout()

    def test_create_admin_without_email(self):
        factory = APIRequestFactory()
        request = factory.post(
            self.url, {'username': 'username',
                       'first_name': 'first_name', 'last_name': 'last_name'},
            format='json'
        )
        admin = TodoUser.objects.create_superuser('admin2', 'idi@amin' '1')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_admin_same_email(self):
        factory = APIRequestFactory()
        admin = TodoUser.objects.create_superuser('admin2', 'idi@amin' '1')
        first_request = factory.post(
            self.url, {'username': 'SAME', 'first_name': 'first_name',
                       'last_name': 'last_name', 'email': 'SAME@email'},
            format='json'
        )
        second_request = factory.post(
            self.url, {'username': 'SAME', 'first_name': '2first_name2',
                       'last_name': '2last_name2', 'email': 'SAME@email'},
            format='json'
        )
        force_authenticate(first_request, admin)
        force_authenticate(second_request, admin)

        view = UserModelViewSet.as_view({'post': 'create'})
        first_response = view(first_request)
        second_response = view(second_request)

        self.assertEqual(first_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(second_response.status_code,
                         status.HTTP_400_BAD_REQUEST)
        # проверяю, что запрос отвергнут по одинаковым ключам
        self.assertEqual(list(second_response.data.keys()),
                         ['username', 'email'])

        self.client.logout()

    def tearDown(self) -> None:
        pass
