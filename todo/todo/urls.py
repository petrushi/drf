from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from project.views import ProjectModelViewSet, TodoModelViewSet
from rest_framework import permissions
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter
from users.views import UserModelViewSet


schema_view = get_schema_view(
    openapi.Info(
        title='Todo',
        default_version='v2',
        description='Documentation for whole project',
        contact=openapi.Contact(email=''),
        license=openapi.License(name='MIT License'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny]
)
router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', TodoModelViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('swagger/', schema_view.with_ui('swagger')),
    path('swagger<str:format>/', schema_view.without_ui()),

    path('graphql/', (GraphQLView.as_view(graphiql=True))),
]
