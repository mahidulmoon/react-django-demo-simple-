from django.db import models,IntegrityError, transaction
from django.db.models import Sum
import json
import datetime
from django.http import HttpRequest,JsonResponse
from app.modules.main.main_models import *

def save_item(request):
    data = request.body.decode('utf8')
    data = json.loads(data)
    try:
        print(data['id'])
        if data['id']:
            #update
            Student.objects.filter(id=data['id']).update(first_name=data['firstName'],middle_name=data['middleName'],last_name=data['lastName'],birthdate=data['birthDate'],course=data['course'],year_level=data['yearLevel'])
        else:
            student=Student.objects.create(first_name=data['firstName'],middle_name=data['middleName'],last_name=data['lastName'],birthdate=data['birthDate'],course=data['course'],year_level=data['yearLevel'])
        return JsonResponse( { 'message' : 'success'} )
    except:
        return JsonResponse( { 'message' : 'failed'} )

def get_all_students(request):
    try:
        data=[]
        for a in Student.objects.all():
            data.append({
                'id': a.id,
                'firstName': a.first_name,
                'middleName': a.middle_name,
                'lastName': a.last_name,
                'birthDate': a.birthdate,
                'yearLevel': a.year_level,
                'course': a.course
            })
        return JsonResponse( { 'message' : 'success', 'data': data} )
    except:
        return JsonResponse( { 'message' : 'failed'} )

def more_info(request):
    id=request.GET['id']
    try:
        student=Student.objects.get(id=id)
        data={
            'id': id,
            'firstName': student.first_name,
            'middleName': student.middle_name,
            'lastName': student.last_name,
            'birthDate': student.birthdate,
            'yearLevel': student.year_level,
            'course': student.course
        }
        return JsonResponse( { 'message' : 'success', 'data': data} )
    except:
        return JsonResponse( { 'message' : 'failed'} )

def delete_student(request):
    data = request.body.decode('utf8')
    data = json.loads(data)
    try:
        Student.objects.get(id=data['id']).delete()
        data=[]
        for a in Student.objects.all():
            data.append({
                'id': a.id,
                'firstName': a.first_name,
                'middleName': a.middle_name,
                'lastName': a.last_name,
                'birthDate': a.birthdate,
                'yearLevel': a.year_level,
                'course': a.course
            })
        return JsonResponse( { 'message' : 'success','data':data} )
    except:
        return JsonResponse( { 'message' : 'failed'} )