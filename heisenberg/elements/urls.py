from django.urls import path
from . import views


urlpatterns = [

    path("", views.index, name="index"),
    #path("<str:element>", views.element, name="element")
]
