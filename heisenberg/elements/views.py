from django.shortcuts import render
from django.http import HttpResponse



def index(request):
    return render(request, "elements/index.html")

def element(request, element):
    return render(request, "elements/element.html", {

        "element": element
    }) 
