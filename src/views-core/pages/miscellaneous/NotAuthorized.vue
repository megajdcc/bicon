<template>
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <b-link class="brand-logo">
        
         <img :src="logotipo" alt="Logo" />
       
      </b-link>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          {{ $t('No estas autorizado!') }} 🔐
        </h2>
        <p class="mb-2">
          {{ $t('No tienes permiso para acceder a esta página. Vuelve a casa!') }}
        </p>
        <b-button
          variant="primary"
          class="mb-1 btn-sm-block"
          :to="loginRoute()"
        >{{ $t('De vuelta a casa') }}</b-button>
        <b-img
          fluid
          :src="imgUrl"
          alt="Not authorized page"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { mapState } from 'vuex';
import downImg from '@/assets/images/pages/not-authorized.svg'
import downImgDark from '@/assets/images/pages/not-authorized-dark.svg'
import {computed,toRefs} from 'vue';
import logotipo from 'images/logos/logotipo.png'
import logotipoblanco from 'images/logos/logotipo.png'

import router from '@/router';

export default {
  components: {
    BLink,
    BImg,
    BButton,
    VuexyLogo,
  },


  setup(){
    const {layout} = toRefs(store.state.appConfig)
    const {usuario}  = toRefs(store.state.usuario)
    const skin = computed(() => layout.value.skin)
    const  loginRoute = () => {

      if(usuario.value.id){
        router.push('/home')
      }else{
        router.push({ name: 'login' })
      }
    }

    return {
      downImg,
       logotipo: computed(() => skin.value === 'dark' ? logotipoblanco : logotipo),
      imgUrl:computed(() => {
        return layout.value.skin === 'dark' ? downImgDark : downImg
      }),
      usuario,
      loginRoute
      
    }
  },

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
