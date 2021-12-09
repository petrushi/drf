# import rest_framework.utils.serializer_helpers
# from django.test import TestCase
# from rest_framework import status
# from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
# from django.contrib.auth.models import User

# from .views import ProjectModelViewSet, TodoModelViewSet
# from .models import Project, Todo
# from collections import OrderedDict
# from users.models import TodoUser


# class TestProjectViewSet(APITestCase):

#     url = '/api/projects/'

#     def setUp(self) -> None:
#         pass

#     def test_get_list(self):
#         response = self.client.get(self.url)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_edit_admin(self):
#         project = Project.objects.create(
#             name='OLD', link='https://github.com')

#         admin = TodoUser.objects.create_superuser('admin2', 'idi@amin' '1')
#         self.client.force_login(admin)
#         response = self.client.put(f'{self.url}{project.id}/',
#                                    {'name': 'NEW', 'link': project.link})
#         updated_project = Project.objects.get(id=project.id)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(updated_project.name, 'NEW')

#         self.client.logout()

#     def tearDown(self) -> None:
#         pass


# class TestTodoViewSet(APITestCase):

#     url = '/api/todos/'

#     def setUp(self) -> None:
#         pass

#     def test_get_list(self):
#         response = self.client.get(self.url)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_detail(self):
#         todo = mixer.blend(Todo)
#         response = self.client.get(f'{self.url}{todo.id}/')

#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_edit_guest(self):
#         todo = mixer.blend(Todo)
#         response = self.client.put(
#             f'{self.url}{todo.id}/', {'text': 'new text'})

#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#     def test_edit_admin(self):
#         todo = mixer.blend(Todo, text='OLD')
#         admin = TodoUser.objects.create_superuser('admin2', 'idi@amin' '1')
#         self.client.force_login(admin)
#         put_response = self.client.put(
#             f'{self.url}{todo.id}/', {'text': 'NEW', 'project': todo.project.id, 'author': todo.author.id})
#         new_response = self.client.get(f'{self.url}{todo.id}/')

#         self.assertEqual(put_response.status_code, status.HTTP_200_OK)
#         self.assertEqual(new_response.data['text'], 'NEW')

#         self.client.logout()

#     def tearDown(self) -> None:
#         pass
