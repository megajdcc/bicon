<template>
  <!-- Under maintenance-->
  <div class="misc-wrapper">
   <!-- Brand logo-->
      <b-link class="brand-logo" :to="{name:'home'}">
        
         <img :src="logotipo" alt="Logo" />
     
      </b-link>
      <!-- /Brand logo-->

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          En mantenimiento 🛠
        </h2>

        <p class="mb-3">
          Disculpe las molestias, pero estamos realizando algunas tareas de mantenimiento en este momento.
        </p>
        <!-- img -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Under maintenance page"
        />
      </div>
    </div>
  </div>
<!-- / Under maintenance-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BFormInput, BButton, BForm, BImg } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import downImg from '@/assets/images/pages/under-maintenance.svg'
import {computed,toRefs} from 'vue';
import downImgDark from '@/assets/images/pages/under-maintenance-dark.svg';
import logotipo from 'images/logos/logotipo.png'
import logotipoblanco from 'images/logos/logotipo.png'

export default {
  components: {
    BLink,
    BFormInput,
    BButton,
    BForm,
    BImg,
    VuexyLogo,
  },
  setup() {
    const {layout} = toRefs(store.state.appConfig)
    const skin = computed(() => layout.value.skin)

    return {
      downImg,
      logotipo: computed(() => skin.value === 'dark' ? logotipoblanco : logotipo),
      imgUrl:computed(() => {
        return  layout.value.skin === 'dark' ? downImgDark : downImg
      })
    }
  },
  computed: {
    imgUrl() {
     
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
