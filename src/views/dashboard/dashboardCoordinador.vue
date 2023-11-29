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
                  {{ statistic | currency(usuario.cuenta ? usuario.cuenta.divisa.iso : 'USD') }}{{ symbolDivisa }}
                </h3>
              </template>

              <template #btn-actions>
                <b-button size="sm" :to="{ name: 'movimientos' }" variant="outline-primary" class="mt-0 mb-0">
                  <font-awesome-icon icon="fas fa-rectangle-list" />
                  {{ $t('Ver mis movimientos') }}
                </b-button>
              </template>

            </statistic-card-with-area-chart>

             <!-- Total Liders -->
            <statistic-card-horizontal icon="fa-people-group" statisticTitle="Lideres a cargo"
                      color="primary" colorIcon="white" colorText="text-white" :statistic="totalLideres">
                  <template #btn-card>

                  <b-button variant="danger" size="sm" class="mt-1  d-block" @click="agregarLider()"  >
                    Crear Lider
                  </b-button>

                  </template>
                </statistic-card-horizontal>
            <!-- End Total lideres -->


          </b-col>
        </b-row>

        <b-row>

          <b-col cols="12" md="4">
           
              <statistic-card-horizontal icon="fa-chart-line" statisticTitle="Total Viajeros registrados"
                      color="primary" colorIcon="white" colorText="text-white" :statistic="totalViajerosRegistrados">
              </statistic-card-horizontal>

              <statistic-card-horizontal icon="fa-chart-line" statisticTitle="Total Viajeros con consumos"
                      color="danger" colorIcon="white" colorText="text-white" :statistic="totalViajerosConsumos">
              </statistic-card-horizontal>

                <!-- Tres Mayores comisiones -->
              <b-card body-class="card-body-content text-white" :bg-variant="'dark'">
                <article class="flex-shrink-0 d-flex align-items-center flex-column justify-content-start">
                <highcharts class="g1 w-100" :options="chart1" ref="chart1ref">
                </highcharts>
                </article>
              </b-card>
            <!-- End -->

             <!-- Negocios Referidos / Activos -->
              <b-card body-class="card-body-content text-white" :bg-variant="skin == 'dark' ? 'dark' : 'warning'">
                  <section class="d-flex justify-content-between align-items-center">
              
                    <section class="d-flex flex-column flex-grow-1">
                      <h5 class="font-weight-bolder">
                          Total Negocios Invitados
                        </h5>
                        <table border="0" class="table table-sm table-borderless table-hover">
                        <tbody>
                          <tr>
                            <td>Referidos</td>
                            <td><h3>{{ totalNegocios.total }}</h3></td>
                          </tr>
                          <tr>
                            <td>Activos.</td>
                            <td><h3>{{ totalNegocios.activos }}</h3></td>
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
                 
                </b-col>
                <b-col cols="12" md="6">
                  
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

  setup(props) {
    const skin = computed(() => store.state.appConfig.layout.skin)

    const {
      paisesActivos,
      totalViajerosRegistrados,
      totalViajerosConsumos,
      viajerosPorPais
    } = toRefs(store.state.dashboard)

    
    const totalNegocios = ref({
      total: 0,
      activos: 0
    })

    const totalLideres = ref(0)
    const colorText = computed(() => skin.value == 'dark' ? 'white' : 'black')
    const comisionesAltas = ref([{ data: [] }])
    const chart1ref = ref(null)

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
    
    const ano = ref(new Date().getFullYear())
    const { usuario } = toRefs(store.state.usuario)
    const showFormUser = inject('showFormUser')

    const chart1 = ref({
      chart: {
        type: 'bar',
        height: 200,
      },
      exporting: {
        enabled: false,
      },

      title: {
        align: 'left',
        style: {
          color: 'white',

        },
        text: 'Comisiones mas altas'
      },

      subtitle: {
        align: 'left',
        style: {
          color: 'white',

        },
        text: 'Tres lideres con comisiones mas altas'
      },

      xAxis: {
        categories: [],
        labels: {
          rotation: -45,
          style: {
            fontSize: '10pt',
            color: 'white',
            fontFamily: 'Miriad'
          }
        },
        crosshair: false,

        gridLineWidth: 1,
      },

      yAxis: {
        title: ''
      },

      legend: {
        enabled: false,
      },
      tooltip: {
        stickOnContact: true,
        split: true,
        useHTML: true,
        formatter: function (val) {
          return [`<strong>${this.key}</strong><br>`, `Comisión:${this.y}`];
        }
      },




      series: [
        {
          name: 'Comisión',
          colorByPoint: true,
          data: computed(() => comisionesAltas.value),
          dataLabels: {
            enabled: true,
            rotation: 0,
            color: '#FFFFFF',
            align: 'right',
            y: 0,
            x: 0,

            style: {
              fontSize: '10pt',
              fontFamily: 'Myriad'
            }
          },
        }
      ]

    })
    const porcentajeViajerosEfectivos = ref({
      uso: 60,
      activos: 80
    })

    const filtro_gastos_turisticos = ref({
      pais_id: null,
      rango_fecha: null,
      destino_id: null,
      negocio_id: null
    })

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
      promotor_id: null
    })

    const cargarDashboard = () => {
      filtro.value.usuario = usuario.value.id
      store.dispatch('dashboard/cargarPaisesActivos', usuario.value.id)
      store.dispatch('dashboard/cargarViajerosActivos', filtro.value)
      store.dispatch('dashboard/getTotalViajerosRegistradoAnual', usuario.value.id)
    } 

    const cargarCoordinador = () => {

      store.dispatch('usuario/cargarDashboardCoordinador',usuario.value.id).then((data) => {
        totalLideres.value = data.totalLideres
      })

      store.dispatch('dashboard/tresMayoresComisionesLiders').then(({categories,series}) => {
        chart1.value.xAxis.categories = categories.map(val => val.toUpperCase())
        comisionesAltas.value = series
      })

       store.dispatch('dashboard/getTotalNegocios',usuario.value.id).then(({ totalInvitaciones, totalInvitacionesAceptadas }) => {
        totalNegocios.value.total = totalInvitaciones
        totalNegocios.value.activos = totalInvitacionesAceptadas
      })


      getAnoPorMes(ano.value)
      getAcumuladoPorAno()
      getOrigenViajeroPorPais();

    }

    const getAnoPorMes = (anio) => {
      ano.value = anio
      if (usuario.value.id) {
        store.dispatch('usuario/getMovimientosPorMes', { anio: ano.value, usuario: usuario.value.id }).then((data) => {
          dataRevenueReport.value.chart1serie = data.graficas
          dataRevenueReport.value.chart2serie = data.graficas
          dataRevenueReport.value.saldo = data.saldo
          dataRevenueReport.value.iso = data.iso
          dataRevenueReport.value.retirado = data.retirado
        })
      }


    }

    const getAcumuladoPorAno = () => {
      if (usuario.value.id) {
        store.dispatch('usuario/getAcumuladoPorAno', usuario.value.id).then((data) => {
          acumulado.value = data.acumulado
          chartDataAcumulado.value = data.series
        })
      }
    }

    const getOrigenViajeroPorPais = () => {
      store.dispatch('dashboard/getOrigenViajerosPorPais', usuario.value.id)
    }

    watch(ano, (val) => getAnoPorMes(val))
    onActivated(() => cargarDashboard());
    cargarCoordinador()
    cargarDashboard();
    watch([() => filtro.value.rango_fecha], () => cargarDashboard());


    const agregarLider= () => {
      showFormUser.value = true
    }

    watch(showFormUser,() => {
      cargarCoordinador();
    })

    const porcentajeEfectividadNegocio = computed(() => {
      if (totalNegocios.value.activos > 0) {
        return [redondeo(totalNegocios.value.activos * 100 / totalNegocios.value.total)]
      }

      return [0];
    });

    const chartEfectividad = ref({
      series: computed(() => porcentajeEfectividadNegocio.value),
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


    return {
      usuario,
      retirar: () => showSidebarRetiro.value = true,
      dataRevenueReport,
      ano,
      acumulado,
      chartDataAcumulado,
      symbolDivisa: computed(() => {
        if (usuario.value.cuenta) {
          return usuario.value.cuenta.divisa.simbolo
        }
        return '$'
      }),


      paisesActivos,
      chartOptionMap,
      viajerosPorPais,

      dominacionMundial: computed(() => {
        return redondeo(viajerosPorPais.value.length * 100 / 195, 2)
      }),

      totalViajerosRegistrados,
      totalViajerosConsumos,


      filtro_gastos_turisticos,
      miSaldo: computed(() => store.getters['usuario/miSaldo']),
      miDivisa: computed(() => store.getters['usuario/miDivisa']),

      skin,
      getAnoPorMes,
      totalNegocios,
      colorRand: colorRand,

      totalLideres,
      chart1ref,
      chart1,
      agregarLider,
      chartEfectividad
    
      

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


.apexcharts-yaxis-label {
  color: white !important;
}

.g1 {
  max-height: 220px;
}
</style>
