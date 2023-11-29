export default {

  namespaced:true,

  state(){
    return {
      grupo:{
        id:null,
        nombre:'',
        color:'',
        nivels:[]
      },

      grupos:[]
    }
  },


  getters:{
    draft(state){
      return clone(state.grupo)
    }
  },


  mutations:{
    
    clear(state){
      state.grupo = {
        id:null,
        nombre:'',
        color:'',
        nivels:[]
      }
    },

    setGrupo(state,grupo){
      if(grupo != undefined){
        state.grupo = grupo
      }
    },


    update(state,grupo){

      if(state.grupo.id == grupo.id){
        state.grupo = grupo
      }

      if(state.grupos.length){
        let i  = state.grupos.findIndex(
          (v) => v.id == grupo.id
        );


        if(i != -1){
          state.grupos[i] = grupo
        }
      }
    },

    setGrupos(state,grupos){
      state.grupos = grupos
    }


  },


  actions:{

    fetch({commit},grupo_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/grupo-nivels/${grupo_id}/get/fetch-data`).then(({data}) => {

          commit('setGrupo',data)
          resolve(data)

        }).catch( e => reject(e))
      })
    },


    fetchData({commit},filtro){

      return new Promise((resolve, reject) => {
        axios.post(`/api/grupo-nivels/fetch-data`,filtro).then(({data}) => resolve(data)).catch(e => reject(e))
      })

    },

    guardar({commit},datos){


      return new Promise((resolve, reject) => {
        
        if(datos.id){

          axios.put(`/api/grupo-nivels/${datos.id}`,datos).then(({data}) => {

            if(data.result){
              commit('update',data.grupo)
            }

            resolve(data)
          }).catch(e => reject(e))


        }else{
          
          axios.post(`/api/grupo-nivels`,datos).then(({data}) => {
            if(data.result){
              commit('setGrupo',data.grupo)
            }

            resolve(data)
          }).catch(e => reject(e))

        }
      })
    },


    eliminar({commit},grupo_id){


      return new Promise((resolve, reject) => {
        axios.delete(`/api/grupo-nivels/${grupo_id}`).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    getAll({commit}){

      return new Promise((resolve, reject) => {

        axios.get(`/api/grupo-nivels/get/all`).then(({data}) => {
          commit('setGrupos',data);
          resolve(data)
        }).catch(e => reject(e))


      })
    }

  }

}