from django.contrib import admin
from apps.examen.models import Examen, Estado, Resultado
@admin.register(Examen)
class ExamenAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'fechaEntrega', 'consulta')
    search_fields = ('codigo', 'nombre')

@admin.register(Estado)
class EstadoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'tipoEstado')
    search_fields = ('codigo', 'tipoEstado')

@admin.register(Resultado)
class ResultadoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'descripcion', 'examen', 'estado')
    search_fields = ('codigo', 'descripcion')
