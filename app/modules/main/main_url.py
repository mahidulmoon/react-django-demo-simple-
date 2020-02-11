from django.conf.urls import url, include
from .main_views import *

urlpatterns = [ 
    url(r'^main/save/$',save_item,name='for adding/updating'),
    url(r'^main/getallstudents/$',get_all_students,name="get all students"),
    url(r'^main/moreinfo/$',more_info,name='more info student'),
    url(r'^main/delete/$',delete_student,name='delete student'),

]