export default {

  namespaced:true,

  state:() => ({

    sistema:{
      id:null,
      nombre:'',
      terminos:'',
      logotipo_fondo_claro:null,
      logotipo_fondo_oscuro:null,
      paypal_id:null,
      paypal_secrect:null,
      production_paypal:false,
      banner_principal:null,
      paypal:false,
      divisa_id:null,
      empresa_digital:false,
      negocio:{
        credito:0,
        divisa_id:null,
      },
      cuenta:null,
      imagenes:[],
      videos: [],
      sucursales:[],
      redes:[],
      cjdropshipping:null,
      porcentaje_referido:5
    },



  }),


  getters:{
    draft:(state) => clone(state.sistema),

    credentialPaypal(state){
      return { 
        sandbox: state.sistema.paypal_id || 'ARMAQ0_8KFm9nIJKGSOJUNWBfVWngxhsuu1Vj7N6yL2LVnXBAa_JXIDUeuqkMYU2yONIvpWZZQl-DLiw',
        production: "<production client id>"
      }
    },
    saldo:(state) => {
      return state.sistema.cuenta ? state.sistema.cuenta.saldo : 0
    },

    isoSistema(state){

      if(state.sistema.cuenta){
        if(state.sistema.cuenta.divisa){
          return state.sistema.cuenta.divisa.iso
        }else{
          return 'USD'
        }
      }else{
        return "USD"
      }
     
    }
  },

  mutations:{

    setSistema: (state,sistema) => {
      state.sistema = sistema
      if(!state.sistema.negocio){
        state.sistema.negocio = {
          credito:0,
          divisa_id:null,
        }
      }
    },
    
    update:(state,sistema) => state.sistema = sistema,

    agregarRedSocial(state){
      state.sistema.redes.push({
        nombre:'',
        url:'',
        icono:'',
      });
    },

    eliminarRed:(state,idx) => {
      state.sistema.redes.splice(idx,1)
    },

    
  },

  actions:{

    cargarArchivo({commit,state},file){

      let formData = new FormData();

      file.forEach(val => {
        formData.append('archivos[]',val);
      })

      formData.append('model_id',state.sistema.id)

      return new Promise((resolve, reject) => {
        axios.post(`/api/sistema/upload/archivos`,formData,{
          headers:{
            ContentType:'multipart/form-data',
          }
        }).then(({data}) => {

          if(data.result){
            commit('update',data.sistema)
          }

          resolve(data)

        }).catch( e => reject(e))
      })

    },


    fetch({commit}){

      return new Promise((resolve, reject) => {
        
        axios.get('/api/sistema/fetch').then(({data}) => {
          commit('setSistema',data)
          resolve(data)
        }).catch(e => reject(e))


      })
    },


    guardar:({state,commit},datos) => {

      return new Promise((resolve, reject) => {
        
        axios.put(`/api/sistema/${state.sistema.id}`, datos).then(({ data }) => {

          if (data.result) {
            commit('update', data.sistema)
          }
          resolve(data)

        }).catch(e => reject(e))
      })
    

    },

    guardarLogo({commit,state},datos){

      return  new Promise((resolve, reject) => {
        let formData = new FormData();

        formData.append('logo',datos.logo)
        formData.append('tipo_logo'.datos.tipo_logo)
        formData.append('_method','PUT')

        axios.post(`/api/sistema/${state.sistema.id}/upload/logo`,formData,{
          headers:{
            ContentType:'multipart/form-data'
          }
        }).then(({data}) => {
          if(data.result){
            
            commit('update',data.sistema)

          }

          resolve(data)
          
        }).catch(e => reject(e))
      })
    },


    crearCuenta({state,commit}){

      return new Promise((resolve, reject) => {
        axios.get(`/api/sistemas/${state.sistema.id}/crear/cuenta`).then(({data}) => {

          if(data.result){
            commit('update',data.sistema)
          }
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    eliminarArchivo({state,commit},datos){

      return new Promise((resolve, reject) => {
        axios.put(`/api/sistemas/${state.sistema.id}/eliminar/archivo`,datos).then(({data}) => {

          if(data.result){
            commit('update',data.sistema)
          }

          resolve(data)

        }).catch(e => reject(e))
      })
    },


    updateBanner({commit,state},datos){
      const formData = new FormData();

      formData.append('banner',datos.banner_principal);
      formData.append('_method','PUT');

      return new Promise((resolve, reject) => {
          axios.post(`/api/sistema/${state.sistema.id}/update/banner`,formData,{
            headers:{
              ContentType:'multipart/form-data'
            }
          }).then(({data}) => {
            if(data.result){
              commit('update',data.sistema)
            }
            resolve(data)
          }).catch(e => reject(e))

      })

    },

    eliminarRed({state,commit},red){
       
      return new Promise((resolve, reject) => {

        axios.delete(`/api/sistema/${state.sistema.id}/eliminar/red/social/${red}`).then(({data}) => {
          if(data.result){
            commit('update',data.sistema)
          }
          resolve(data)
        }).catch(e => reject(e))

       })
    },

    optenerTokenDropshipping({state,commit}){

      return new Promise((resolve, reject) => {
        axios.get('/api/dropshipping/obtener-token').then(({data}) => {
          
          if(data.result){
            commit('update',data.sistema)
          }

          resolve(data)

        }).catch(e => reject(e))
      })
    },


    refreshTokenDropshipping({commit}){
        return new Promise((resolve, reject) => {
        axios.get('/api/dropshipping/refresh-token').then(({data}) => {
          
          if(data.result){
            commit('update',data.sistema)
          }

          resolve(data)

        }).catch(e => reject(e))
      })
    },

    caducarTokenDropshipping({commit}){
      return new Promise((resolve, reject) => {
        axios.get('/api/dropshipping/caducar-token').then(({data}) => {
          
          if(data.result){
            commit('update',data.sistema)
          }

          resolve(data)

        }).catch(e => reject(e))
      });

    }



  }
}