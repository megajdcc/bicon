<template>
  <div id="app" :class="{...skinClasses }" style="min-height:100%">
      <component :is="layout">
        <router-view />
      </component>
    <scroll-to-top v-if="enableScrollToTop" />
    <reload-prompt />
  </div>
</template>

<script>

import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'

import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { watch,computed,provide,ref,onMounted } from 'vue'

import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar, useNetwork } from '@vueuse/core'

import store from '@/store'

import { useRoute } from 'vue2-helpers/vue-router';
import useAuth from '@core/utils/useAuth'
import ReloadPrompt from 'components/ReloadPrompt.vue'




export default {

  components: {
    LayoutHorizontal: () => import('@/layouts/horizontal/LayoutHorizontal.vue'),
    LayoutVertical: () => import('@/layouts/vertical/LayoutVertical.vue'),
    LayoutFull: () => import('@/layouts/full/LayoutFull.vue'),
    ScrollToTop,
    ReloadPrompt
  },

  beforeCreate() {
    // Set colors in theme
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

    // eslint-disable-next-line no-plusplus

    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2))
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')

  },


  setup(props) {

    const route = useRoute();
    const contentLayoutType = computed(() => store.state.appConfig.layout.type)
    const usuario = computed(() => store.state.usuario.usuario);


    const layout = computed(() => {
      if(route && route.meta.layout === 'full') return 'layout-full'
       return `layout-${contentLayoutType.value}`
    })


    const {
      is_loggin
    } = useAuth();

    const { skin, skinClasses } = useAppConfig()
    const { enableScrollToTop } = $themeConfig.layout
    const { isOnline } = useNetwork();

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()

    watch(windowWidth, (val) => {
      store.commit('app/UPDATE_WINDOW_WIDTH', val)
    })


    if (localStorage.getItem('token')) {
      if(localStorage.getItem('userData') != undefined){
       store.commit('usuario/cargarUser', JSON.parse(localStorage.getItem('userData')));
      }else if(!usuario.value.id){
          store.dispatch('usuario/cargarUsuario')
      }
    }

    //Cargar Sistema
    // store.dispatch('sistema/fetch')


    watch(isOnline, (val) => {

      if (!val) {
        toast.info('Sin internet; La conexíón ha caido, informalo a tú operadora')
      }

    })
   
    return {
      skinClasses,
      enableScrollToTop,
      layout,
      contentLayoutType,
      route,
    }
  },


}
</script>