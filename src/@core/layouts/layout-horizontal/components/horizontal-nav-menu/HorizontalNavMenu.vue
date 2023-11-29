<template>
  <div class="navbar-container main-menu-content">
    <horizontal-nav-menu-items :items="itemsMenu" />
  </div>
</template>

<script>
import navMenuItems from '@/navigation/horizontal'
import HorizontalNavMenuItems from './components/horizontal-nav-menu-items/HorizontalNavMenuItems.vue'
import navMenuItemsPromotor from '@/navigation/vertical/promotor'
import navMenuItemsLider from '@/navigation/vertical/lider'
import navMenuItemsCoordinador from '@/navigation/vertical/coordinador'
import { computed, toRefs } from 'vue'
import store from '@/store'

export default {
  
  components: {
    HorizontalNavMenuItems,
  },

  setup(){

    const { usuario } = toRefs(store.state.usuario)

    const itemsMenu = computed(() => {

      if (usuario.value.rol) {

        let RolMenus = {
          promotor: navMenuItemsPromotor,
          lider: navMenuItemsLider,
          coordinador: navMenuItemsCoordinador
        };
        let k = Object.keys(RolMenus).find(val => {
          if(usuario.value.rol && usuario.value.rol.nombre){
            return val == usuario.value.rol.nombre.toLowerCase()
          }
          return false
        });

        if (k != undefined) {
          return RolMenus[k]
        }

        return navMenuItems


      } else {
        return navMenuItems
      }

    })

    return {
      itemsMenu,
    }

  },
}
</script>

<style lang="scss">
@import "@core/scss/base/core/menu/menu-types/horizontal-menu.scss";
</style>
