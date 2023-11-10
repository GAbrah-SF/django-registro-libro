from django.urls import path
from .views import CreateLibro, UpdateLibro, DeleteLibro

urlpatterns = [
    path("guardar", CreateLibro.as_view(), name="guardar"),
    path("actualizar/", UpdateLibro.as_view(), name="actualizar"),
    path("eliminar/", DeleteLibro.as_view(), name="eliminar"),
]
