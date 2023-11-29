<template>
   <b-media no-body class="mb-1 mb-md-0">
      <b-media-aside vertical-align="center" class="d-none d-md-flex">
         <b-card body-class="content-img" @click="refInputEl.$el.click()" style="cursor:pointer">
            <b-img ref="previewEl" rounded :src="usuario.avatar" class="img-perfil" thumbnail v-loading="loading" />
            <span class="img-perfil-hover">{{ $t('Clic para cambiar imagen') }}</span>
         </b-card>

         <!--/ avatar -->
      </b-media-aside>

      <b-media-body class="my-auto">

         <b-card body-class="content-img d-flex d-md-none text-center justify-content-center d-flex"
            @click="refInputEl.$el.click()" style="cursor:pointer">
            <b-img ref="previewEl" rounded :src="usuario.avatar" class="img-perfil" thumbnail v-loading="loading" />
            <span class="img-perfil-hover">{{ $t('Clic para cambiar imagen') }}</span>
         </b-card>
         <h3 class="d-block">{{ $t('Nivel de Viajero') }}</h3>
         <section class="d-flex justify-content-center  justify-content-md-start">
            
             <insignia v-for="(insignia, i) in usuario.user_nivels.filter((un) => un.en_proceso)" :key="i" 
                               :avance="insignia.avance"
                               :nivel="insignia.nivel"
                               />
         </section>
         
         <hr>

         <h1><strong> {{ getNombre }}</strong>
         </h1>
         <strong>{{ usuario.direccion ? usuario.direccion : 'Dirección sin definir' }}</strong>
         <hr>
         <h2><strong> {{ isoDivisa }}{{ miSaldo |
            currency({ symbol: simboloDivisa }) }}</strong></h2>

         <b-button :to="{ name: 'tienda.travel' }" variant="primary" size="sm">
            <feather-icon icon="ShoppingCartIcon" />
            {{  $t('Ir a tienda') }}
         </b-button>


         

         <b-form-file ref="refInputEl" v-model="profileFile" accept="image/*" :hidden="true" plain @input="cargarImagen" />

      </b-media-body>
   </b-media>
</template>
<script>

import {
   BButton,
   BForm,
   BImg,
   BFormFile,
   BFormGroup,
   BFormInput,
   BRow,
   BCol,
   BAlert,
   BCard,
   BCardText,
   BMedia,
   BMediaAside,
   BMediaBody,
   BLink,
   BContainer,
} from 'bootstrap-vue'

import store from '@/store'

import { ref, computed, onMounted, toRefs, onActivated } from 'vue'
export default {

   props: ['usuario'],

   components: {
      BButton,
      BForm,
      BImg,
      BFormFile,
      BFormGroup,
      BFormInput,
      BRow,
      BCol,
      BAlert,
      BCard,
      BCardText,
      BMedia,
      BMediaAside,
      BMediaBody,
      BLink,
      BContainer,
      insignia:() => import('components/insignia.vue')
   },


   setup(props, { emit }) {

      const previewEl = ref(null)
      const profileFile = ref(null)
      const refInputEl = ref(null)
      const {usuario} = toRefs(props)
      const { divisa } = toRefs(store.state.divisa)

      const cargarForm = () => {
         store.dispatch('divisa/getPrincipal')

         store.dispatch('usuario/getNivelUser')

      }

      cargarForm();

      onActivated(() => {  
         cargarForm();
      })


      const cargarImagen = (file) => {

         let form = new FormData();
         form.append('filepond', profileFile.value);
         axios.post('api/upload/avatar', form, {
            headers: {
               'Content-Type': 'multipart/form-data; boundary=something'
            }
         }).then(respon => {
            store.commit('usuario/updateAvatar', respon.data)
         })
      }

      return {
         previewEl,
         profileFile,
         refInputEl,
         cargarImagen,
         divisa,
         getNombre:computed(() => {
            if(usuario.value.nombre){
               return `${usuario.value.nombre} ${usuario.value.apellido}`
            }else{
               return usuario.value.username
            }
         }),
         miSaldo:computed(() => {
           return usuario.value.cuenta ? usuario.value.cuenta.saldo : 0
         }),

         isoDivisa:computed(() => {
            if(usuario.value.cuenta){
               return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.iso : 'Tp'
            }else{
               return 'Tp'
            }
         }),
         simboloDivisa:computed(() => {
             if (usuario.value.cuenta) {
               return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.simbolo : '$'
            } else {
               return '$'
            }
         }),
         loading: computed(() => store.state.loading)
      }

   },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables/variables';

.content-img {
   // background: white;
   border-radius: 10px;
   // border: 3px dotted rgba($color: #e4dada85, $alpha: 1.0);
   position: relative;

   .img-perfil {
      width: 220px;
      height: auto;
      vertical-align: middle;
   }

   .img-perfil-hover {
      background-color: rgba(255, 255, 255, 0.75);
      bottom: 20px;
      color: #363636;
      left: 15px;
      padding: 8px 0px;
      position: absolute;
      text-align: center;
      right: 15px;
      opacity: 0;
      transition: 0.15s linear;
   }

   &:hover>.img-perfil-hover {
      opacity: 1 !important;
   }

}
</style>