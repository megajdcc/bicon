<template>
  <b-button-group>
    <b-button variant="primary" @click.stop="toggleSeguidor" :disabled="!usuario.id" class="font-weight-bolder flex-grow-1" v-b-tooltip.hover="$t(legendSeguidor)">
      <font-awesome-icon :icon="getIconSeguidor" :class="{'mr-1' : !hideLegend}"  :color="getColorSeguidor"  />
        <template v-if="!hideLegend">
          <span class="d-none d-md-inline">
            {{ $t(legendSeguidor) }}
          </span>
        </template>
    </b-button>

    <slot name="btns">
        
    </slot>
  
    <b-button variant="warning" :disabled="!usuario.id" @click="toggleRecomendacion"
      class="font-weight-bolder flex-grow-1" v-b-tooltip.hover="$t(legendRecomendacion)">
      
      <font-awesome-icon icon="fa fa-heart" :class="{'mr-1' : !hideLegend}" :color="getColorRecomendacion" />

      <template v-if="!hideLegend">
          <span class="d-none d-md-inline">
              {{ $t(legendRecomendacion) }}
          </span>
      </template>
    </b-button>

  </b-button-group>
</template>

<script>

import {
  BButtonGroup,
  BButton,
  VBTooltip

} from 'bootstrap-vue'
import store from '@/store'

import { computed,toRefs,ref, onMounted } from 'vue'

export default{


  props:{
    negocio:Object,
    hideLegend:Boolean
  },
  
  directives:{
    'b-tooltip' : VBTooltip
  },

  components:{
    BButtonGroup,
    BButton,
  },

  setup(props,{emit}){

    const {negocio} = toRefs(props)
    const {usuario} = toRefs(store.state.usuario)


    const toggleRecomendacion = () => {

      store.dispatch('negocio/toggleRecomendacions', { negocio: negocio.value.id, usuario:usuario.value.id })
      emit('reload',true)
    }


    const toggleSeguidor = () => {

      store.dispatch('negocio/toggleSeguidor', { negocio: negocio.value.id, usuario: usuario.value.id })
      emit('reload',true)

    }

    return {
      usuario,
      toggleRecomendacion,
      toggleSeguidor,


      getIconSeguidor: computed(() => {

        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return ['fas', 'fa-bell'];
        }

        return ['far','fa-bell'];

      }),


      getColorSeguidor: computed(() => {

        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return '#fff';
        }

        return '#ffffff';

      }),

      legendSeguidor: computed(() => {
        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return 'Lo sigo'
        }

        return '¿Seguir?'
      }),


      getColorRecomendacion: computed(() => {

        if (negocio.value.recomendaciones.find(val => val.usuario_id === usuario.value.id)) {
          return '#f60022';
        }

        return '#ffffff';

      }),

      legendRecomendacion: computed(() => {

        if (negocio.value.recomendaciones.find(val => val.usuario_id === usuario.value.id)) {
          return 'Lo recomiendas'
        }

        return '¿Lo Recomiendas?'
      }),




    }
  }


}
</script>