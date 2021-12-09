import os
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Удаляет все миграции.'

    def handle(self, *args, **options):
        os.system('find . -path "*/migrations/*.pyc"  -delete')
        os.system(
            'find . -path "*/migrations/00*.py" -not -name "__init__.py" -delete')
