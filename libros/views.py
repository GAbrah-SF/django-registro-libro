from django.views.generic import TemplateView
from .models import Libro


# Create your views here.
class Index(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context_index = {
            'title': 'Test Libros',
            'h1': 'libros registrados',
            'h5': 'Lista de libros registrados',
            'libros': Libro.objects.all()
        }

        return context_index
