from django_filters import rest_framework as filters
# from .models import Project, Todo


# class ProjectFilter(filters.FilterSet):
#     name = filters.CharFilter(lookup_expr='contains')

#     class Meta:
#         model = Project
#         fields = ['name']


# class TodoFilter(filters.FilterSet):
#     project = filters.ModelChoiceFilter(queryset=Project.objects.all())
#     created_at = filters.DateFromToRangeFilter()

#     class Meta:
#         model = Todo
#         fields = ['project', 'created_at']
