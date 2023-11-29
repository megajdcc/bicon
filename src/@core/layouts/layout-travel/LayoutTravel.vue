<template>
   <div class="horizontal-layout layout-travel"  :class="[layoutClasses]"  data-col="1-column" style="min-height:100vh">
      <!-- NAVBAR -->
      <b-navbar :style="{
         backgroundColor: navbarType === 'static' && scrolledTo && skin === 'light' ? 'white' : null,
         boxShadow: navbarType === 'static' && scrolledTo ? 'rgba(0, 0, 0, 0.05) 0px 4px 20px 0px' : null,
      }" :toggleable="false" class="header-navbar navbar-shadow align-items-center navbar-brand-center navbar-fixed"
         :class="{ 'fixed-top': $store.getters['app/currentBreakPoint'] !== 'xl' }">
         <slot name="navbar" :toggleVerticalMenuActive="toggleVerticalMenuActive">
             <!-- Logo -->
            <app-navbar-horizontal-layout-travel-brand :toggle-vertical-menu-active="toggleVerticalMenuActive" />
            <app-navbar-horizontal-layout-travel :toggle-vertical-menu-active="toggleVerticalMenuActive" />

         </slot>

      </b-navbar>

      <div class="horizontal-menu-wrapper">

         <!-- Vertical Nav Menu -->
         <vertical-nav-menu :is-vertical-menu-active="isVerticalMenuActive"
            :toggle-vertical-menu-active="toggleVerticalMenuActive" class="d-block d-xl-none"
            :navMenuItems="itemsMenu">
            <template #header="slotProps">
               <slot name="vertical-menu-header" v-bind="slotProps" />
            </template>
         </vertical-nav-menu>
         <!-- /Vertical Nav Menu -->
      </div>

      <!-- Vertical Nav Menu Overlay -->
      <div class="sidenav-overlay" :class="overlayClasses" @click="isVerticalMenuActive = false" />
      <!-- /Vertical Nav Menu Overlay -->


      <transition :name="routerTransition" mode="out-in">
         <component :is="layoutContentRenderer"
            :key="layoutContentRenderer === 'layout-content-renderer-left' ? $route.meta.navActiveLink || $route.name : null">
            <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
               <slot :name="name" v-bind="data" />
            </template>
         </component>
      </transition>

      <!--/ Content -->
      <!--/ CONTENT -->

      <!-- Footer -->

      <footer class="footer footer-light footer-static bg-transparent"  style="box-shadow: 0 -1rem 3rem rgb(34 41 47 / 8%) !important;">
         <slot name="footer">
            <app-travel-footer />
         </slot>
      </footer>
   </div>
</template>

<script>

import AppNavbarHorizontalLayoutTravel from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutTravel.vue'

import AppNavbarHorizontalLayoutTravelBrand from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutTravelBrand.vue'


import useAppConfig from '@core/app-config/useAppConfig'
import { BNavbar } from 'bootstrap-vue'
import { useScrollListener } from '@core/comp-functions/misc/event-listeners'
import { onUnmounted,toRefs,ref } from 'vue'

// Content Renderer
// Vertical Menu
/* eslint-disable import/order */
import VerticalNavMenu from '@core/layouts/layout-vertical/components/vertical-nav-menu/VerticalNavMenu.vue'

import mixinLayoutHorizontal from '../layout-horizontal/mixinLayoutHorizontal'
/* eslint-enable import/order */

import LayoutContentRendererDefault from '@core/layouts/components/layout-content-renderer/LayoutContentRendererDefault.vue'
import useVerticalLayout from '@core/layouts/layout-vertical/useVerticalLayout'

import useLayoutTravel from './useLayoutTravel'

import HorizontalNavMenu from './components/horizontal-nav-menu/HorizontalNavMenu.vue'

import verticalNavMenuItems from '@/navigation/vertical/travel'


import {
   BContainer
} from 'bootstrap-vue'

import store from '@/store'


export default {
   components: {
      // BS
      BContainer,

      AppNavbarHorizontalLayoutTravel,
      AppNavbarHorizontalLayoutTravelBrand,
      BNavbar,
     // Content Renderer
      LayoutContentRendererDefault,
      AppTravelFooter:() => import('components/AppTravelFooter.vue'),
      HorizontalNavMenu,

      // Vertical Menu
      VerticalNavMenu,
   },
   mixins: [mixinLayoutHorizontal],

   computed: {

      layoutContentRenderer() {
         // const rendererType = this.$route.meta.contentRenderer
         // if (rendererType === 'sidebar-left') return 'layout-content-renderer-left'
         // if (rendererType === 'sidebar-left-detached') return 'layout-content-renderer-left-detached'
         return 'layout-content-renderer-default'
      },

   },
   setup() {

      const {paginas} = toRefs(store.state.pagina)
      const itemsMenu = ref([
         ...verticalNavMenuItems,
      ])


      const cargarForm = () => {
         
         if(!paginas.value.length){
            
            store.dispatch('pagina/getPaginas').then((data) => {
               itemsMenu.value = [
                  ...verticalNavMenuItems,
                  ...data.map((val) => ({
                        title   : val.nombre,
                        route   : {path: val.ruta },
                        action  : 'read',
                        resource: 'Auth',
                        fontAwesome:val.icono ? true : false,
                        icon    : val.icono ? `fa-${val.icono}` : 'MinusIcon',
                        ExactPath:true
                  }))
               ]
            })

         }else{
             itemsMenu.value = [
               ...verticalNavMenuItems,
               ...paginas.value.map((val) => ({
                     title: val.nombre,
                     route: { path: val.ruta },
                     action: 'read',
                     resource: 'Auth',
                     icon: 'PlusSquareIcon',
               }))
            ]
         }

      }

      cargarForm();

      const {
         skin,
         navbarType,
         footerType,
         routerTransition,
         isNavMenuHidden,
      } = useAppConfig()

      // Vertical Menu
      const {
         isVerticalMenuActive, toggleVerticalMenuActive, overlayClasses, resizeHandler,
      } = useVerticalLayout(navbarType, footerType)

       // Resize handler
      resizeHandler()
      window.addEventListener('resize', resizeHandler)

      onUnmounted(() => {
         window.removeEventListener('resize', resizeHandler)
      })

      const {
         navbarMenuTypeClass,
         layoutClasses,
         footerTypeClass,
      } = useLayoutTravel(navbarType, footerType, isVerticalMenuActive)

      // Scroll Listener
      const { scrolledTo } = useScrollListener()

      return {
         // skin
         skin,

         // Layout
         layoutClasses,

         // Navbar
         navbarType,
         navbarMenuTypeClass,


         // Router Transition
         routerTransition,

         // Footer
         footerTypeClass,

         // Scroll Listeners
         scrolledTo,
         isVerticalMenuActive,
         toggleVerticalMenuActive,

         isNavMenuHidden,
         overlayClasses,
         verticalNavMenuItems,
         itemsMenu

      }
   },
}
</script>

<style lang="scss">
@import "@core/scss/base/themes/bordered-layout.scss";
</style>
