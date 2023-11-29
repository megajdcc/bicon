export default {

  namespaced:true,

  state(){
    return {
      nivel:{
        id:null,
        nombre:'',
        descripcion:'',
        grupo_id:null,
        grupo:null,
        insignia:null,
        baja_nivel:false,
        nivel_inicial:false,
        nivel_anterior_id:null,
        nivel_anterior:null,
        nivel_siguiente:null,
        condicion_bajar_nivel:{
          tiempo:1,
          tipo_tiempo:1, // 1 ano , 2 meses , 3 dias
        },

        activacion:{
          tipo_registro:1, // 1 consumos, 2 por Monto sumado, 3 por iata del mismo pais ,4 nivel inicial, 5 por paises 
          negocios_diferente:false,
          valor_registro:1,
          cantidad_negocios:1

        },
      },

      nivels:[]
    }
  },


  getters:{
    draft(state){
      return clone(state.nivel)
    }
  },


  mutations:{
    
    clear(state){
      state.nivel = {
        id:null,
        id:null,
        nombre:'',
        descripcion:'',
        grupo_id:null,
        grupo:null,
        insignia:null,
        baja_nivel:false,
        nivel_inicial:false,
        nivel_anterior_id:null,
        nivel_anterior:null,
        nivel_siguiente:null,
        condicion_bajar_nivel:{
          tiempo:1,
          tipo_tiempo:1, // 1 ano , 2 meses , 3 dias
        },

        activacion:{
          tipo_registro:1, // 1 consumos, 2 por Monto sumado, 3 por iata del mismo pais ,4 nivel inicial , 5 por paises 
          negocios_diferente:false,
          valor_registro:1,
          cantidad_negocios:1
        },
      }
    },

    setNivel(state,nivel){
      if(nivel != undefined){
        state.nivel = nivel
      }
    },


    update(state,nivel){

      if(state.nivel.id == nivel.id){
        state.nivel = nivel
      }

      if(state.nivels.length){
        let i  = state.nivels.findIndex(
          (v) => v.id == nivel.id
        );


        if(i != -1){
          state.nivels[i] = nivel
        }
      }
    },


    limpiarValorRegistro(state){
      state.nivel.activacion.valor_registro = 1;
    }


  },


  actions:{

    fetch({commit},nivel_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/nivels/${nivel_id}/get/fetch-data`).then(({data}) => {

          commit('setNivel',data)
          resolve(data)

        }).catch( e => reject(e))
      })
    },


    fetchData({commit},filtro){

      return new Promise((resolve, reject) => {
        axios.post(`/api/nivels/fetch-data`,filtro).then(({data}) => resolve(data)).catch(e => reject(e))
      })

    },

    guardar({commit,dispatch},datos){

      let formData = new FormData();

      formData.append('insignia',datos.insignia)
     

      return new Promise((resolve, reject) => {
        
        if(datos.id){
          axios.put(`/api/nivels/${datos.id}`,datos).then(({data}) => {

            resolve(data)
          }).catch(e => reject(e))


        }else{
          
          axios.post(`/api/nivels`,datos).then(({data}) => {
            if(data.result){

              dispatch('guardarInsignia',{nivel_id:data.nivel.id,formData}).then(({data:d}) => {
                    resolve(d)
              }).catch(e => reject(e))

             
            }

            resolve(data)

          }).catch(e => reject(e))

        }
      })
    },


    guardarInsignia({state,commit},{nivel_id,formData}){

      return new Promise((resolve, reject) => {
        axios.post(`/api/nivels/${nivel_id}/guardar/insignia`,formData,{
          headers:{
            ContentType:'multipart/form-data'
          }
        }).then(({data}) => {

          if(data.result){  
            commit('setNivel',data.nivel)
          }

          resolve(data)
          
        }).catch(e => reject(e))

      })
    },

    eliminar({commit},nivel_id){
      return new Promise((resolve, reject) => {
        axios.delete(`/api/nivels/${nivel_id}`).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    getAllGrupo({commit},grupo_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/nivels/grupo/${grupo_id}/get-all`).then(({data}) => resolve(data)).catch(e => reject(e));
      })
    },

    verificarNivelViajeros({commit}){

      return new Promise((resolve, reject) => {
        axios.get(`/api/nivels/verificar/nivels-viajeros`).then(({data}) => resolve(data)).catch(e => reject(e))
      })
    }


  }

}