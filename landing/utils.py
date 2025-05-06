import requests
from django.conf import settings


API_KEY = "221e880a40d7f2ea8e463d1ee28edbca"  # Replace with your OpenWeather API key

def get_city_coordinates(city):
    """Fetch latitude and longitude of a city using OpenWeather Geocoding API."""
    geocode_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city}&appid={API_KEY}"
    geo_response = requests.get(geocode_url)

    if geo_response.status_code == 200 and geo_response.json():
        geo_data = geo_response.json()[0]
        return geo_data["lat"], geo_data["lon"]
    
    return None, None

def get_air_quality(city):
    """Fetch AQI based on city name."""
    lat, lon = get_city_coordinates(city)
    if lat and lon:
        aqi_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"
        aqi_response = requests.get(aqi_url)

        if aqi_response.status_code == 200:
            aqi_data = aqi_response.json()
            return {
                "aqi": aqi_data['list'][0]['main']['aqi'],
                "pm10": aqi_data['list'][0]['components']['pm10']
            }
    
    return None

def get_weather(city):
    """Fetch weather data based on city name."""
    lat, lon = get_city_coordinates(city)
    if lat and lon:
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}"
        weather_response = requests.get(weather_url)

        if weather_response.status_code == 200:
            weather_data = weather_response.json()
            return {
                "temperature": weather_data["main"]["temp"],
                "wind_speed": weather_data["wind"]["speed"],
                "humidity": weather_data["main"]["humidity"]
            }
    
    return None
