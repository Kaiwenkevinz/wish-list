# Generated by Django 2.2.2 on 2019-07-10 15:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wishItems', '0002_wishItems'),
    ]

    operations = [
        migrations.AddField(
            model_name='wishitem',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='item', to=settings.AUTH_USER_MODEL),
        ),
    ]
