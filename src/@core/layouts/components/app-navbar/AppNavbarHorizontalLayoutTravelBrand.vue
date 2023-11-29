<template>
  <div class="navbar-header  d-xl-block">


    <ul class="nav navbar-nav">
       <li class="nav-item d-xl-none d-flex align-items-center">
          <b-link class="nav-link" @click="toggleVerticalMenuActive">
              <feather-icon icon="MenuIcon" size="21" />
          </b-link>
        </li>

      <li class="nav-item">
        <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img :src="logo" alt="logo" width="170" height="50" />
          </span>
        </b-link>
      </li>
    </ul>

  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import {computed,toRefs,onMounted} from 'vue'
import store from '@/store'


export default {
  components: {
    BLink,
    BImg,
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

    return {
      appName,
      logo:computed(() => {
        return skin.value == 'dark' || skin.value == 'semi-dark' ? applogoImageWhite : appLogoImage;
      })

    }
  },
}
</script>

<style lang="scss">



@media (min-width:1200px) {
    .brand-logo img {
        max-width: 180px !important;
    }
}
</style>
