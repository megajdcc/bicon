export default{
   namespaced:true,
   state:() =>({
      estado:{
         id:null,
         estado:'',
         pais_id:null,
         pais:null
      },


      estados:[]

   }),


   getters:{

      draft(state){
         return clone(state.estado)
      }
   },


   mutations:{

      clear(state){
         state.estado = {
            id: null,
            estado: '',
            pais_id: null,
            pais: null
         }
      },


      setEstado(state,estado){

         if(estado){
            state.estado = estado
         }
        
      },

      capturar(state,estado_id){

         const estado = state.estados.find(val => val.id === estado_id)
         if(estado != undefined){
            state.estado = estado
         }

      },

      update(state,data){

         if(data){
            let i = state.estados.findIndex(val => val.id === data.id)

            if(i != -1){
               state.estados[i] = data

               if(state.estado.id == data.id){
                  state.estado = data
               }

            }

         }

      },

      put(state,estado_id){

         state.estados.splice(
            state.estados.findIndex(val => val.id === estado_id),
            1
         )

      },

      push(state,estado){
         
         state.estados.push(estado)

      },

      setEstados(state,estados){

         state.estados = estados
      }





   },

   actions:{

      getEstados({commit}){


         axios.get(`/api/get/estados`).then(({data}) => {
            commit('setEstados',data)
         }).catch(e =>console.log(e))

      },

      fetchData({commit},data){

       return  new Promise((resolve, reject) => {

               axios.post('/api/fetch/estados', data).then(({ data: datos }) => {

                  commit('setEstados', datos.estados)

                  resolve(datos)
               }).catch(e => reject(e))


            })
       
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
               if(datos.id){

                  axios.put(`/api/estados/${datos.id}`,datos).then(({data}) => {

                     if(data.result){
                        commit('update',data.estado)
                        
                     }

                     resolve(data)


                  }).catch(e => reject(e))

               }else{

                  axios.post(`/api/estados`,datos).then(({data}) => {

                     if (data.result) {
                        commit('push', data.estado)
                     }
                     resolve(data)

                  }).catch(e => reject(e))
               }

         })

      },


      eliminar({commit},estado_id){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/estados/${estado_id}`).then(({data}) => {

               if(data.result){
                  commit('put',estado_id)
               }
               resolve(data)
            }).catch(e => reject(e))


         })
      },


      fetchEstado({commit},estado_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/fetch/estado/${estado_id}`).then(({data}) => {

               commit('setEstado',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      }

   }

}
