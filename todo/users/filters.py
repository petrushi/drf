from django_filters import rest_framework as filters
from .models import User


class UserFilter(filters.FilterSet):
    id = filters.CharFilter(lookup_expr='contains')
    username = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = User
        fields = ['id']
        fields = ['username']
