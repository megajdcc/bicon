<template>
  <b-card no-body class="card-statistics mx-0 ">

    <b-card-header class="pb-0">
      <b-card-title>
        <slot name="title">
          <h3>{{ title  }}</h3>
        </slot>
      </b-card-title>

      <b-card-text class="mr-25 mb-0" v-if="!hideFecha">
       {{ fecha }}
      </b-card-text>
    
    </b-card-header>

    <b-card-body class="statistics-body">

      <b-container fluid>
        <!-- COn Filtro -->
        <b-row v-if="isFiltro">
          <b-col cols="12" class="d-flex flex-wrap" >
            <b-form-group label="Pais"  style="flex:1 1 300px">
              <v-select v-model="filtro.pais_id" :reduce="option => option.id" label="pais" :options="paises" @input="changeFiltro">
              </v-select>
            </b-form-group>

              <b-form-group label="Destino"  style="flex:1 1 300px" class="ml-md-1">
                <v-select v-model="filtro.destino_id" :reduce="option => option.id" label="nombre" :options="destinos" @input="changeFiltro">
                </v-select>
              </b-form-group>

               <b-form-group label="Negocio" style="flex:1 1 300px" class="ml-md-1" v-if="!isNotFilterNegocio">
                  <v-select v-model="filtro.negocio_id" :reduce="option => option.id" label="nombre" :options="negocios" @input="changeFiltro">
                  </v-select>
                </b-form-group>

          </b-col>
        </b-row>


        <b-row>
          <b-col
            v-for="item in statisticsItems"
            :key="item.id"
            class="mb-2 mb-md-0 d-flex flex-wrap"
            :class="item.customClass">

            <b-media no-body v-b-tooltip:hover="item.tooltip" class=" my-1" style="min-width:220px;">

              <b-media-aside class="mr-1 h-100 d-flex align-items-center">
                <b-avatar size="60" :variant="item.color" >
                 <font-awesome-icon :icon="['fas', item.icon]" size="3x"/>
                </b-avatar>
              </b-media-aside>

              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ item.title }}
                </h4>
                <b-card-text class="font-small-2 mb-0">
                  {{ item.subtitle }}
                </b-card-text>
              </b-media-body>
            
            </b-media>
          </b-col>
        </b-row>
      </b-container>
      
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
  BFormGroup,VBTooltip,BContainer
} from 'bootstrap-vue'

import vSelect from 'vue-select'

import useDireccion from '@core/utils/useDireccion.js'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import {computed,toRefs,ref,watch} from 'vue'
import { getFecha } from '@core/utils/utils'
import store from '@/store'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    vSelect,
    BFormGroup,
    flatPickr,
    BContainer
  },

  directives:{
    'b-tooltip':VBTooltip
  },
  props:{
    title:String,
    items:Array,
    isNotFilterNegocio:Boolean,
    isFiltro:{
      type:Boolean,
      default:false,
    },
    hideFecha:Boolean,
    filtro:{
      type:Object,
      required:false,
      default: () => ({
        pais_id    : null,
        rango_fecha: null,
        destino_id : null,
        negocio_id : null
      })
    },

    fecha:{
      type:String|Object,
      required:false
    }
  },
  
  setup(props,{emit}){
    
    const {title,items,filtro} = toRefs(props)
    const {destinos} = toRefs(store.state.destino)
    const { negocios } = toRefs(store.state.negocio)

    const statisticsItems = ref([
      {
        icon: 'fa-cash-register',
        color: 'light-primary',
        title: '23',
        subtitle: 'Total de operaciones registradas',
        customClass: 'mb-2 mb-xl-0',
      },
      {
        icon: 'fa-money-check-dollar',
        color: 'light-info',
        title: '340$',
        subtitle: 'Monto promedio por operación',
        customClass: 'mb-2 mb-xl-0',
      },
      {
        icon: 'fa-money-check-dollar',
        color: 'light-danger',
        title: '340$',
        subtitle: 'Gasto promedio por viajero',
        customClass: 'mb-2 mb-sm-0',
      },
      {
        icon: 'fa-user-gear',
        color: 'light-success',
        title: '1.5',
        subtitle: 'Registros por usuario',
        customClass: '',
      },
    ])

    const {
       paises,
    } = useDireccion()

    const configRangoFecha = ref({
      mode: "range",
      maxDate: "today",
      dateFormat: "Y-m-d",
      conjunction: ','

    })

    const cargarForm = () => {
      
      if(!destinos.value.length){
        store.dispatch('destino/fetchDestinos')
      }

      if(!negocios.value.length) {
        store.dispatch('negocio/getNegocios')
      }

    }

    cargarForm();


    const changeFiltro = () => {
      emit('changeFiltro')
    }

    return {
      getFecha,
      statisticsItems:computed(() => items.value || statisticsItems.value),
      paises,
      configRangoFecha,
      destinos,
      cargarForm,
      negocios,
      changeFiltro
    }
  }
}
</script>
