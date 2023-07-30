"""votaciones URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import handler400, handler403, handler404, handler500
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    # UTILIDADES
    path('utilidades/', include('utilidades.urls')),
    
    # API REQUEST's
    path('usuarios/', include('utilidades.bloqueos.urls')),
    # TEMPLATES
    path('', TemplateView.as_view(template_name='index.html')),
    path('problema/', TemplateView.as_view(template_name='problema_1_1.html')),
    path('etapadesarrollo/', TemplateView.as_view(template_name='etapadesarrollo_2_1.html')),
    path('basededatos/', TemplateView.as_view(template_name='basededatos_2_2.html')),
    path('redatarestadoarte/', TemplateView.as_view(template_name='redatarestadoarte_2_3.html')),
    path('tiposalcance/', TemplateView.as_view(template_name='tiposalcance_3_1.html')),
    path('riesgos/', TemplateView.as_view(template_name='riesgos_3_2.html')),
    path('dashboard/', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('perfil/', TemplateView.as_view(template_name='index.html')),
    path('notifications/', TemplateView.as_view(template_name='index.html')),
    path('tablas/', TemplateView.as_view(template_name='index.html')),
    path('registrar/', TemplateView.as_view(template_name='index.html')),
    path('recovery/', TemplateView.as_view(template_name='index.html')),
]
#handler400 = 'base.error_handlers.views.error_400'
#handler403 = 'base.error_handlers.views.error_403'
#handler404 = 'base.error_handlers.views.error_404'
#handler500 = 'base.error_handlers.views.error_500'
