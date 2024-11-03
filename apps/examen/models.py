from django.db import models
from apps.catalogos.models import Consulta
import random
import string

class Examen(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True, blank=True)
    nombre = models.CharField(verbose_name='Nombre del Examen', max_length=100)
    fechaEntrega = models.DateField(verbose_name='Fecha entrega')
    consulta = models.ForeignKey(Consulta, verbose_name='Consulta', on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = 'Examenes'

    def __str__(self) -> str:
        return f"{self.codigo} - {self.nombre} -{self.fechaEntrega} -{self.consulta.cita.Paciente.nombres} "
    
    def save(self, *args, **kwargs):
        # Asigna el código basado en la cédula del paciente y cuatro dígitos aleatorios
        if not self.codigo and self.consulta and self.consulta.cita.Paciente:
            self.codigo = self.generar_codigo_examen()
        super().save(*args, **kwargs)

    def generar_codigo_examen(self):
        # Obtiene la cédula del paciente
        cedula_paciente = self.consulta.cita.Paciente.cedula
        # Genera cuatro dígitos aleatorios
        codigo_aleatorio = ''.join(random.choices(string.digits, k=4))
        # Combina la cédula con los dígitos aleatorios
        return f"{cedula_paciente}-{codigo_aleatorio}"
    
class Estado(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True)
    tipoEstado = models.CharField(verbose_name='Tipo de estado', max_length=50)

    class Meta:
        verbose_name_plural = 'Tipo de estado'

    def __str__(self):
        return f"{self.codigo}-{self.tipoEstado}"
    
class Resultado(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True, blank=True)
    descripcion = models.CharField(verbose_name='Descripción', max_length=50)
    examen = models.ForeignKey(Examen,verbose_name='Examen', on_delete=models.PROTECT )
    estado = models.ForeignKey(Estado, verbose_name='Estado del Resultado', on_delete=models.PROTECT)

    def save(self, *args, **kwargs):
        if not self.codigo:
            self.codigo = self.generar_codigo_unico()
        super().save(*args, **kwargs)

    def generar_codigo_unico(self):
        longitud_codigo = 4
        caracteres =string.ascii_uppercase + string.digits
        codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))

        #Comprobar si ya existe un codigo igual en la base de datos:
        while Resultado.objects.filter(codigo=codigo_generado).exists():
            codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))
        return codigo_generado