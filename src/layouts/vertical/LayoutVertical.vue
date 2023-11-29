<template>
  <layout-vertical :nav-menu-items="itemsMenu">

    <router-view />

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />

  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'
import navMenuItems from '@/navigation/vertical'
import {computed} from 'vue'

export default {

  components: {
    AppCustomizer,
    LayoutVertical,
  },

  data() {
    
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },

  setup(props){

    return {
      itemsMenu: computed(() => navMenuItems)
    }
  }

}
</script>
