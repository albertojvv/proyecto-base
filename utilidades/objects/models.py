from django.db import models
from django.contrib.auth.models import User

class Persona (models.Model):

    nombres = models.CharField(max_length=255, verbose_name='Nombres', blank=True, null=True)
    apellidos = models.CharField(max_length=255, verbose_name='Apellidos', blank=True, null=True)
    direccion = models.CharField(max_length=255, verbose_name='Dirección', blank=True, null=True)
    correo = models.CharField(max_length=255, verbose_name='Correo Electronico', blank=True, null=True)
    class Meta:
        abstract = True

class Modulos(models.Model):
    type = models.CharField(max_length=255, blank=True, null=False, verbose_name='Type')
    nombre_modulo = models.CharField(max_length=255, blank=True, null=False, verbose_name='Nombre Modulo')
    key = models.CharField(max_length=255, blank=True, null=False, verbose_name='Key')
    icon = models.CharField(max_length=255, blank=True, null=False, verbose_name='Icono')
    font_size_icon = models.CharField(max_length=255, blank=True, null=False, verbose_name='Tamanio Icono')
    descripcion = models.CharField(max_length=255, blank=True, null=False, verbose_name='Descripción')
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    orden = models.IntegerField(blank=False, null=False, default = 0)
    
    class Meta:
        db_table = 'modulos'
        ordering = ['orden']


class PermisosModulos (models.Model):
    nombre = models.CharField(max_length=255, verbose_name='Nombre Permiso', blank=True, null=True)
    usuario = models.ForeignKey(User, on_delete=models.DO_NOTHING, default=None)
    modulo = models.ForeignKey(Modulos, on_delete=models.DO_NOTHING, default=None)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')

    class Meta:
        db_table = 'permisos_modulos'
        ordering = ['modulo']


class AccionesModulos(models.Model):
    type = models.CharField(max_length=255, blank=True, null=False, verbose_name='Type')
    name = models.CharField(max_length=255, blank=True, null=False, verbose_name='Nombre')
    key = models.CharField(max_length=255, blank=True, null=False, verbose_name='Key')
    icon = models.CharField(max_length=255, blank=True, null=False, verbose_name='Icono')
    font_size_icon = models.CharField(max_length=255, blank=True, null=False, verbose_name='Tamanio Icono')
    route = models.CharField(max_length=255, blank=True, null=False, verbose_name='Ruta')
    request = models.CharField(max_length=255, blank=True, null=False, verbose_name='Petición')
    component = models.CharField(max_length=255, blank=True, null=False, verbose_name='Componente')
    descripcion = models.CharField(max_length=255, blank=True, null=False, verbose_name='Descripción')
    modulo = models.ForeignKey(Modulos, default=None, on_delete = models.DO_NOTHING)
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    orden = models.IntegerField(blank=False, null=False, default = 0)
    before = models.CharField(max_length=255, blank=True, null=False, verbose_name='Antes')
    next = models.CharField(max_length=255, blank=True, null=False, verbose_name='Siguiente')
    actividad = models.CharField(max_length=255, blank=True, null=False, verbose_name='actividad')
    
    class Meta:
        db_table = 'acciones_modulos'
        ordering = ['orden']

class CamposAcciones(models.Model):
    type = models.CharField(max_length=255, blank=True, null=False, verbose_name='Type')
    label = models.CharField(max_length=255, blank=True, null=False, verbose_name='Label')
    key = models.CharField(max_length=255, blank=True, null=False, verbose_name='Key')
    name = models.CharField(max_length=255, blank=True, null=False, verbose_name='Name')
    width = models.CharField(max_length=255, blank=True, null=False, verbose_name='Width')
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    accionesModulos = models.ForeignKey( AccionesModulos, on_delete=models.CASCADE, default=None)
    orden = models.IntegerField(blank=False, null=False, default = 0)
    id_field = models.CharField(max_length=255, blank=True, null=False, verbose_name='id_field')
    secondary_field = models.BooleanField(blank=False, null=False, default=False)
    valor = models.TextField(null = True, blank = True, verbose_name='Valor')
    class Meta:
        db_table = 'campos_acciones'
        ordering = ['orden']
class Registros(models.Model):
    modulo = models.ForeignKey(Modulos, on_delete=models.CASCADE, default=None)
    accionesModulos = models.ForeignKey( AccionesModulos, on_delete=models.CASCADE, default=None)
    camposAcciones = models.ForeignKey( CamposAcciones, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey( User, on_delete=models.CASCADE, default=None)
    descripcion = models.CharField(max_length=255, blank=True, null=False, verbose_name='Descripción')
    tipo_registro = models.TextField(null = True, blank = True, verbose_name='Tipo de Registro')
    id_registro = models.TextField(null = True, blank = True, verbose_name='Id Registro')
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    
    class Meta:
        db_table = 'registros'

class registrosTexto(models.Model):
    dato = models.CharField(max_length=255, blank=True, null=False, verbose_name='Descripción')
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    
    class Meta:
        db_table = 'registros_texto'

class registrosNumerico(models.Model):
    dato = models.IntegerField(blank=False, null=False, default=0)
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    
    class Meta:
        db_table = 'registros_numerico'

class registrosFecha(models.Model):
    dato = models.DateTimeField(blank=False, null= False, default="NOW()")
    show = models.BooleanField(blank=False, null=False, default=False)
    live = models.BooleanField(default=True, blank=False, null = False, verbose_name='Activo')
    
    class Meta:
        db_table = 'registros_fecha'

