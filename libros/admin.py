from django.contrib import admin
from .models import Libro


# Register your models here.
@admin.register(Libro)
class TablaLibro(admin.ModelAdmin):
    list_display = ('id', 'autor', 'libro', 'editorial')
