
export default {

  namespaced:true,

  state:() => ({
    carrito:[],
    formulario:{
      cantidad:0,
      tienda_id:null,
      producto_id:null,
      monto:0,
      precio_unitario:0,
      cliente_id:null,
      vid:null,
      isChino:false,

    }
  }),


  mutations:{

    clear(state){
      
      state.formulario = {
        cantidad: 0,
        tienda_id: null,
        producto_id: null,
        monto: 0,
        precio_unitario: 0,
        cliente_id: null,
        vid:null,
        isChino:false,

      }

    },

    setProductos(state,productos){
      state.carrito = productos
    },

    sacarProducto(state,producto_id){
      const i = state.carrito.findIndex(val => val.id === producto_id)

      if(i != -1){
        state.carrito.splice(i,1)
      }
    }
  },


  actions:{

    getCarrito({commit},usuario_id){

      return new Promise((resolve, reject) => {
        axios.get(`/api/carrito/compra/${usuario_id}/get`).then(({data}) => {

          commit('setProductos',data)
          resolve(data)
        }).catch(e => reject(e))


      })
    },

    quitarProducto({ commit }, {usuario_id,producto_id}) {

      return new Promise((resolve, reject) => {
        axios.get(`/api/carrito/compra/${usuario_id}/quitar/producto/${producto_id}`).then(({ data }) => {

          commit('sacarProducto', producto_id)
          resolve(data)
        }).catch(e => reject(e))


      })
    },


    agregarCarrito({commit},datos){
      return new Promise((resolve, reject) => {
        axios.post('/api/carrito/comprar/agregar/producto',datos).then(({data}) => {

          if(data.result){
            commit('setProductos', data.carrito)
            commit('clear')
          }

          resolve(data)
        }).catch(e => reject(e))

      })
    },


    fetchData({commit},datos){
      return new Promise((resolve, reject) => {
        
        
        axios.post(`/api/carrito/fetch/data`,datos).then(({data}) => {

          commit('setProductos',data.productos)

          resolve(data)
        }).catch(e => reject(e))


      })
    },

    calcularEnvio({commit},datos){

      return new Promise((resolve, reject) => {
        axios.post(`/api/carrito-compra/calcular-envio`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
        
      })
    }

  }


}