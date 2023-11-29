<template>

  <b-card :title="titulo" >
    <v-slot name="filtro">
      
    </v-slot>
     <apex-chart width="100%" type="bar" :options="chartOptions" :series="series">

      </apex-chart>
  </b-card>
  
</template>

<script>

import VueApexCharts from 'vue-apexcharts'


import {
  BCard,
} from 'bootstrap-vue';

import { ref } from 'vue'

export default {

  components:{
    'apex-chart':VueApexCharts,
    BCard,
  },

  props:{
    titulo:{
      type:String,
      default:'Total Viajeros'
    }
  },

  setup(props){
    const chartOptions = ref({
      chart: {
        id: 'vuechart-example'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    })

    const series = ref([
        {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }
    ])

    return {
      chartOptions,
      series

    }

  }

}

</script>