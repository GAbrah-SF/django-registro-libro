from rest_framework import serializers
from libros.models import Libro


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ("autor", "libro", "editorial")
