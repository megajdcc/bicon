let colorRand = () => {
   let colores = [
      '#397DAD',
      '#4D616C',
      '#D02412',
      '#CD960E',
      '#348022',
      '#17B6AA',
      '#5F2626',
      '#00AEFF',
      '#6574cd',
      '#9561e2',
      '#f66d9b',
      '#e3342f',
      '#f6993f',
      '#ffed4a',
      '#38c172',
      '#4dc0b5',
      '#6cb2eb',
      '#444444',
      '#00c0ef',
   ];


   var i = random(0, colores.length);


   return colores[i];

}

import { $themeColors } from '@themeConfig';

export default{
   namespaced:true,

   state(){
      return{
          
            // Travelpoints
            gastosTuristicos:{
               items:[],
               ultima_fecha:null
            },

            tiendaRegalos:{
               items:[],
               ultima_fecha:null
            },
            
            totalViajeros:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            totalPromotores:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            totalCoordinadores:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            totalComisionesGeneradas:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            
            totalDestinosActivos:{
               series:[],
               chartOptions: {
                  chart: {
                     type: 'bar'
                  },
                  plotOptions: {
                     bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                     },
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     show: true,
                     width: 2,
                     colors: ['transparent']
                  },
                  xaxis: {
                     categories: [],
                  },
                  yaxis: {
                     title: {
                        text: 'Total de negocios por destino',
                     }
                  },
                  tooltip: {
                    
                  },
               },
              
            },

            viajerosActivos:0,
            destinosActivos:0,

            paisesActivos:[{
               name: 'Random data',

               states: {
                  hover: {
                     color: $themeColors.danger
                  }
               },

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
            }],

            viajerosTotalesAnual:{
               series: [],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'line',
                     zoom: {
                        enabled: false
                     },
                     id:'viajeros-totales-anuales'
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     curve: 'straight'
                  },
                  
                  grid: {
                  row: {
                     colors: ['#f3f3f3', 'transparent'], 
                     opacity: 0.5
                  },
                  },
                  xaxis: {
                     categories: [],
                     labels: {
                           style: {
                           transform: "rotate(45deg)"
                           }
                        }
                  }
               },
            },

            eficaciaPromotores:{
               series: [{
                     name: 'Vue Chart',
                     data: [30, 40, 45, 50, 49, 60, 70, 81]
                     }],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'line',
                     zoom: {
                        enabled: false
                     },
                     id:'eficacia-promotores'
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     curve: 'straight'
                  },
                  
                  grid: {
                  row: {
                     colors: ['#f3f3f3', 'transparent'], 
                     opacity: 0.5
                  },
                  },
                  xaxis: {
                     categories: ['prueba'],
                     labels: {
                           style: {
                           transform: "rotate(45deg)"
                           }
                        }
                  }
               },
            },

            viajerosTotales:{
                series: [],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'line',
                     zoom: {
                        enabled: false
                     },
                     id:'viajeros-totales'
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     curve: 'straight'
                  },
                  
                  grid: {
                  row: {
                     colors: ['#f3f3f3', 'transparent'], 
                     opacity: 0.5
                  },
                  },
                  xaxis: {
                     categories: [],
                     labels: {
                           style: {
                           transform: "rotate(45deg)"
                           }
                        }
                  }
               },
            },


            negociosAfiliados:[],

            porcentajeNegocio:{
               series:[],
               chartOptions:{

                  chart:{
                     type: 'donut'
                  },

                  plotOptions:{
                     bar: {
                        horizontal: true,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                     },
                  },

                  responsive: [{
                     breakpoint: 480,
                     options: {
                        chart: {
                           width: 200
                        },
                        legend: {
                           position: 'right'
                        }
                     }
                  }],

                  dataLabels: {
                     enabled: false
                  },

                  legend: {
                     position: 'right',
                     offsetY: 0,
                     height: 230,
                  },

                  stroke:{
                     show: true,
                     width: 2,
                     colors: ['transparent']
                  },
                  tooltip:{
                     y: {
                        formatter: (val,{ series, seriesIndex, dataPointIndex, w }) => {
                           return `${val} %`
                        },
                        title: {
                           formatter: (seriesName) => seriesName,
                        },
                     },
                  },

                  labels:[]

               },
            },

            totalPromotoresPorLider:{
                series: [
                     {
                     name: "High - 2013",
                     data: [28, 29, 33, 36, 32, 32, 33]
                     },
                     {
                     name: "Low - 2013",
                     data: [12, 11, 14, 18, 17, 13, 13]
                     }
                  ],
                  chartOptions: {
                     chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                           enabled: true,
                           color: '#000',
                           top: 18,
                           left: 7,
                           blur: 10,
                           opacity: 0.2
                        },
                        toolbar: {
                           show: false
                        }
                     },
                     colors: ['#77B6EA', '#545454'],
                     dataLabels: {
                        enabled: true,
                     },
                     stroke: {
                        curve: 'smooth'
                     },
                    
                     grid: {
                        borderColor: '#e7e7e7',
                        row: {
                           colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                           opacity: 0.5
                        },
                     },
                     markers: {
                      size: 1
                     },
                     xaxis: {
                        categories: [],
                        title: {
                           text: 'Lideres'
                        }
                     },
                     yaxis: {
                        title: {
                           text: 'Cant Promotores'
                        },
                        min: 0,
                        max: 40
                     },
                     legend: {
                        position: 'bottom',
                        horizontalAlign: 'center',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5,
                        style:{
                           marginTop:'3rem'
                        }
                     }
                  },
            },

            totalEficaciaPromotoresCoordinador:{
                  series: [44, 55, 41, 17, 15],
                  chartOptions: {
                     chart: {
                     width: 380,
                     type: 'donut',
                     },
                     plotOptions: {
                     pie: {
                        startAngle: -90,
                        endAngle: 270
                     }
                     },
                     dataLabels: {
                     enabled: false
                     },
                     fill: {
                     type: 'gradient',
                     },
                     legend: {
                     formatter: function(val, opts) {
                        return `Promotor: ${val} - ${opts.w.globals.series[opts.seriesIndex]} %`
                     }
                     },
                     labels:[],
                     responsive: [{
                     breakpoint: 480,
                     options: {
                        chart: {
                           width: 200
                        },
                        legend: {
                           position: 'bottom'
                        }
                     }
                     }]
                  },
            },

            totalViajerosPorCoordinador:{
                  series: [],
                  chartOptions: {
                     chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                           enabled: true,
                           color: '#000',
                           top: 18,
                           left: 7,
                           blur: 10,
                           opacity: 0.2
                        },
                        toolbar: {
                           show: false
                        }
                     },
                     colors: [
                         '#397DAD',
                        '#4D616C',
                        // '#D02412',
                        '#CD960E',
                        '#348022',
                        '#17B6AA',
                        '#5F2626',
                        '#00AEFF',
                        '#6574cd',
                        '#9561e2',
                        '#f66d9b',
                        // '#e3342f',
                        // '#f6993f',
                        // '#ffed4a',
                        '#38c172',
                        '#4dc0b5',
                        '#6cb2eb',
                        '#444444',
                        '#00c0ef',
                     ],
                     
                     dataLabels: {
                        enabled: true,
                        style:{
                           fontSize:'16pt',
                           color:['#ffffff']
                        }
                     },

                     stroke: {
                        curve: 'smooth'
                     },
                    
                     grid: {
                        borderColor: '#e7e7e7',
                        row: {
                           colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                           opacity: 0.5
                        },
                     },
                     markers: {
                      size: 1
                     },
                     xaxis: {
                        categories: [],
                        title: {
                           text: 'Promotores'
                        }
                     },
                     yaxis: {
                        title: {
                           text: 'Cant Viajeros'
                        },
                        min: 0,
                        max: 40
                     },
                     legend: {
                        position: 'bottom',
                        horizontalAlign: 'center',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5,
                        style:{
                           marginTop:'3rem'
                        }
                     }
                  },
            },

            porcentajeUsoViajeros:{
               series: [67],
               chartOptions: {
                  chart: {
                  height: 350,
                  type: 'radialBar',
                  offsetY: -10
                  },
                  plotOptions: {
                  radialBar: {
                     startAngle: -135,
                     endAngle: 135,
                     dataLabels: {
                        name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120
                        },
                        value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                           return val + "%";
                        }
                        }
                     }
                  }
                  },
                  fill: {
                  type: 'gradient',
                  gradient: {
                        shade: 'dark',
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                  },
                  },
                  stroke: {
                  dashArray: 4
                  },
                  labels: ['Porcentaje Uso'],
               },
            },

            operacionesTravel:0,
            totalViajerosRegistrados:0,
            totalViajerosConsumos:0,
            comisiones_cobradas:0,
            comisiones_por_cobrar:0,
            promotores_status:{
               activos:0,
               inactivos:0
            },

            lideres_status:{
               activos:0,
               inactivos:0
            },
            
            misPromotores:[],
            viajerosPorPais:[],// [{pais:'Venezuela',porcentaje:10%},...]

            porcentajeEficacia:{
               series: [],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'radialBar',
                  },
                  
                 
                  plotOptions: {
                     radialBar: {
                        // ...
                        dataLabels: {
                           enabled:true,
                           textAnchor: 'middle',
                           distributed: false,
                           offsetX: 0,
                           offsetY: 0,

                           style: {
                                 fontSize: '12px',
                                 fontFamily: 'Helvetica, Arial, sans-serif',
                                 fontWeight: 'bold',
                                 colors: undefined
                           }
                        },
                     }
                  },

                  dataLabels: {
                        enabled:true,
                        textAnchor: 'middle',
                        distributed: false,
                        offsetX: 0,
                        offsetY: 0,

                        style: {
                              fontSize: '12px',
                              fontFamily: 'Helvetica, Arial, sans-serif',
                              fontWeight: 'bold',
                              colors: undefined
                        }
                  },
                  
                  labels: ['Sobre el Total de Viajeros'],
                  
               },
               
               
            },
            porcentajeEficaciaPromotores:{
               series: [10],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'radialBar',
                     toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                        download: false,
                        selection: true,
                        zoom: false,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                        },
                     },
                  },
                  
                 
                  plotOptions: {
                     radialBar: {
                        // ...
                        
                        dataLabels: {
                           show: true,
                           name: {
                              show: true,
                              fontSize: '24px',
                              fontFamily: 'Miriad, Arial, sans-serif',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              offsetY: -10,
                           },
                           value: {
                              show: true,
                              fontSize: '30px',
                              fontFamily: 'Miriad, Arial, sans-serif',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              offsetY: 0,
                              formatter: function (val) {
                                 return val + '%'
                              },
                           },
                           total: {
                              show: true,
                              label: 'Eficacia', // Aquí se establece la etiqueta por defecto
                              formatter: function () {
                                 return ''
                              },
                           },
                        },
                     }
                  },

                  dataLabels: {
                        hideWhenZero: false,
                        enabled:true,
                        textAnchor: 'middle',
                        distributed: false,
                        offsetX: 0,
                        offsetY: 0,

                        style: {
                              fontSize: '12px',
                              fontFamily: 'Helvetica, Arial, sans-serif',
                              fontWeight: 'bold',
                              colors: undefined
                        }
                  },
                  
                  labels: ['Prueba'],
                  activeIndex:0,

                  legend: {
                     show: true,
                     position: 'bottom',
                  },
                  
               },
            }


      }
   },


   mutations:{
      

      // Travelpoints
      setTotalViajeros(state,{data,categorias}){
         state.totalViajeros.chartOptions.labels = categorias
         state.totalViajeros.series = data
      },
      setTotalPromotores(state,{data,categorias}){
         state.totalPromotores.chartOptions.labels = categorias
         state.totalPromotores.series = data
      },

       setTotalCoordinadores(state,{data,categorias}){
         state.totalCoordinadores.chartOptions.labels = categorias
         state.totalCoordinadores.series = data
      },

      setTotalDestinosActivos(state,data){

         state.totalDestinosActivos.chartOptions.xaxis.categories = data.map(destino => destino.destino)
         state.totalDestinosActivos.series = data.map(destino => ({
               name: destino.destino,
               data: [destino.totalNegocios],
               dataNombres:[destino.nombresNegocios]
            })
            )
          
         
      },

      setViajerosActivos(state,viajeros){
         state.viajerosActivos = viajeros
      },
      
      setDestinosActivos(state,destinos){
         state.destinosActivos = destinos
      },

      setPaisesActivos(state,data){
         state.paisesActivos = data
      },

      setTotalNegociosAfiliados(state,data){
         state.negociosAfiliados = data
      },
      
      setPorcentajeNegocio(state,{data,categorias}){
         state.porcentajeNegocio.chartOptions.labels = categorias
         state.porcentajeNegocio.series = data
      },

      setGastosTuristicos(state,data){
         state.gastosTuristicos.items = data.items
         state.gastosTuristicos.ultima_fecha = data.ultima_fecha
      },


      setTiendaRegalos(state,data){
         state.tiendaRegalos.items = data.items
         state.tiendaRegalos.ultima_fecha = data.ultimaFecha

      },

      setTotalComisionesGeneradas(state,{categorias,data}){
         state.totalComisionesGeneradas.chartOptions.labels = categorias
         state.totalComisionesGeneradas.series = data
      },

      setTotalOperaciones(state,data){
         state.operacionesTravel = data
      },

      setViejerosTotalesAnuales(state,{categorias,data}){
         state.viajerosTotalesAnual.chartOptions.xaxis.categories = categorias
         state.viajerosTotalesAnual.series = data
      },

      setTotalViajerosRegistrados(state,total){
         state.totalViajerosRegistrados = total
      },
      setTotalViajerosConsumo(state,total){
         state.totalViajerosConsumos = total
      },

      setComisionesPromotor(state,{comisiones_cobradas,comisiones_por_cobrar}){
         state.comisiones_cobradas = comisiones_cobradas
         state.comisiones_por_cobrar = comisiones_por_cobrar
      },

      setStatusPromotores(state,{promotores_activos,promotores_inactivos}){

         state.promotores_status.activos = promotores_activos
         state.promotores_status.inactivos = promotores_inactivos

      },

      setStatusCoordinadores(state,{lideres_activos,lideres_inactivos}){

         state.lideres_status.activos = lideres_activos
         state.lideres_status.inactivos = lideres_inactivos

      },

      setEficaciaPromotores(state,{promotores,data}){
         state.eficaciaPromotores.chartOptions.xaxis.categories = promotores
         state.eficaciaPromotores.series = data
      },

      setViajerosTotales(state,{categorias,data}){
         state.viajerosTotales.chartOptions.xaxis.categories = categorias
         state.viajerosTotales.series = data
      },

      setMisPromotores(state,promotores){
         state.misPromotores = promotores
      },
      setEficaciaMes(state,val) {
         state.porcentajeEficacia.series = [val];
      },

      setEficaciaMesPromotores(state,{promotores,data}){

         state.porcentajeEficaciaPromotores.chartOptions.labels = promotores
         state.porcentajeEficaciaPromotores.series = data
         
      },

      setTotalPromotoresPorLider(state,{data,categorias}){

         state.totalPromotoresPorLider.series = data
         state.totalPromotoresPorLider.chartOptions.xaxis.categories = categorias
      },
      
      setTotalEficaciaPromotoresCoordinador(state,{data,categorias}){
         state.totalEficaciaPromotoresCoordinador.series = data
         state.totalEficaciaPromotoresCoordinador.chartOptions.labels = categorias
      },

      setTotalViajerosPorCoordinador(state,{data,categorias}){
         state.totalViajerosPorCoordinador.series = data
         state.totalViajerosPorCoordinador.chartOptions.labels = categorias
      },

      setPorcentajeUsoViajeros(state,{porcentaje,total_viajeros}){
         state.porcentajeUsoViajeros.series = [porcentaje];
         state.porcentajeUsoViajeros.chartOptions.labels = [`Sobre ${total_viajeros} (Total Viajeros)`]
      },

      setViajerosPorPais(state,data){

         state.viajerosPorPais = data
      }


   },

   actions:{


      cargarDataDashboard({state,commit}){
         
         axios.get('/api/get/data/dashboard').then(({data}) => {
            commit('setViajerosActivos',data.viajerosActivos)
         }).catch(e => {
            console.log(e);
         })
         
      },

      cargarViajerosActivos({commit},dato){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/get/viajeros/activos/${dato.usuario_id ? dato.usuario_id :''}`,dato).then(({data}) => {
               commit('setViajerosActivos',data)
               resolve(data)
            }).catch( e => reject(e))

         })
      },

       cargarDestinosActivos({commit},dato){
         return new Promise((resolve, reject) => {

            axios.post(`/api/dashboard/get/destinos/activos`,dato).then(({data}) => {
               commit('setDestinosActivos',data)
               resolve(data)

            }).catch( e => reject(e))

         })
      },

      cargarDestinosActivosChart({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/dashboard/total/destinos/activos').then(({data}) => {
               commit('setTotalDestinosActivos',data)
               resolve(data);
            }).catch(e => reject(e));

         })
      },

      cargarPaisesActivos({commit},usuario_id = ''){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/get/paises/activos/${usuario_id}`).then(({data}) => {
                  commit('setPaisesActivos',data)
                  resolve(data)
               }).catch(e => reject(e))
         })
      },

      getTotalViajeros({state,commit},filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/total/viajeros`,filtro).then(({data}) => {
               commit('setTotalViajeros',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },


      cargarNegociosAfiliados({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/total/negocios/afiliados`).then(({data}) => {
               commit('setTotalNegociosAfiliados',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      cargarPorcentajeNegocio({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/porcentaje/negocios`).then(({data}) => {
               commit('setPorcentajeNegocio',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },
      fetchGastosTuristicos({commit},filtro){
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/dashboard/gastos/turisticos`,filtro).then(({data}) => {
            
               commit('setGastosTuristicos',data)
               resolve(data)
            
            }).catch(e => reject(e))


         })
      },

        fetchTiendaRegalos({commit}){
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/dashboard/tienda/regalos`).then(({data}) => {
               commit('setTiendaRegalos',data)
               resolve(data)
            
            }).catch(e => reject(e))


         })
      },

      fetchTotalPromotores({commit}){
         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/promotores`).then(({data}) => {
               commit('setTotalPromotores',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchTotalCoordinadores({commit}){
         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/coordinadores`).then(({data}) => {
               commit('setTotalCoordinadores',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchTotalComisionesGeneradas({commit}){
         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/comisiones/generadas`).then(({data}) => {
               commit('setTotalComisionesGeneradas',data)
               resolve(data)
            }).catch(e => reject(e))
            

         })
      },

      getTotalOperacionesTravel({commit}){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/dashboard/total/operaciones/travel`).then(({data}) => {
               commit('setTotalOperaciones',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      getTotalViajerosRegistradoAnual({commit},usuario_id = ''){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/total/viajeros/anual/${usuario_id}`).then(({data}) => {
               
               commit('setViejerosTotalesAnuales',data)
               commit('setTotalViajerosRegistrados',data.total_usuarios_registrados)
               commit('setTotalViajerosConsumo',data.total_viajeros_consumos)

               resolve(data)

            }).catch(e => reject(e))
         })
      },


      getTotalComisiones({commit},filtro){
         
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/dashboard/total/comisiones/promotor`,filtro).then(({data}) => {
               commit('setComisionesPromotor',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      promotoresStatus({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/promotores/status`).then(({data}) => {

               commit('setStatusPromotores',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      coordinadoresStatus({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/coordinadores/status`).then(({data}) => {

               commit('setStatusCoordinadores',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      getEficaciaPromotores({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/dashboard/promotores/get/eficacia').then(({data}) => {

               commit('setEficaciaPromotores',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      getTotalesViajeros({commit},filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/lider/viajeros-totales`,filtro).then(({data}) => {

               commit('setViajerosTotales',data)
               resolve(data)

            }).catch(e => reject(e))


         })
      },

      getMisPromotores({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/lider/mis-promotores`).then(({data}) => {

               commit('setMisPromotores',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },


      getEficaciaMes({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/lider/eficacia-mes`).then(({data}) => {
               commit('setEficaciaMes',data)
               resolve(data)
            }).catch(e  => reject(e))
         })
      },

      getEficaciaMesPromotores({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/lider/eficacia-mes/promotores`).then(({data}) => {
               commit('setEficaciaMesPromotores',data)
               resolve(data)
            }).catch(e  => reject(e))
         })
      },

      getTotalPromotoresPorLider({state,commit}){

         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/promotores/por-lider`).then(({data}) => {

               commit('setTotalPromotoresPorLider',data)
               resolve(data)

            }).catch( e => reject(e))

         })
      },

      getEficaciaPromotoresCoordinador({state,commit},filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/eficacia/promotor/coordinador`,filtro).then(({data}) => {
               commit('setTotalEficaciaPromotoresCoordinador',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },


      getTotalViajerosPorCoordinador({commit},filtro){

         return new Promise((resolve, reject) => {
            axios.post('/api/dashboard/total/viajeros/por-coordinador',filtro).then(({data}) => {
              
               commit('setTotalViajerosPorCoordinador',data)
               resolve(data)

            }).catch(e => reject(e))
         })
      },

      getPorcentajeUsoViajeros({commit}){
         
         return new Promise((resolve,reject) => {
            axios.get('/api/dashboard/porcentaje-uso/viajeros').then(({data}) => {

               commit('setPorcentajeUsoViajeros',data)
               resolve(data)

            }).catch(e => reject(e))

         })

      },

      getOrigenViajerosPorPais({state,commit},usuario_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/porcentaje-viajeros/por-pais/${usuario_id}`).then(({data}) => {
               commit('setViajerosPorPais',data)
               resolve(data)

            }).catch(e => reject(e))
         })
      },

      tresMayoresComisionesPromotors({commit},usuario_id){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/tres-mayores-comisiones-promotores/usuario/${usuario_id}`).then(({data}) => {

               resolve(data)

            }).catch(e => reject(e))
         })
      },

      tresMayoresComisionesLiders({commit}){
          return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/tres-mayores-comisiones-liders`).then(({data}) => {

               resolve(data)

            }).catch(e => reject(e))
         })
      },



      totalViajerosLider({commit},usuario_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/total-viajeros/usuario/${usuario_id}`).then(({data}) => resolve(data)).catch(e => reject(e));

         })
      },

      porcentajeEfectividad({commit},usuario_id){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/porcentaje-efectividad/usuario/${usuario_id}`).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      getTotalNegocios({commit},usuario_id){
         return new Promise((resolve, reject) => {
            
            axios.get(`/api/dashboard/get-negocios/usuario/${usuario_id}`).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))

         })
      }

   }


}
