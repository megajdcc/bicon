
const promotor = [
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
      title:'Estatus & Nivel',
      icon:'fa-heart-pulse',
      route:'estatus',
      resource:'estatus',
      action:'read',
     fontAwesome:true,

    },

     {
        title: 'Viajeros Registrados',
        route: 'listar.usuarios',
        action: 'read',
        resource: 'usuarios',
        icon: 'UsersIcon',
      },

    {
        title: 'Reportes',
        icon: 'fa-chart-pie',
        fontAwesome:true,
        children:[
          {
            title:'Estados de Cuenta',
            route:'report.movimientos',
            resource:'reportes',
            action:'read',
          },
           {
            title:'Activaciones',
            route:'activaciones',
            resource:'reportes',
            action:'read',
          }
        ]

      },

      {
          title: 'Simulador de Ingresos',
          icon:'fa-calculator',
          fontAwesome:true,
          route:'simulador.promotor',
          resource:'Simulador de ingresos',
          action:'read',
          // class:'active-nav',
          ExactPath:true
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

export default [...promotor];