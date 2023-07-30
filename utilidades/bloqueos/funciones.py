estructura = {
    'type': 'modulo',
    'nombreModulo': 'Usuarios',
    'key': 'usuario',
    'icon': 'account_circle',
    'font_size_icon': 'small',
    'show': True,

    'acciones': [
      {
        'type': 'collapse',
        'name': 'Registrar Usuarios',
        'key': 'registrar_usuario',
        'icon': 'person_add',
        'font_size_icon': 'small',
        'route': '/usuarios/registrar_usuario',
        'component': 'register',
        'show': True,
      },
      {
        'type': 'collapse',
        'name': 'Listar Usuarios',
        'key': 'listar_usuarios',
        'icon': 'person_pin',
        'font_size_icon': 'small',
        'route': '/usuarios/listar_usuarios',
        'component': 'tables',
        'show': True,
      },
      {
        'type': 'collapse',
        'name': 'Eliminar Usuarios',
        'key': 'eliminar_usuario',
        'icon': 'person_remove',
        'font_size_icon': 'small',
        'route': '/usuarios/eliminar_usuario',
        'component': 'notifications',
        'show': True,
      },
    ],
},
def returnData ():
    return estructura




"""

estructura = {
    'type': 'modulo',
    'nombreModulo': 'Modulo 1',
    'key': 'proveedores',
    'icon': 'warehouse',
    'font_size_icon': 'small',
    'show': True,

    'acciones': [
      {
        'type': 'collapse',
        'name': 'Capacitacion',
        'key': 'capacitacion',
        'icon': 'account_circle',
        'font_size_icon': 'small',
        'route': '/modulo1/capacitacion',
        'component': 'create',
        'show': True,
        'fields': [
          {
            'type': 'text',
            'label': 'Descripción',
            'key': 'descripcion',
            'name': 'descripcion',
            'width': "45%",
          },
          {
            'type': 'number',
            'label': 'Cantidad',
            'key': 'cantidad',
            'name': 'cantidad',
            'width': "45%",
          },
          {
            'type': 'date',
            'key': 'fecha_ingreso',
            'name': 'fecha_ingreso',
          }
        ]
      },
      {
        'type': 'collapse',
        'name': 'Test Emprendedor',
        'key': 'listar_proveedores',
        'icon': 'table_view',
        'font_size_icon': 'small',
        'route': '/proveedores/listar_proveedores',
        'component': 'tables',
        'show': True,
      },
      {
        'type': 'collapse',
        'name': 'Resultados Test',
        'key': 'eliminar_proveedores',
        'icon': 'person_remove',
        'font_size_icon': 'small',
        'route': '/proveedores/eliminar_proveedores',
        'component': 'notifications',
        'show': True,
      },
    ],
},
def returnData ():
    return estructura
    
"""