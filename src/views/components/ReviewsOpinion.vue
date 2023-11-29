<template>
      <b-container fluid class="px-0 mx-0">
         <b-row>
      
            <!-- Analytics Calificaciones -->
            <b-col cols="12" sm="4" md="3" class="mr-0 mx-0" >
               <section class="d-flex align-items-center sticky-top" style="top:5rem">
      
                  <h2 class="font-weight-bolder my-0 mr-1">
                     {{ promedioCalificacion }}
                  </h2>
      
                  <el-rate v-model="promedioCalificacion" disabled disabled-void-color="#4f4f4f" void-color="#000000" class="d-flex flex-nowrap" />
      
                  <p class="my-0 font-weight-bolder">
                     {{ cantidad }} <small>{{ $t('Opiniones') }}</small>
                  </p>
      
               </section>
      
               <table class="table table-sm table-hover table-borderless table-calificacion sticky-top" style="top:7rem">
                  <tr>
                     <td class="w-25">{{ $t('Excelente') }}</td>
                     <td class="w-75 d-flex align-items-center">
                        <el-progress :percentage="porcentajeOpinions(5).porcentaje" :color="colorRandon" :show-text="false"
                           class="mr-1 w-100" />
                        <p class="my-0 font-weight-bolder">
                           {{ porcentajeOpinions(5).cantidad }}
                        </p>
                     </td>
                  </tr>
      
                  <tr>
                     <td class="w-25">{{ $t('Muy Bueno') }}</td>
                     <td class="w-75 d-flex align-items-center">
                        <el-progress :percentage="porcentajeOpinions(4).porcentaje" :color="colorRandon" :show-text="false"
                           class="mr-1 w-100" />
                        <p class="my-0 font-weight-bolder">
                           {{ porcentajeOpinions(4).cantidad }}
                        </p>
                     </td>
                  </tr>
      
                  <tr>
                     <td class="w-25">{{ $t('Promedio') }}</td>
                     <td class="w-75 d-flex align-items-center">
                        <el-progress :percentage="porcentajeOpinions(3).porcentaje" :color="colorRandon" :show-text="false"
                           class="w-100" />
                        <p class="my-0 font-weight-bolder ml-1">
                           {{ porcentajeOpinions(3).cantidad }}
                        </p>
                     </td>
                  </tr>
      
                  <tr>
                     <td class="w-25">{{ $t('Mala') }}</td>
                     <td class="w-75 d-flex align-items-center">
                        <el-progress :percentage="porcentajeOpinions(2).porcentaje" :color="colorRandon" :show-text="false"
                           class="w-100" />
                        <p class="my-0 font-weight-bolder ml-1">
                           {{ porcentajeOpinions(2).cantidad }}
                        </p>
                     </td>
                  </tr>
      
                  <tr>
                     <td class="w-25">{{ $t('Horrible') }}</td>
                     <td class="w-75 d-flex align-items-center">
                        <el-progress :percentage="porcentajeOpinions(1).porcentaje" :color="colorRandon" :show-text="false"
                           class="w-100" />
                        <p class="my-0 font-weight-bolder ml-1">
                           {{ porcentajeOpinions(1).cantidad }}
                        </p>
                     </td>
                  </tr>
               </table>
      
            </b-col>
      
            <!-- Reviews Calificaciones -->
            <b-col cols="12" sm="8" md="9">
               <b-card>
                  <template #header>
                     <b-form-input v-model="searchQuery" type="search" :placeholder="$t('Buscar Opinión')" />
                  </template>
                  <b-list-group>
                     <b-list-group-item v-for="({usuario,opinion,calificacion,titulo,asistencia,created_at},i) in items" :key="i" >
                        <b-container fluid>
                           <b-row>
                              <b-col cols="12" >
                                 
                                 <b-media vertical-align="center" >
                                    <template #aside>
                                       <b-avatar size="32" :src="usuario.avatar" :text="avatarText(`${usuario.nombre} ${usuario.apellido}`)"
                                          :variant="`light-info`" disabled />
                                    </template>
                                    <b-link  disabled class="font-weight-bold d-block text-nowrap">
                                       {{ `${usuario.nombre} ${usuario.apellido}` }}
                                    </b-link>
                                    <small class="text-muted" v-if="usuario.username">{{ usuario.username }}</small>
                                 </b-media>

                              </b-col>

                              <b-col cols="12" class="d-flex flex-column">
                                 <el-rate :value="Number(calificacion)" disabled disabled-void-color="#4f4f4f" void-color="#000000"/>
                                 <h3 class="font-weight-bolder">{{ titulo }}</h3>
                                 <span>
                                    {{ asistencia  }}
                                 </span>
                                 <section class="opinion">
                                    <p>{{ opinion }}</p>
                                 </section>

                                 <small>{{ $t('Escrita el') }} {{ created_at | fecha('DD MMMM YYYY h:mm A') }}</small>

                                 <small>
                                    {{ $t('Esta opinión es la opinión subjetiva de un miembro, no de TravelPoints. TravelPoints les hace controles a todas las opiniones.') }}
                                 </small>
                              </b-col>
                           </b-row>
                           <b-row>

                           </b-row>
                        </b-container>
                     </b-list-group-item>
                  </b-list-group>
                  <template #footer>
                     <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :total="total" :perPage="perPage" />
                  </template>

               </b-card>
             
            </b-col>
      
         </b-row>
      </b-container>
