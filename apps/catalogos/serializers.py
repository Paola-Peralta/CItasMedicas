from rest_framework.serializers import ModelSerializer
from apps.catalogos.models import Paciente, Especialidad, Medico, Cita, Consulta

class PacienteSerializer(ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class EspecialidadSerializer(ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'

class MedicoSerializer(ModelSerializer):
    class Meta:
        model = Medico
        fields = '__all__'

class CitaSerializer(ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'

class ConsultaSerializer(ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'