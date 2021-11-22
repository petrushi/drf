from django.db import models
from users.models import TodoUser


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField(max_length=200)
    users = models.ManyToManyField(TodoUser, blank=True)

    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    author = models.ForeignKey(TodoUser, models.PROTECT)
    text = models.TextField(max_length=1024)
    is_active = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
