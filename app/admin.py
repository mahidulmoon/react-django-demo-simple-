from django.contrib import admin
from .modules.main.main_models import *

# Register your models here.

class StudentAdmin(admin.ModelAdmin):
    list_display=[
        'id',
        'first_name',
        'last_name',
        'middle_name',
        'birthdate',
        'course',
        'year_level'
    ]
admin.site.register(Student, StudentAdmin)