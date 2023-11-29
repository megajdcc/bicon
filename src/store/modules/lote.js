export default{
   namespaced:true,
   state:() =>({
      lote:{
         id            : null,
         fecha_llegada : '',
         cantidad      : 1,
         numero_inicial: '00001',
         numero_final: null,
         monto         : null,
         divisa_id     : null,
         codigo_lada:null,
         tps           : 5,
         divisa:null,
         usuario_id:null,
         usuario:null

      },


      lotes:[]

   }),


   getters:{

      draft(state){
         return clone(state.lote)
      }
   },


   mutations:{

      clear(state){
         state.lote = {
            id            : null,
         fecha_llegada : '',
         cantidad      : 1,
          numero_inicial: '00001',
         numero_final: null,
         codigo_lada:null,
         monto         : null,
         divisa_id     : null,
         tps           : 5,
         divisa:null,
         usuario_id:null,
         usuario:null
         }
      },


      setLote(state,lote){

         if(lote){
            state.lote = lote
         }
        
      },

      capturar(state,lote_id){

         const lote = state.lotes.find(val => val.id === lote_id)
         if(lote != undefined){
            state.lote = lote
         }

      },

      update(state,data){

         if(data){
            let i = state.lotes.findIndex(val => val.id === data.id)

            if(i != -1){
               state.lotes[i] = data
            }

            if(state.lote.id == data.id){
                state.lote = data
            }

         }

      },

      put(state,lote_id){

         state.lotes.splice(
            state.lotes.findIndex(val => val.id === lote_id),
            1
         )

      },

      push(state,lote){
         
         state.lotes.push(lote)

      },

      setLotes(state,lotes){

         state.lotes = lotes
      }





   },

   actions:{

      getLotes({commit}){
         axios.get(`/api/get/lotes`).then(({data}) => {
            commit('setLotes',data)
         }).catch(e =>console.log(e))
      },

      fetchData({commit},data){

       return  new Promise((resolve, reject) => {

               axios.post('/api/fetch/lotes', data).then(({ data: datos }) => {

                  commit('setLotes', datos.lotes)

                  resolve(datos)
               }).catch(e => reject(e))


            })
       
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
               if(datos.id){

                  axios.put(`/api/lotes/${datos.id}`,datos).then(({data}) => {

                     if(data.result){
                        commit('update',data.lote)
                        
                     }

                     resolve(data)


                  }).catch(e => reject(e))

               }else{

                  axios.post(`/api/lotes`,datos).then(({data}) => {

                     if (data.result) {
                        commit('push', data.lote)
                     }
                     resolve(data)

                  }).catch(e => reject(e))
               }

         })

      },


      eliminar({commit},lote_id){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/lotes/${lote_id}`).then(({data}) => {

               if(data.result){
                  commit('put',lote_id)
               }
               resolve(data)
            }).catch(e => reject(e))


         })
      },


      fetch({commit},lote_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/fetch/lote/${lote_id}`).then(({data}) => {

               commit('setLote',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      asociarLote({commit,state},form){
         return new Promise((resolve, reject) => {
            axios.put(`/api/lotes/${state.lote.id}/asociar/lote`,form).then(({data}) => {

               if(data.result){
                  commit('update',data.lote)
               }

               resolve(data)

            }).catch(e => reject(e))
            
         })
      }

   }

}
