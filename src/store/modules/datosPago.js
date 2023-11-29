export default{

  namespaced:true,

  state:() => ({

    datos:{
      id:null,
      metodo_pago:1,
      pais_id:null,
      ciudad_id:null,
      nombre_banco:'',
      direccion_banco:'',
      titular:'',
      iban:null,
      swift:null,
      numero_cuenta:null,
      fichero_acreditativo_cuenta:null,
      email:null,
      usuario_id:null,
      pais:null,
      ciudad:null,
      usuario:null
    },

    
  }),


  getters:{
    draft:(state) => state.datos
  },

  mutations:{
    setDatos: (state,datos) => state.datos = datos,
    clear:(state) => {
      state.datos = {
        id:null,
        metodo_pago:1,
        pais_id:null,
        ciudad_id:null,
        nombre_banco:'',
        direccion_banco:'',
        titular:'',
        iban:null,
        swift:null,
        fichero_acreditativo_cuenta:null,
        numero_cuenta:null,
        email:null,
        usuario_id:null,
        pais:null,
        ciudad:null,
        usuario:null
      }
    },

    update(state,datos){
      state.datos = datos 
    },


  },

  actions:{

    fetch({state,commit},usuario_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/datos-pago/fetch/${usuario_id}`).then(({data}) => {

          commit('setDatos',data)
          resolve(data)
        }).catch(e => reject(e))
      })
    },


    guardar({state,commit},datos){
      return new Promise((resolve, reject) => {
        if(state.datos.id){
          axios.put(`/api/datos-pago/${datos.id}`,datos).then(({data}) => {
            commit('update',data.datos)
            resolve(data)
          }).catch(e => reject(e))
        }else{
            axios.post(`/api/datos-pago`,datos).then(({data}) => {
            commit('setDatos',data.datos)
            resolve(data)
          }).catch(e => reject(e))
        }
        
      })
    }

  }

}