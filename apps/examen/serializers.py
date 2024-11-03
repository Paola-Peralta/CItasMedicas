from rest_framework.serializers import ModelSerializer
from apps.examen.models import Examen, Resultado

class ExamenSerializer(ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'

class ResultadoSerializer(ModelSerializer):
    class Meta:
        model = Resultado
        fields = '__all__'
        read_only_fields = ('codigo',)