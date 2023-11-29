<template>
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
</template>

<script>
// import Chart from './components/Chart.vue'
// import StockChart from './components/StockChart'
// import MapChart from './components/MapChart'
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts';

export default {
  name:'Chart',
  components:{
    // Chart
    // StockChart,
    // MapChart
    Chart
  },

  data() {
    return {
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Entire title'
        },
        series: [{
          data: [10, 0, 8, 2, 6, 4, 5, 5]
        }]
      }
      
    }
  },

  
}
</script>