<template>

   <b-modal :visible="showDialog" @change="(val) => $emit('update:showDialog',val)" :size="size" hide-backdrop centered
      no-close-on-backdrop body-class="p-0 chat-application">

      <template v-if="tipo && tipo == 'pdf'">
         <pdf :source="url" style="
              display: inline-block;
              width: 100%;
              max-heigth: 450px !important;
              overflow-y: auto !important;
            ">
         </pdf>
      </template>

      <template v-else-if="tipo == 'mp3' || tipo == 'mp4'">
         <video :src="url" autoplay controls class="text-center w-100"></video>
      </template>

      <template v-else-if="tipo == 'xls' || tipo == 'xlsx'">
         <b-img :src="xls" fluid center style="max-height:70vh" />
      </template>

      <template v-else-if="tipo == 'jpg' || tipo == 'jpeg' || tipo == 'png' || tipo == 'svg'">
         <b-img :src="url" fluid center style="max-height:50vh" />
      </template>

      <template v-else>
         <b-img :src="otros" fluid center style="max-height:50vh" />
      </template>

      <template #modal-footer="{cancel}">

         <b-button-group size="sm">
            <b-button variant="primary" :href="url" title="Descargar el comprobante" download>
               <feather-icon icon="DownloadIcon" size="16" class="align-middle" />
            </b-button>

            <b-button @click="cancel" variant="danger">
               <feather-icon icon="EyeOfficon" size="16" />
               Cerrar
            </b-button>
         </b-button-group>


      </template>

   </b-modal>

</template>

<script>

import {
   BModal,
   BImg,
   BButtonGroup,
   BButton
} from 'bootstrap-vue'

import xls from '@/assets/images/icons/xls.png';
import otros  from '@/assets/images/icons/unknown.png';

export default {

   components:{
      BModal,
      BImg,
      BButtonGroup,
      BButton,
      pdf:() => import("vue-pdf-embed")
   },

   props:{
      
      url:{
         type:String,
         required:true,
         default:''
      },

      showDialog: {
         type: Boolean,
         required: true,
      },

      size:{
         type:Number|String,
         required:false,
         default:'lg',
      },

      tipo:{
         type:String,
         required:false,
         default:'jpg'
      }

   },

   // ['url','showDialog','size','tipo'],

   setup(props) {

      return {
         xls,
         otros
      }
s   },
}
</script>