from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .objects.models import *
import json
from configuracion.settings import INSTALLED_APPS
import importlib

@csrf_exempt
@api_view(['POST'])
def getModulos(request):
    try:
        if request.method == 'POST':
            try:
                jd = json.loads(request.body)
                if jd:
                    print(jd)
                    id = jd['id'] if 'id' in jd else None
                    if id :
                        try:
                            usuario = User.objects.get(id=id)
                        except:
                            return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No existe Usuario.'})

                        permisosModulos = PermisosModulos.objects.filter(usuario=id)
                        out = []
                        if permisosModulos:
                            count = 0
                            for x in permisosModulos:
                                out.append({
                                        'type': x.modulo.type,
                                        'nombreModulo': x.modulo.nombre_modulo,
                                        'key': x.modulo.key,
                                        'icon': x.modulo.icon,
                                        'font_size_icon': x.modulo.font_size_icon,
                                        'descripcion': x.modulo.descripcion,
                                        'show': x.modulo.show,
                                        'acciones': [],
                                    })
                                acciones = AccionesModulos.objects.filter(modulo=x.modulo)
                                countAcciones = 0
                                for y in acciones:
                                    
                                    out[count]['acciones'].append(
                                        {
                                            'id': y.id,
                                            'type': y.type,
                                            'name': y.name,
                                            'key': y.key,
                                            'icon': y.icon,
                                            'font_size_icon': y.font_size_icon,
                                            'route': y.route,
                                            'component': y.component,
                                            'show': y.show,
                                            'request': y.request,
                                            'descripcion': y.descripcion,
                                            'before': y.before,
                                            'next': y.next,
                                            'actividad': y.actividad,
                                            'fields' : [],
                                        }
                                    )

                                    camposAcciones = CamposAcciones.objects.filter(accionesModulos=y)
                                    for z in camposAcciones:
                                        out[count]['acciones'][countAcciones]['fields'].append({
                                            'type': z.type,
                                            'label': z.label,
                                            'key': z.key,
                                            'name': z.name,
                                            'width': z.width,
                                            'order': z.orden,
                                            'id_field': z.id_field,
                                            'valor': z.valor,
                                            'secondary_field': z.secondary_field,
                                        })
                                    countAcciones+=1
                                count+=1
                        else:
                            return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No existen modulos, contacte a su docente asesor o a soporte.'})
                        out = json.dumps(out)
                        return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": out})
                    else:
                        return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No existe Usuario.'})
                return Response({'CODE': 2, "MESSAGE": 'MESSAGE', "DATA": 'No ingresó datos'})
            except Exception as e:
                print(e)
                return Response({'CODE': 3, "MESSAGE": 'MESSAGE', "DATA": f'ERROR: {e}'})
        if request.method == 'GET':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'DELETE':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'CODE': 500, "MESSAGE": 'ERROR DE SERVIDOR', "DATA": f'ERROR: {e}'}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def crearModulo(request):
    try:
        if request.method == 'POST':
            try:
                jd = json.loads(request.body)
                print(jd)
                if jd:
                    return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No es posible acción.'})
                    type = jd['type'] if 'type' in jd else None
                    nombre_modulo = jd['nombre_modulo'] if 'nombre_modulo' in jd else None
                    key = jd['key'] if 'key' in jd else None
                    icon = jd['icon'] if 'icon' in jd else None
                    font_size_icon = jd['font_size_icon'] if 'font_size_icon' in jd else None
                    show = jd['show'] if 'show' in jd else None
                    descripcion = jd['descripcion'] if 'descripcion' in jd else None
                    acciones = jd['acciones'] if 'acciones' in jd else None
                    
                    if not icon or not type or not nombre_modulo or not key or not font_size_icon or not show or not descripcion :
                        return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No es posible acción.'})
                    try:
                        modulo = Modulos(type=type, nombre_modulo=nombre_modulo, key=key, font_size_icon=font_size_icon, show=show, descripcion=descripcion, icon = icon)
                        modulo.save()
                        for x in acciones:
                            accion = AccionesModulos(modulo = modulo, type=x['type'], name= x['name'], key= x['key'], icon= x['icon'], font_size_icon= x['font_size_icon'], route= x['route'], request=x['request'], component= x['component'], show= x['show'])
                            accion.save()
                            if x['fields']:
                                crearCamposAccionDV(id_modulo=modulo.id, acciones=x['fields'])
                        return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": "Modulo creado con exito"})
                    except Exception as e:
                        print(e)
                        return Response({'CODE': 2, "MESSAGE": 'MESSAGE', "DATA": "Creación de Módulo Fallida: Verifique los campos suministrados."})
                return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": 'AQUI'})
            except Exception as e:
                return Response({'CODE': 3, "MESSAGE": 'MESSAGE', "DATA": f'ERROR: {e}'})
        if request.method == 'GET':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'DELETE':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'CODE': 500, "MESSAGE": 'ERROR DE SERVIDOR', "DATA": f'ERROR: {e}'}, status=status.HTTP_400_BAD_REQUEST)

