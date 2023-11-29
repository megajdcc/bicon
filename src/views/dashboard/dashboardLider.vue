<template>
  <section id="dashboard">
    <!-- Tablero Admin - Desarrollador -->

    <b-container fluid class="px-0">

      <b-row align-v="stretch">
        <b-col cols="12" md="8">
          <revenue-report :cobrar="retirar" v-model="ano" :data="dataRevenueReport" :titulo="$t('Reporte de ingresos')">
          </revenue-report>
        </b-col>

        <b-col cols="12" md="4">

          <statistic-card-with-area-chart icon="fa-sack-dollar" fontAwesome :statistic="acumulado"
            :chartData="chartDataAcumulado" :statistic-title="$t('Acumulado')" color="primary">

            <template #valor="{ statistic }">
              <h3 class="mb-25 font-weight-bolder">
                {{ statistic | currency(lider.cuenta ? lider.cuenta.divisa.iso : 'USD') }}{{ symbolDivisa }}
              </h3>
            </template>

            <template #btn-actions>
              <b-button size="sm" :to="{ name: 'movimientos' }" variant="outline-primary" class="mt-0 mb-0">
                <font-awesome-icon icon="fas fa-rectangle-list" />
                {{ $t('Ver mis movimientos') }}
              </b-button>
            </template>

          </statistic-card-with-area-chart>

          <statistic-card-horizontal icon="fa-percent" statisticTitle="Viajeros Activos" color="dark" colorIcon="success"
            colorText="text-white" v-if="$can('read', 'Tablero viajeros activos')" :statistic="viajerosActivos">

            <template #statistic="{ statistic }">
              {{ statistic }} %
            </template>


            <template #filtro>
              <flat-pickr v-model="filtro.rango_fecha" :config="configRangoFecha"
                class="form-control form-control-sm mt-2" placeholder="Rango de fecha" />

            </template>

          </statistic-card-horizontal>


        </b-col>
      </b-row>

      <b-row>

        <b-col cols="12" md="4">

          <!-- Total Promotores -->
          <statistic-card-horizontal icon="fa-people-group" statisticTitle="Promotores a cargo"
                    color="primary" colorIcon="white" colorText="text-white" :statistic="lider.promotores.length">
                    <template #btn-card>
                      <!-- <b-button variant="danger" size="sm" :to="{name:'create.usuario'}" class="mt-1" v-if="$can('write','usuarios')" >
                        Crear Promotor
                      </b-button> -->
                    </template>
          </statistic-card-horizontal>
          <!-- End Total promotor -->

          <!-- Total viajeros [registrados/activos] y su porcentaje -->
            <b-card body-class="card-body-content text-white" :bg-variant="skin == 'dark' ? 'dark' : 'info'">
                <section class="d-flex justify-content-between align-items-center">
              
                  <section class="d-flex flex-column flex-grow-1">
                    <h3 class="font-weight-bolder">
                        Total Viajeros
                      </h3>
                      <table border="0" class="table table-sm table-borderless table-hover">
                      <tbody>
                        <tr>
                          <td>Registrados</td>
                          <td><h3>{{ totalViajeros.total }}</h3></td>
                        </tr>
                        <tr>
                          <td>Viajeros con Reg.</td>
                          <td><h3>{{ totalViajeros.activos }}</h3></td>
                        </tr>
                      </tbody>
                      </table>
                
                  </section>

                  <article class="flex-shrink-0 d-flex align-items-center">
                    <vue-apex-charts
                      type="radialBar"
                      height="150"
                      :options="chartEfectividad.chartOptions"
                      :series="chartEfectividad.series"
                      style="width:150px; padding:0; margin:0"
                    />
                  </article>

                </section>
            </b-card>
          <!-- End total viajeros -->

          <!-- Efectividad de Viajeros -->
            <b-card body-class="card-body-content text-white" :bg-variant="'transparent'">
                <section class="d-flex justify-content-between align-items-center py-1">
                     <highcharts  class="g1 w-100" :options="chart3"></highcharts>
                </section>
            </b-card>

            <!-- End Efectividad -->


          <!-- Tres Mayores comisiones -->
              <b-card body-class="card-body-content text-white" :bg-variant="'dark'">
                <article class="flex-shrink-0 d-flex align-items-center flex-column justify-content-start">

                 <highcharts class="g1 w-100" :options="chart1" ref="chart1ref"></highcharts>

                </article>
              </b-card>
            <!-- End -->

             <!-- Totales  Viajeros registrados -->
              <b-card body-class="card-body-content text-black" bg-variant="transparent">
                <article class="flex-shrink-0 d-flex align-items-center flex-column justify-content-start">

                 <highcharts class="g1 w-100" :options="chart2"></highcharts>

                </article>
              </b-card>
            <!-- End -->


          <!-- Nivel -->
          <b-card :bg-variant="skin == 'dark' ? 'dark' : 'dark'" v-if="$can('read', 'Tablero medal card promotor')">
            <b-card-body class="p-0 text-white">
              <section class="d-flex justify-content-between text-white align-items-center">
                <h3 class="font-weight-bolder text-white">
                  Nivel
                </h3>
                <h1 class="text-white">{{ lider.nivel }}</h1>
              </section>
              <article class="g-activaciones mt-1">
                <b-progress :value="siguienteNivel(nivel.nivel, nivel.activaciones).porcentaje" max="100" height="10px"
                  animated striped variant="primary" />
              </article>

            </b-card-body>
          </b-card>
        </b-col>

        <b-col cols="12" md="8">
          <b-card title="Origen de tus viajeros registrados">
            <b-container fluid class="px-0 mx-0">
              <b-row>
                <b-col cols="12" md="12">
                  <map-chart :series="paisesActivos" :chartOption="chartOptionMap"></map-chart>

                </b-col>
                <b-col cols="12">
                  <b-container fluid class="px-0 mx-0">
                    <b-row>
                      <b-col cols="12" md="6" class="d-flex flex-column">
                        <strong class="mb-2">Por País</strong>
                        <table class=" w-100 " style="max-height: 100px !important; overflow-y: scroll; height:50px">
                          <tr v-for="({ pais, porcentaje }, i) in viajerosPorPais" :key="i" :style="{
                            backgroundColor: colorRand()
                          }">
                            <td style="width:10%; color:black !important;padding: 0.2rem;">{{ porcentaje }}%</td>
                            <td style="color:black !important; padding: 0.2rem;">{{ pais }}</td>
                          </tr>
                        </table>

                      </b-col>
                      <b-col cols="12" md="6" class="d-flex flex-column">
                        <strong class="mb-2">Dominación Mundial</strong>
                        <table class="table table-hover table-sm w-100">
                          <tr>
                            <td style="width:10%; vertical-align: center;" class="">
                              <font-awesome-icon icon="fas fa-chart-line" size="2xl" />
                            </td>
                            <td class="">
                              <span> Total Paises:</span>
                              <h4 class="my-0">{{ viajerosPorPais.length }} / 195</h4>
                            </td>
                          </tr>
                          <tr>
                            <td style="width:10%; vertical-align: center;" class="">
                              <font-awesome-icon icon="fas fa-percent" size="2xl" />
                            </td>
                            <td class="">
                              <section class="d-flex align-items-center">

                                <h4 class="mr-1 py-0 my-0"> {{ dominacionMundial }}%</h4>de dominación
                              </section>

                            </td>
                          </tr>

                        </table>

                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-container>
          </b-card>

          <b-container fluid class="px-0 mx-0">
            <b-row>
              <b-col cols="12" md="6">
                <statistic-card-horizontal icon="fa-chart-line" statisticTitle="Total Viajeros registrados"
                  color="primary" colorIcon="white" colorText="text-white" :statistic="totalViajerosRegistrados">

                </statistic-card-horizontal>
              </b-col>
              <b-col cols="12" md="6">
                <statistic-card-horizontal icon="fa-chart-line" statisticTitle="Total Viajeros con consumos"
                  color="danger" colorIcon="white" colorText="text-white" :statistic="totalViajerosConsumos">

                </statistic-card-horizontal>
              </b-col>
            </b-row>
          </b-container>
        </b-col>

      </b-row>

    </b-container>

  </section>
