from django.db import models
from apps.catalogos.models import Consulta
class Examen(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True)
    nombre = models.CharField(verbose_name='Nombre del Examen', max_length=100)
    fechaEntrega = models.DateField(verbose_name='Fecha entrega')
    consulta = models.ForeignKey(Consulta, verbose_name='Consulta', on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = 'Examenes'

    def __str__(self) -> str:
        return f"{self.codigo} - {self.nombre} -{self.fechaEntrega} -{self.consulta.cita.Paciente.nombres} "
    
class Estado(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True)
    tipoEstado = models.CharField(verbose_name='Tipo de estado', max_length=50)

    class Meta:
        verbose_name_plural = 'Tipo de estado'

    def __str__(self):
        return f"{self.codigo}-{self.tipoEstado}"
    
class Resultado(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True)
    descripcion = models.CharField(verbose_name='Descripción', max_length=50)
    examen = models.ForeignKey(Examen,verbose_name='Examen', on_delete=models.PROTECT )
    estado = models.ForeignKey(Estado, verbose_name='Estado del Resultado', on_delete=models.PROTECT)
