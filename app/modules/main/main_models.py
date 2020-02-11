from django.db import models
from datetime import date

class Student(models.Model):
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100)
    middle_name = models.CharField(max_length = 100)
    birthdate = models.DateField(default = date.today)
    course = models.CharField(max_length=100)
    year_level = models.CharField(max_length=100)