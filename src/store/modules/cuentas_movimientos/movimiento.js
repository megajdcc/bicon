export default {

   namespaced: true,

   state: () => ({
      movimiento: {
         id:null,
         estado_cuenta_id:null,
         monto:0,
         tipo_movimiento:1,  // 1 => Ingreso, 2 => egreso
         balance:0,
         concepto:'',
         cuenta:null
      },

      movimientos: []
   }),

   getters: {

      draft: (state) => clone(state.movimiento)
   },

   mutations: {

      clear(state) {
         return state.movimiento = {
            id: null,
            estado_cuenta_id: null,
            monto: 0,
            tipo_movimiento: 1,  // 1 => Ingreso, 2 => egreso
            balance: 0,
            concepto: '',
            cuenta: null
         }

      },

      setMovimiento(state, movimiento) {

         if (movimiento) {
            state.movimiento = movimiento
         }
      },


      setMovimientos(state, movimientos) {
         if (movimientos.length) {
            state.movimientos = movimientos
         }

      },

      capturar(state, movimiento_id) {
         state.movimiento = state.movimientos.find(val => val.id === movimiento_id)
      },

      update(state, movimiento) {
         let i = state.movimientos.findIndex(val => val.id === movimiento.id)

         if (i != -1) {
            state.movimientos[i] = movimiento

         }

         if (state.movimiento.id === movimiento.id) {
            state.movimiento = movimiento
         }

      },

      push(state, movimiento) {
         state.movimientos.push(movimiento)
      },

      put(state, movimiento_id) {
         state.movimientos.splice(
            state.movimientos.findIndex(val => val.id === movimiento_id),
            1
         );
      }

   },

   actions: {

      getMovimientos({ commit }) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/movimientos/get/all`).then(({ data }) => {
               commit('setMovimientos'.data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({ commit }, data) {

         return new Promise((resolve, reject) => {

            axios.post(`/api/movimientos/fetch/data`, data).then(({ data }) => {
               commit('setMovimientos', data.movimientos)
               resolve(data)
            }).catch(e => reject(e))
            

         })

      },


      descargarfetchData({commit},datos){
         return new Promise((resolve, reject) => {

            axios.post(`/api/movimientos/fetch/data/descargar`, datos).then(({ data }) => {
               resolve(data)
            }).catch(e => reject(e))
            

         })

      }






   }
}