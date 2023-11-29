<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>{{ titulo }}</b-card-title>
      <!-- dropdown -->
      <!-- <b-dropdown
        dropright
        variant="link"
        toggle-class="p-0"
        no-caret
      >
        <template #button-content>
          <feather-icon
            class="text-body"
            icon="MoreVerticalIcon"
          />
        </template>
        <b-dropdown-item>
          Last 28 Days
        </b-dropdown-item>
        <b-dropdown-item>
          Last Month
        </b-dropdown-item>
        <b-dropdown-item>
          Last Year
        </b-dropdown-item>
      </b-dropdown> -->
      <!--/ dropdown -->
    </b-card-header>

    <!-- chart -->
    <b-card-body>
      <chartjs-component-polar-area-chart
        :height="350"
        :data="data"
        :options="options"
        ref="chartPolar"
      />
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardBody, BCardHeader, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import ChartjsComponentPolarAreaChart from './chartjs/ChartjsComponentPolarArea.vue'

import { $themeColors } from '@themeConfig'

import { chartColors } from '@core/utils/utils';

import {
   ref,toRefs,onMounted,computed,watch
} from 'vue'

export default {

  components: {
      ChartjsComponentPolarAreaChart,
      BCard,
      BCardTitle,
      BCardBody,
      BCardHeader,
      BDropdown,
      BDropdownItem,
  },

  props:{
      titulo:{
         type:String,
         required:true,
         default:'Sin definir'
      },
      data: {
         type: Object,
         default: {
            labels: ['Africa', 'Asia', 'Europe', 'America', 'Antarctica', 'Australia'],
            datasets: [
              {
                label: 'Population (millions)',
                backgroundColor: [
                  chartColors.primaryColorShade,
                  chartColors.warningColorShade,
                  $themeColors.primary,
                  chartColors.infoColorShade,
                  chartColors.greyColor,
                  chartColors.successColorShade,
                ],
                data: [19, 17.5, 15, 13.5, 11, 9],
                borderWidth: 0,
              },
            ],
          }
      },
  },

  setup(props){ 


    const chartPolar = ref(null)

    let options = ref({
          responsive: true,
          maintainAspectRatio: false,
          responsiveAnimationDuration: 500,
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 25,
              boxWidth: 10,
              fontColor: chartColors.labelColor,
            },
          },
          tooltips: {
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: chartColors.tooltipShadow,
            backgroundColor: $themeColors.light,
            titleFontColor: $themeColors.dark,
            bodyFontColor: $themeColors.dark,
          },
          scale: {
            scaleShowLine: true,
            scaleLineWidth: 1,
            ticks: {
              display: false,
              fontColor: chartColors.labelColor,
            },
            reverse: false,
            gridLines: {
              display: false,
            },
          },
          animation: {
            animateRotate: false,
          }
        
      });
    let { data } = toRefs(props)



    return {
      options,
      chartPolar

    }

  }

}
</script>
