# Generated by Django 5.0.6 on 2024-11-23 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalogos', '0005_remove_cita_dia_cita'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cita',
            name='Fecha',
            field=models.DateField(auto_now_add=True, verbose_name='Fecha'),
        ),
    ]