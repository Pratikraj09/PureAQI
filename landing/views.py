from django.shortcuts import render
from .utils import get_air_quality, get_weather

# Create your views here.
def index(request):
    # some code
    return render(request, 'landing/index.html')



def air_quality_view(request):
    city = request.GET.get("city", "Kolhapur")  # Default city is Kolhapur

    aqi_data = get_air_quality(city)
    weather_data = get_weather(city)

    context = {
        "searched_city": city,
        "aqi_data": aqi_data,
        "weather_data": weather_data
    }

    return render(request, "landing/airquality.html", context)


