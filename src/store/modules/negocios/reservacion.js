export default{

  namespaced:true,

  state:() => ({

    reservacion:{
      id:null,
      fecha:null,
      hora:null,
      personas:1,
      status:1,
      observacion:'',
      negocio_id:null,
      usuario_id:null,
      operador_id:null,
      negocio:null,
      usuario:null,
      operador:null,
    },

    reservaciones:[],

  }),


  getters:{

    draft(state) {
      return clone(state.reservacion)
    },

    lugaresOcupados:(state) => {
      return ({fecha,hora}) => {

        let ocupados = 0;

        state.reservaciones.filter(val => val.fecha === fecha && val.hora == hora)
        .forEach(val => {
          ocupados += val.personas;
        })

        return ocupados
      }
    }
  },


  mutations:{
    clear(state) {
      state.reservacion = {
         id:null,
        fecha:null,
        hora:null,
        personas:1,
        status:1,
        observacion:'',
        negocio_id:null,
        usuario_id:null,
        operador_id:null,
        negocio:null,
        usuario:null,
        operador:null,
      }
    },


    setReservacion(state, reservacion) {
      state.reservacion = reservacion
    },

    update(state, reservacion) {
      const i = state.reservaciones.findIndex(val => val.id === reservacion.id)

      if (i != -1) {
        state.reservaciones[i] = reservacion
      }

      if (state.reservacion.id === reservacion.id) {
        state.reservacion = reservacion
      }
    },

    push(state, reservacion) {
      if(typeof state.reservaciones == 'object'){
        state.reservaciones.push(reservacion)
      }else{
        state.reservaciones = [reservacion]
      }

    },

    put(state, reservacion_id) {
      state.reservaciones.splice(
        state.reservaciones.findIndex(val => val.id === reservacion_id),
        1
      )
    },

    capturar(state, reservacion_id) {
      const reservacion = state.reservaciones.find(val => val.id === reservacion_id)

      if (reservacion != undefined) {
        state.reservacion = reservacion
      }
    },

    setReservacions(state, reservacions) {
      state.reservaciones = reservacions
    }

  },

  actions:{


      getReservacionesNegocio({commit},negocio_id){
        return new Promise((resolve, reject) => {

          
          axios.get(`/api/reservacions/negocio/${negocio_id}/get/all`).then(({ data }) => {
            commit('setReservacions', data)
            resolve(data)
          }).catch(e => reject(e))


        })
      },

      getReservacions({commit}){
         return new Promise((resolve, reject) => {


             axios.get('/api/reservacions/get/all').then(({ data }) => {
               commit('setReservacions', data)
               resolve(data)
             }).catch(e => reject(e))
         

         })
      },
      
      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/reservacions/fetch/data`,datos).then(({data}) => {

              if(data.reservacions){
               commit('setReservacions',data.reservacions)
              }else if(data.reservaciones){
               commit('setReservacions',data.reservaciones)
              }

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({state,commit},reservacion_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/reservacions/${reservacion_id}/fetch/data`).then(({data}) => {
               commit('setReservacion',data)
               commit('push',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            if (datos.id) {
               axios.put(`/api/reservacions/${datos.id}`,datos).then(({data}) => {
                  if(data.result){
                     commit('update',data.reservacion)
                  }
                  resolve(data)
               }).catch(e => reject(e))

            }else{

               axios.post(`/api/reservacions`,datos).then(({data}) => {
                  if(data.result){
                    //  commit('push',data.reservacion)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })
       
      },

      eliminar({ commit }, reservacion_id) {

         return new Promise((resolve, reject) => {

            axios.delete(`/api/reservacions/${reservacion_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },

    consultarHoras({commit},{negocio,fecha}){
      return new Promise((resolve, reject) => {

        axios.put(`/api/negocios/${negocio}/consultar/horas`,{fecha:fecha}).then(({data}) => {

          resolve(data)

        }).catch(e => reject(e))
      })
    },

    cancelar({commit},reserva_id){
      
      return new Promise((resolve, reject) => {
        axios.get(`/api/reservacions/${reserva_id}/cancelar`).then(({data}) => resolve(data)).catch(e => reject(e))
      })
    },

    reservacionesUser({commit},datos){
      return new Promise((resolve, reject) => {
        axios.post(`/api/reservacions/fetch/data/user`, datos).then(({ data }) => {

          commit('setReservacions', data.reservacions)

          resolve(data)
        }).catch(e => reject(e))
      })
    },


      

  }

}