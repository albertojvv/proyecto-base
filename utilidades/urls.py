from django.urls import path
from .views import *

urlpatterns = {
    path('getModulos', getModulos, name='getModulos'),
    path('crearModulo', crearModulo, name='crearModulo'),
    path('crearAccionCampos', crearAccionCampos, name='crearAccionCampos'),
}