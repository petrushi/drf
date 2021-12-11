from django.core.management.base import BaseCommand, CommandError
from users.models import TodoUser
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = 'Команда создает суперпользователя и несколько тестовых пользователей.'

    def _get_username_and_password(self):
        username = input('Введите имя суперпользователя:')
        password = input('Введите пароль суперпользователя:')
        email = input('Введите е-мейл:')
        return username, password, email

    def _require_identical_configuration(self, user, password, email):
        if not user.check_password(password):
            raise CommandError(
                f'Пользователь {user.username} существует с другим паролем.')

        if user.email != email:
            raise CommandError(
                f'Пользователь {user.username} существует с другим е-мейл адресом')

        if not user.is_superuser:
            raise CommandError(
                f'Пользователь {user.username} существует, но без прав суперпользователя.')

    def _create_new_superuser(self, username, password, email):
        return TodoUser.objects.create_superuser(username=username,
                                                 password=password,
                                                 email=email)

    def _get_test_users(self):
        while True:
            test_users = input(
                'Введите количество пользователей(по умолчанию 3): ')
            if test_users == '':
                test_users = 3
                break
            else:
                try:
                    test_users = int(test_users)
                    break
                except TypeError:
                    print('Введите число')
                    continue
        return test_users

    def handle(self, *args, **options):
        print(self.help)
        username, password, email = self._get_username_and_password()

        try:
            user = TodoUser.objects.get(username=username)
        except TodoUser.DoesNotExist:
            try:
                user = self._create_new_superuser(username, password, email)
                user.save()
            except Exception as e:
                raise CommandError(
                    f'Не удалось создать суперпользователя: {e}')

            self.stdout.write(self.style.SUCCESS(
                f'Суперпользователь "{username}" создан.'))
        else:
            self._require_identical_configuration(user, password, email)
            self.stdout.write(self.style.SUCCESS(
                f'Суперпользователь {username} уже существует.'))

        desired_test_users = self._get_test_users()
        test_user_idx, created_users = 0, 0

        while created_users < desired_test_users:
            try:
                TodoUser.objects.create_user(username=f'test_user_{test_user_idx}',
                                             email=f'{test_user_idx}@fake.email')
                created_users += 1
            except IntegrityError:
                test_user_idx += 1
                continue
