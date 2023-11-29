<template>
  <b-card no-body >
    <b-card-header class="d-flex flex-column align-items-start">
      <!-- title and subtitle -->
      <div class="d-block">
        <b-card-title class="mb-1">
          {{titulo}}
        </b-card-title>
        <b-card-sub-title>{{ subtitulo }}</b-card-sub-title>
      </div>

      <section class="w-100 mx-0 px-0">
         <slot name="filtro" >
            
         </slot>
      </section>
      <!--/ title and subtitle -->
      <!--/ badge -->
    </b-card-header>

    <b-card-body>
      <vue-apex-charts
        :type="type"
        :height="height"
        :options="chartOptions"
        :series="data"
        ref="chartRef"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle, BCardSubTitle, BBadge,BFormGroup
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
// import apexChatData from './apexChartData'
import { $themeColors } from '@themeConfig'
import {ref, toRefs,onMounted,watch} from 'vue';
import vSelect from 'vue-select'

export default {

   props:{

      titulo:{
         type:String,
         default:'Balance'
      },
      
      subtitulo:{
         type:String,
         default:''
      },

      // subjects:{
      //    type:Array,
      //    default:[]
      // },

      // subjectFilter:{
      //    type:[Number,null],
      //    default:null

      // },

      // subjectTitle:{
      //    type:String,
      //    default:'Bodas'
      // },

      // subjectDescription:{
      //    type:String,
      //    default:''
      // },
      chartOptions:{
         type:Object,
         default:{
               chart:{
                  zoom: {
                     enabled: true,
                  },
                  toolbar: {
                     show: true,
                  },
               },
               markers: {
                  strokeWidth: 7,
                  strokeOpacity: 1,
                  strokeColors: [$themeColors.light],
                  colors: [$themeColors.warning],
               },
               colors: [$themeColors.warning],
               dataLabels: {
                  enabled: false,
               },
               stroke: {
                  curve: 'straight',
               },
               grid: {
                  xaxis: {
                     lines: {
                        show: true,
                     },
                  },
               },
           
               xaxis: {
                  
                  labels: {
                     rotate:-45
                  },

                  categories: [
                    'hola','pedro'
                  ],
               },
               yaxis: {
                  // opposite: isRtl,
               },
         },
      },

      data:{
         type:Array,
         default:[],
      },
      type:{
         type:String,
         default:'bar'
      },

      height:String|Number



   },

  components: {
    VueApexCharts,
    BCardHeader,
    BCard,
    BBadge,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    BFormGroup,
    vSelect
  },

   setup(props){

      const chartRef = ref(null)
      const { data } = toRefs(props);
      const  value = ref(null)


     

      onMounted(() => {
         //  console.log(chartRef.value)
         
      })

      watch([data],() => {
         // console.log(chartRef.value)
         chartRef.value.refresh()
      });

      return {
         $themeColors,
         chartRef,
         value
      };

   }

 

}
</script>
