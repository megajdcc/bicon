export default{
   namespaced:true,

   state:() => ({

      cupon:{
         id:null,
         nombre:'',
         descripcion:'',
         condiciones:'',
         restricciones:'',
         imagen:null,
         expide:null,
         vence:null,
         disponibles:0,
         precio:0,
         divisa_id:null,
         negocio_id:null,
         negocio:null,
         divisa:null,
      },

      cupones:[]
   }),

   getters:{
      draft(state){
         return clone(state.cupon)
      }
   },

   mutations:{
      clear(state) {
         state.cupon = {
            id: null,
            nombre: '',
            descripcion: '',
            condiciones: '',
            restricciones: '',
            imagen: null,
            expide: null,
            vence: null,
            disponibles: 0,
            precio: 0,
            divisa_id: null,
            negocio_id: null,
            negocio: null,
            divisa: null,
         }
      },


      setCupon(state, cupon) {
         state.cupon = cupon
      },

      update(state, cupon) {
         const i = state.cupones.findIndex(val => val.id === cupon.id)

         if (i != -1) {
            state.cupones[i] = cupon
         }

         if (state.cupon.id === cupon.id) {
            state.cupon = cupon
         }
      },

      push(state, cupon) {
         state.cupones.push(cupon)

      },

      put(state, cupon_id) {
         state.cupones.splice(
            state.cupones.findIndex(val => val.id === cupon_id),
            1
         )
      },

      capturar(state, cupon_id) {
         const cupon = state.cupones.find(val => val.id === cupon_id)

         if (cupon != undefined) {
            state.cupon = cupon
         }
      },

      setCupones(state, cupones) {
         state.cupones = cupones
      }
   },


   actions:{
      getCupons({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get('/api/cupons/get/all').then(({ data }) => {
               commit('setCupones', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({ state, commit }, datos) {

         return new Promise((resolve, reject) => {
            axios.post(`/api/cupons/fetch/data`, datos).then(({ data }) => {

               commit('setCupones', data.cupones)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({ state, commit }, cupon_id) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/cupons/${cupon_id}/fetch/data`).then(({ data }) => {
               commit('setCupon', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({ commit }, datos) {  

         const formData = new FormData()
         Object.keys(datos).forEach(val => {
            formData.append(val,datos[val])
         })


         return new Promise((resolve, reject) => {
            if (datos.id) {

               formData.append('_method','put')

               axios.post(`/api/cupons/${datos.id}`, formData,{
                  headers:{
                     ContentType:'multipart/form-data'
                  }
               }).then(({ data }) => {
                  if (data.result) {
                     commit('update', data.cupon)

                  }
                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/cupons`, formData,{
                  headers:{
                     ContentType:'multipart/form-data'
                  }
               }).then(({ data }) => {
                  if (data.result) {
                     commit('push', data.cupon)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })

      },

      eliminar({ commit }, cupon_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/cupons/${cupon_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      reservar({commit},datos){
         return new Promise((resolve, reject) => {
            axios.post(`/api/cupons/reservar`,datos).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      reservarCupon({commit},datos){
         return new Promise((resolve, reject) => {
            axios.get(`/api/cupons/${datos.cupon}/reservar/usuario/${datos.usuario}`).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      fetchDataReservas({commit},datos) {
         return new Promise((resolve, reject) => {
            axios.post('/api/cupons/reservas/fetch-data',datos).then(({data}) => resolve(data))
            .catch(e => reject(e));
         })
      },

      reservaCancelar({commit},{cupon,usuario}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/cupons/reservas/${cupon}/cancelar/usuario/${usuario}`).then(({data}) => resolve(data)).catch(e => reject(e))
         })
      },

      fetchDataPublic({commit},datos){
         return new Promise((resolve,reject) => {
            axios.post(`/api/cupons/fetch-data/public`,datos).then(({data}) => {
               resolve(data)
            }).catch( e => reject(e))
         })
      },
    


   }

}