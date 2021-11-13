from django.db import models
from django.contrib.auth.models import AbstractUser


class TodoUser(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.CharField(max_length=256, unique=True)
