from django.urls import path
from .views import generate_composite_view


urlpatterns = [
    path("generate/", generate_composite_view),
]