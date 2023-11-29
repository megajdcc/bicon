<template>
  <div class="navbar-header d-xl-block">

    <ul class="nav navbar-nav">
      <li class="nav-item d-xl-none d-flex align-items-center">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>

      <li class="nav-item">
        <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img-lazy :src="logo" alt="logo" height="60" show />
          </span>
          
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg, BImgLazy } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import {computed,toRefs} from 'vue'
import store from '@/store'

export default {
  components: {
    BLink,
    BImg,
    BImgLazy
  },

  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => { },
    },
  },

  setup() {
    // App Name
    const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app
    const { skin } = toRefs(store.state.appConfig.layout)

    const logo = computed(() => {
      return skin.value == 'dark' || skin.value == 'semi-dark' ? applogoImageWhite : appLogoImage
    })
    return {
      appName,
      logo 
    }
  },
}
</script>

<style lang="scss">
.brand-logo img {
  // max-width: 90px;
}

@media (min-width:400px) {
  .brand-logo img {
    // max-width: 100px !important;
  }
}

@media (min-width:500px) {
  .brand-logo img {
    // max-width: 110px !important;
  }
}

@media (min-width:720px) {
  .brand-logo img {
    // max-width: 130px !important;
  }
}

@media (min-width:1200px) {
  .brand-logo img {
    // max-width: 180px !important;
  }
}
</style>

