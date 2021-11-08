from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, TodoFilter
from rest_framework.response import Response
from rest_framework import status


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_class = TodoFilter
    pagination_class = TodoLimitOffsetPagination

    def destroy(self, request, pk=None):
        instance = self.get_object()
        instance.is_active = False
        instance.save()

        response = {'message': 'ToDo set to inactive.'}
        return Response(response, status=status.HTTP_200_OK)
