from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from apps.catalogos.models import *
from apps.catalogos.serializers import *

#Un ViewSet que maneja las operaciones CRUD para el modelo Paciente.
class PacienteModelViewSet(ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

#Un ViewSet que maneja las operaciones CRUD para el modelo Especialidad.
class EspecialidadModelViewSet(ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer

#Un ViewSet que maneja las operaciones CRUD para el modelo Medico.
class MedicoModelViewSet(ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

#Un ViewSet que maneja las operaciones CRUD para el modelo Citas.
class CitasModelViewSet(ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer

#Un ViewSet que maneja las operaciones CRUD para el modelo Consultas.
class ConsultaModelViewSet(ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer

#Un ViewSet que maneja las operaciones CRUD para el modelo Examen.
# class ExamenModelViewSet(ModelViewSet):
#     queryset = Examen.objects.all()
#     serializer_class = ExamenSerializer

# #Un ViewSet que maneja las operaciones CRUD para el modelo Resultado.
# class ResultadoModelViewSet(ModelViewSet):
#     queryset = Resultado.objects.all()
#     serializer_class = ResultadoSerializer