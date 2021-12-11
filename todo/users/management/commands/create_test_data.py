from django.core.management.base import BaseCommand, CommandError
from users.models import TodoUser
from project.models import Project, Todo
import psycopg2


class Command(BaseCommand):
    help = 'Command creates dummy data.'

    def add_arguments(self, parser):
        parser.add_argument('username', nargs='+', type=str)
        parser.add_argument('password', nargs='+', type=str)
        parser.add_argument('email', nargs='+', type=str)

    def _require_identical_configuration(self, user, password, email):
        if not user.check_password(password):
            self.stdout.write(
                f'Пользователь {user.username} существует с другим паролем.')

        if user.email != email:
            self.stdout.write(
                f'Пользователь {user.username} существует с другим е-мейл адресом')

        if not user.is_superuser:
            self.stdout.write(
                f'{user.username} существует, но без прав суперпользователя.')

    def _create_new_superuser(self, username, password, email):
        return TodoUser.objects.create_superuser(username=username,
                                                 password=password,
                                                 email=email)

    def handle(self, *args, **options):

        username = options['username'][0]
        password = options['password'][0]
        email = options['email'][0]

        try:
            user = TodoUser.objects.get(username=username)
        except TodoUser.DoesNotExist:
            try:
                user = self._create_new_superuser(username, password, email)
                self.stdout.write(self.style.SUCCESS(
                    f'Суперпользователь "{username}" создан.'))
            except psycopg2.IntegrityError:
                self._require_identical_configuration(user, password, email)
                self.stdout.write(self.style.SUCCESS(
                    f'Суперпользователь {username} уже существует.'))

        desired_dummy = 3
        test_idx, created_users = 0, 0

        while created_users < desired_dummy:
            new_username = f'test_user_{test_idx}'
            new_email = f'{test_idx}@fake.email'
            try:
                user = TodoUser.objects.get(username=new_username)
                user = TodoUser.objects.get(email=new_email)
                test_idx += 1

            except TodoUser.DoesNotExist:
                user = TodoUser.objects.create_user(username=new_username,
                                                    email=new_email)
                created_users += 1
                pass
        self.stdout.write(f'Created {desired_dummy} test users')

        for i in range(desired_dummy):
            proj = Project.objects.create(
                name=f'test_project_{i}')
            proj.users.set(TodoUser.objects.all()[:desired_dummy-1])
            proj.save()

        for i in range(desired_dummy):
            todo = Todo.objects.create(text=f'test_todo_{i}',
                                       author=TodoUser.objects.all()[0],
                                       project=Project.objects.all()[0],
                                       is_active=True)
            todo.save()
