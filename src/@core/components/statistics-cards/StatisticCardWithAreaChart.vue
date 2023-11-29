<template>
  <b-card no-body :bg-variant="variant" >
    <b-card-body class="pb-0">
      <section class="d-flex justify-content-between">
         <div class="truncate d-flex flex-column">
            <slot name="valor" :statistic="statistic">
              <h2 class="mb-25 font-weight-bolder">
                {{ statistic }}
              </h2>
            </slot>
        
            <slot name="title">
                <span>{{ statisticTitle }}</span>
            </slot>

            <!-- btn-actions -->
            <slot name="btn-actions">
             
            </slot>
        
          </div>

          <b-avatar class="mb-1 cursor-pointer" :variant="`light-${color}`" size="60">
              <feather-icon
                size="21"
                :icon="icon"
                v-if="!fontAwesome"
              />

              <font-awesome-icon  v-else :icon="['fas',icon]" size="2xl"/>
            </b-avatar>

      </section>
       
    </b-card-body>

    <vue-apex-charts
      type="area"
      height="100"
      width="100%"
      :options="chartOptionsComputed"
      :series="chartData"
    />

  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar,BButton } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import { areaChartOptions } from './chartOptions'
import { computed, toRefs ,ref } from 'vue'

export default {
  components: {
    VueApexCharts,
    BCard,
    BCardBody,
    BAvatar,
    BButton
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    fontAwesome:Boolean,
    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
    chartData:{
      type: Array,
      default: () => [],
    },

    chartOptions: {
      type: Object,
      default: null,
    },
    variant:String
  },


  setup(props){
    const { chartData,chartOptions,color } = toRefs(props)
    const options = ref(JSON.parse(JSON.stringify(areaChartOptions)))

    return {
      chartSerie:computed(() => {
        return chartData.value ;
      }),
      chartOptionsComputed:computed(() => {
          if (chartOptions.value === null) {
            options.value.theme.monochrome.color = computed(() => $themeColors[color.value])
            return options.value
          }
          return chartOptions.value
        })
    }
  }
}
</script>
