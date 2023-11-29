<template>

      <section class="w-100 d-flex justify-content-center content-search">
         
         <b-input-group class="el-search" size="md">
            <b-input-group-prepend is-text>
               <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
           
            <b-form-input v-model="search" @input="remoteMethod" :placeholder="$t('¿Qué te apetece hacer hoy? (lugares, experiencias, comidas, etc.)')" ref="refInput">
            </b-form-input>
         </b-input-group>
      
         <b-list-group class="collapseSearch d-flex flex-column align-items-center" ref="refToggle" v-if="search">
            <!-- <b-spinner v-show="loading" variant="primary" class="my-1"></b-spinner> -->
            
            <b-list-group-item button variant="light" @click="searchGPS" class="d-flex align-items-center justify-content-between">

               <section class="w-25">
                  <feather-icon icon="SendIcon" />
                  {{ $t('Cerca de mí') }}
               </section>

               <section class="w-75">
                  <v-select v-model="km" @input="searchGPS" :reduce="(option) => option.value" :options="kms" class="w-100" ></v-select>
               </section>
              
            </b-list-group-item>

            <b-list-group-item v-for="({nombre,ruta,tipo,imagen},i) in resultados" :key="i" class="cursor-pointer" button :to="ruta" >

               <article class="d-flex" @click="() => $router.push(ruta)">
                  <b-img :src="`${$root.api_uri}${imagen}`" thumbnail style="height:70px; width:70px;object-fit:fill" class="mr-1" />
                  <main>
                     <h3>{{ nombre }}</h3>
                     <span>
                        {{ tipo }}
                     </span>
                  </main>
               </article>
            </b-list-group-item>

            <!-- <b-list-group-item v-if="!resultados.length" button variant="info">
               <b-link :to="`/search?q=${search}`">
                  Todos los resultados para "{{ search }}"
               </b-link>
            </b-list-group-item> -->

         </b-list-group>
      

      </section>

</template>

<script>

import {toRefs,ref,computed,onMounted,watch} from 'vue'

import store from '@/store'
import router from '@/router'
import {useGeolocation}  from '@vueuse/core'
import vSelect from 'vue-select'

import {
   BFormInput,
   BCollapse,
   BListGroup,
   BListGroupItem,
   VBToggle,
   BSpinner,
   BImg,
   BContainer,
   BRow,
   BInputGroup,
   BCol,
   BInputGroupText,
   BInputGroupPrepend,
   BLink

} from 'bootstrap-vue'

export default {
   
   components:{
      BCollapse,
      BFormInput,
      BListGroup,
      BListGroupItem,
      BSpinner,
      BImg,
      BContainer,
      BRow,
      BCol,
      BInputGroup,
      BInputGroupText,
      BInputGroupPrepend,
      BLink,
      vSelect
   },

   directives:{
      'b-toggle':VBToggle
   },

   props:{
      destino:Number|String
   },

   setup(props){

      const search = ref('')
      const refInput = ref(null);
      const resultados = ref([])
      const collapseSearch = ref(null)
      const {destino} = toRefs(props)

      const inputSearch = ref(false)
      const listenToggle = ref(false)

      const { coords, locatedAt, error, resume, pause } = useGeolocation()

      const kms = ref([
         {
            label:'30 Km',
            value:30
         },
         {
            label: '50 Km',
            value: 50
         },

         {
            label: '100 Km',
            value: 100
         },
         {
            label: '150 Km',
            value: 150
         },

         {
            label: '200 Km',
            value: 200
         },

         {
            label: '250 Km',
            value: 250
         },

         {
            label: '300 Km',
            value: 300
         }



      ]);

      const km = ref(300)
      const remoteMethod = (query) => {

         if(query !== ''){
            setTimeout(() => {
                 
               store.dispatch('searchPublic',{query:query,destino:destino.value }).then((data) => {
                  resultados.value = data
                 
               }).catch(e => console.log(e))

            }, 1000);
         }

      }

      const searchGPS =() => {
         
         if(error.value){
            toast.info(error.value.message,{position:'bottom-right'})
         }
         
         store.dispatch('searchLocation',{lat:coords.value.latitude,lng:coords.value.longitude,km:km.value}).then(data => {
            resultados.value = data
         }).catch(e => console.log(e))

      }

      const cargarForm = () => {
         // refInput.value.$el.addEventListener('focus', (event) => showToggle.value = true)
         // refInput.value.$el.addEventListener('blur', (event) => showToggle.value = false)

      }

      onMounted(() => cargarForm())


      return {
         remoteMethod,
         loading:computed(() => store.state.loading),
         search,
         resultados,
         collapseSearch,
         searchGPS,
         refInput,
         inputSearch,
         listenToggle,
         kms,
         km,
      }

   }

}

</script>

<style lang="scss">
.content-search{
   position:relative;
}

.el-search {
   width: 100%;
}

.collapseSearch{
   width: 100%;
   display: flex;
   // min-height: 50px;
   position: absolute;
   top: 3rem;
   background: #404656;
   transition:1.5s ease;
   list-style:none;
   z-index: 6000;

   animation:establecerAltura 1.5s ;

   height: auto;
   max-height:300px;
   overflow-y: scroll;

}

@media (min-width:762px) {

   .el-search {
      width: 75% !important;
   }
   
   .collapseSearch{
      width:75%;
   }

}

@keyframes establecerAltura {
   to{
      top: 3rem;
   }
   from{
      top: 0rem;
   }


}
</style>