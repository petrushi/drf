from django.core.management import BaseCommand
from users.models import TodoUser
from django.db.utils import IntegrityError


class Command(BaseCommand):
    def handle(self, *args, **options):

        while True:
            try:
                username = input('username: ')
                password = input('password: ')
                email = input('email:')
                new_user = TodoUser.objects.create_user(username,
                                                        password=password,
                                                        email=email)
                break
            except IntegrityError as e:
                print(e)

        # username.set_password('1')
        new_user.save()
        print('New user created')
