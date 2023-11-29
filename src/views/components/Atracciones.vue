<template>
      <b-row>
         <b-col cols="12">
            <h3>{{ $t(titulo) }}</h3>
            <p>{{ $t('Descubre los lugares que no te debes perder') }}</p>
         </b-col>
         <b-col cols="12">
               <!-- <SwiperComponent /> -->
               <swiper-container class="swiper-centered-slides px-0 py-1" ref="swiperRef" init="false" >
         
                  <!-- slides -->
                  <swiper-slide v-for="(atraccion, i) in atracciones" :key="i" class="rounded " >
         
                     <b-card class="cursor-pointer" header-class="p-0 header-card" body-class="mt-1 px-1 contenido-card"
                      @click="$router.push(atraccion.ruta)" style="height:370px !important; max-width:350px"> 

                        <agendar :modelId="atraccion.id" :modelType="'App\\Models\\Atraccion'" :modelName="`El lugar turístico (${atraccion.nombre})`" />
 
         
                        <template #header>
         
                           <b-img v-if="atraccion.imagenes && atraccion.imagenes.length"
                              :src="`${$root.api_uri}/storage/thumbnails/${atraccion.imagenes[0].imagen}`" thumbnail class="card-img"
                             />
         
                           <has-like v-if="is_loggin && atraccion.imagenes && atraccion.imagenes.length"
                              :model="{ model_id: atraccion.id, model_type: atraccion.modelType }" />
         
                        </template>
         
         
                        <b-link :to="atraccion.ruta">
         
                           <b-badge variant="primary" v-if="atraccion.duracion_sugerida"> {{ $t('Duración Sugerida') }}: {{
                                 $t(atraccion.duracion_sugerida)
                           }}</b-badge>
         
                           <h4 class="title-card mt-1 mb-0">
                              {{ $t(atraccion.nombre) }}
                           </h4>
         
         
                        </b-link>
                        <section class="section-rate d-flex mt-0 p-0">
                          
                           <section class="d-flex align-items-center ">
                           
                              <!-- <h2 class="font-weight-bolder my-0 mr-1">
                                 {{ promedioCalificacion(atraccion) }}
                              </h2> -->
                           
                              <el-rate :value="promedioCalificacion(atraccion)" disabled disabled-void-color="#4f4f4f" void-color="#000000" />
                           
                              <p class="my-0 font-weight-bolder" v-if="atraccion.opinions">
                                 {{ atraccion.opinions.length }} <small>{{ $t('Opiniones') }}</small>
                              </p>
                           
                           </section>

                        </section>
         
                        <p class="text-justify parrafo-card" >{{ $t(atraccion.descripcion) }}</p>
         
                     </b-card>
         
                  </swiper-slide>
         
                  <!-- Add Arrows -->
                  
                  <div slot="button-next" class="swiper-button-next btn-swiper-next">
                     <font-awesome-icon icon="fa-angle-right" size="2x" />
                  </div>

                  <!-- <div slot="button-prev" class="swiper-button-prev" /> -->
               </swiper-container>
         </b-col>

      

      </b-row>
</template>


<script>

import {
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormGroup,
   BImg,
   BFormRating,
   BLink,
   BCard, 
   BBadge

} from 'bootstrap-vue'

import {ref,computed,onMounted,toRefs,watch,onActivated} from 'vue'
import useAuth from '@core/utils/useAuth'
import store from '@/store'
import {optionsSwiper} from '@core/utils/utils'
export default {
   
   props:{
      atracciones:{
         type:Array,
         required:true
      },
      
      titulo:{
         type:String,
         required:false,
         default:'Las experiencias que te recomendamos',
      },

    
   },

   components:{
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormGroup,
      BImg,
      BLink,
      BFormRating,
      hasLike:() => import('components/HasLike.vue'),
      BCard,
      BBadge,
      agendar:() => import('components/agendar.vue')
   },


   setup(props){
      
      const swiperRef = ref(null)
      
      const {atracciones} = toRefs(props)
      const {
         is_loggin
      } = useAuth();

      const api_uri = computed(() => axios.getUri() ?? '')

      onMounted(() => {
         Object.assign(swiperRef.value, optionsSwiper.value)
         swiperRef.value.initialize();
         // setTimeout(() => console.log(swiperRef.value) , 4000)
      }) 

      watch(atracciones,() => {

         if(swiperRef.value.swiper){
            swiperRef.value.swiper.update();
         }
         
      })


      return {
         api_uri,
         swiperRef,
         is_loggin,
         loading:computed(() => store.state.loading),
         promedioCalificacion:(atraccion) => store.getters['atraccion/promedioCalificacion'](atraccion),
      }

   }


}
</script>


<style lang="scss" scoped>
.banner-search {
   height: 300px;
   background-position: center top;
   background-repeat: no-repeat;
   background-size: cover;
   background-attachment: fixed;
}

.title-card {
   font-size: 16pt;
}

.card-img {
   height: 200px !important;
   width: 100%;
   object-fit: cover;
}

.header-card {
   position: relative;
}


.swiper-button-prev,
.swiper-button-next {
   // display: none;
}

.btn-swiper-next {
   background: #1e9ad7;
   border-radius: 50%;
   width: 40px;
   height: 40px;
   color: white;
   font-weight: 900;

   &::after{
      content:'' !important;
   }
}

.contenido-card{
   overflow-y: hidden;
}

.parrafo-card{
   overflow-y: hidden;
   height: 60px;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;

}
</style>
