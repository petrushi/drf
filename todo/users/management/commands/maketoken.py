import requests
from django.core.management import BaseCommand


class Command(BaseCommand):
    help = """
    Команда создает токен для пользователя. 
    Формат - "python manage.py maketoken *username* *password*".
    """

    def add_arguments(self, parser):
        parser.add_argument('username')
        parser.add_argument('password')

    def handle(self, *args, **options):
        print(options['username'], options['password'])
        r = requests.post('http://127.0.0.1:8000/api-token-auth/',
                          data={'username': options["username"],
                                'password': options["password"]})
        print(r.text)
