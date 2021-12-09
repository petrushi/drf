from rest_framework import mixins, viewsets

# from .filters import UserFilter
# from .models import TodoUser
# from .serializers import UserModelSerializer, UserModelSerializerExtended


# class UserModelViewSet(viewsets.GenericViewSet,
#                        mixins.ListModelMixin,
#                        mixins.RetrieveModelMixin,
#                        mixins.UpdateModelMixin,
#                        mixins.CreateModelMixin):
#     queryset = TodoUser.objects.all()
#     filterset_class = UserFilter

#     def get_serializer_class(self):
#         if self.request.version == '2':
#             return UserModelSerializerExtended
#         return UserModelSerializer
