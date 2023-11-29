<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="[
      { 'expanded': !isVerticalMenuCollapsed || (isVerticalMenuCollapsed && isMouseHovered) },
      skin === 'light'|| skin === 'bordered' ? 'menu-light' : 'menu-dark'
    ]"
    @mouseenter="updateMouseHovered(true)"
    @mouseleave="updateMouseHovered(false)"
  >
    <div class="navbar-header expanded ">
      <slot name="header" :toggleVerticalMenuActive="toggleVerticalMenuActive" :toggleCollapsed="toggleCollapsed" :collapseTogglerIcon="collapseTogglerIcon">
        <ul class="nav navbar-nav">

          <li class="nav-item">
            <b-link class="navbar-brand" to="/">
              <span class="brand-logo">
                <b-img :src="logo" alt="logo"/>
              </span>
            </b-link>
          </li>

          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle my-0 ml-auto mr-0">
              <feather-icon
                icon="XIcon"
                size="20"
                class="d-block d-xl-none"
                @click="toggleVerticalMenuActive"
              />
              <feather-icon
                :icon="collapseTogglerIconFeather"
                size="20"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              />
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div
      :class="{'d-block': shallShadowBottom}"
      class="shadow-bottom"
    />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="main-menu-content scroll-area"
      tagname="ul"
      @ps-scroll-y="evt => { shallShadowBottom = evt.srcElement.scrollTop > 0 }"
    >
      <vertical-nav-menu-items
        :items="navMenuItems"
        class="navigation navigation-main"
      />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BLink, BImg } from 'bootstrap-vue'
import { provide, computed, ref } from 'vue'
import useAppConfig from '@core/app-config/useAppConfig'
import { $themeConfig } from '@themeConfig'
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue'
import useVerticalNavMenu from './useVerticalNavMenu'

import store from '@/store'

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    BLink,
    BImg,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
    navMenuItems: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props)

  
    const { skin } = useAppConfig()

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false)

    provide('isMouseHovered', isMouseHovered)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    const collapseTogglerIconFeather = computed(() => (collapseTogglerIcon.value === 'unpinned' ? 'CircleIcon' : 'DiscIcon'))

    // App Name
    const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app

    return {
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,

      // App Name
      appName,
      appLogoImage,
      logo:computed(() => {
        return skin.value == 'dark' || skin.value == 'semi-dark' ? applogoImageWhite : appLogoImage;
      })

    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/base/core/menu/menu-types/vertical-menu.scss";
.navbar-header{
  .nav.navbar-nav{

   display: flex;
   flex-direction:row;
   flex-wrap:nowrap;
   justify-content:space-between;
    align-items:center;
    li:first-child{
      flex:1 1 200px;
    }
    li.nav-toggle{
      flex:1 1 30px;
    }


    .brand-log{
      padding:none;
    }


    .brand-logo img{
        width:80px;
        max-width:180px;
        height:50px;
        object-fit: contain;
        padding:none;
      }

  }
}


@media (min-width:350px){
  .navbar-header{
  .nav.navbar-nav{
    .brand-logo img{
        width:100px;
    }
  }
  }

  
}

@media (min-width:370px){
  .navbar-header{
  .nav.navbar-nav{
    .brand-logo img{
        width:130px;
    }
  }
  }

  
}

@media (min-width:420px){
  .navbar-header{
  .nav.navbar-nav{
    .brand-logo img{
        width:170px;
    }
  }
  }

  
}


@media (min-width:720px){
  .navbar-header{
  .nav.navbar-nav{
    .brand-logo img{
        width:180px;
    }
  }
  }

  
}





</style>
