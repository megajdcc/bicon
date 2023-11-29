
export default{

   namespaced:true,

   state:() => ({

      venta:{
         id:null,
         divisa_id:null,
         monto:0,
         comision:0,
         tipo_comision:1,
         tps:0,
         tps_referente:0,
         certificado:false,
         model_id:null,
         model_type:null,
         empleado_id:null,
         cliente_id:null,
         divisa:null,
         model:null,
         empleado:null,
         cliente:null,
         personas:1,
         reservacion_id:null,
         reservacion:null,
         cupon_id:null,
         tps_bonificados:0
      },


      ventas:[]
   }),


   getters:{

      draft(state){
         return clone(state.venta)
      }
   },

   mutations:{
      clear(state) {
         state.venta = {
            id: null,
            divisa_id: null,
            monto: 0,
            comision: 0,
            tipo_comision: 1,
            tps: 0,
            tps_referente: 0,
            certificado: false,
            model_id: null,
            model_type: null,
            empleado_id: null,
            cliente_id: null,
            divisa: null,
            model: null,
            empleado: null,
            cliente: null,
            personas: 1,
            reservacion_id: null,
            reservacion: null,
            cupon_id:null,
            tps_bonificados:0
         }
      },


      setVenta(state, venta) {
         state.venta = venta
      },

      update(state, venta) {
         const i = state.ventas.findIndex(val => val.id === venta.id)

         if (i != -1) {
            state.ventas[i] = venta
         }

         if (state.venta.id === venta.id) {
            state.venta = venta
         }
      },

      push(state, venta) {
         state.ventas.push(venta)

      },

      put(state, venta_id) {
         state.ventas.splice(
            state.ventas.findIndex(val => val.id === venta_id),
            1
         )
      },

      capturar(state, venta_id) {
         const venta = state.ventas.find(val => val.id === venta_id)

         if (venta != undefined) {
            state.venta = venta
         }
      },

      setVentas(state, ventas) {
         state.ventas = ventas
      }
   },

   actions:{
      getVentas({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get('/api/ventas/get/all').then(({ data }) => {
               commit('setVentas', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({ state, commit }, datos) {

         return new Promise((resolve, reject) => {
            axios.post(`/api/ventas/fetch/data`, datos).then(({ data }) => {

               commit('setVentas', data.ventas)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({ state, commit }, venta_id) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/ventas/${venta_id}/fetch/data`).then(({ data }) => {
               commit('setVenta', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            if (datos.id) {
               axios.put(`/api/ventas/${datos.id}`, datos).then(({ data }) => {
                  if (data.result) {
                     commit('update', data.venta)

                  }
                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/ventas`, datos).then(({ data }) => {
                  if (data.result) {
                     commit('push', data.venta)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })

      },

      eliminar({ commit }, venta_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/ventas/${venta_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      fetchDataConsumo({commit},datos){
         return new Promise((resolve, reject) => {
            axios.post(`/api/ventas/fetch/data/consumo`,datos).then(({data}) => {

               commit('setVentas',data.ventas);
               
               resolve(data)

            }).catch(e => reject(e))


         })
      },

      reportFetchData(_,filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/reporte/fetch-data-gasto-turistico`,filtro).then(({data}) => resolve(data)).catch(e => reject(e))
         })
      },

      getCincoPaisesConMasRegistro(_){
         return new Promise((resolve, reject) => {
            axios.get(`/api/reporte/get/cinco-paises-con-mayores-registros`).then(({data}) => resolve(data)).catch(e => reject(e))
            
         })
      },


      reportFetchDataDescargar(_,filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/reporte/fetch-data-gasto-turistico-descargar`,filtro).then(({data}) => resolve(data)).catch(e => reject(e))
         })
      }
   }
}