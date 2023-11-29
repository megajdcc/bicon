<template>
    <section class="banner-perfil-negocio" :style="{ 'background-image': `url(${portada})`, position:'relative' }">
      <agendar :modelId="negocio.id" :modelName="negocio.nombre"/>
      <b-container fluid class="py-2 px-1 px-md-3">
        <b-row>
    
          <b-col cols="12" md="8" class="d-flex flex-column flex-wrap">
    
    
            <section>
              <!-- Tipo de Restaurante -->
    
              <b-badge variant="warning">
                {{ $t(negocio.categoria.categoria) }}
              </b-badge>
    
              <!-- Comision por persona o porcentaje -->
    
              <b-badge variant="success" v-if="negocio.tipo_comision == 2" v-b-tooltip.hover="$t('Monto por Persona')">
                {{ negocio.comision | currency('Tp') }}
              </b-badge>
    
              <b-badge variant="success" v-else v-b-tooltip.hover="'Porcentaje por lo que consumas'">
                {{ negocio.comision }} %
              </b-badge>
    
            </section>
    
            <section class="mt-2">
    
              <h2 class="display-4 text-white mb-0">{{ $t(negocio.nombre) }}</h2>

              <el-rate :value="promedioCalificacion" disabled disabled-void-color="#4f4f4f" void-color="#000000"
                  class="d-flex flex-nowrap rate-banner my-1" size="large" style="font-size:30px"  />
    
              <strong class="font-weight-bolder mb-1 text-white"> {{ $t(negocio.breve) }}</strong>

            </section>
    
            <section class="d-flex flex-column btn-options-banner">

              <actions-negocio :negocio="negocio" />  

              <b-button variant="success" :title="$t('reservar')" class="mt-1 font-weight-bolder" 
              @click="isShowReservar = !isShowReservar" v-if="usuario.id" >

                <font-awesome-icon icon="fa fa-calendar" class="mr-1" />
                {{ $t('Reservar') }}

              </b-button>
            </section>
    
          </b-col>
    
          <b-col cols="12" md="4">
    
          </b-col>
    
        </b-row>

      </b-container>

      <NegocioReservar v-model="isShowReservar" v-if="is_loggin" />

  </section>
</template>

<script>

import {
  BButtonGroup,
  BButton,
  BBadge,
  VBTooltip,
  BContainer,
  BRow,
  BCol
} from 'bootstrap-vue'

import {computed,toRef,ref,toRefs} from 'vue'
import store from '@/store'

import useAuth from '@core/utils/useAuth'
export default {
  
  props:{
    negocio:Object,
    promedioCalificacion:Number
  },  

  components:{
    BButtonGroup,
    BButton,
    BBadge,
    BContainer,
    BRow,
    BCol,
    NegocioReservar:() => import('components/NegocioReservar.vue'),
    ActionsNegocio:() => import('components/ActionsNegocio.vue'),
    agendar:() => import('components/agendar.vue')
  },

  directives:{
    'b-tooltip':VBTooltip
  },


  
  setup(props){

    const { negocio } = toRefs(props)
    const { usuario } = toRefs(store.state.usuario)
    const isShowReservar = ref(false)

    const {
      is_loggin
    } = useAuth();

    const portada = computed(() => {

      const imagen = negocio.value.imagenes.filter(val => val.portada)[0];

      if (imagen) {
        return `${axios.getUri()}/storage/negocios/fotos/${imagen.imagen}`
      }

      return '';

    });

    return {
      portada,
      usuario,
      isShowReservar,
      is_loggin
     
    }

  }
}
</script>

<style lang="scss">
.banner-perfil-negocio {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;

  display: flex;
  align-items: center;

  &::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.35);
    width: 100%;
    height: 100%;
    position: absolute;
  }
}


.btn-options-banner{
  width:100%;

}

.rate-banner{
  
  height:30px;

  .el-rate__item .el-rate__icon{
    font-size:30px;
  }
}


@media (min-width:480px) {

  .btn-options-banner {
    width: 75%;
  }

}

@media (min-width:720px){

    .btn-options-banner {
      width: 50%;
    }

}
</style>
