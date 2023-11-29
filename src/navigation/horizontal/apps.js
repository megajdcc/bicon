export default [

  {
    title: 'Usuarios',
    route: 'listar.usuarios',
    action: 'read',
    resource: 'usuarios',
    icon: 'UsersIcon',
  },

  {
    title: 'Bodas y Reservaciones',
    icon: 'HeartIcon',
    children: [
      {
        title: 'Bodas',
        route: 'listar.bodas',
        resource: 'bodas',
        action: 'read',
        icon: 'HeartIcon'
      },
      {
        title: 'Reservaciones',
        route: 'listar.reservaciones',
        resource: 'reservaciones',
        action: 'read',
        icon: 'CheckIcon'
      },
    ]
  },



  {
    title: 'Agencias y Hoteles',
    icon: 'ListIcon',
    children: [
      {
        title: 'Agencias',
        route: 'listar.agencias',
        action: 'read',
        resource: 'agencias',
        icon: 'ListIcon',
      },

      {
        title: 'Hoteles',
        route: 'listar.hoteles',
        action: 'read',
        resource: 'hotel',
        icon: 'ListIcon',
      },
    ]
  },


  {
    title: 'Configuraciones',
    icon: 'SettingsIcon',
    children: [
      {
        title: 'Integraciones',
        route: 'api',
        action: 'read',
        resource: 'api'

      },
      {
        title: 'Roles',
        // exact:false,
        route: 'listar.roles',
        action: 'read',
        resource: 'roles'
      },
      {
        title: 'Permisos',
        route: 'listar.permisos',
        action: 'read',
        resource: 'permisos'
      },
      {
        title: 'Observaciones',
        route: 'listar.observaciones',
        action: 'read',
        resource: 'observaciones'
      },
      {
        title: 'Bancos',
        route: 'listar.bancos',
        action: 'read',
        resource: 'bancos',
      }



    ]
  },

  {
    title: 'Reportes',
    icon: 'FileTextIcon',
    children: [
      {
        title: 'Pagos de reservas',
        route: 'listar.pagos',
        action: 'read',
        resource: 'pagos'

      }, {
        title: 'Ventas',
        route: 'listar.ventas',
        action: 'read',
        resoure: 'ventas'
      }
    ]
  },
  {
    header: 'Mi cuenta',
  },
  {
    title: 'Perfil',
    route: 'perfil',
    icon: 'UserIcon',
    action: 'read',
    resource: 'perfil',
  },
  // {
  //    title:'Notificaciones',
  //    route:'listar.notificaciones',
  //    icon:'MessageSquareIcon',
  //    action:'read',
  //    resource:'notificaciones',
  // }







]

