export default{
   namespaced:true,
   state:() =>({
      ciudad:{
         id:null,
         ciudad:'',
         estado_id:null,
         estado:null
      },


      ciudades:[]

   }),


   getters:{

      draft(state){
         return clone(state.ciudad)
      }
   },


   mutations:{

      clear(state){
         state.ciudad = {
            id: null,
            ciudad: '',
            estado_id: null,
            estado: null
         }
      },


      setCiudad(state,ciudad){

         if(ciudad){
            state.ciudad = ciudad
         }
        
      },

      capturar(state,ciudad_id){

         const ciudad = state.ciudades.find(val => val.id === ciudad_id)
         if(ciudad != undefined){
            state.ciudad = ciudad
         }

      },

      update(state,data){

         if(data){
            let i = state.ciudades.findIndex(val => val.id === data.id)

            if(i != -1){
               state.ciudades[i] = data

               if(state.ciudad.id == data.id){
                  state.ciudad = data
               }

            }

         }

      },

      put(state,ciudad_id){

         state.ciudades.splice(
            state.ciudades.findIndex(val => val.id === ciudad_id),
            1
         )

      },

      push(state,ciudad){
         
         state.ciudades.push(ciudad)

      },

      setCiudades(state,ciudades){

         state.ciudades = ciudades
      }

   },

   actions:{

      getCiudades({commit}){


         axios.get(`/api/get/ciudades`).then(({data}) => {
            commit('setCiudades',data)
         }).catch(e =>console.log(e))

      },

      fetchData({commit},data){

       return  new Promise((resolve, reject) => {

               axios.post('/api/fetch/ciudades', data).then(({ data: datos }) => {

                  commit('setCiudades', datos.ciudades)

                  resolve(datos)
               }).catch(e => reject(e))


            })
       
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
               if(datos.id){

                  axios.put(`/api/ciudads/${datos.id}`,datos).then(({data}) => {

                     if(data.result){
                        commit('update',data.ciudad)
                     }

                     resolve(data)

                  }).catch(e => reject(e))

               }else{

                  axios.post(`/api/ciudads`,datos).then(({data}) => {

                     if (data.result) {
                        commit('push', data.ciudad)
                     }
                     resolve(data)

                  }).catch(e => reject(e))
               }

         })

      },


      eliminar({commit},ciudad_id){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/ciudads/${ciudad_id}`).then(({data}) => {

               if(data.result){
                  commit('put',ciudad_id)
               }
               resolve(data)
            }).catch(e => reject(e))


         })
      },


      fetchCiudad({commit},ciudad_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/fetch/ciudad/${ciudad_id}`).then(({data}) => {

               commit('setCiudad',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      }

   }

}
