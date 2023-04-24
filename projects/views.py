from django.shortcuts import render
from projects.models import Project, Website

def project_index(request):
    projects = Project.objects.all()
    context = {
        'projects': projects
    }
    return render(request, 'project_index.html', context)

def project_detail(request, slug):
    project = Project.objects.get(slug=slug)
    context = {
        'project': project
    }
    return render(request, 'project_detail.html', context)

def website_index(request):
    websites = Website.objects.all()
    context = {
        'websites': websites
    }
    return render(request, 'website_index.html', context)

def website_detail(request, slug):
    website = Website.objects.get(slug=slug)
    context = {
        'website': website
    }
    return render(request, 'website_detail.html', context)