<template>
  <listado :actions="actions" hideFooter searchPlaceholder="Escriba el nombre del usuario si no lo encuentras en el listado...">
    <template #contenido="{items}">
      <b-container fluid class="mx-0 px-0"> 
        <b-row>
          <b-col cols="12" sm="6" lg="3" v-for="(usuario,i) in items" :key="i">
               <b-card
                  img-alt="Image"
                  img-top
                  tag="article"
                  class="mb-3"
                  :class="{'negSelected' : user && usuario.id === user.id}"
                   @click="userSelected(usuario.id)" 
                >

                <b-card-title class="mb-1 text-center">
                  {{ `${usuario.nombre} ${usuario.apellido}`  }}
                </b-card-title>
                
                <template #header>
                    <section class="w-100 d-flex justify-content-center">
                      <b-avatar :src="usuario.avatar" :size="80"></b-avatar>
                    </section>
                </template>

                <b-button @click.stop="userSelected(usuario.id)" 
                  :variant="user && user.id === usuario.id ? 'success' : 'primary'" >
                  {{ user && usuario.id === user.id ? 'Seleccionado' : 'Seleccionar' }}
                </b-button>

                </b-card>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </listado>
</template>

<script>
import useUsuariosListado from 'views/usuarios/useUsuariosListado.js';

import store from '@/store'

import {computed,ref,toRefs,onMounted} from 'vue'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BImg,
  BCardText,
  BButton,
  BAvatar,
  BCardTitle

} from 'bootstrap-vue'
export default {

  components:{

    listado:() => import('components/Listado.vue'),
    // bs
    BCard,
    BCardText,
    BContainer,
    BRow,
    BCol,
    BImg,
    BButton,
    BAvatar,
    BCardTitle
  },


  props:{
    usuarioId:{
      type:Number,
      nullable:true,
    }
  },

  model:{
    prop:'usuarioId',
    event:'update:usuarioId'
  },

  setup(props,{emit}){
    const {user} = toRefs(store.state.usuario)
    const {usuarioId} = toRefs(props)

    const actions =  useUsuariosListado();
    
    onMounted(() => {
       actions.refetchData()
    })
   
    const userSelected = (usuario_id) => {
      emit('update:usuarioId', usuario_id)
      emit('usuarioSeleccionado',usuario_id)
    }

    return {
      loading:computed(() => store.state.loading),
      actions,
      user,
      userSelected

    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/variables';
.card {
      width:100%;
      height:220px;
      cursor:pointer;

      &.negSelected{
        border:2px solid $primary;
      }


      img{
        height: 150px;
        width: auto;
        object-fit: contain;
      }

      .card-text{
        max-height:64px;
        overflow-y:scroll;
      }
      .card-body{
        display:flex;
        flex-direction:column;
        justify-content:space-between;

        button{
          align-self:flex-start;
        }
      }

    }
</style>