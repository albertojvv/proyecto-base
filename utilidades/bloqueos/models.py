from django.db import models
from django.contrib.auth.models import User
class Bloqueos (models.Model):
    intentos = models.IntegerField(blank=False, null=False, default=0)
    bloqueo = models.BooleanField(blank=False, null=False, default=False)
    credenciales = models.ForeignKey(User, default=None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table = 'bloqueos'