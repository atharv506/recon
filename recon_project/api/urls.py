from django.urls import path
from .views import (
    generate_composite_view,
    refine_composite_view,
    case_versions_view,
)


urlpatterns = [
    path("generate/", generate_composite_view),
    path("refine/", refine_composite_view),
    path("cases/<str:case_number>/versions/", case_versions_view),

]