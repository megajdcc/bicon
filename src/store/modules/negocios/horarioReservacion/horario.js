export default{
  namespaced:true,

  state:() => ({

    horario:{
      id:null,
      negocio_id:null,
      dia:0,
      hora:null,
      condicion:1,
      negocio:null,
      mesas:[],
      lugares:0,
      floor_plan:false,
    },

    horarios:[]
  }),


  getters:{
    draft(state){
      return clone(state.horario)
    }
  },


  mutations:{
    clear(state) {
      state.horario = {
        id: null,
        negocio_id: null,
        dia: 0,
        hora: null,
        condicion: 1,
        negocio: null,
        mesas: [],
        lugares: 0,
        floor_plan: false,
      }
    },


    setHorario(state, horario) {
      state.horario = horario
    },

    update(state, horario) {
      const i = state.horarios.findIndex(val => val.id === horario.id)

      if (i != -1) {
        state.horarios[i] = horario
      }

      if (state.horario.id === horario.id) {
        state.horario = horario
      }
    },

    push(state, horario) {
      state.horarios.push(horario)

    },

    put(state, horario_id) {
      state.horarios.splice(
        state.horarios.findIndex(val => val.id === horario_id),
        1
      )
    },

    capturar(state, horario_id) {
      const horario = state.horarios.find(val => val.id === horario_id)

      if (horario != undefined) {
        state.horario = horario
      }
    },

    setHorarios(state, horarios) {
      state.horarios = horarios
    }
  },


  actions:{

    
    getHorarios({ commit }) {

      return new Promise((resolve, reject) => {
        axios.get('/api/horarios/get/all').then(({ data }) => {
          commit('setHorarios', data)
          resolve(data)
        }).catch(e => reject(e))

      })
      
    },

    getHorariosNegocio({commit},negocio_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/horario-reservacion/negocio/${negocio_id}/get/all`).then(({ data }) => {
          commit('setHorarios', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },


    fetchData({ state, commit }, datos) {

      return new Promise((resolve, reject) => {
        axios.post(`/api/horarios/fetch/data`, datos).then(({ data }) => {

          commit('setHorarios', data.horarios)

          resolve(data)
        }).catch(e => reject(e))

      })

    },

    fetch({ state, commit }, horario_id) {

      return new Promise((resolve, reject) => {
        axios.get(`/api/horarios/${horario_id}/fetch/data`).then(({ data }) => {
          commit('setHorario', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    guardar({ commit }, datos) {

      return new Promise((resolve, reject) => {
        if (datos.id) {

          axios.put(`/api/horario-reservacion/${datos.id}`, datos).then(({ data }) => {
            if (data.result) {
              commit('update', data.horario)
            }
            resolve(data)
          }).catch(e => reject(e))

        } else {

          axios.post(`/api/horario-reservacion`, datos).then(({ data }) => {
            if (data.result) {
              commit('push', data.horario)
            }

            resolve(data)

          }).catch(e => reject(e))

        }
      })

    },

    eliminar({ commit }, horario_id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/horario-reservacion/${horario_id}`).then(({ data }) => {

          if(data.result){
            commit('setHorarios',data.horarios)
          }

          resolve(data)

        }).catch(e => reject(e))

      })

    },

    agregarHorario({commit},datos){

      return new Promise((resolve, reject) => {
        
        axios.post('/api/horarios/asignar/horario',datos).then(({data}) => {

          if(data.result){
            commit('setHorarios',data.horarios)
          }
          resolve(data)
        }).catch(e => reject(e))

      })
    }
  }

}