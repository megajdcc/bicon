<template>
      <b-modal :visible="showGallerie" hide-footer title="Galería" centered size="xl" @hide="cerrar">
         <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="user-chats scroll-area w-100 area-images" style="height:450px">
            <b-img v-for="({imagen},i) in imagenes" :key="i" :src="imagen" thumbnail @click="index = i" class="imagen"></b-img>
         </vue-perfect-scrollbar>

         <vue-gallery v-if="imagenes" :images="imagenes.map(val => val.imagen)" :index="index"
            @close="index = null"></vue-gallery>
      </b-modal>
</template>

<script>

import {
   BContainer,
   BRow,
   BCol,
   BModal,
   BButton,
   BImg
} from 'bootstrap-vue'

import {computed,toRefs,ref} from 'vue'
import VueGallery from 'vue-gallery';
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
   
   props:{
      showGallerie:Boolean,
      galleries:Array,
      path:String
   },


   

   components:{
      BContainer,
      BRow,
      BCol,
      BModal,
      BButton,
      BImg,
      VueGallery,
      VuePerfectScrollbar

   },


   setup(props,{emit}){

      const {galleries,path} = toRefs(props)
      const index = ref(null)
      const cerrar = () =>{
         emit('update:showGallerie',false)
      }

      const perfectScrollbarSettings = ref({
         maxScrollbarLength: 450,
         wheelPropagation: false,
      })


      return {
         cerrar,
         perfectScrollbarSettings,
         index,
         imagenes:computed(() => {
            return galleries.value.map(val => ({
               imagen:`${path.value}/${val.imagen}`
            }))
         })

      }

   }
}
</script>

<style lang="scss" scoped>
.area-images{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
         .imagen {
         
               max-width: 300px;
               height: 250px;
               object-fit: cover;
               margin:auto .1rem;
               cursor:pointer;
         
            }
      }
</style>