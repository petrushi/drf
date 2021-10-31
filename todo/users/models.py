from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    birth_year = models.PositiveIntegerField()
    email = models.CharField(max_length=256, unique=True)