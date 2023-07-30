from nturl2path import url2pathname
from django.urls import path
from django.urls.resolvers import URLPattern
from .views import *

urlpatterns = {
    path('acceso/', acceso, name='login'),
    path('crear_usuario/', crear_usuario, name='crear_usuario'),
    path('recovery_password/', recovery_password, name='recovery')
}