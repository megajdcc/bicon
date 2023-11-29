<template>
      <b-modal :visible="showHorario" @hide="cerrar" title="Horarios de atención" body-class="d-flex justify-content-center" hide-footer centered >
         <table class="table table-sm table-hover table-bordeless " >
               <tbody>
                  <tr v-for="({dia,apertura,cierre,doble_turno},i) in horarios" :key="i">
                     <td>
                        {{ $t(getDay(dia)) }}
                     </td>
                     
                     <td>
                         <section v-if="!doble_turno">
                           <template v-if="apertura && cierre">
                              {{ apertura[0] | fecha('hh:mm A', true) }} - {{ cierre[0] | fecha('hh:mm A', true) }}
                           </template>

                           <template v-else>
                              <strong class="text-danger">{{ $t('Cerrado') }}</strong>
                           </template>
                        </section>

                        <section v-else class="">
                           <template v-if="apertura.length && cierre.length">

                              <section class="d-flex justify-content-between">
                                 {{ $t('Mañana') }}: ({{ apertura[0] | fecha('hh:mm A', true) }} - {{ cierre[0] | fecha('hh:mm A', true) }})
                              </section>
                        
                              <section class="d-flex justify-content-between">
                                 {{ $t('Tarde') }}: ({{ apertura[1] | fecha('hh:mm A', true) }} - {{ cierre[1] | fecha('hh:mm A', true) }})
                              </section>
                        
                           </template>

                           <template v-else>
                              <strong class="text-danger">{{ $t('Cerrado') }}</strong>
                           </template>
                        </section>
                        <!-- {{ getHora(apertura) }} - {{ getHora(cierre) }} -->
                     </td>

                  </tr>
               </tbody>
         </table>
      </b-modal>
</template>

<script>

import {
   BModal,
   BContainer,
   BRow,
   BCol
} from 'bootstrap-vue'

import {getDay,getHora } from '@core/utils/utils'

export default {
   
   components:{
      BModal,
      BContainer,
      BRow,
      BCol
   },

   props:{
      horarios:Array,
      showHorario:Boolean
   },


   setup(props,{emit}){


      const cerrar = () => {
         emit('update:showHorario',false)

      }

      return {

         cerrar,
         getDay,     
         getHora
      }

   }


}
</script>