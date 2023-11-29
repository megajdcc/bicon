<template>
  <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script>

import { Chart } from 'highcharts-vue'
import { ref,computed,toRefs} from 'vue'

export default {
  name: 'Chart',
  components: {
    Chart
  },

  props:{
    title:{
      type:String,
      default:''
    },
    subtitulo:String,
    series:{
      type:Array,
      default: () => ([{
        name: 'Activos',
        // size:'50%',
        showInLegend:true,
        data: [
          ['Venezuela', 16],
          ['Colombia', 12],
          ['USA', 8],
        ]
      }])

    },

    chartOption:{
      type:Object,
      default:() => ({
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: 'Beijing 2022 gold medals by country',
          align: 'left'
        },
        subtitle: {
          text: '3D donut in Highcharts',
          align: 'left'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45,
            dataLabels:{
              enabled:true
            }
          },
        },
        legend:{
          enabled:true
        }
      })
    }
  },


  setup(props){
    const {chartOption,title, subtitulo,series} = toRefs(props)
    const chart = ref(null)
 
    return {
      chart,
      chartOptions: computed(() => {
        return {
          ...chartOption.value,
          ...{

            title: {
              text: title.value
            },

            subtitle: {
              text: subtitulo.value
            },

            series: series.value

          }
        }
      })
    }
  }


}
</script>
