<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-none d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block" />
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
export default {

  components: {
    BLink,
    BNavbarNav,
    DarkToggler,
    NotificationDropdown,
    UserDropdown,
    BNavItem
  },

  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  }

}
</script>


<style lang="scss">
  .vertical-overlay-menu .navbar .navbar-header {
      min-width: 180px !important;
  }
</style>