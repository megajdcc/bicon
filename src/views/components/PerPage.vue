
<template>
   <b-input-group :size="size" :prepend="$t('mostrar')">

      <b-form-select :value="perPage" @change="$emit('update:per-page',$event)" :options="perPageOptions"
         text-field="label" value-field="value">
      </b-form-select>


      <b-input-group-append is-text>
         {{ $t('Entradas') }}
      </b-input-group-append>

   </b-input-group>

</template>
<script>

import {

   BInputGroup,
   BFormSelect,
   BInputGroupAppend

} from 'bootstrap-vue'

export default {
   
   components:{
      BInputGroup,
      BFormSelect,
      BInputGroupAppend
   },

   props:{
      size: {
         type:String,
         required:false,
         default:'sm'
      },
      
      perPage:{
         type:Number|String,
         required:true,
      },
      perPageOptions:{
         type:Array,
         required:false,
         default:[
            {
               label: '10',
               value: 10,
            },
            {
               label: '25',
               value: 25,
            },
            {
               label: '50',
               value: 50,
            },
            {
               label: '100',
               value: 100,
            },
            {
               label: 'Todas',
               value: 0,
            },
         ]
      }
   },

   model:{
      prop:'perPage',
      event:'update:per-page'
   }
}


</script>