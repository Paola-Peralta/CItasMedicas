from django.db import models

class Paciente(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=10, unique=True)
    cedula = models.CharField(max_length=15, unique=True)  # Cédula única
    nombres = models.CharField(verbose_name='Nombres', max_length=50)
    primerApellido = models.CharField(verbose_name='Primer Apellido', max_length=50)
    segundoApellido = models.CharField(verbose_name='Segundo Apellido', max_length=50)
    fecha_nacimiento = models.DateField()
    direccion = models.CharField(verbose_name='Dirección', max_length=50)
    telefono = models.CharField(verbose_name='Teléfono', max_length=50, unique=True)

    class Meta:
        verbose_name_plural = 'Paciente'

    def __str__(self):
        return f"{self.codigo} -{self.cedula}-{self.nombres}-{self.primerApellido} - {self.segundoApellido} -{self.fecha_nacimiento}- {self.direccion} - {self.telefono}"
    
class Especialidad(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=10, unique=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    

class Medico(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=10, unique=True)
    nombres = models.CharField(verbose_name='Nombres', max_length=50)
    primerApellido = models.CharField(verbose_name='Primer Apellido', max_length=50)
    segundoApellido = models.CharField(verbose_name='Segundo Apellido', max_length=50)
    telefono = models.CharField(verbose_name='Teléfono', max_length=50, unique=True)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = 'Medico'

    def __str__(self):
        return f"{self.codigo} - {self.nombres}-{self.primerApellido} - {self.segundoApellido} - {self.telefono}"
    
class Cita(models.Model):
    codigo_cita = models.CharField(verbose_name='Código', max_length=30, unique=True)
    Fecha = models.DateField(verbose_name= 'Fecha')
    Hora_cita = models.DateTimeField(verbose_name= 'Hora')
    Dia_cita = models.CharField(verbose_name='Día', max_length=20)
    motivo = models.TextField(blank=True, null=True)
    Paciente = models.ForeignKey(Paciente, verbose_name='Paciente', on_delete=models.PROTECT)
    Medico = models.ForeignKey(Medico, verbose_name='Medico', on_delete=models.PROTECT)

    def __str__(self):
        return f"Cita de {self.Paciente.nombres} con {self.Medico.nombres} en {self.Hora_cita}"
    

class Consulta(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True)
    diagnostico = models.CharField(max_length=100,blank=True, null=True)
    sintomas = models.TextField(blank=True, null=True)
    cita = models.ForeignKey(Cita, verbose_name='Cita', on_delete=models.PROTECT)

    def __str__(self):
        return f"Examen de {self.cita.Paciente.nombres}-{self.diagnostico} -{self.sintomas}"
