from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path, include

router = DefaultRouter()
router.register(r'Examen', ExamenModelViewSet, basename='Examen')
router.register(r'Resultado', ResultadoModelViewSet, basename ='Resultado')
router.register(r'Estado', EstadoModelViewSet, basename ='Estado')

urlpatterns = [
    path('', include(router.urls)),
]