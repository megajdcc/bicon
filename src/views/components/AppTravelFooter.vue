<template>
   <b-container fluid>
      <b-row>
         <b-col cols="12" class="d-flex justify-content-center">
            <ul class="nav justify-content-center" :class="{ 'w-75': windowWidth >= 762}">
               <li class="nav-item" v-if="!is_loggin">
                  <b-link :to="{name:'login'}" class="nav-link px-2 font-weight-bolder">
                     {{ $t('Inicia Sesión') }}
                  </b-link>
               </li>

               <li class="nav-item" v-if="!is_loggin">
                  <b-link :to="{name:'register'}" class="nav-link px-2 font-weight-bolder">
                    {{ $t('Hazte socio') }}
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{ name:'socio.negocio.afiliar'}" class="nav-link px-2 font-weight-bolder">
                     {{ $t('Afilia tú negocio') }}
                  </b-link>
               </li>
               <!-- <li class="nav-item">
                  <b-link :to="{name:'negocio.about'}" class="nav-link px-2 font-weight-bolder">
                     Porque afiliar tu negocio?
                  </b-link>
               </li> -->


               <li class="nav-item">
                  <b-link :to="{name:'faqs'}" class="nav-link px-2 font-weight-bolder">
                     {{ $t('Preguntas Frecuentes') }}
                  </b-link>
               </li>


               <li class="nav-item" v-for="(pagina,i) in paginas" :key="i">
                  <b-link :to="{path:`/${pagina.ruta}`}" class="nav-link px-2 font-weight-bolder">
                     {{ $t(pagina.nombre) }}
                  </b-link>
               </li>

               <!-- <li class="nav-item">
                  <b-link :to="{name:'politicas.privacidad'}" class="nav-link px-2 font-weight-bolder">
                     Políticas de privacidad
                  </b-link>
               </li> -->

               <!-- <li class="nav-item">
                  <b-link :to="{name:'terminos-condiciones'}" class="nav-link px-2 font-weight-bolder">
                    Términos y condiciones 
                  </b-link>
               </li> -->




            </ul>

         </b-col>
      </b-row>

      <b-row class="clearfix border-top">
         <!-- <b-col cols="12" :md="sistema.redes.length ? 8 : 12" class="d-flex mt-1 mb-0 flex-column  " style="position:relative">
            <strong>{{ sistema.sucursales.length > 1 ? 'SUCURSALES' : 'SUCURSAL' }}</strong>
             <swiper-container  v-bind="swiperOptions" ref="swiperRef" :autoplay-delay="5000" autoplay-disable-on-interaction="false" >

                  <swiper-slide v-for="(sucursal,index) in sistema.sucursales" :key="index">
                        <div class="title font-weight-bolder" >
                           {{ sucursal.estado.pais.pais }} 
                        </div>

                        <div class="text" >
                             <p>{{ sucursal.direccion }}</p> 
                           <b-card-text>

                           </b-card-text>
                        </div>
                  </swiper-slide>
            </swiper-container>
          
         </b-col> -->

          <b-col cols="12" :md="sistema.redes.length ? 4 : 12" class="mb-0 d-flex align-items-center flex-column mt-1" v-if="sistema.redes.length">
            <strong class="mb-1"> {{ $t('REDES SOCIALES') }}</strong>
            <div class="d-flex flex-sm-row justify-content-start align-items-center w-100">
               
               <ul class="list-unstyled d-flex m-0 justify-content-center w-100">
                  <li  v-for="({url,nombre,icono},i) in sistema.redes" :key="i" :class="{'ml-2' : i > 0}">
                     <b-link :href="url" :alt="$t(nombre)" :title="$t(nombre)" v-b-tooltip.hover.top.v-primary target="_blank" 
                     class="wow bounceInDown " :data-wow-delay="`1.${i}`" >
                        <font-awesome-icon :icon="['fab',icono]" size="2x"/>
                     </b-link>
                  </li>
         
               </ul>
            </div>
         </b-col>



         <b-col cols="12" class="mb-0">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-1">

               <span class="float-md-left d-block d-md-inline-block mt-25">
                  COPYRIGHT © {{ new Date().getFullYear() }}
                  <b-link class="ml-25" href="#" target="_blank">{{ sistema.nombre || 'Travel'  }}</b-link>
                  <span class="d-none d-sm-inline-block">, {{ $t('Todos los derechos reservados') }}</span>
               </span>


            </div>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import { 
   BLink,
   BContainer,
   BRow,
   BCol,
   BCardText,
   VBTooltip
} from 'bootstrap-vue'
import useAuth from '@core/utils/useAuth'
import { $themeConfig } from '@themeConfig'
import { toRefs, computed, ref,onMounted} from 'vue'
import store from '@/store'
import { convertirKebabCase,capitalize } from '@core/utils/utils';
export default {
   components: {
      BContainer,
      BRow,
      BCol,
      BLink,
      BCardText,

   },

   directives:{
      'b-tooltip' :VBTooltip
   },

   setup(){
      const {sistema} = toRefs(store.state.sistema)
      const { paginas } = toRefs(store.state.pagina)

      const cargarForm = () => {

         if(!paginas.value.length){
            store.dispatch('pagina/getPaginas')
         }  

      } 

      onMounted(() => cargarForm())


      const {
         appName:app_name
      } = $themeConfig.app;

      const { windowWidth } = toRefs(store.state.app)

      const {
         is_loggin
      } = useAuth()

      const swiperOptions = ref({
         speed:600,
         loop:true,
      })

      return {
         windowWidth,
         is_loggin,
         app_name,
         sistema,
         swiperOptions,
         paginas,
         convertirKebabCase,
         capitalize
      }
   }
}
</script>

<style lang="scss" scoped>

swiper-container{
   //  width: 320px !important;
    max-width:100%;


   swiper-slide {
      text-align: justify;
      display: flex;
      flex-direction: column !important;
   }
}
</style>

