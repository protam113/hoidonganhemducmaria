# Generated by Django 5.1.1 on 2024-10-28 04:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nhadongApp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='queue',
            old_name='query',
            new_name='data',
        ),
    ]