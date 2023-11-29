<template>
  <b-card>
    <highcharts :constructorType="'mapChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
  </b-card>
</template>

<script>

import {
  BCard
} from 'bootstrap-vue';

import { toRefs, computed } from 'vue'

export default {
  name: 'map-chart',

  components: {
    BCard
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    subtitulo: String,
    series: {
      type: Array,
      default: [{
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        allAreas: true,
        data: [
          ['km', 69],
          ['mn', 145],
          ['rw', 146],
          ['so', 147],
          ['bo', 148],
          ['cm', 149],
          // ['cg', 150],
          ['ci', 170],
          ['lr', 171],
          ['bn', 172],
          ['iq', 173],
          ['kg', 211],
          ['np', 212],
          ['ve', 100]
        ]
      }]

    },

    chartOption: {
      type: Object,
      default: () => ({
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },

        chart: {
          map: worldMap,
        },
        colorAxis: {
          stops: [
            [0, '#55aaff'],
            [1, '#2d5b88']
          ]
        },

        series: []
      })
    }
  },

  setup(props) {

    const { series, title, subtitulo, chartOption } = toRefs(props)

    return {
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