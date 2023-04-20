from django.urls import path
from . import views

urlpatterns = [
    path("", views.tcc, name="tcc-app"),
    path("terms", views.terms, name="terms"),
]