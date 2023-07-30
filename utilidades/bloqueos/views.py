from django.views.decorators.csrf import csrf_exempt
import json
from .models import *
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.auth.hashers import make_password, check_password
@csrf_exempt
@api_view(['POST'])
def acceso(request):
    try:
        if request.method == 'POST':
            try:
                jd = json.loads(request.body)
                if jd:
                    username = jd['username'] if 'username' in jd else None
                    password = jd['password'] if 'password' in jd else None
                    if not username or not password:
                        return Response({'CODE' : 2, 'MESSAGE' : 'ERROR', 'DATA' : 'Faltan datos.'})
                    validacion = User.objects.get(username=username)
                    bloqueos = Bloqueos.objects.get(credenciales=validacion.id)
                    if validacion and bloqueos:
                        if bloqueos.bloqueo:
                            return Response({'CODE': 4, "MESSAGE": 'CUENTA BLOQUEADA', "DATA": f'La cuenta a sido bloqueada, por favor restablezca su contraseña o comuniquese con soporte.' })
                        if check_password(password, validacion.password) :
                            bloqueos.intentos = 0
                            bloqueos.save()
                            out = {}
                            out['id'] = validacion.id
                            out['tipo_usuario'] = 0 if validacion.is_superuser else 1
                            return Response({'CODE' : 1, 'MESSAGE' : 'ACCESO PERMITIDO', 'DATA' : json.dumps(out)})
                        else:
                            if int(bloqueos.intentos) > 1 :
                                bloqueos.bloqueo = True
                                bloqueos.save()
                                return Response({'CODE': 3, "MESSAGE": 'CONTRASEÑA INCORRECTA', "DATA": f'Intentos realizados para ingresar al portal ({bloqueos.intentos+1}), la cuenta a sido bloqueada, por favor solicite su nueva contraseña por correo o comuniquese con soporte.' })
                            bloqueos.intentos = int(bloqueos.intentos)+1
                            bloqueos.save()
                            return Response({'CODE': 3, "MESSAGE": 'CONTRASEÑA INCORRECTA', "DATA": f'Intentos restantes ({2-(int(bloqueos.intentos)-1)}) para bloquear la cuenta.'})
                    else:
                        return Response({'CODE': 4, "MESSAGE": 'USUARIO NO EXISTE', "DATA": 'Verifique el Usuario de Acceso digitado.'})
            except Exception as e:
                print(e)
                return Response({'CODE': 4, "MESSAGE": 'Error Fatal', "DATA": str(e)})
        if request.method == 'GET':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'DELETE':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response({'CODE': 500, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
@api_view([ 'POST' ])
def crear_usuario(request):
    if request.method == 'POST':
        try:
            jd = json.loads(request.body)
            if jd:
                username = jd['username'] if 'username' in jd else None
                password = jd['password'] if 'password' in jd else None
                if not username or not password:
                    return Response({'CODE' : 2, 'MESSAGE' : 'ERROR', 'DATA' : 'Faltan datos'})
                validacion = User.objects.filter(username=username)
                if validacion:
                    return Response({'CODE': 4, "MESSAGE": "ERROR", "DATA":'Usuario ya Existe.'})
                else:
                    password_account = make_password(password)
                    usuario = User(username=username, password=password_account)
                    bloqueos = Bloqueos(credenciales=usuario)
                    usuario.save()
                    bloqueos.save()
                    return Response({'CODE': 1, "MESSAGE": 'REGISTRO EXITOSO', "DATA": 'Usuario Creado Exitosamente.'})
        except Exception as e:
            print(e)
            return Response({'CODE': 5, "MESSAGE": 'ACCESO DENEGADO', "DATA":''})    
@csrf_exempt
@api_view([ 'POST' ])
def recovery_password(request):
    try:
        if request.method == 'POST':
            try:
                jd = json.loads(request.body)
                if jd:
                    username = jd['username'] if 'username' in jd else None
                    if not username:
                        return Response({'CODE' : 3, 'MESSAGE' : 'ERROR', 'DATA' : 'Faltan datos'})
                    
                    validacion = User.objects.filter(username=username)
                    bloqueos = Bloqueos.objects.filter(credenciales=validacion[0].id)
                    if validacion and bloqueos:
                        validacion[0].password = make_password(validacion[0].username)
                        bloqueos[0].bloqueo = 0
                        bloqueos[0].intentos = 0
                        validacion[0].save()
                        bloqueos[0].save()
                        #MODIFICAR PARA ENVIAR PASSWORD POR CORREO
                        return Response({'CODE': 1, "MESSAGE": "Contraseña Restablecida", "DATA":f"Restablecimiento de contraseña exitoso, su contraseña es: {validacion[0].username}"})
                    else:
                        if validacion:
                            bloqueos_new = Bloqueos(credenciales=validacion[0])
                            bloqueos_new.save()
                        return Response({'CODE': 4, "MESSAGE": 'USUARIO SIN REGISTRO.', "DATA": ''})
            except Exception as e:
                print(e)
                return Response({'CODE': 3, "MESSAGE": 'USUARIO NO EXISTE', "DATA": 'Verifique el Usuario de Acceso digitado.'})
        if request.method == 'GET':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'PUT':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
        if request.method == 'DELETE':
            return Response({'CODE': 3, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response({'CODE': 500, "MESSAGE": 'ERROR DE METODO', "DATA":''}, status=status.HTTP_400_BAD_REQUEST)