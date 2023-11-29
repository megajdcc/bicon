export default{
  namespaced:true,


  state(){
    return {
      invitacion:{
        id:null,
        email:'',
        mensaje:'',
        usuario_id:null,
        status:1, // 1 => enviado, 2 => aceptada
        usuario:null
      },

      invitaciones:[]
    }
  },

  getters:{

    draft(state){
      return state.invitacion
    }

  },

  mutations:{

    clear(state){
      state.invitacion = {
          id:null,
          email:'',
          mensaje:'',
          usuario_id:null,
          status:1, // 1 => enviado, 2 => aceptada
          usuario:null
      }
    },

    setInvitaciones:(state,data) => {
      state.invitaciones = data
    },

    setInvitacion:(state,invitacion) => {
      state.invitacion = invitacion
     } 



  },
  

  actions:{
    fetchData({commit},filtro){
      return new Promise((resolve, reject) => {
        axios.post(`/api/invitacions/fetch-data`,filtro).then(({data}) => {
          commit('setInvitaciones',data.invitaciones)
          resolve(data)
        }).catch( e => reject(e))
      })
    },

    guardar({commit},datos){

      return new Promise((resolve, reject) => {
        axios.post(`/api/invitacions`,datos).then(({data}) => {

          if(data.result){
            commit('setInvitacion',data.invitacion)
            
          }
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    recordarInvitacion({commit},invitacion_id){

      return new Promise((resolve, reject) => {
        axios.get(`/api/invitacions/${invitacion_id}/recordar`).then(({data}) => {
          resolve(data)
        }).catch( e => reject(e))
        

      })
    },

    fetch({commit},invitacion_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/invitacions/${invitacion_id}/fetch-data`).then(({data}) => {
          if(data){
            commit('setInvitacion',data)
          }
          resolve(data)
        }).catch(e => reject(e)) 

      })
    },

    eliminar({commit},inv_id){

      return new Promise((resolve, reject) => {
        axios.delete(`/api/invitacions/${inv_id}`).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))
      })
    },

    afiliarNegocio({commit},datos){
      return new Promise((resolve, reject) => {

        let formData = new FormData();
          Object.keys(datos).forEach(v => {
            
            if(v == 'foto' || v == 'logo'){
                formData.append(v,datos[v])
            }
          })
        axios.post(`/api/solicituds/afiliar-invitacion`,datos).then(({data}) => {
          if(data.result){
            
            formData.append('_method','PUT');
            axios.post(`/api/invitacion/assets/solicitud/${data.solicitud.id}`,formData,{
              headers:{
                'Content-Type':'multipart/form-data; boundary=something'
              }
            }).then(({data:d}) => {
              if(d.result){
                resolve(d)
              }
            }).catch(e => reject(e))
          }else{
            resolve(data)
          }
        }).catch(e => reject(e))


      })
    }

  }

}