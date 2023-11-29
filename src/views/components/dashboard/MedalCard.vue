<template>
  <b-card class="card-congratulation-medal">
    <h5>{{ title  }}</h5>
    <b-card-text class="font-small-3">
      {{  subtitle  }}
    </b-card-text>
    <h3 class="mb-75 mt-2 pt-50">
      <b-link>{{ kFormatter(data) }} {{ legend }}</b-link>
    </h3>
      <small v-if="textFooter">
        {{ textFooter }}
      </small>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" :to="toBtn"  v-if="isBtn">
      {{ btnTitle }}
    </b-button>
    <b-img :src="medalbagde" class="congratulation-medal" alt="Medal" v-b-tooltip="legendTooltip" style="right:20px;width:120px" />
  </b-card>
</template>

<script>
import {
  BCard, BCardText, BLink, BButton, BImg,VBTooltip
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'
import semaforo_verde from '@/assets/images/illustration/semaforo_verde.svg';
import semaforo_rojo from '@/assets/images/illustration/semaforo_rojo.svg';
import semaforo_naranja from '@/assets/images/illustration/semaforo_naranja.svg';

import {computed,toRefs} from 'vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BImg,
    BButton,
  },
  directives: {
    Ripple,
    'b-tooltip':VBTooltip
  },

  props: {
    title:String,
    subtitle:String,
    medal:{
      type:Number,
      default:3,
    },
    legend:{
      type:String,
      default:'Viajeros'
    },

    btnTitle:{
      type:String,
      default:'Ver mis viajeros'
    },

    toBtn:{
      type:Object,
      default:() => ({})
    },

    data:{
      type:Number,
      default:0
    },

    isBtn:Boolean,
    legendTooltip:{
      type:String,
      default:'Legenda'
    },
    textFooter:String
  },

  setup(props){

    const {medal} = toRefs(props);

    return {
      kFormatter,
      medalbagde:computed(() =>  {
        switch (medal.value) {
          case 1:
            return semaforo_verde;
            break;
          case 2:
            return semaforo_naranja;
            break;
        
          default:
              return semaforo_rojo;
          break;
        }
      })
    }
  }
  
}
</script>
