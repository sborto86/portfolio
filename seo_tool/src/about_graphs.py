import plotly.express as px
import pandas as pd
from seo_tool.config.sqlconnect import engine
import plotly.io as pio

def fig1():
    engine.connect()
    query='''
        SELECT * FROM standardvolume
        WHERE query != 'Ukraine' AND query != 'amazon'
        '''
    df = pd.read_sql(query,engine)
    fig = px.line(df, x='date', y="searchvolume", color="query", log_y=True)
    fig.update_layout(
        title='Daily Google Search Volume by Keyword',
        xaxis_title="Date",
        yaxis_title="Search Volume",
        legend_title_text='Keyword',
        title_x=0.5,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    fig.update_yaxes(showgrid=True, gridwidth=1, gridcolor='lightgrey', tickvals=[10000000, 1000000, 100000, 10000,1000, 100,])
    fig.update_traces(line=dict(width=3))
    return pio.to_html(fig, full_html=False, include_plotlyjs=False)
def fig2():
    engine.connect()
    query='''
        SELECT * FROM searchdata
        WHERE query = 'pizza';
        '''
    df2 = pd.read_sql(query,engine)
    fig = px.line(df2, x='date', y="google")
    fig.update_layout(
        title='Daily Google Search Volume',
        xaxis_title="Date",
        yaxis_title="Search Volume",
        legend_title_text='Keyword',
        title_x=0.5,
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    fig.update_traces(line=dict(width=3))
    return pio.to_html(fig, full_html=False, include_plotlyjs=False)