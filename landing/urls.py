from django.urls import path
from . import views


urlpatterns = [
    path('landing/index.html', views.index, name='index'),
    path('landing/airquality.html', views.air_quality_view, name='airquality'),
]