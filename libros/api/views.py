from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from libros.models import Libro
from .serializers import LibroSerializer


class CreateLibro(APIView):
    def post(self, request):
        # Serializa los datos de entrada utilizando un LibroSerializer
        serializer = LibroSerializer(data=request.data)

        if serializer.is_valid():
            # Guarda el objeto Libro en la base de datos
            serializer.save()

            return Response(status=status.HTTP_200_OK,
                            data={"icon": "success", "message": f"Datos guardados correctamente"})
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"icon": "error", "message": f"Error al recibir datos"})


class UpdateLibro(APIView):
    def post(self, request):
        try:
            libro = get_object_or_404(Libro, id=request.data.get('id'))

            # Utilizar el serializer para validar y actualizar los datos
            serializer = LibroSerializer(libro, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response({"icon": "success", "message": "Datos actualizados correctamente"})

            else:
                return Response({"icon": "error", "message": "Datos no válidos"}, status=status.HTTP_400_BAD_REQUEST)

        except KeyError:
            return Response({"icon": "error", "message": "Datos incompletos"}, status=status.HTTP_400_BAD_REQUEST)


class DeleteLibro(APIView):
    def post(self, request, *args, **kwargs):
        id_libro = request.data.get('id')  # Use request.data for POST data in DRF
        try:
            libro = get_object_or_404(Libro, id=id_libro)
            libro.delete()

            return Response({'icon': 'success', 'message': 'Libro eliminado'}, status=status.HTTP_200_OK)

        except Libro.DoesNotExist:
            return Response({'icon': 'error', 'error': 'Libro no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'icon': 'error', 'error': f'Error al eliminar Libro: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
