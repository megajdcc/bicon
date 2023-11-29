export default {
   namespaced: true,


   state() {
      return {
         forma: {
            id: null,
            nombre: '',
            negocios: []
         },
         formas: []
      }



   },


   getters: {
      draft(state) {
         return clone(state.forma)
      }
   },


   mutations: {

      clear(state) {
         state.forma = {
            id: null,
            nombre: '',
            negocios: []
         }
      },


      setFormas(state, formas) {
         state.formas = formas
      },

      setForma(state, forma) {
         state.forma = forma
      },


      capturar(state, forma_id) {

         const forma = state.formas.find(val => val.id === forma_id)

         if (forma) {
            state.forma = forma
         }
      },

      push(state, forma) {
         state.formas.push(forma)
      },

      put(state, forma_id) {

         state.formas.splice(
            state.formas.findIndex(val => val.id === forma_id),
            1
         )
      },


      update(state, forma) {

         let i = state.formas.findIndex(val => val.id === forma.id)

         if (i != -1) {
            state.formas[i] = forma
         }

         if (state.forma == forma.id) {
            state.forma = forma
         }

      }
   },

   actions: {

      getFormas({ commit }) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/formas-pago/get/all`).then(({ data }) => {

               commit('setFormas', data)
               resolve(data)

            }).catch(e => reject(e)
            )
         })
      },


      fetchData({ commit }, data) {

         return new Promise((resolve, reject) => {

            axios.post('/api/formas-pago/fetch/data', data).then(({ data: datos }) => {

               commit('setFormas', datos.formas)
               resolve(datos)
            }).catch(e => reject(e))

         })
      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/formas-pago/${datos.id}`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('update', data.forma)
                  }

                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/formas-pago`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.forma)
                  }

                  resolve(data)

               }).catch(e => reject(e))
            }
         })


      },


      eliminar({ commit }, forma_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/formas-pago/${forma_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', forma_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


      fetch({ commit }, forma_id) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/formas-pago/${forma_id}/fetch/data`).then(({ data }) => {
               commit('setForma', data)
               resolve(data)
            }).catch(e => reject(e))
         })
      }
   }

}
