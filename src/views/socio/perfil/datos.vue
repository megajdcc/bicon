<template>
   <div>
      <!-- <invitados /> -->
      <perfil-info :usuario="usuario" />
      <invitados class="mt-1" />
   </div>

</template>

<script>

import store from '@/store'
import {computed,toRefs,ref} from 'vue'
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

export default {

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
      'perfil-info':() => import('components/PerfilInfo.vue'),
      'invitados' : () => import('./invitados/index.vue')
   },
 

   setup(){
      const usuario = computed(() => store.state.usuario.usuario)

      return {
         usuario,
         loading:computed(() => store.state.loading),
      }
   }
}
</script>