
const lider = [
  {
    title: 'Home',
    icon:'fa-house',
    fontAwesome:true,
    children:[
      {
        title: 'Tablero',
        icon: 'fa-house',
        fontAwesome:true,
        tagVariant: 'light-warning',
        route: 'home',
        resource: 'home',
        action: 'read',
      },
    ]
  },

  {
    title: 'Registrar Viajero',
    icon:'fa-user-pen',
    fontAwesome:true,
    route:'create.usuario',
    resource:'usuarios',
    action:'write',
    class:'active-nav',
    ExactPath:true
  },

   {
    title: 'Simulador de Ingresos',
    icon:'fa-calculator',
    fontAwesome:true,
    route:'simulador.lider',
    resource:'Simulador de ingresos',
    action:'read',
    class:'active-nav',
    ExactPath:true
  },


  {
    title: 'Comisiones de promotores',
    icon:'fa-percent',
    fontAwesome:true,
    route:'comisiones.promotor',
    resource:'Gestionar comisión promotores',
    action:'write',
    // class:'active-nav',
    ExactPath:true
  },


  {
    title:'Hacer Reserva',
    route:'reservaciones.list',
    action:'read',
    resource:'reservaciones',
    icon:'fa-calendar-check',
    fontAwesome:true,
   },

    {
      title:'Movimientos en cartera',
      icon:'DollarSignIcon',
      route:'movimientos',
      resource:'movimientos',
      action:'read',
    },

     {
      title:'Retiros',
      icon:'fa-circle-dollar-to-slot',
      route:'mis-retiros',
      resource:'retiros',
      action:'read',
      fontAwesome:true,
    },

     {
      title:'Estatus',
      icon:'fa-heart-pulse',
      route:'estatus',
      resource:'estatus',
      action:'read',
     fontAwesome:true,

    },

    {
      title: 'Mis Promotores',
      route: 'promotores.list',
      action: 'read',
      resource: 'promotores',
      icon: 'UsersIcon',
    },


     {
      title: 'Viajeros Registrados',
      route: 'listar.viajeros',
      action: 'read',
      resource: 'Listado de viajeros',
      icon: 'fa-rectangle-list',
      fontAwesome:true
    },

    {
        title: 'Reportes',
        icon: 'fa-chart-pie',
        fontAwesome:true,
        children:[
          {
            title:'Promotores',
            route:'report.promotores',
            resource:'reportes',
            action:'read',
          },
          {
            title:'Estados de Cuenta',
            route:'report.movimientos.full',
            resource:'reportes',
            action:'read',
          },

         
        ]

      },

      {
        title: 'Academia',
        route: 'academia',
        action: 'read',
        resource: 'Auth',
        icon: 'fa-graduation-cap',
        fontAwesome:true,

      },

    


];

export default [...lider];