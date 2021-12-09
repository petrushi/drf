from django.contrib import admin
from django.contrib.admin.sites import NotRegistered
from django.contrib.auth.admin import UserAdmin
from .models import TodoUser


class TodoUserAdmin(UserAdmin):

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email')}
         ),
    )


try:
    admin.site.unregister(TodoUser)

except NotRegistered:
    pass

admin.site.register(TodoUser, TodoUserAdmin)
