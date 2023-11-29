import store from '@/store';
import Error404 from '@/views-core/error/Error404.vue'
import Login from '@/views-core/pages/authentication/Login.vue';
import ForgotPassword from 'views/auth/ForgotPassword.vue'
import PasswordReset from 'views/auth/PasswordReset.vue';
import EstablecerContrasena from 'views/auth/EstablecerContrasena.vue'
import NotAuthorized from '@/views-core/pages/miscellaneous/NotAuthorized.vue'

export default [
   {
      path:'/',
      name:'home',
      component: () => import('views/home.vue'),
      meta:{
         resource:'home',
         action:'read',
      },
   },

   {
    path: '/error-404',
    name: 'error-404',
    component:Error404,
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: ForgotPassword,
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/reset-password',

    props: (route) => ({
      token: (route.query.token),
      email: (route.query.email),
    }),
    name: 'auth-reset-password',
    component: PasswordReset,
    meta: {
      layout: 'full',
      resource:'Auth'
    },
  },

  {
    path: '/usuario/:usuario/establecer/contrasena',
    props:true,
    name: 'establecer-contrasena',
    component:EstablecerContrasena,
    meta: {
      layout: 'full',
      resource: 'Auth'
    },
  },

 
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component:NotAuthorized,
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },

  
  
   /*****************************************/
   /* MI Perfil
   /*************************************** */

   {
      path:'/perfil',
      name: 'mi-perfil',
      component: () => import('views/perfil/index.vue'),
      meta: {
         pageTitle: 'Mi perfil',
         resource: 'perfil',
         action: 'read',
         breadcrumb: [
         {
            text: 'Configuración de perfil',
            active: true,
         },
         ],
      },
   },

  

   /*****************************************/
   /* USUARIO
   /*************************************** */

   {
      path:'/usuarios',
      // name:'usuarios',
      component: () => import('views/usuarios/index.vue'),
      children:[
         {
            path:'',
            name:'listar.usuarios',
            component: () => import('views/usuarios/lists.vue'),
          
            meta:{
               resource: 'usuarios',
               action: 'read',
               pageTitle:'Viajeros',
               breadcrumb:[
                  {
                     text:'listado',
                     active:true
                  }
               ]
            }
         },
         {
            path:'create',
            name:'create.usuario',
            component: () => import('views/usuarios/create.vue'),
           

            meta: {
               pageTitle: 'Agregar usuario',
               // navActiveLink: 'listar.usuarios',
               resource: 'usuarios',
               action: 'write',
               breadcrumb: [

                  {
                     text: 'Usuarios',
                     active: false,
                     to: { name: 'listar.usuarios' }
                  },

                  {
                     text: 'crear',
                     active: true
                  }
               ]
            }
            

         },
         {
            path: ':id/edit',
            props:true,
            name: 'edit.usuario',
            component: () => import('views/usuarios/edit.vue'),
            beforeEnter:(to,from,next) => {
               store.dispatch('usuario/getUsuario',to.params.id).then((data) => {
                  if(data){
                     next()
                  }else{
                     next({name:'error-404'})
                  }
               }).catch(e => next({name:'error-404'}))
               
            },

            meta: {
               pageTitle: 'Editar usuario',
               navActiveLink: 'listar.usuarios',
               resource: 'usuarios',
               action: 'update',
               breadcrumb: [

                  {
                     text: 'Usuarios',
                     active: false,
                     to: { name: 'listar.usuarios' }
                  },

                  {
                     text: 'editar',
                     active: true
                  }
               ]
            }


         }
      ]
   },



   /*****************************************/
   /* ROL DE USUARIO
   /*************************************** */

   {
      path: '/roles',
      component: () => import(  'views/roles/index.vue'),
      exact:false,
      children: [
         {
            path: '',
            name: 'listar.roles',
            component: () => import('views/roles/lists.vue'),
            meta: {
               pageTitle: 'Rol de usuarios',
               breadcrumb: [
                  {
                     text: 'Listado',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'read'
            }
         },
         {
            path: 'create',
            name: 'create.role',
            component: () => import('views/roles/create.vue'),
            meta: {
               pageTitle: 'Crear Rol',
               navActiveLink:'listar.roles',
               breadcrumb: [
                  {
                     text: 'Rol de usuarios',
                     active: false,
                     to: { name: 'listar.roles' }
                  },

                  {
                     text: 'Crear',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'write'
            }
         },
         {
            path: ':id/edit',
            props:true,
            name: 'edit.role',
            component: () => import('views/roles/edit.vue'),
            meta: {
               pageTitle: 'Editar Rol',
               navActiveLink: 'listar.roles',
               breadcrumb: [
                  {
                     text: 'Rol de usuarios',
                     active: false,
                     to: { name: 'listar.roles' }
                  },

                  {
                     text: 'Editar',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'update'
            }
         },

      ]
   },


   /*****************************************/
   /* PERMISOS DE USUARIO
   /*************************************** */

   {
      path: '/permisos',
      component: () => import('views/permisos/index.vue'),
      exact: false,
      children: [
         {
            path: '',
            name: 'listar.permisos',
            component: () => import('views/permisos/lists.vue'),
            meta: {
               pageTitle: 'Permisos de usuario',
               breadcrumb: [
                  {
                     text: 'Listado',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'read'
            }
         },
         {
            path: 'create',
            name: 'create.permiso',
            component: () => import('views/permisos/create.vue'),
            meta: {
               pageTitle: 'Crear Permiso',
               navActiveLink: 'listar.permisos',
               breadcrumb: [
                  {
                     text: 'Permisos de usuario',
                     active: false,
                     to: { name: 'listar.permisos' }
                  },

                  {
                     text: 'Crear',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'write'
            }
         },
         {
            path: ':id/edit',
            props: true,
            name: 'edit.permiso',
            component: () => import('views/permisos/edit.vue'),
            meta: {
               pageTitle: 'Editar Permiso',
               navActiveLink: 'listar.permisos',
               breadcrumb: [
                  {
                     text: 'Permisos de usuario',
                     active: false,
                     to: { name: 'listar.permisos' }
                  },

                  {
                     text: 'Editar',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'update'
            }
         },

         

      ]
   },



   /*****************************************/
   /* PAGINA DE Mantenimiento
   /*************************************** */
   {
      path:'/mantenimiento',
      name:'show.mantenimiento',
      component:() => import('views/mantenimiento/index.vue'),
      meta:{
         layout:'full',
      }
   },
   
]
