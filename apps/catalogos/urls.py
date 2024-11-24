from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'Paciente', PacienteModelViewSet, basename='Paciente')
router.register(r'Especialidad', EspecialidadModelViewSet, basename ='Especialidad')
router.register(r'Medico', MedicoModelViewSet, basename='Medico')
router.register(r'Cita', CitasModelViewSet, basename='Cita')
router.register(r'Consulta', ConsultaModelViewSet, basename='Consulta')

urlpatterns = [
    path('', include(router.urls)),
]