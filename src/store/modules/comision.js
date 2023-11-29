export default{
  namespaced:true,
  state(){
    return{
      comision:{
        id:null,
        rol_id:null,
        comision:0,
        rol:null,
      },
      comisiones:[]
    }
   
  },

  getters:{

    porcentajeLibre(state){
      return 100 - state.comisiones.reduce((acumulador,b) => acumulador + b.comision,0) 
    }

  },

  mutations:{
      clear(state){
         state.comision = {
            id:null,
            rol_id:null,
            comision:0,
            rol:null,
         }
      },


      setComisiones(state, comisiones) {
         state.comisiones = comisiones
      },

      setComision(state, comision) {
         state.comision = comision
      },


      capturar(state, comision_id) {
         
         const comision = state.comisiones.find(val => val.id === comision_id)

         if(comision){
            state.comision = comision
         }
      },

      push(state, comision) {
         state.comisiones.push(comision)
      },

      put(state, comision_id) {

         state.comisiones.splice(
            state.comisiones.findIndex(val => val.id === comision_id),
            1
         )
      },


      update(state, comision) {

         let i = state.comisiones.findIndex(val => val.id === comision.id)


         if (i != -1) {
            state.comisiones[i] = comision
         }

          if (state.comision == comision.id) {
              state.comision = comision
          }

      }
  },

  actions:{
     getComisiones({ commit }) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/comisions/get/all`).then(({ data }) => {

               commit('setComisiones', data)
               resolve(data)

            }).catch(e => reject(e))
         })
      },


      fetchData({ commit }, data) {

         return new Promise((resolve, reject) => {

            axios.post('/api/comisions/fetch/data', data).then(({ data: datos }) => {

               commit('setComisiones', datos.comisiones)
               resolve(datos)
            }).catch(e => reject(e))

         })
      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/comisions/${datos.id}`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('update', data.comision)
                  }

                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/comisions`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.comision)
                  }

                  resolve(data)

               }).catch(e => reject(e))
            }
         })


      },


      eliminar({ commit }, comision_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/comisions/${comision_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', comision_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


      fetch({ commit }, comision_id) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/comisions/${comision_id}/fetch/data`).then(({ data }) => {
               commit('setComision', data)
               resolve(data)
            }).catch(e => reject(e))
         })
      }
   }
  
}
