export default{

  namespaced:true,

  state:() => ({
    
    sucursal:{
      id:null,
      ciudad_id:null,
      estado_id:null,
      direccion:'',
      lat:null,
      lng:null,
      iata_id:null,
      model_id:null,
      model_type:null,

      ciudad:null,
      estado:null,
      model:null,
      iata:null,
      telefonos:[],
    },
    sucursales:[]
  }),

  getters:{
    draft(state) {
      return clone(state.sucursal)
    }
  },

  mutations:{
     clear(state){
         state.sucursal = {
            id:null,
            ciudad_id:null,
            estado_id:null,
            direccion:'',
            lat:null,
            lng:null,
            iata_id:null,
            model_id:null,
            model_type:null,

            ciudad:null,
            estado:null,
            model:null,
            iata:null,
            telefonos:[],

         }
      },


      setSucursal(state,sucursal){
         state.sucursal = sucursal
      },

      update(state,sucursal){
         const i = state.sucursales.findIndex(val => val.id === sucursal.id)

         if(i !=-1){
            state.sucursales[i] = sucursal
         }

         if(state.sucursal.id === sucursal.id){
            state.sucursal = sucursal
         }
      },

      push(state,sucursal){
         state.sucursales.push(sucursal)

      },

      put(state,sucursal_id){
         state.sucursales.splice(
            state.sucursales.findIndex(val => val.id === sucursal_id),
            1
         )
      },

      capturar(state,sucursal_id){
         const sucursal  = state.sucursales.find(val => val.id === sucursal_id)

         if(sucursal != undefined){
            state.sucursal = sucursal
         }
      },

      setSucursales(state,sucursales){
         state.sucursales = sucursales
      },

      agregarTelefono(state){
         state.sucursal.telefonos.push({
            telefono : null,
            is_whatsapp:false,
            principal:false
         })
      },

      quitarTelefono(state,i){
         state.sucursal.telefonos.splice(i,1)
      }
  },

  actions:{
    
      getSucursales({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/sucursals/get/all').then(({data}) => {
               commit('setSucursales',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/sucursals/fetch/data`,datos).then(({data}) => {

               commit('setSucursales',data.sucursales)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({state,commit},sucursal_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/sucursals/${sucursal_id}/fetch/data`).then(({data}) => {
               commit('setSucursal',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            if (datos.id) {
               axios.put(`/api/sucursals/${datos.id}`,datos).then(({data}) => {
                  if(data.result){
                     commit('update',data.sucursal)

                  }
                  resolve(data)
               }).catch(e => reject(e))

            }else{

               axios.post(`/api/sucursals`,datos).then(({data}) => {
                  if(data.result){
                     commit('push',data.sucursal)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })
       
      },

      eliminar({ commit }, sucursal_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/sucursals/${sucursal_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },
      quitarTelefono({commit},telefono){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/telefonos/${telefono}`).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))
         })

      }
  }   

}