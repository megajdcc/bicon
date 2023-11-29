<template>
  <!-- Error page-->
  <div class="misc-wrapper">
       <!-- Brand logo-->
      <b-link class="brand-logo">
         <img :src="logotipo" alt="Logo" />
      </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
         {{ $t('Página no encontrada') }} 🕵🏻‍♀️
        </h2>
        <p class="mb-2">
          {{ $t('¡UPS!') }} 😖 {{ $t('La URL solicitada no se encontró en este servidor') }}
        </p>

        <b-button variant="primary" class="mb-2 btn-sm-block" :to="{path:'/'}">
          {{ $t('Regresar a home') }}
        </b-button>

        <b-img
          fluid
          :src="imgUrl"
          alt="Error Page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { BLink, BButton, BImg } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import errorSvg from '@/assets/images/pages/error.svg'
import errorDarkSvg  from '@/assets/images/pages/error-dark.svg';
import logotipo from 'images/logos/logotipo.png'
import logotipoblanco from 'images/logos/logotipo.png'
import {toRefs,computed} from 'vue'

export default {
  components: {
    VuexyLogo,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: errorSvg,
      
      // Logotipo:import('/images/logos/logotipo.png')
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        this.downImg = errorDarkSvg
        return this.downImg
      }
      return this.downImg
    },
  },


  setup(props){

    const {layout} = toRefs(store.state.appConfig)
    const skin = computed(() => layout.value.skin)

    return{
      logotipo: computed(() => skin.value === 'dark' ? logotipoblanco : logotipo)
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
