export default {

   namespaced:true,
   
   state: () => ({
      cuenta:{
         id: null,
         saldo: 0,
         model_type: 'App\Models\User', // por defecto es el usuario
         model_id: null,
         divisa_id: null,
         movimientos: [],
         divisa: null,
         model: null
      },

      cuentas:[]
   }),

   getters:{

      draft:(state) => clone(state.cuenta)
   },

   mutations:{

      clear(state){
         return state.cuenta = {
            id: null,
            saldo: 0,
            model_type: 'User', // por defecto es el usuario
            model_id: null,
            divisa_id: null,
            movimientos: [],
            divisa: null,
            model: null
         }

      },

      setCuenta(state,cuenta){

         if(cuenta){
            state.cuenta = cuenta
         }
      },


      setCuentas(state,cuentas){
            if(cuentas.length){
               state.cuentas = cuentas
            }
   
      },

      capturar(state,cuenta_id){
         state.cuenta = state.cuentas.find(val => val.id === cuenta_id)
      },

      update(state,cuenta){
         let i = state.cuentas.findIndex(val => val.id === cuenta.id)

         if(i !=-1){
            state.cuentas[i] = cuenta
         
         }

         if(state.cuenta.id === cuenta.id){
            state.cuenta = cuenta
         }

      },

      push(state,cuenta){
         state.cuentas.push(cuenta)
      },

      put(state,cuenta_id){
         state.cuentas.splice(
            state.cuentas.findIndex(val => val.id === cuenta_id),
            1
         );
      }

   },

   actions:{

      getCuentas({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/cuentas/get/all`).then(({data}) => {
               commit.setCuentas(data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({commit},data){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/cuentas/fetch/data`,data).then(({data}) => {
               commit('setCuentas',data.cuentas)
               resolve(data)
            }).catch(e => reject(e))

         })

      },






   }
}