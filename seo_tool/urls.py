from django.urls import path
from . import views

urlpatterns = [
    path("", views.keyword_search, name="keyword_search"),
    path("about", views.about_page, name="about"),
]