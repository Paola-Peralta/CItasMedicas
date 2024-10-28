from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from apps.examen.models import *
from apps.examen.serializers import *

#Un ViewSet que maneja las operaciones CRUD para el modelo Examen.
class ExamenModelViewSet(ModelViewSet):
    queryset = Examen.objects.all()
    serializer_class = ExamenSerializer

#Un ViewSet que maneja las operaciones CRUD para el modelo Resultado.
class ResultadoModelViewSet(ModelViewSet):
    queryset = Resultado.objects.all()
    serializer_class = ResultadoSerializer