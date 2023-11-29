<template>
    <section id="dashboard">
      <!-- Tablero Admin - Desarrollador -->

      <b-container fluid class="px-0">

        <b-row align-v="stretch" >
          <b-col cols="12" md="8" >
            <revenue-report :cobrar="retirar" v-model="ano" :data="dataRevenueReport" :titulo="$t('Reporte de ingresos')"   >
            </revenue-report>
          </b-col>

          <b-col cols="12" md="4" >

              <statistic-card-with-area-chart
                icon="fa-sack-dollar"
                fontAwesome
                :statistic="acumulado"
                :chartData="chartDataAcumulado"
                :statistic-title="$t('Acumulado')"
                color="primary"
              >

              <template #valor="{ statistic }">
                 <h3 class="mb-25 font-weight-bolder">
                  {{ statistic | currency(promotor.cuenta ? promotor.cuenta.divisa.iso : 'USD') }}{{ symbolDivisa }}
                 </h3>
              </template>

              <template #btn-actions>
                 <b-button 
                 size="sm" 
                 :to="{ name: 'movimientos' }" 
                 variant="outline-primary" 
                 class="mt-0 mb-0" v-if="$store.getters['usuario/isRol']('Promotor')">
                 <font-awesome-icon icon="fas fa-rectangle-list"/>
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
              <!-- Activaciones -->
                <b-card :bg-variant="skin == 'dark' ? 'dark' : 'danger'">
                  <b-card-body class="p-0 text-white">
                    <section class="d-flex justify-content-between text-white">
                        <h3 class="font-weight-bolder text-white">
                         Activaciones
                       </h3>
                       <h1 class="text-white">{{ nivel.activaciones }}</h1>
                    </section>
                    <strong>Solo te faltan {{ siguienteNivel(nivel.nivel, nivel.activaciones).teFaltan }} para subir de nivel</strong>
                  
                    <article class="g-activaciones mt-1">
                      <b-progress
                          :value="siguienteNivel(nivel.nivel, nivel.activaciones).porcentaje"
                          max="100"
                          height="10px"
                          animated
                          striped
                          variant="primary"
                        />
                    </article>

                  </b-card-body>
                </b-card>
              <!-- End Activaciones -->

               <!-- Efectividad -->
                  <b-card body-class="card-body-content text-white" :bg-variant="skin == 'dark' ? 'dark' : 'info'">
                      <section class="d-flex justify-content-between align-items-center">
                      
                        <section class="d-flex flex-column flex-grow-1">
                          <h3 class="font-weight-bolder">
                             Efectividad
                           </h3>
                           <table border="0" class="table table-sm table-borderless table-hover">
                            <tbody>
                              <tr>
                                <td>Activaciones</td>
                                <td><h3>{{ nivel.activaciones }}</h3></td>
                              </tr>
                              <tr>
                                <td>Usuarios con Reg.</td>
                                <td><h3>{{ efectividad.userReg }}</h3></td>
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
                <!-- End Efectividad -->

                <!-- Status -->

                <b-card :bg-variant="skin == 'dark' ? 'dark' : 'success'" no-body class="card-status" :class="{ 'card-status-dark': skin == 'dark' }">
                
                  <section class="d-flex justify-content-around card-header-status">
                    <div>
                       <h3>Estatus</h3>
                    </div>
                     <div>
                        <h3>{{ getStatusPromotor }}</h3>
                      </div>
                  </section>

                  <section class="card-footer-status">
                    <div>
                       <span>Activaciones / Mes</span>
                    </div>
                     <div>
                        <strong>{{ promotor ? promotor.nivel.activaciones : 0 }}</strong>
                      </div>
                  </section>

                </b-card>

                 <!-- Nivel -->
                <b-card :bg-variant="skin == 'dark' ? 'dark' : 'dark'" >
                  <b-card-body class="p-0 text-white">
                    <section class="d-flex justify-content-between text-white align-items-center">
                        <h3 class="font-weight-bolder text-white">
                         Nivel
                       </h3>
                       <h1 class="text-white">{{ $store.getters['usuario/getNivel'] }}</h1>
                    </section>
                    <article class="g-activaciones mt-1">
                      <b-progress
                          :value="siguienteNivel(nivel.nivel, nivel.activaciones).porcentaje"
                          max="100"
                          height="10px"
                          animated
                          striped
                          variant="primary"
                        />
                    </article>

                  </b-card-body>
                </b-card>
          </b-col>

          <b-col cols="12" md="8">
            <b-card title="Origen de tus viajeros registrados">
              <b-container fluid class="px-0 mx-0">
                <b-row>
                  <b-col cols="12" md="12">
                    <map-chart  :series="paisesActivos" :chartOption="chartOptionMap"></map-chart>

                  </b-col>
                  <b-col cols="12">
                    <b-container fluid class="px-0 mx-0">
                      <b-row>
                        <b-col cols="12" md="6" class="d-flex flex-column">
                            <strong class="mb-2">Por País</strong>
                            <table class=" w-100 " style="max-height: 100px !important; overflow-y: scroll; height:50px" >
                              <tr v-for="({ pais, porcentaje }, i) in viajerosPorPais" :key="i" :style="{
                                backgroundColor:colorRand()
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
import { $themeColors,$themeConfig } from '@themeConfig'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useDireccion from '@core/utils/useDireccion.js'

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { siguienteNivel  } from '@core/utils/utils';

