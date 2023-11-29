export default{
   namespaced:true,
   state:() =>({
      tarjeta:{
        id      : null,
        lote_id: null,
        lote   : null,
        numero : '',
        aplicada:false,
        usuario:null,
        validada:false,
      },

      tarjetas:[]

   }),


   getters:{

      draft(state){
         return clone(state.tarjeta)
      }
   },


   mutations:{

      clear(state){
         state.tarjeta = {
          id        : null,
          lote_id   : null,
          lote      : null,
          numero    : '',
          aplicada  : false,
          usuario   : null,
          validada: false,


         }
      },


      setTarjeta(state,tarjeta){

         if(tarjeta){
            state.tarjeta = tarjeta
         }
        
      },

      capturar(state,tarjeta_id){

         const tarjeta = state.tarjetas.find(val => val.id === tarjeta_id)
         if(tarjeta != undefined){
            state.tarjeta = tarjeta
         }

      },

      update(state,data){

         if(data){
            let i = state.tarjetas.findIndex(val => val.id === data.id)

            if(i != -1){
               state.tarjetas[i] = data
            }

            if(state.tarjeta.id == data.id){
                state.tarjeta = data
            }

         }

      },

      put(state,tarjeta_id){

         state.tarjetas.splice(
            state.tarjetas.findIndex(val => val.id === tarjeta_id),
            1
         )

      },

      push(state,tarjeta){
         
         state.tarjetas.push(tarjeta)

      },

      setTarjetas(state,tarjetas){

         state.tarjetas = tarjetas
      }





   },

   actions:{

      getTarjetas({commit}){
         axios.get(`/api/get/tarjetas`).then(({data}) => {
            commit('setTarjetas',data)
         }).catch(e =>console.log(e))
      },

      fetchData({commit},data){

       return  new Promise((resolve, reject) => {

               axios.post('/api/fetch/tarjetas', data).then(({ data: datos }) => {

                  commit('setTarjetas', datos.tarjetas)

                  resolve(datos)
               }).catch(e => reject(e))


            })
       
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
               if(datos.id){

                  axios.put(`/api/tarjetas/${datos.id}`,datos).then(({data}) => {

                     if(data.result){
                        commit('update',data.tarjeta)
                        
                     }

                     resolve(data)


                  }).catch(e => reject(e))

               }else{

                  axios.post(`/api/tarjetas`,datos).then(({data}) => {

                     if (data.result) {
                        commit('push', data.tarjeta)
                     }
                     resolve(data)

                  }).catch(e => reject(e))
               }

         })

      },


      eliminar({commit},tarjeta_id){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/tarjetas/${tarjeta_id}`).then(({data}) => {

               if(data.result){
                  commit('put',tarjeta_id)
               }
               resolve(data)
            }).catch(e => reject(e))


         })
      },


      fetch({commit},tarjeta_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/fetch/tarjeta/${tarjeta_id}`).then(({data}) => {

               commit('setTarjeta',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      toggleValidacion({commit},tarjeta_id){
         return new Promise((resolve, reject) => {
            axios.get(`/api/tarjetas/${tarjeta_id}/toggle-validation`).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))
         })
      }

   }

}
