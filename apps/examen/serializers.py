from rest_framework.serializers import ModelSerializer
from apps.examen.models import Examen, Resultado, Estado

class ExamenSerializer(ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'

class ResultadoSerializer(ModelSerializer):
    class Meta:
        model = Resultado
        fields = '__all__'
        read_only_fields = ('codigo',)

class EstadoSerializer(ModelSerializer):
    class Meta:
        model = Estado
        fields = '__all__'