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


    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <cart-dropdown /> -->
      <notification-dropdown />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>

import {
  BLink, BNavbarNav, BNavItem
} from 'bootstrap-vue'

import DarkToggler from './components/DarkToggler.vue'
import NotificationDropdown from '@/components/notifications.vue'
import UserDropdown from './components/UserDropdown.vue'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';

import useAuth from '@core/utils/useAuth.js'

export default {
  components: {
    BLink,
    BNavbarNav,
    DarkToggler,
    NotificationDropdown,
    UserDropdown,
    BNavItem,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },


  

  computed:{
    ...mapState('usuario',['usuario'])
  },


  setup(){

    const {
      is_loggin 
    } = useAuth();
    
    return {
      is_loggin
    }
  }




	


}
</script>

