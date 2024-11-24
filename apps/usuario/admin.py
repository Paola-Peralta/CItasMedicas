from django.contrib import admin
from apps.usuario.models import User,Profile

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name' ,'verified']

admin.site.register(User, UserAdmin)
admin.site.register( Profile,ProfileAdmin)
# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from apps.usuario.models import User

# @admin.register(User)
# class UserAdmin(UserAdmin):
#     pass

# class ProfileInline(admin.StackedInline):
#     model = Profile
#     can_delete = False
#     verbose_name_plural = 'Profile'
#     fk_name = 'user'

# # Añadir ProfileInline a la vista de UserAdmin
# UserAdmin.inlines = (ProfileInline,)