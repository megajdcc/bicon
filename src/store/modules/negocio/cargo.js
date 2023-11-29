
export default{

   namespaced:true,

   state:() => ({

      cargo:{
         id:null,
         cargo:'',
         negocio_id:null,
         negocio:null,
         permisos:[]
      },

      cargos:[]
   }),

   getters:{

      draft(state){
         return clone(state.cargo)
      },

   },


   mutations:{
      clear(state) {
         state.cargo = {
            id: null,
            cargo: '',
            negocio_id: null,
            negocio: null,
            permisos: []
         }
      },


      setCargos(state, cargos) {
         state.cargos = cargos
      },

      setCargo(state, cargo) {
         state.cargo = cargo
      },


      capturar(state, cargo_id) {

         const cargo =  state.cargos.find(val => val.id === cargo_id)

         if(cargo){
            state.cargo = cargo
         }
      },

      push(state, cargo) {
         state.cargos.push(cargo)
      },
      put(state, cargo_id) {

         state.cargos.splice(
            state.cargos.findIndex(val => val.id === cargo_id),
            1
         )
      },


      update(state, cargo) {

         let i = state.cargos.findIndex(val => val.id === cargo.id)


         if (i != -1) {
            state.cargos[i] = cargo

            if (state.cargo == cargo.id) {
               state.cargo = cargo
            }
         }
      }


   },

   actions:{
      
      getCargos({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/cargos/get/all`).then(({ data }) => {

               commit('setCargos', data)
               resolve(data)

            }).catch(e => reject(e)
            )
         })
      },


      fetchData({ commit }, datos) {

         return new Promise((resolve, reject) => {

 

            axios.post('/api/cargos/fetch/data', datos).then(({ data }) => {
               
               commit('setCargos', data.cargos)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetch({commit},cargo_id){
         return new Promise((resolve, reject) => {
            axios.get(`/api/cargos/${cargo_id}/fetch/data`).then(({data}) => {
               
               if(data.id){
                  commit('setCargo',data)
               }
               resolve(data)

            }).catch(e => reject(e))


         })
      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/cargos/${datos.id}`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('update', data.cargo)
                  }

                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/cargos`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.cargo)
                  }

                  resolve(data)

               }).catch(e => reject(e))
            }
         })


      },


      eliminar({ commit }, cargo_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/cargos/${cargo_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', cargo_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


      fetch({ commit }, cargo_id) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/cargos/${cargo_id}/fetch/data`).then(({ data }) => {
               commit('setCargo', data)
               resolve(data)
            }).catch(e => reject(e))
         })
      }
   }


}