</template>

<script>
import {
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormGroup,
   BButton,
   BButtonGroup,
   BCard,
   BListGroup,
   BListGroupItem,
   BMedia,
   BAvatar,
   BLink

} from 'bootstrap-vue'
import {computed,ref,toRefs,watch} from 'vue'
import store from '@/store'
import useCalificacionsList  from  './useCalificacionsList.js'
import { avatarText } from '@core/utils/filter'
import { useRoute } from 'vue2-helpers/vue-router';


export default {
   
   components:{
      BContainer,
      BRow,
      BCol,
      PaginateTable:() => import('components/PaginateTable.vue'),
      BFormInput,
      BFormGroup,
      BButton,
      BButtonGroup,
      BCard,
      BListGroup,
      BListGroupItem,
      BMedia,
      BAvatar,
      BLink,
   },

   props:{
      promedioCalificacion:Number,
      cantidad:Number,
      porcentajeOpinions:Function,
      model:{
         type:Object,
         required:true,
      }
   },

   setup(props){
      
      const { promedioCalificacion, model,cantidad,porcentajeOpinions} = toRefs(props)
      watch([cantidad, promedioCalificacion],() => {
         refetchData()
      })



      const {
         fetchData,
         refetchData,
         perPageOptions,
         dataMeta,
         items,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
      } = useCalificacionsList(model)

    


      return {
         colorRandon:computed(() => colorRand()),
         loading:computed(() => store.state.loading),
         fetchData,
         refetchData,
         perPageOptions,
         dataMeta,
         items,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         avatarText
      }
   }
}
</script>

<style lang="scss">
   .media-body{
      overflow-x: hidden;
   }

</style>

<style lang="scss">
.titulo {
   font-size: 24pt;
}

.swiper-slide {
   display: flex;
   justify-content: center;

   .imagen-gallerie {
      height: 350px;
      width: 100%;
      object-fit: cover;
      margin: auto 0px;
   }
}

.imagen-thumb {
   width: 70px;
   height: 50px;
   cursor: pointer;
}

.gallerie {
   //   flex: 1 1 60%;
   position: relative;

   // .swiper-slide-active{
   .btn-gallerie {
      position: absolute;
      left: 2rem;
      top: 3rem;
      bottom: auto;
      right: auto;
      z-index: 10;
   }

   // }

}

.table-calificacion tr td {
   padding-left: 0px !important;
}
</style>
