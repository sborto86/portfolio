from django.shortcuts import render
from .src.plot import areaplot_google, areaplot_news
from .src.form_handler import kw_search, keyword_val
from .src.model import year_prediction
import pandas as pd
import time
import plotly.io as pio
from .src.about_graphs import fig1, fig2
# Create your views here.

def keyword_search(request):
    context = {}
    if request.method == 'POST':
        keyword = request.POST.get('keyword')
        if not keyword_val(keyword):
            context['error_msg'] = "Please insert a keyword or a short term (maximum 3 words)"
        else:
            tstart = time.time()
            df = kw_search(keyword)
            if type(df) == pd.core.frame.DataFrame:
                context['keyword'] = keyword
                context['google_fig'] = pio.to_html(areaplot_google(df, keyword), full_html=False, include_plotlyjs=False)
                context['news_fig'] = pio.to_html(areaplot_news(df, keyword), full_html=False, include_plotlyjs=False)
                context['one_year_fig'] = pio.to_html(year_prediction(keyword)[2], full_html=False, include_plotlyjs=False)
                context['trends_fig'] = pio.to_html(year_prediction(keyword)[3], full_html=False, include_plotlyjs=False)
                tend = time.time()
                context['success_msg'] = f"Historical data retrieved successfully in {int((tend-tstart)/60)} minutes and {int((tend-tstart)%60)} seconds"
            else:
                context['error_msg'] = f'Sorry there was an error retrieving the historical data: {df}'
    return render(request, 'seotool.html', context)

def about_page(request):
    context = {
        'fig1': fig1(),
        'fig2': fig2(),
    }
    return render(request, 'about.html', context)