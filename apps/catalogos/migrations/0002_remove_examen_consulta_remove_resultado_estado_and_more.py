
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogos', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='examen',
            name='consulta',
        ),
        migrations.RemoveField(
            model_name='resultado',
            name='estado',
        ),
        migrations.RemoveField(
            model_name='resultado',
            name='examen',
        ),
        migrations.DeleteModel(
            name='Estado',
        ),
        migrations.DeleteModel(
            name='Examen',
        ),
        migrations.DeleteModel(
            name='Resultado',
        ),
    ]
