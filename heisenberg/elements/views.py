from django.shortcuts import render
from django.http import HttpResponse



def index(request):
    return render(request, "elements/index.html") 