import worldMap from '@highcharts/map-collection/custom/world.geo.json'

export default {
  
  components: {
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
    VueApexCharts
  },

  props:{
    promotor:{
      type:Object,
      required:true,

    }
  },

  setup(props) {

    const {promotor} = toRefs(props)
    const status = ref(0)
    const { 
      paisesActivos,
      viajerosActivos,
      totalViajerosRegistrados,
      totalViajerosConsumos,
      viajerosPorPais
    } = toRefs(store.state.dashboard)

    const chartOptionMap = ref({
      title: {
        enabled:false,
      },
      subtitle: {
        enabled: false,
      },

      chart: {
        map: worldMap,
        height:300,
      },

      colorAxis: {
        stops: [
          [0, '#55aaff'],
          [1, '#2d5b88']
        ]
      },
      legend:{
        enabled:false
      },
      exporting:{
        enabled:false
      },
       credits:{
        enabled:false,
       },
      plotOptions: {
        series: {
          allAreas:true,
          showInLegend:true,
          backgroundColor:colorRand(),
          states:{
            hover:{
              color:$themeColors.danger
            }
          },

          dataLabels: {
            enabled:false,
            formatter:({point}) => {
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
        userReg:0,
    })
    const filtro_gastos_turisticos = ref({
      pais_id: null,
      rango_fecha: null,
      destino_id: null,
      negocio_id: null
    })

    const activaciones = ref({
      nivel:0,
      activaciones:0
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

    const activacionesPromotor = computed(() => {
      return promotor.value.nivel ? promotor.value.nivel.activaciones : 0
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
      usuario_id: computed(() => promotor.value.id)
    })

    const porcentajeEfectividad = computed(() => {
      if(efectividad.value.userReg > 0){
        return [redondeo(efectividad.value.userReg * 100 / activacionesPromotor.value)] 
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
                fontFamily:'Myriad Regular',
                offsetY:15,
              },
              total:{
                show:false
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
            right:0,
          },
        },
      },
    })

    const cargarDashboard = () => {
      store.dispatch('dashboard/cargarPaisesActivos',promotor.value.id)
      store.dispatch('dashboard/cargarViajerosActivos', filtro.value)
      store.dispatch('dashboard/getTotalViajerosRegistradoAnual',promotor.value.id)
        
    }

    const cargarPromotor = () => {
      
      store.dispatch('usuario/getStatusPromotor',promotor.value.id).then(({ status }) => {
        const {referidos} = status
        
        if(referidos.ultimo_mes > 0){
          status.value = 1;
        }else if(referidos.ultimo_trimestre > 0){
          status.value = 2;
        }else{
          status.value = 3
        }

        viajeros_referidos.value = referidos.ultimo_trimestre;
      })


      getAnoPorMes(ano.value)

      getAcumuladoPorAno()

      getEfectividad()

      getOrigenViajeroPorPais();

    

    }

    const getAnoPorMes = (anio) => {
      ano.value = anio
      if(promotor.value.id){
        store.dispatch('usuario/getMovimientosPorMes', { anio: ano.value, usuario: promotor.value.id }).then((data) => {
          dataRevenueReport.value.chart1serie = data.graficas
          dataRevenueReport.value.chart2serie = data.graficas
          dataRevenueReport.value.saldo = data.saldo
          dataRevenueReport.value.iso = data.iso
          dataRevenueReport.value.retirado = data.retirado
        })
      }
    } 

    const getAcumuladoPorAno = () => {
       if(promotor.value.id){
          store.dispatch('usuario/getAcumuladoPorAno', promotor.value.id).then((data) => {
            acumulado.value = data.acumulado
            chartDataAcumulado.value = data.series
          })
      }
    }

    const getEfectividad = () => {
      store.dispatch('usuario/getEfectividad',promotor.value.id).then((data) => {
          efectividad.value.userReg = data
      })
    }   

    const getOrigenViajeroPorPais = () => {
      store.dispatch('dashboard/getOrigenViajerosPorPais',promotor.value.id)
    }

    const  nivel =  computed(() => promotor.value.nivel)
    
    watch(ano, (val) => getAnoPorMes(val))  
    onActivated(() => cargarDashboard());
    cargarPromotor()
    cargarDashboard();

    watch([() => filtro.value.rango_fecha], () => cargarDashboard());

    return {
    
      filtro_gastos_turisticos,
      miSaldo: computed(() => promotor.value.cuenta ? promotor.value.cuenta.saldo : 0),
      miDivisa: computed(() => promotor.value.cuenta ? promotor.value.cuenta.divisa.iso : 'USD'),

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
      viajerosActivos, 
      filtro,
      skin: computed(() => store.state.appConfig.layout.skin),
      nivel,
      siguienteNivel,
      efectividad,
      porcentajeEfectividad,
      chartEfectividad,
      totalViajerosRegistrados,
      totalViajerosConsumos,
      retirar: () => showSidebarRetiro.value = true,
      getAnoPorMes,
      paisesActivos,
      activacionesPromotor,
      chartOptionMap,
      viajerosPorPais,
      colorRand:colorRand,
      dominacionMundial:computed(() => {
        return redondeo(viajerosPorPais.value.length * 100 / 195,2)
      }),
      symbolDivisa: computed(() => {
        
        return promotor.value.cuenta ? promotor.value.cuenta.divisa.simbolo : '$'

      }),

      getStatusPromotor:computed(() => {
      	
        let statuses = ['Activo', 'En Peligro', 'Inactivo']
        return promotor.value.status != undefined ? statuses[promotor.value.status - 1] : statuses[2];        
        
      })

    }

  }



}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';

.card-body-content{
  padding:.2rem 1rem;
}

.card-status{
  padding:1.5rem 0rem 0px 0px;
  background-color: #61a60f ;
  height:100px;
  h3{
    color:white ;
  }
  
  .card-header-status{
    display: flex;
    padding:0rem .7rem;

    div{
      width: 45%;
      display: flex;  
      align-items: flex-end;
      // justify-content: flex-start;
      padding: 0px;
    }
  }

  .card-footer-status{
    height:50px;
    background-color: #75bd1d;
    border-radius: 0px 0px 7px 7px;
    display:flex;
    justify-content:space-around;
    align-items: flex-start;
    padding:0rem .7rem;
    div{
      width: 45%;
      display: flex;  
      align-items: flex-end;
      // justify-content: flex-start;
      padding: 0px;
    }

  }
}

.card-status-dark{
  .card-footer-status{
    background-color: #171b28;
    strong{
      display:flex;
      justify-content: flex-start;
      
    }
  }
}

</style>