def crearCamposAccionDV(id_modulo, acciones):
    try:
        accion = AccionesModulos.objects.get(modulo = id_modulo)
        if acciones:
            for y in acciones:
                campo = CamposAcciones(accionesModulos = accion, type=y['type'], label =  y['label'], key = y['key'], name = y['name'])

                campo.save()
        else:
            return Response({'CODE': 2, "MESSAGE": 'MESSAGE', "DATA": "Campos incompletos."})
        return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": "Acción creada con exito"})
    except Exception as e:
        print(e)
        return Response({'CODE': 2, "MESSAGE": 'MESSAGE', "DATA": "Creación de Acción Fallida: Verifique los campos suministrados."})
@csrf_exempt
@api_view(['POST'])
def crearAccionCampos(request):
    print(request)
    try:
        if request.method == 'POST':
            try:
                jd = json.loads(request.body)
                if jd:
                    #print(jd)
                    id_modulo = jd['id_modulo'] if 'id_modulo' in jd else None
                    acciones = jd['acciones'] if 'acciones' in jd else None
                    
                    if not id_modulo or not acciones:
                        return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No es posible acción.'})
                    return crearCamposAccionDV(id_modulo=id_modulo, acciones=acciones)
                return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": ''})
            except Exception as e:
                return Response({'CODE': 3, "MESSAGE": 'MESSAGE', "DATA": f'ERROR: {e}'})
        if request.method == 'GET':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'DELETE':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'CODE': 500, "MESSAGE": 'ERROR DE SERVIDOR', "DATA": f'ERROR: {e}'}, status=status.HTTP_400_BAD_REQUEST)

"""
@csrf_exempt
@api_view(['POST'])
def getModulos(request):
    try:
        if request.method == 'POST':
            try:
                jd = json.loads(request.body)
                if jd:
                    print(jd)
                    modulosAcciones = []
                    for x in INSTALLED_APPS:
                        if 'modulos' in x:
                            try :
                                nombreModulo = x.split('.')[1]
                                modulo = importlib.import_module(f'modulos.{nombreModulo}.funciones')
                                modulosAcciones.append(modulo.returnData()[0])
                                print(modulosAcciones)
                            except Exception as e:
                                print("ERROR:",e)
                                pass
                    if modulosAcciones:
                        modulosAcciones = json.dumps(modulosAcciones)
                        return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": modulosAcciones})
                    return Response({'CODE': 2, "MESSAGE": 'No data', "DATA": 'No existen Modulos.'})
                return Response({'CODE': 1, "MESSAGE": 'MESSAGE', "DATA": ''})
            except Exception as e:
                return Response({'CODE': 3, "MESSAGE": 'MESSAGE', "DATA": f'ERROR: {e}'})
        if request.method == 'GET':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'DELETE':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'CODE': 500, "MESSAGE": 'ERROR DE SERVIDOR', "DATA": f'ERROR: {e}'}, status=status.HTTP_400_BAD_REQUEST)
"""