</template>

<script>
import {
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BLink,
  BButton,
  BCard,
  BCardBody,
  BCardTitle,
  BProgress

} from 'bootstrap-vue'

import vSelect from 'vue-select'
import VueApexCharts from 'vue-apexcharts'

import { ref, onMounted, watch, toRefs, computed, onActivated, inject } from 'vue';


// import StatisticCardWithLineChart from 'components/dashboard/StaticCardWithLineChart.vue'
// import TarjetasAgrupadasStaticas from 'components/dashboard/TarjetasAgrupadasStaticas.vue';

import store from '@/store';
// import ApexChart from 'components/ApexChart/ApexChart.vue';

import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'

// import ChartjsPolarArea from 'components/charts/ChartjsPolarArea.vue'

import { chartColors } from '@core/utils/utils';
import { $themeColors, $themeConfig } from '@themeConfig'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useDireccion from '@core/utils/useDireccion.js'

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { siguienteNivel } from '@core/utils/utils';

import worldMap from '@highcharts/map-collection/custom/world.geo.json'
import Highcharts from 'highcharts';

export default {

  components: {
    bar: () => import('components/charts/chartjs/bar.vue'),
    BRow,
    BCol,
    BContainer,
    BLink,
    BButton,
    BCardBody,
    BCard,
    BCardTitle,
    BProgress,
    StatisticCardHorizontal,
    TotalViajeros: () => import('components/TotalViajeros.vue'),
    ApexChart: () => import('components/ApexChart/ApexChart.vue'),
    vSelect,
    BFormGroup,
    flatPickr,
    MapChart: () => import('components/highcharts/MapChart.vue'),
    TarjetasAgrupadasStaticas: () => import('components/dashboard/TarjetasAgrupadasStaticas.vue'),
    RevenueReport: () => import('components/cards/RevenueReport.vue'),
    StatisticCardWithAreaChart,
    VueApexCharts,
    
  },

  props:{
    lider:Object,
    required:true,
  },

  setup(props) {

    const {lider} = toRefs(props)

    const {
      paisesActivos,
      viajerosActivos,
      totalViajerosRegistrados,
      totalViajerosConsumos,
      viajerosPorPais
    } = toRefs(store.state.dashboard)

    const chart1ref = ref(null)
    const totalViajeros = ref({
        total:0,
        activos:0
    })

    const colorText = computed(() => skin.value == 'dark' ? 'white' : 'black')

    const viajerosRegistrados =  ref([])
    const comisionesAltas = ref([{data:[]}])

    const chartOptionMap = ref({
      title: {
        enabled: false,
      },
      subtitle: {
        enabled: false,
      },

      chart: {
        map: worldMap,
        height: 300,
      },

      colorAxis: {
        stops: [
          [0, '#55aaff'],
          [1, '#2d5b88']
        ]
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          allAreas: true,
          showInLegend: true,
          backgroundColor: colorRand(),
          states: {
            hover: {
              color: $themeColors.danger
            }
          },

          dataLabels: {
            enabled: false,
            formatter: ({ point }) => {
              return 've'
            }
          }
        }
      },
      series: []
    });

    const viajeros_referidos = ref(0)
    const ano = ref(new Date().getFullYear())
    const efectividad = ref({
      userReg: 0,
    })

    const porcentajeViajerosEfectivos = ref({
      uso:60,
      activos:80
    })
    const filtro_gastos_turisticos = ref({
      pais_id: null,
      rango_fecha: null,
      destino_id: null,
      negocio_id: null
    })  

    const activaciones = ref({
      nivel: 0,
      activaciones: 0
    })
    const skin =  computed(() => store.state.appConfig.layout.skin)

    const acumulado = ref(0)
    const showSidebarRetiro = inject('showSidebarRetiro')
    const chartDataAcumulado = ref([])

    const dataRevenueReport = ref({
      saldo: 0,
      retirado: 0,
      iso: 'USD',
      chart1serie: [],
      chart2serie: [],
    })

    const configRangoFecha = ref({
      mode: "range",
      maxDate: "today",
      dateFormat: "Y-m-d",
      conjunction: ','
    })

    const filtro = ref({
      pais: null,
      edades: null,
      genero: null,
      rango_fecha: null,
      fecha: null,
      usuario_id: computed(() => lider.value.id)
    })

    const porcentajeEfectividad = computed(() => {
      if (totalViajeros.value.activos > 0) {
        return [redondeo(totalViajeros.value.activos * 100 / totalViajeros.value.total)]
      }

      return [0];
    });

    const chartEfectividad = ref({
      series: computed(() => porcentajeEfectividad.value),
      chartOptions: {
        chart: {
          sparkline: {
            enabled: true,
          },
          dropShadow: {
            enabled: true,
            blur: 3,
            left: 1,
            top: 1,
            opacity: 0.1,
          },
        },
        colors: [$themeColors.danger],
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: 0,
            endAngle: 350,
            hollow: {
              size: '65%',
            },
            track: {
              background: '#ebe9f1',
              strokeWidth: '50%',
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                color: '#5e5873',
                fontSize: '1.8rem',
                fontWeight: '200',
                fontFamily: 'Myriad Regular',
                offsetY: 12,
              },
              total: {
                show: false
              }
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 1,
            gradientToColors: [$themeColors.primary],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        grid: {
          padding: {
            bottom: 0,
            right: 0,
          },
        },
      },
    })
  
    const chart1 = ref({
      chart: {
        type: 'bar',
        height:200, 
      },
      exporting:{
        enabled:false,
      },

      title:{
        align:'left',
        style:{
          color:'white',

        },
        text:'Comisiones mas altas'
      },

      subtitle: {
        align: 'left',
        style: {
          color: 'white',

        },
        text: 'Tres promotores con comisiones mas altas'
      },

      xAxis: {
        categories: [],
        labels: {
          rotation: -45,
          style: {
            fontSize: '10pt',
            color:'white',
            fontFamily: 'Miriad'
          }
        },
        crosshair: false,
       
        gridLineWidth: 1,
      },

      yAxis:{
       title:''
      },

      legend:{
        enabled:false,
      },
      tooltip:{
        stickOnContact:true,
        split:true,
        useHTML:true,
        formatter:function(val) {
          return [`<strong>${this.key}</strong><br>`,`Comisión:${this.y}`];
        }
      },

    


      series: [
        {
          name:'Comisión',
          colorByPoint: true,
          data: computed(() => comisionesAltas.value),
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'right',
            y: 0,
            x:0,
           
            style: {
              fontSize: '10pt',
              fontFamily: 'Myriad'
            }
          },
        }
      ]
    
    })

    const chart2 = ref({
        chart: {
          type: 'column',
          height: 200,
        },
        exporting: {
          enabled: false,
        },
        title: {
          align: 'left',
          style: {
            color: colorText,
          },
          text: 'Total Viajeros'
        },
        subtitle: {
          align: 'left',
          style: {
            color: colorText,
            fontSize:"8.5pt"
          },
          text: 'Registrados y Activos de este Mes, último y Penúltimo'
        },
        yAxis:{
          title:{
            enabled:false,
            text:''
          }
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: 0,
            style: {
              fontSize: '10pt',
              color: colorText,
              fontFamily: 'Miriad'
            }
        },
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y}'
            }
        }
        },
        legend:{
          enabled:true,
          align:'left',
          itemStyle: {
            fontSize: '10pt',
            color: colorText,
            fontFamily: 'Miriad'
          }
        },
      
        series:[]
    })

    const chart3 = ref({
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: '200px'
      },

      exporting: {
          enabled: false,
      },

      title: {
        align: 'left',
        style: {
          color: colorText,
        },
        text: 'Efectividad',

      },

      subtitle: {
        align: 'left',
        style: {
          color: colorText,
          fontSize:'7pt',
        },
        text: 'Viajeros que han hecho uso del sistema / Último mes',

      },

      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 100,
        tickPixelInterval: 72,
        tickPosition: 'inside',
        tickColor: colorText,
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: '14px',
            color:colorText
          }
        },
        lineWidth: 0,
        plotBands: [{
          from: 0,
          to: 50,
          color:$themeColors.danger, // rojiso
          thickness: 20
        }, {
          from: 50,
          to: 80,
          color: $themeColors.warning, // naranja
          thickness: 20
        }, {
          from: 80,
          to: 100,
          color: $themeColors.success, // verde
          thickness: 20
        }]
      },

    

      series: [
        {
        name: 'Porcentaje de uso',
        data: computed(() => [redondeo(porcentajeViajerosEfectivos.value.uso)]),
        tooltip: {
          valueSuffix: '%'
        },
        dataLabels: {
          format: '{y} %',
          borderWidth: 0,
          color:'#333333',
          style: {
            fontSize: '16px',
            color:colorText,
          }
        },
        dial: {
          radius: '80%',
          backgroundColor: 'gray',
          baseWidth: 12,
          baseLength: '0%',
          rearLength: '0%'
        },
        pivot: {
          backgroundColor: 'gray',
          radius: 6
        }

      },

      {
          name: 'Porcentaje con consumo',
          data: computed(() => [redondeo(porcentajeViajerosEfectivos.value.activos)]),
          tooltip: {
            valueSuffix: '%'
          },
          dataLabels: {
            format: '{y} %',
            borderWidth: 0,
            color: colorText,
            style: {
              fontSize: '16px',
              color: colorText,
            }
          },
          dial: {
            radius: '80%',
            backgroundColor: $themeColors.primary,
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%'
          },
          pivot: {
            backgroundColor: 'black',
            radius: 6
          }

        },
    ]

    })

    const cargarDashboard = () => {

      store.dispatch('dashboard/cargarPaisesActivos',lider.value.id)
      store.dispatch('dashboard/cargarViajerosActivos', filtro.value)
      store.dispatch('dashboard/getTotalViajerosRegistradoAnual',lider.value.id)
      
      store.dispatch('dashboard/tresMayoresComisionesPromotors',lider.value.id).then(({categories,series}) => {
       
        chart1.value.xAxis.categories = categories.map(val => val.toUpperCase())
        comisionesAltas.value = series
       
      })


      store.dispatch('dashboard/totalViajerosLider',lider.value.id).then(({viajerosRegistrados,categories, viajerosRegistradosActivos }) => {
        viajerosRegistrados.value = categories
        chart2.value.series = [
          viajerosRegistrados,
          viajerosRegistradosActivos
        ]
      })

      store.dispatch('dashboard/porcentajeEfectividad',lider.value.id).then(({uso,activos}) => {
        porcentajeViajerosEfectivos.value.uso = uso
        porcentajeViajerosEfectivos.value.activos = activos
      })

    }

    const cargarLider = () => {

      store.dispatch('usuario/getStatusLider',lider.value.id).then(({ totalViajeros:allviajeros,totalViajerosActivos:viajerosActivos }) => {
        totalViajeros.value.total = allviajeros
        totalViajeros.value.activos = viajerosActivos
      })
      getAnoPorMes(ano.value)
      getAcumuladoPorAno()
      getOrigenViajeroPorPais();

    }

    const getAnoPorMes = (anio) => {
      ano.value = anio
      if (lider.value.id) {
        store.dispatch('usuario/getMovimientosPorMes', { anio: ano.value, usuario: lider.value.id}).then((data) => {
          dataRevenueReport.value.chart1serie = data.graficas
          dataRevenueReport.value.chart2serie = data.graficas
          dataRevenueReport.value.saldo = data.saldo
          dataRevenueReport.value.iso = data.iso
          dataRevenueReport.value.retirado = data.retirado
        })
      }


    }

    const getAcumuladoPorAno = () => {
      if (lider.value.id) {
        store.dispatch('usuario/getAcumuladoPorAno',lider.value.id).then((data) => {
          acumulado.value = data.acumulado
          chartDataAcumulado.value = data.series
        })
      }
    }



    const getOrigenViajeroPorPais = () => {
      store.dispatch('dashboard/getOrigenViajerosPorPais',lider.value.id)

    }


    const nivel = computed(() => lider.value.activaciones)

    watch(ano, (val) => getAnoPorMes(val))
    onActivated(() => cargarDashboard());
    cargarLider()
    cargarDashboard();

    watch([() => filtro.value.rango_fecha], () => cargarDashboard());

    return {

      filtro_gastos_turisticos,
      miSaldo: computed(() => lider.cuenta ? lider.cuenta.saldo : 0),
      miDivisa: computed(() => lider.divisa ? lider.divisa.iso : 'USD'),

      getLegendaStatusPromotor: (status) => {
        let legenda = ['Activo, con al menos un Viajero al mes', 'En peligro, no registra nuevos viajeros en los ultimos 30 días', 'Inactivo, no registra nuevos viajeros en los ultimos 90 días'];

        return legenda[status - 1];

      },



      // Promotor
      viajeros_referidos,
      dataRevenueReport,
      ano,
      chartDataAcumulado,
      acumulado,
      configRangoFecha,
      chart1ref,
      viajerosActivos,
      filtro,
      skin,
      nivel,
      siguienteNivel,
      efectividad,
      porcentajeEfectividad,
      chartEfectividad,
      chart1,
      chart2,
      chart3,
      totalViajerosRegistrados,
      totalViajerosConsumos,
      retirar: () => showSidebarRetiro.value = true,
      getAnoPorMes,
      paisesActivos,
      chartOptionMap,
      viajerosPorPais,
      totalViajeros,
      colorRand: colorRand,
      dominacionMundial: computed(() => {
        return redondeo(viajerosPorPais.value.length * 100 / 195, 2)
      }),
      symbolDivisa: computed(() => {
        if (lider.value.cuenta) {
          return lider.value.cuenta.divisa.simbolo
        }
        return '$'
      })
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

.card-body-content {
  padding: .2rem 1rem;
}

.card-status {
  padding: 1.5rem 0rem 0px 0px;
  background-color: #61a60f;
  height: 100px;

  h3 {
    color: white;
  }

  .card-header-status {
    display: flex;
    padding: 0rem .7rem;

    div {
      width: 45%;
      display: flex;
      align-items: flex-end;
      // justify-content: flex-start;
      padding: 0px;
    }
  }

  .card-footer-status {
    height: 50px;
    background-color: #75bd1d;
    border-radius: 0px 0px 7px 7px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0rem .7rem;

    div {
      width: 45%;
      display: flex;
      align-items: flex-end;
      // justify-content: flex-start;
      padding: 0px;
    }

  }
}

.card-status-dark {
  .card-footer-status {
    background-color: #171b28;

    strong {
      display: flex;
      justify-content: flex-start;

    }
  }
}


.apexcharts-yaxis-label{
  color:white !important;
}

.g1 {
    max-height:220px;
  }


</style>
