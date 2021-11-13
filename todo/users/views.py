from .models import TodoUser
from .serializers import UserModelSerializer
from .filters import UserFilter
from rest_framework import viewsets, mixins


class UserModelViewSet(viewsets.GenericViewSet,
                       mixins.ListModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin):
    queryset = TodoUser.objects.all()
    serializer_class = UserModelSerializer
    filterset_class = UserFilter
