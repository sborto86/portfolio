from django.shortcuts import render
import json
import requests
from pluck import pluck
import os
from django.conf import settings
from django.utils import timezone
from django.contrib.staticfiles.storage import staticfiles_storage

def tcc(request):
    app_url = request.build_absolute_uri('/static/')
    with open(os.path.abspath('travel_cost_calculator/static/db/china-city-id-agoda.json'), encoding="utf8") as f:
	    tcc_array = json.load(f)
    tcc_array_city = pluck(tcc_array, 'city')
    context= {
        'tcc_sdc_city_array': tcc_array_city,
        'tcc_country': json.loads(requests.get('https://api.travelcostcalculator.com/db/countries/').content),
        'time_now': timezone.now().strftime('%Y-%m-%d'),
        'app_url': app_url,
    }
    return render(request, 'tcc.html', context)
# Create your views here.
def terms(request):
    context={}
    return render(request, 'terms.html', context)