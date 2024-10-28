from django.contrib import admin
from apps.catalogos.models import Paciente, Especialidad, Medico, Cita, Consulta

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'cedula', 'nombres', 'primerApellido', 'segundoApellido', 'fecha_nacimiento', 'direccion', 'telefono')
    search_fields = ('codigo', 'cedula', 'nombres', 'primerApellido')

@admin.register(Especialidad)
class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre')
    search_fields = ('codigo', 'nombre')

@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombres', 'primerApellido', 'segundoApellido', 'telefono', 'especialidad')
    search_fields = ('codigo', 'nombres', 'primerApellido')

@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('codigo_cita', 'Fecha', 'Hora_cita', 'Dia_cita', 'motivo', 'Paciente', 'Medico')
    search_fields = ('codigo_cita',)

@admin.register(Consulta)
class ConsultaAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'diagnostico', 'sintomas', 'cita')
    search_fields = ('codigo',)
