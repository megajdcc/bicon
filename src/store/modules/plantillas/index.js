export default{

   namespaced:true,

   state(){
         return {
            plantilla:{
               id:null,
               content:'',
               disparador:null,
               boda_id:null,
               boda:null,
               path:'',
               tema:'',
            },

            plantillas:[],
            disparadores: [
               {
                  label: 'Al enviar la cotización',
                  value: 1,
                  variables: ['invitado', 'novios', 'hotel', 'habitacion', 'habitantes', 'reserva', 'adultos', 'edad_minima_juniors', 'edad_maxima_juniors', 'edad_minima_menores', 'edad_maxima_menores', 'check_in', 'check_out', 'noches', 'nro_reserva', 'precio_juniors', 'precio_menores', 'menores', 'juniors', 'precio_adolescentes', 'precio_nino', 'max_adulto', 'ocupacion_menores', 'ocupacion_juniors', 'precio_adulto', 'ocupantes', 'tarifa_ocupacion', 'tipo_ocupacion', 'huespedes', 'cargo_adicional', 'total_pagar', 'cuotas', 'bancos', 'fecha_limite_liquidacion', 'fecha_limite_cambios', 'cargo_administrativo', 'fecha_limite_cancelacion', 'url_pagar_reserva','politicas_reserva','coordinador','boda'],
               },
               {
                  label: 'Al cargar un pago',
                  value: 2,
                  variables: ['forma_pago', 'coordinador', 'boda','monto_pago','invitado', 'novios', 'hotel', 'habitacion', 'habitantes', 'reserva', 'adultos', 'edad_minima_juniors', 'edad_maxima_juniors', 'edad_minima_menores', 'edad_maxima_menores', 'check_in', 'check_out', 'noches', 'nro_reserva', 'precio_juniors', 'precio_menores', 'menores', 'juniors', 'precio_adolescentes', 'precio_nino', 'max_adulto', 'ocupacion_menores', 'ocupacion_juniors', 'precio_adulto', 'ocupantes', 'tarifa_ocupacion', 'tipo_ocupacion', 'huespedes', 'cargo_adicional', 'total_pagar', 'cuotas', 'bancos', 'fecha_limite_liquidacion', 'fecha_limite_cambios', 'cargo_administrativo', 'fecha_limite_cancelacion', 'url_pagar_reserva', 'politicas_reserva'],
               },
               {
                  label: 'Al aprobar un pago',
                  value: 3,
                  variables: ['nro_referencia','forma_pago', 'coordinador', 'boda', 'monto_pago', 'invitado', 'novios', 'hotel', 'habitacion', 'habitantes', 'reserva', 'adultos', 'edad_minima_juniors', 'edad_maxima_juniors', 'edad_minima_menores', 'edad_maxima_menores', 'check_in', 'check_out', 'noches', 'nro_reserva', 'precio_juniors', 'precio_menores', 'menores', 'juniors', 'precio_adolescentes', 'precio_nino', 'max_adulto', 'ocupacion_menores', 'ocupacion_juniors', 'precio_adulto', 'ocupantes', 'tarifa_ocupacion', 'tipo_ocupacion', 'huespedes', 'cargo_adicional', 'total_pagar', 'cuotas', 'bancos', 'fecha_limite_liquidacion', 'fecha_limite_cambios', 'cargo_administrativo', 'fecha_limite_cancelacion', 'url_pagar_reserva', 'politicas_reserva'],
               },
               {
                  label: 'Al rechazar un pago',
                  value: 4,
                  variables: ['nro_referencia', 'forma_pago', 'coordinador', 'boda', 'monto_pago', 'invitado', 'novios', 'hotel', 'habitacion', 'habitantes', 'reserva', 'adultos', 'edad_minima_juniors', 'edad_maxima_juniors', 'edad_minima_menores', 'edad_maxima_menores', 'check_in', 'check_out', 'noches', 'nro_reserva', 'precio_juniors', 'precio_menores', 'menores', 'juniors', 'precio_adolescentes', 'precio_nino', 'max_adulto', 'ocupacion_menores', 'ocupacion_juniors', 'precio_adulto', 'ocupantes', 'tarifa_ocupacion', 'tipo_ocupacion', 'huespedes', 'cargo_adicional', 'total_pagar', 'cuotas', 'bancos', 'fecha_limite_liquidacion', 'fecha_limite_cambios', 'cargo_administrativo', 'fecha_limite_cancelacion', 'url_pagar_reserva', 'politicas_reserva']
               },
               {
                  label: 'Al enviar cupón',
                  value: 5,
                  variables: ['invitado', 'novios', 'hotel', 'hotel_direccion', 'nro_reserva', 'habitaciones', 'check_in', 'check_out', 'reserva_noches', 'observaciones', 'nombre_adultos', 'menores', 'nombre_habitacion', 'tipo_ocupacion', 'cantidad_adultos', 'cantidad_jovenes', 'cantidad_ninos', 'cantidad_bebes', 'total_pagar', 'jovenes','coordinador','boda'],
               },

               {
                  label: 'Al Recibir Solicitud de Reserva',
                  value: 6,
                  variables: ['invitado', 'novios', 'hotel', 'habitacion', 'habitantes', 'reserva', 'adultos', 'edad_minima_juniors', 'edad_maxima_juniors', 'edad_minima_menores', 'edad_maxima_menores', 'check_in', 'check_out', 'noches', 'nro_reserva', 'precio_juniors', 'precio_menores', 'menores', 'juniors', 'precio_adolescentes', 'precio_nino', 'max_adulto', 'ocupacion_menores', 'ocupacion_juniors', 'precio_adulto', 'ocupantes', 'tarifa_ocupacion', 'tipo_ocupacion', 'huespedes', 'cargo_adicional', 'total_pagar', 'cuotas', 'bancos', 'fecha_limite_liquidacion', 'fecha_limite_cambios', 'cargo_administrativo', 'fecha_limite_cancelacion', 'url_pagar_reserva', 'politicas_reserva', 'coordinador', 'boda'],
               }

            ]

         }

   },


   getters:{
      draft(state){
         return clone(state.plantilla)
      },

      getNombreDisparador(state){
         return (disparador) => {
            return state.disparadores.find(val => val.value === disparador).label
         }
      }
   },

   mutations:{

      clear(state){
         state.plantilla = {
            id: null,
            content: '',
            disparador: null,
            boda_id: null,
            boda: null,
            path: '',
            tema: '',
         }

      },

      setPlantillas(state,data){

         state.plantillas = data

      },

      push(state,plantilla) {

         state.plantillas.push(plantilla)
      },

      put(state,plantilla_id){
         state.plantillas.splice(
            state.plantillas.findIndex(val => val.id === plantilla_id),
            1
         )
      },

      update(state,plantilla){

         let i = state.plantillas.findIndex(val => val.id === plantilla.id)

         if(i != -1 ){

            state.plantillas[i] = plantilla

            if(state.plantilla.id === plantilla.id){
               state.plantilla = plantilla
            }

         }

      },

      capturar(state,plantilla_id){

         let plant  = state.plantillas.find(val => val.id === plantilla_id)

         if(plant){
            state.plantilla = plant         
         }

      }

   },

   actions:{

      fetchPlantillas({state,commit},searhQuery){

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post(`/api/plantillas/fetch`,searhQuery).then(({data}) => {
               commit('setPlantillas',data.plantillas)
               resolve(data)
            }).catch(e => {
               reject(e) 
            }).then(() => commit('toggleLoading',null,{root:true}))


         })
      },

      guardar({state,commit},data){
          
            return new Promise((resolve, reject) => {
               commit('toggleLoading', null, { root: true })

               if (state.plantilla.id) {
                  axios.put(`/api/plantillas/${data.id}`, data).then(({ data }) => {

                     resolve(data)

                  }).catch(e => reject(e))
                     .then(() => commit('toggleLoading', null, { root: true }))
               }else{

                  axios.post(`/api/plantillas`,data).then(({data}) => {
                     resolve(data)
                  }).catch(e => reject(e))
                  .then(() => commit('toggleLoading',null,{root:true}))

               }

              

            })

         

      },


      async getTemplate({state,commit},disparador){
         return  await axios.get(`/api/plantillas/get/disparador/${disparador}`)

      },

      getPlantilla({state,commit},plantilla_id){
         
         commit('toggleLoading', null, { root: true })

         axios.get(`/api/plantillas/get/${plantilla_id}`).then(({data}) => {
            commit('push',data)
         }).catch(e => console.log(e))
         .then(() => commit('toggleLoading',null,{root:true}))

      },

      eliminar({state,commit},plantilla_id){
         return axios.delete(`/api/plantillas/${plantilla_id}`)
      },

      enviarEmail({commit},data){

         return new Promise((resolv,reject) => {
            commit('toggleLoading',null,{root:true})
            axios.post(`/api/plantillas/send/email`,data).then(({data}) => {
               resolv(data);
            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))


         })

      }




      
   }



}
