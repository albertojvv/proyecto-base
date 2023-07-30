from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Logs_errors_handlers
@csrf_exempt
def error_400(request, exception):
    error = Logs_errors_handlers(error="Error_400", descripcion="Fallo de acceso")
    error.save()
    return JsonResponse({'CODE':400, 'MESSAGE':'ERROR', 'DATA':''})
@csrf_exempt
def error_403(request, exception):
    error = Logs_errors_handlers(error="Error_403", descripcion="Fallo de acceso")
    error.save()
    return JsonResponse({'CODE':403, 'MESSAGE':'ERROR', 'DATA':''})
@csrf_exempt
def error_404(request, exception):
    error = Logs_errors_handlers(error="Error_404", descripcion="Fallo de acceso")
    error.save()
    return JsonResponse({'CODE':404, 'MESSAGE':'ERROR', 'DATA':''})
@csrf_exempt
def error_500(request):
    error = Logs_errors_handlers(error="Error_500", descripcion="Fallo de acceso")
    error.save()
    return JsonResponse({'CODE':500, 'MESSAGE':'ERROR', 'DATA':''})