from django.db import models
from django.utils.translation import gettext as _
from django.utils.timezone import now
import datetime
class Logs_errors_handlers(models.Model):
    error = models.CharField(verbose_name=_("Tipo Error"), blank=False, null=False, max_length=255)
    descripcion = models.TextField(blank=False, null=False)
    fecha_error = models.DateField(blank=False, null=False, default=now)
    class Meta:
        db_table = 'logs_sistema'