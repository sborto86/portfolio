from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    technology = models.CharField(max_length=20)
    image = models.FilePathField(path="static/img/", null=True, blank=True)
    time_q = models.PositiveSmallIntegerField(null=True, blank=True)
    time_u= models.CharField(max_length=10, null=True, blank=True)
    slug = models.SlugField(null=True, blank=True)
    github = models.URLField(null=True, blank=True)
    header_scripts = models.TextField(null=True, blank=True)
    descrition_long = models.TextField(null=True, blank=True)
    demo_slug =  models.SlugField(null=True, blank=True)
# Create your models here.
class Website(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    long_description = models.TextField(null=True, blank=True)
    technology = models.CharField(max_length=20)
    image = models.FilePathField(path="static/img/", null=True, blank=True)
    url = models.URLField(null=True, blank=True)
    slug = models.SlugField(null=True, blank=True)