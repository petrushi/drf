from rest_framework.serializers import ModelSerializer

from .models import TodoUser


class UserModelSerializer(ModelSerializer):

    class Meta:
        model = TodoUser
        fields = ['id', 'url', 'username', 'first_name', 'last_name', 'email']


class UserModelSerializerExtended(ModelSerializer):

    class Meta:
        model = TodoUser
        fields = ['id', 'url', 'username', 'first_name',
                  'last_name', 'email', 'is_staff', 'is_superuser']
