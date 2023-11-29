<template>
   <b-link class="brand-logo " :to="url" >
      <img :src="logo" :alt="appName" />
   </b-link>
</template>

<script>
import {
   BLink,
} from 'bootstrap-vue'
import {toRefs,computed} from 'vue'
import store from '@/store'
import { $themeConfig } from '@themeConfig'

export default {
   components:{
      BLink
   },

   props:{
      
      url:{
         type:String|Object,
         required:false,
         default:'#'
      }

   },

   setup() {

      const { skin } = toRefs(store.state.appConfig.layout)
      const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app

      return {
         appName,
         logo: computed(() => {
            return skin.value == 'dark' || skin.value == 'semi-dark' ? applogoImageWhite : appLogoImage;
         })

      }

   },
}
</script>

