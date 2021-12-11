import graphene
from graphene_django.types import DjangoObjectType
from project.models import Project, Todo
from users.models import TodoUser


class UserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):

    all_todos = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(root, info, id=None):
        if id:
            return TodoUser.objects.get(id=id)
        return TodoUser.objects.all()

    todos_by_author = graphene.List(
        TodoType, username=graphene.String(required=False))

    def resolve_todos_by_author(self, info, username=None):
        todos = Todo.objects.all()
        if username:
            todos = todos.filter(author__username=username)
        return todos

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


class TodoUpdateMutation(graphene.Mutation):
    class Arguments:
        is_active = graphene.Boolean(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(self, root, info, is_active, id):
        todo = Todo.objects.get(id=id)
        todo.is_active = is_active
        todo.save()
        return TodoUpdateMutation(todo=todo)


class Mutations(graphene.ObjectType):
    update_todo = TodoUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
