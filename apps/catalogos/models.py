from django.db import models
import random
import string

#********************************************#
#*Modelo de Pacientes*#

class Paciente(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=10, unique=True, blank=True)
    cedula = models.CharField(max_length=16, unique=True)  # Cédula única
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
    
    def save(self, *args, **kwargs):
        if not self.codigo:
            self.codigo = self.generar_codigo_unico()
        super().save(*args, **kwargs)

    def generar_codigo_unico(self):
        longitud_codigo = 4
        caracteres =string.ascii_uppercase + string.digits
        codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))

        #Comprobar si ya existe un codigo igual en la base de datos:
        while Paciente.objects.filter(codigo=codigo_generado).exists():
            codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))
        return codigo_generado
    
#********************************************#
#*Modelo de Especialidad*#
class Especialidad(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=10, unique=True, blank=True)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
    def save(self, *args, **kwargs):
        if not self.codigo:
            self.codigo = self.generar_codigo_unico()
        super().save(*args, **kwargs)

    def generar_codigo_unico(self):
        longitud_codigo = 4
        caracteres =string.ascii_uppercase + string.digits
        codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))

        #Comprobar si ya existe un codigo igual en la base de datos:
        while Especialidad.objects.filter(codigo=codigo_generado).exists():
            codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))
        return codigo_generado
    
#********************************************#
#*Modelo de Medico*#

class Medico(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=10, unique=True, blank=True)
    nombres = models.CharField(verbose_name='Nombres', max_length=50)
    primerApellido = models.CharField(verbose_name='Primer Apellido', max_length=50)
    segundoApellido = models.CharField(verbose_name='Segundo Apellido', max_length=50)
    telefono = models.CharField(verbose_name='Teléfono', max_length=50, unique=True)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT)

    class Meta:
        verbose_name_plural = 'Medico'

    def __str__(self):
        return f"{self.codigo} - {self.nombres}-{self.primerApellido} - {self.segundoApellido} - {self.telefono}"

    def save(self, *args, **kwargs):
        if not self.codigo:
            self.codigo = self.generar_codigo_unico()
        super().save(*args, **kwargs)

    def generar_codigo_unico(self):
        longitud_codigo = 4
        caracteres =string.ascii_uppercase + string.digits
        codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))

        #Comprobar si ya existe un codigo igual en la base de datos:
        while Medico.objects.filter(codigo=codigo_generado).exists():
            codigo_generado = ''.join(random.choices(caracteres, k=longitud_codigo))
        return codigo_generado
    
#********************************************#
#*Modelo de Citas*#
class Cita(models.Model):
    codigo_cita = models.CharField(verbose_name='Código', max_length=30, unique=True, blank=True)
    Fecha = models.DateField(verbose_name= 'Fecha', auto_now_add=True)
    Hora_cita = models.DateTimeField(verbose_name= 'Hora')
    motivo = models.TextField(blank=True, null=True)
    Paciente = models.ForeignKey(Paciente, verbose_name='Paciente', on_delete=models.PROTECT)
    Medico = models.ForeignKey(Medico, verbose_name='Medico', on_delete=models.PROTECT)

    def __str__(self):
        return f"Cita de {self.Paciente.nombres} con identificación {self.Paciente.cedula} con el doctor{self.Medico.nombres} en {self.Hora_cita}"
    
    def save(self, *args, **kwargs):
        # Genera el código de la cita si aún no se ha establecido
        if not self.codigo_cita:
            self.codigo_cita = self.generar_codigo_unico()
        super().save(*args, **kwargs)

    def generar_codigo_unico(self):
        # Usa la cédula y agrega cuatro caracteres aleatorios
        caracteres = string.digits
        codigo_generado = f"{self.Paciente.cedula}-{''.join(random.choices(caracteres, k=4))}"
        
        # Verifica que el código sea único
        while Cita.objects.filter(codigo_cita=codigo_generado).exists():
            codigo_generado = f"{self.Paciente.cedula}-{''.join(random.choices(caracteres, k=4))}"
        return codigo_generado

#********************************************#
#*Modelo de Consulta*#
class Consulta(models.Model):
    codigo = models.CharField(verbose_name='Código', max_length=30, unique=True, blank=True)
    diagnostico = models.CharField(max_length=100,blank=True, null=True)
    sintomas = models.TextField(blank=True, null=True)
    cita = models.ForeignKey(Cita, verbose_name='Cita', on_delete=models.PROTECT)

    def __str__(self):
        return f"Consulta de {self.cita.Paciente.nombres} con identificación- {self.cita.codigo_cita}"
    
    def save(self, *args, **kwargs):
        # Genera el código de la consulta si aún no se ha establecido
        if not self.codigo:
            self.codigo = self.generar_codigo_unico()
        super().save(*args, **kwargs)

    def generar_codigo_unico(self):
        # Usa la cédula y agrega cuatro caracteres aleatorios
        caracteres = string.digits
        codigo_generado = f"{self.cita.Paciente.cedula}-{''.join(random.choices(caracteres, k=4))}"
        
        # Verifica que el código sea único
        while Consulta.objects.filter(codigo=codigo_generado).exists():
            codigo_generado = f"{self.cita.Paciente.cedula}-{''.join(random.choices(caracteres, k=4))}"
        return codigo_generado
