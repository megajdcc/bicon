<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <b-navbar-nav class="nav align-items-center mr-auto d-none d-sm-flex">
      <!-- <search-bar /> -->
      <v-select v-model="negocio_id" @option:selected="cambiarNegocio" :options="negociosList" label="nombre" :reduce="(option) => option.id" :clearable="false" class="w-100 selector-negocio" style="min-width:200px;">
      </v-select>
    </b-navbar-nav>

    <b-navbar-nav class="nav align-items-center d-none d-lg-flex flex-grow-1 justify-content-end" style="">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <div class="bookmark-wrapper align-items-center flex-lg-grow-0 flex-grow-1 d-none d-lg-flex justify-content-end">

      <!-- Bookmarks Container -->
      <!-- <bookmarks /> -->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale />
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <cart-dropdown /> -->
      <notification-dropdown />

      <academia v-if="is_loggin" is-negocio />
      
      <billetera isNegocio v-if="is_loggin" :negocioId="negocio_id"/>
      <user-dropdown panel="negocio" :negocioId="negocio_id"/>

    </b-navbar-nav>
  </div>
</template>

<script>

import {
  BLink, BNavbarNav, BNavItem
} from 'bootstrap-vue'

// import Bookmarks from './components/Bookmarks.vue'
import Locale from '@core/layouts/components/app-navbar/components/Locale.vue'
// import SearchBar from './components/SearchBar.vue'
import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
// import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from '@/components/notifications.vue'
// import ObservationDropdown from './components/ObservationDropdown.vue'
import UserDropdown from '@core/layouts/components/app-navbar/components/UserDropdown.vue'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';

import vSelect from 'vue-select'

import store from '@/store'
import {toRefs,ref,toRef,computed,watch} from 'vue'

import useAuth from '@core/utils/useAuth.js'

export default {

  components: {
    BLink,
    BNavbarNav,
    Locale,
    DarkToggler,
    NotificationDropdown,
    UserDropdown,
    BNavItem,
    vSelect,
    Academia:() => import('components/Academia.vue'),
    billetera:() => import('components/billetera.vue')
  },

  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },


  setup(props){

    const {usuario} = toRefs(store.state.usuario)
    const negocio_id = ref(store.state.negocio.negocio.id)

    const {negocio, negocios} = toRefs(store.state.negocio)

    const cambiarNegocio = ({id:id_negocio}) => {

      store.dispatch('negocio/cambiarNegocio',id_negocio).then(({result}) => {
        
        if(result){
          toast.success('Se ha cambiado con éxito el Negocio')
        }else{
          toast.info('No se pudo cargar el Negocio, inténtelo de nuevo')
        }

      })

    }

    watch(negocio,(val) => {
      negocio_id.value = negocio.value.id
    })


    const {
      is_loggin
    } = useAuth();

    const cargarForm = () => {
      if (['Administrador', 'Desarrollador'].includes(usuario.value.rol.nombre)) {
        store.dispatch('negocio/getNegocios')
      }

    }

    cargarForm();


    return {
      usuario,
      negocio_id,
      cambiarNegocio,
      is_loggin,
      negociosList:computed(() => {
        
        if(['Administrador','Desarrollador'].includes(usuario.value.rol.nombre)){
          return negocios.value;
        }

        return usuario.value.negocios;
        
      })
    }



  }


}
</script>

<style lang="scss">


  .selector-negocio .vs__dropdown-toggle{
    border-color: transparent !important;
  }

</style>