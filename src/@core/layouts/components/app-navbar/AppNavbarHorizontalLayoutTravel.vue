<template>
   <div class="navbar-container d-flex content align-items-center">

      <!-- Nav Menu Toggler -->
      <ul class="nav navbar-nav d-xl-none">
         <li class="nav-item">
            <b-link class="nav-link d-none" @click="toggleVerticalMenuActive">
               <feather-icon icon="MenuIcon" size="21" />
            </b-link>
         </li>
      </ul>

      <!-- Right Col -->
      <b-navbar-nav class="nav align-items-center ml-auto d-flex flex-nowrap">
         <locale class="" />

         <carrito-compra v-if="is_loggin && carrito.length" />

         <!-- <b-nav-item :to="{name:'about'}" v-b-tooltip.hover.bottom title="¿Qué es TravelPoints?"
            class="d-none d-md-flex">
            <feather-icon size="21" icon="InfoIcon" />
         </b-nav-item> -->

         <b-nav-item :to="{name:'tienda.travel'}" v-b-tooltip.hover.bottom :title="$t('Tienda de Regalos')" class="d-none d-md-flex">
            <feather-icon size="21" icon="ShoppingBagIcon" />
         </b-nav-item>


         <b-nav-item v-for="(pagina,i) in paginas.filter(val => val.showHeader && val.icono)"  :to="{ path: `/${pagina.ruta}` }" v-b-tooltip.hover.bottom :title="pagina.nombre" :key="i" class="d-none d-md-flex">
               <font-awesome-icon :icon="['fas',`fa-${pagina.icono}`]" size="lg"/>
         </b-nav-item>

         <dark-Toggler class="d-none d-lg-block" />

         <notification-dropdown v-if="is_loggin" />
         <billetera class="d-none d-md-flex" v-if="is_loggin && $can('read','socio perfil movimientos')"  />
         <user-dropdown />
      </b-navbar-nav>
   </div>
</template>

<script>
import {
   BLink, BNavbarNav, BNavItem,
   VBTooltip
} from 'bootstrap-vue'
import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
import NotificationDropdown from '@/components/notifications.vue'
import UserDropdown from './components/UserDropdown.vue'
import useAuth from '@core/utils/useAuth'

import {toRefs,onMounted,watch} from 'vue'
import store from '@/store'

export default {
   components: {
      BLink,
      // Navbar Components
      BNavbarNav,
      Locale,
      DarkToggler,
      NotificationDropdown,
      UserDropdown,
      BNavItem,
      carritoCompra:() => import('components/carritoCompra.vue'),
      billetera:() => import('components/billetera.vue')

   },
   directives:{
      'b-tooltip':VBTooltip
   },

   props: {
      toggleVerticalMenuActive: {
         type: Function,
         default: () => { },
      },
   },


   setup(){
      const {carrito} = toRefs(store.state.carrito)
      const {usuario} = toRefs(store.state.usuario)
      const {paginas} = toRefs(store.state.pagina)


   
      const {
         is_loggin
      } = useAuth()

      const cargarForm = () => {
           if (is_loggin.value) {
            store.dispatch('carrito/getCarrito', usuario.value.id)
         }

         if(!paginas.value.length){
            store.dispatch('pagina/getPaginas')
         }
      }

      onMounted(() => cargarForm())
      
      watch([usuario],() =>  cargarForm())

      return {
         carrito,
         is_loggin,
         usuario,
         paginas
      }
   }


}
</script>
