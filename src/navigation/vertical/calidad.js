export default [
  
   {
      title: 'Usuarios',
      icon: 'UsersIcon',
      children:[
         {
            title: 'Usuarios',
            route: 'listar.usuarios',
            action: 'read',
            resource: 'usuarios',
            icon: 'UsersIcon',
         },
      ]
   },


   {
      title:"Perfil de Cuenta",
      route:'mi-perfil',
      resource:'perfil',
      action:'read',
      icon:'fa-user-pen',
      fontAwesome:true,
   },

   {
      title:'Configuraciones',
      icon:'SettingsIcon',
      children:[

         {
            title: 'Roles',
            // exact:false,
            route: 'listar.roles',
            action:'read',
            resource:'roles'
         },
         {
            title: 'Permisos',
            route: 'listar.permisos',
            action: 'read',
            resource: 'permisos'
         },

       
      ]
   }
   
]

