export default{
   namespaced:true,
   state:() =>({
      pais:{
         id:null,
         codigo:'',
         lada:'',
         pais:''
      },

      paises:[]

   }),


   getters:{

      draft(state){
         return clone(state.pais)
      }
   },


   mutations:{

      clear(state){
         state.pais = {
            id: null,
            codigo: '',
            lada: '',
            pais: ''
         }
      },


      setPais(state,pais){

         if(pais){
            state.pais = pais
         }
        
      },

      capturar(state,pais_id){

         const pais = state.paises.find(val => val.id === pais_id)
         if(pais != undefined){
            state.pais = pais
         }

      },

      update(state,data){

         if(data){
            let i = state.paises.findIndex(val => val.id === data.id)

            if(i != -1){
               state.paises[i] = data

               if(state.pais.id == data.id){
                  state.pais = data
               }

            }

         }

      },

      put(state,pais_id){

         state.paises.splice(
            state.paises.findIndex(val => val.id === pais_id),
            1
         )

      },

      push(state,pais){
         
         state.paises.push(pais)

      },

      setPaises(state,paises){

         state.paises = paises
      }





   },

   actions:{

      getPaises({commit}){


         axios.get(`/api/get/paises`).then(({data}) => {
            commit('setPaises',data)
         }).catch(e =>console.log(e))

      },

      fetchData({commit},data){

       return  new Promise((resolve, reject) => {

               axios.post('/api/fetch/paises', data).then(({ data: datos }) => {

                  commit('setPaises', datos.paises)

                  resolve(datos)
               }).catch(e => reject(e))


            })
       
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
               if(datos.id){
                  axios.put(`/api/pais/${datos.id}`,datos).then(({data}) => {

                     if(data.result){
                        commit('update',data.pais)
                        
                     }

                     resolve(data)


                  }).catch(e => reject(e))

               }else{

                  axios.post(`/api/pais`,datos).then(({data}) => {

                     if (data.result) {
                        commit('push', data.pais)
                     }
                     resolve(data)

                  }).catch(e => reject(e))
               }

         })

      },


      eliminar({commit},pais_id){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/pais/${pais_id}`).then(({data}) => {

               if(data.result){
                  commit('put',pais_id)
               }
               resolve(data)
            }).catch(e => reject(e))


         })
      },


      fetchPais({commit},pais_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/fetch/pais/${pais_id}`).then(({data}) => {

               commit('setPais',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      }



   }




}
