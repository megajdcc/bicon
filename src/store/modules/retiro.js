export default {
  
  namespaced:true,

  state(){
   return {
       retiro:{
         id         : null,
         usuario_id : null,
         usuario    : null,
         monto      : 0,
         status     : 1,
         nota       : '',
         comprobante: null,
         divisa_id:null,
         divisa:null
      },

      retiros:[],
      }  
   },

  getters:{
    draft(state){
      return clone(state.retiro)
    }
  },

  mutations:{

      clear(state){
        state.retiro = {
            id         : null,
            usuario_id : null,
            usuario    : null,
            monto      : 0,
            status     : 1,
            nota       : '',
            comprobante: null,
            divisa_id:null,
            divisa:null
        }
      },

      setRetiro(state,retiro){
         state.retiro = retiro
      },

      update(state,retiro){
         const i = state.retiros.findIndex(val => val.id === retiro.id)

         if(i !=-1){
            state.retiros[i] = retiro
         }

         if(state.retiro.id === retiro.id){
            state.retiro = retiro
         }
      },

      push(state,retiro){
         state.retiros.push(retiro)

      },

      put(state,retiro_id){
         state.retiros.splice(
            state.retiros.findIndex(val => val.id === retiro_id),
            1
         )
      },

      capturar(state,retiro_id){
         const retiro  = state.retiros.find(val => val.id === retiro_id)

         if(retiro != undefined){
            state.retiro = retiro
         }
      },

      setRetiros(state,retiros){
         state.retiros = retiros
      },

  },

  actions:{
      
      getRetiros({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/retiros/get/all').then(({data}) => {
               commit('setRetiros',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/retiros/fetch/data`,datos).then(({data}) => {

               commit('setRetiros',data.retiros)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({state,commit},retiro_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/retiros/${retiro_id}/fetch/data`).then(({data}) => {
               commit('setRetiro',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({commit},datos){

        let formData = new FormData();

        Object.keys(datos).forEach(val => {
          formData.append(val,datos[val]);
        })
        
        let headers = {
          headers:{
            ContentType:'multipart/form-data;'
          }
        }

         return new Promise((resolve, reject) => {
            if (datos.id) {
              formData.append('_method','PUT');

               axios.post(`/api/retiros/${datos.id}`,formData,headers).then(({data}) => {
                  
                  if(data.result){
                     commit('update',data.retiro)
                  }
                  
                  resolve(data)

               }).catch(e => reject(e))

            }else{

               axios.post(`/api/retiros`,formData,headers).then(({data}) => {
                  if(data.result){
                     commit('push',data.retiro)
                  }
                  resolve(data)
               }).catch(e => reject(e))

            }

         })
       
      },

      eliminar({ commit }, retiro_id) {
         return new Promise((resolve, reject) => {

            axios.delete(`/api/retiros/${retiro_id}`).then(({ data }) => {
               resolve(data)
            }).catch(e => reject(e))

         })

      },
     
  }


}