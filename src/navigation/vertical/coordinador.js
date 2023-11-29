
const coordinador = [
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
      title: 'Mis Lideres y promotores',
      icon: 'UsersIcon',
      children:[
        {
          title:'Mis Lideres',
          route: 'lideres.list',
          action: 'read',
          resource: 'lideres',
          icon: 'fa-users-rectangle',
          fontAwesome:true
        },
        {
          title:'Mis Promotores',
          route: 'promotores.list',
          action: 'read',
          resource: 'promotores',
          icon: 'fa-users',
          fontAwesome:true
        }
      ]
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
      title: 'Negocios Invitados',
      route: 'negocios-invitados.list',
      action: 'read',
      resource: 'Negocios invitados',
      icon: 'fa-table-list',
      fontAwesome:true,
    },

    {
        title: 'Reportes',
        icon: 'fa-chart-pie',
        fontAwesome:true,
        children:[
          {
            title:'Líderes',
            route:'report.lideres',
            resource:'reportes',
            action:'read',
          },
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
            title: 'Simulador de Ingresos',
            icon:'fa-calculator',
            fontAwesome:true,
            route:'simulador.coordinador',
            resource:'Simulador de ingresos',
            action:'read',
            class:'active-nav',
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

export default [...coordinador];