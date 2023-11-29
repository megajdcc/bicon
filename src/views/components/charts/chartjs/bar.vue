<script>
import { Bar } from 'vue-chartjs/legacy'
import {h,watch,onMounted,computed} from 'vue'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name:'BarChart',
  props: {
   chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
    plugins: {
      type: Array,
      default: () => []
    },
    chartData:{
      type:Object,
      default:() => ({
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
      })
    },

    chartOptions:{
      type:Object,
      default:() => ({
        responsive:true
      })
    },
    height:Number,
    width:Number,
    chartId:String
    
  },


  setup(props){

    

    return () => h(Bar,{
      props:{...props}
    })
  }


}
</script>
