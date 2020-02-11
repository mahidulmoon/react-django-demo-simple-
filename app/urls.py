from django.conf.urls import url, include
from django.contrib import admin
from .views import *

urlpatterns = [ 
  url(r'^$', homepage, name = 'home_page'),
  # main_url, check the path
  url(r'^', include('app.modules.main.main_url'))
]