export default {
   namespaced: true,
   state() {
      return {
         solicitud: {
            id:null,
            nombre:'',
            descripcion:'',
            breve:'',
            solicitud_id:'',
            comision:0,
            tipo_comision:1,// 1 => Porcentaje, 2 => Monto fijo por persona 
            url:null,
            email:null,
            telefono:null,
            sitio_web:'',
            direccion:'',
            codigo_postal:'',
            ciudad_id:null,
            estado_id:null,
             lat:20.68,
            lng:-105.21,
            logo:null,
            foto:null,
            situacion:1,// 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
            comentario:'',
            usuario_id:null,

            solicitud:null,
            ciudad:null,
            estado:null,
            usuario:{
               nombre:'',
               apellido:'',
               email:'',
               username:'',
               password:'',
               r_password:''
            },

            divisa_id:null,
            divisa:null,
            iata_id:null,
            iata:null

         },
         solicitudes: [],

      }

   },

   getters: {

      draft(state) {
         return clone(state.solicitud)
      }

   },

   mutations: {

      setSolicitudes(state, data) {

         if(data.length){
            state.solicitudes = data
         }
      },


      clear(state) {
         state.solicitud = {
            id: null,
            nombre: '',
            descripcion: '',
            breve: '',
            solicitud_id: '',
            comision: 0,
            tipo_comision: 1,// 1 => Porcentaje, 2 => Monto fijo por persona 
            url: null,
            email: null,
            telefono: null,
            sitio_web: '',
            direccion: '',
            codigo_postal: '',
            ciudad_id: null,
            estado_id: null,
            lat:20.68,
            lng:-105.21,
            logo: null,
            foto: null,
            situacion: 1,// 1 => solicitud enviada, 2 => solicitud regresada para mejorar 3 => solicitd aceptada 4 => solicitud rechazada
            comentario: '',
            usuario_id: null,

            solicitud: null,
            ciudad: null,
            estado: null,
             usuario:{
                nombre:'',
               apellido:'',
               email:'',
               username:'',
               password:'',
               r_password:''
            },
            divisa_id: null,
            divisa: null,

            iata_id: null,
            iata: null
            
            
         }
      },


      push(state, data) {
         
         if(data){
            
            if(typeof state.solicitudes === 'object'){
                state.solicitudes.push(data)
            }else{
               state.solicitudes = [data]
            }
           
         }

         
      },

      put(state, data_id) {
         state.solicitudes.splice(
            state.solicitudes.findIndex(val => val.id === data_id),
            1
         )
      },

      capturar(state, data_id) {
         let solicitud = state.solicitudes.find(val => val.id === data_id)

         if (solicitud) {
            state.solicitud = solicitud
         }
      },

      update(state, data) {
         let i = state.solicitudes.findIndex(val => val.id === data.id)

         if (i != -1) {
            state.solicitudes[i] = data

            if (state.solicitud.id === data.id) {
               state.solicitud = data
            }

         }

      }

   },

   actions: {

      fetchData({ commit }, data) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.post(`/api/negocio/solicituds/fetch/data`, data).then(({ data: datos }) => {

               resolve(datos)
               commit('setSolicitudes', datos.solicitudes)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))
         })
      },


      fetchDataAdmin({commit},filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/negocio/solicituds/fetch/data/admin`,filtro).then(({data}) => {
               commit('setSolicitudes',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },


      guardar({ commit }, data) {


         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            let formData = new FormData();

            Object.keys(data).forEach(val => {
               formData.append(val, data[val]);
            })

            if (data.id) {
               formData.append("_method", 'put')

               axios.post(`/api/negocio/solicituds/${data.id}`, formData, {
                  headers: {
                     ContentType: "multipart/form-data; boundary=something",
                  }
               }).then(({ data: datos }) => {

                  if (datos.result) {
                     commit('update', datos.solicitud)
                  }

                  resolve(datos)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            } else {
               
               axios.post(`/api/negocio/solicituds`, formData, {
                  headers: {
                     ContentType: "multipart/form-data; boundary=something",
                  }
               }).then(({ data: datos }) => {

                  if (datos.result) {
                     commit('push', datos.solicitud)
                  }

                  resolve(datos)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            }

         })
      },


      eliminar({ commit }, data_id) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/negocio/solicituds/${data_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', data_id)
               }

               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })

      },

      async getsolicitud({ commit }, data_id) {
         return await new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/negocio/solicituds/${data_id}/get`).then(({ data }) => {

               commit('push', data)
               resolve(data)

            }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })
               })
         })

      },

      getSolicitudes({commit}){
         return new Promise((resolve,reject) => {

            axios.get('/api/negocio/solicituds/get/all').then(({data}) => {

               commit('setSolicitudes',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      solicitudesNoaceptadas(){
         return new Promise((resolve, reject) => {
            axios.get(`/api/negocio/solicituds/sinaceptar`).then(({data}) => resolve(data)).catch(e => reject(e))
         })
      },



      getMisSolicitudes({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/negocio/mis-solicitudes`).then(({data}) => {

               commit('setSolicitudes',data)
               resolve(data)
            
            }).catch(e => reject(e))

         })
      }

   }
}