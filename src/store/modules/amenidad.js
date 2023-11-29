export default{
   namespaced:true,


   state(){
      return {
         amenidad: {
            id: null,
            nombre: '',
            negocios: []
         },
         amenidades: []
      }
     

      
   },


   getters:{
      draft(state){
         return clone(state.amenidad)
      }
   },


   mutations:{

      clear(state){
         state.amenidad = {
            id: null,
            nombre: '',
            negocios: []
         }
      },


      setAmenidades(state, amenidades) {
         state.amenidades = amenidades
      },

      setAmenidad(state, amenidad) {
         state.amenidad = amenidad
      },


      capturar(state, amenidad_id) {
         
         const amenidad = state.amenidades.find(val => val.id === amenidad_id)

         if(amenidad){
            state.amenidad = amenidad
         }
      },

      push(state, amenidad) {
         state.amenidades.push(amenidad)
      },

      put(state, amenidad_id) {

         state.amenidades.splice(
            state.amenidades.findIndex(val => val.id === amenidad_id),
            1
         )
      },


      update(state, amenidad) {

         let i = state.amenidades.findIndex(val => val.id === amenidad.id)


         if (i != -1) {
            state.amenidades[i] = amenidad

            if (state.amenidad == amenidad.id) {
               state.amenidad = amenidad
            }
         }
      }
   },
   
   actions:{

      getAmenidades({ commit }) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/amenidads/get/all`).then(({ data }) => {

               commit('setAmenidades', data)
               resolve(data)

            }).catch(e => reject(e)
            )
         })
      },


      fetchData({ commit }, data) {

         return new Promise((resolve, reject) => {

            axios.post('/api/amenidads/fetch/data', data).then(({ data: datos }) => {

               commit('setAmenidades', datos.amenidades)
               resolve(datos)
            }).catch(e => reject(e))

         })
      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/amenidads/${datos.id}`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('update', data.amenidad)
                  }

                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/amenidads`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.amenidad)
                  }

                  resolve(data)

               }).catch(e => reject(e))
            }
         })


      },


      eliminar({ commit }, amenidad_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/amenidads/${amenidad_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', amenidad_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


      fetch({ commit }, amenidad_id) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/amenidads/${amenidad_id}/fetch/data`).then(({ data }) => {
               commit('setAmenidad', data)
               resolve(data)
            }).catch(e => reject(e))
         })
      }
   }

}
