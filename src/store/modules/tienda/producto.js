export default {
  namespaced: true,

  state: () => ({

    producto: {
      id: null,
      nombre: '',
      breve:'',
      categoria_id: null,
      tiendas: [],
      precio: null,
      descripcion: null,
      disponibles: 1,
      caracteristicas:[],
      envio: null,
      divisa_id:null,
      tipo_producto:1, // 1 => fisico, 2 => digital
      archivo:null,
      categoria:null,
      producto:null,
      opinions:[],
      imagenes:[],
      consumos:[],
      divisa: null,
      carritos: [],
      isChino:false,
      pid:null,
      cj:[],
      enviable:false,

    },

    productos: []
    
  }),


  getters: {
    draft(state) {
      return clone(state.producto)
    },

      promedioCalificacion(state) {

         return (producto) => {

            let result = 0;

            if (producto.opinions.length) {
               const sum_calificacion = producto.opinions.reduce((a, b) => a + Number(b.calificacion), 0);

               result = sum_calificacion / producto.opinions.length;

            }


            return result;
         }


      },


      porcentajeOpinions(state) {
         return (calificacion) => {
            const cant_cali = state.producto.opinions.filter(val => val.calificacion == calificacion).length;

            const total_cali = state.producto.opinions.length;

            return { porcentaje: cant_cali > 0 ? cant_cali * 100 / total_cali : 0, cantidad: cant_cali };
         }

      } 

  },


  mutations: {

    clear(state) {
      state.producto = {
        id: null,
        nombre: '',
        breve:'',
        categoria_id: null,
        tiendas: [],
        precio: null,
        descripcion: null,
        disponibles: 1,
        caracteristicas:[],
        envio: null,
        divisa_id:null,
        tipo_producto:1, // 1 => fisico, 2 => digital
        archivo:null,
        categoria:null,
        producto:null,
        opinions:[],
        imagenes:[],
        consumos:[],
        divisa: null,
        carritos: [],
        isChino:false,
        pid:null,
        cj:[],
        enviable:false,
      }
    },


    setProducto(state, producto) {
      state.producto = producto
    },

    update(state, producto) {
      const i = state.productos.findIndex(val => val.id === producto.id)

      if (i != -1) {
        state.productos[i] = producto
      }

      if (state.producto.id === producto.id) {
        state.producto = producto
      }
    },

    push(state, producto) {
      state.productos.push(producto)

    },

    put(state, producto_id) {
      state.productos.splice(
        state.productos.findIndex(val => val.id === producto_id),
        1
      )
    },

    capturar(state, producto_id) {
      const producto = state.productos.find(val => val.id === producto_id)

      if (producto != undefined) {
        state.producto = producto
      }
    },

    setProductos(state, productos) {
      state.productos = productos
    },

    agregarCaracteristica(state){

      state.producto.caracteristicas.push({
        nombre:'',
        valor:''
      })
    },

    quitarCaracteristicas(state){
      state.producto.caracteristicas = [];
    },

    quitarCaracteristica(state,i){
      state.producto.caracteristicas.splice(i,1)
    },

    toggleEnvio(state,val){
    
      if(val){
        state.producto.envio = {
          precio:0,
          condiciones:''
        }
      }else{
        state.producto.envio = null
      }


    },

     togglePortada(state,{imagen_id,portada}){

         if(state.producto.id){
            
            state.producto.imagenes.forEach(val => val.portada = false)
            const image = state.producto.imagenes.find(val => val.id === imagen_id)
            image.portada = portada
            
         }

      },

    agregarTienda(state){
      
      state.producto.tiendas.push({
        cantidad:1,
        tienda_id:null
      })


    },


    quitarTienda(state,i){
      state.producto.tiendas.splice(i,1)
    }


  },

  actions: {

    getProductos({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/productos/get/all').then(({ data }) => {
          commit('setProductos', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    fetchData({ state, commit }, datos) {

      return new Promise((resolve, reject) => {
        
        axios.post(`/api/productos/fetch/data`, datos).then(({ data }) => {

          commit('setProductos', data.productos)

          resolve(data)
        }).catch(e => reject(e))

      })

    },

    fetchDataProductoDropShipping({commit},filtro){
        return new Promise((resolve, reject) => {
        
        axios.post(`/api/productos/cj-dropshipping/fetch/data`, filtro).then(({ data }) => {

          resolve(data)
        }).catch(e => reject(e))

      })
    },


    fetch({ state, commit }, producto_id) {

      return new Promise((resolve, reject) => {

        axios.get(`/api/productos/${producto_id}/fetch/data`).then(({data}) => {
          commit('setProducto', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    guardar({ commit,dispatch }, datos) {

      return new Promise((resolve, reject) => {

        if (datos.id) {

          axios.put(`/api/productos/${datos.id}`,datos).then(({ data }) => {
            if (data.result) {
              commit('update', data.producto)

              if(datos.archivo && datos.archivo != null && datos.tipo_producto == 2){
                dispatch('cargarArchivo',{producto_id:data.producto.id,archivo:datos.archivo})
              }
            }
            resolve(data)
          }).catch(e => reject(e))

        } else {

          axios.post(`/api/productos`, datos).then(({ data }) => {
            if (data.result) {
              commit('push', data.producto)

              if (datos.archivo && datos.archivo != null && datos.tipo_producto == 2){
                dispatch('cargarArchivo',{producto_id:data.producto.id,archivo:datos.archivo})
              }

            }

            resolve(data)

          }).catch(e => reject(e))

        }
      })

    },


    cargarArchivo({commit},{archivo,producto_id}){
      
      let formData = new FormData();

      formData.append('archivo',archivo);
      formData.append('_method','PUT');

      return new Promise((resolve, reject) => {
        axios.post(`/api/productos/${producto_id}/cargar/archivo`,formData,{
          headers:{
            ContentType:'multipart/form-data'
          }
        }).then(({data}) => {
          if(data.result){
            commit('update',data.producto)
          }

          resolve(data)
        }).catch(e => reject(e))


      })
      
    },


    eliminar({ commit }, producto_id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/productos/${producto_id}`).then(({ data }) => {

          resolve(data)

        }).catch(e => reject(e))

      })

    },


     cargarImagen({ state, commit }, { imagenes }) {

         let formData = new FormData();

         imagenes.forEach(val => {
            formData.append('imagen[]', val)
         })

         formData.append('_method', 'put')

         return new Promise((resolve, reject) => {
            axios.post(`/api/productos/${state.producto.id}/cargar/imagen`, formData, {
               headers: {
                  ContentType: "multipart/form-data: boundary=something"
               }
            }).then(({ data }) => {

               if (data.result) {
                  commit('update', data.producto)

               }

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      eliminarImagen({ state, commit }, imagen_id) {

         return new Promise((resolve, reject) => {

            axios.delete(`/api/productos/${state.producto.id}/eliminar/imagen/${imagen_id}`).then(({ data }) => {

               if (data.result) {
                  commit('update', data.producto);
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },

      togglePortada({ commit }, datos) {

         commit('togglePortada', { imagen_id: datos.imagen, portada: datos.portada })

         return new Promise((resolve, reject) => {

            axios.put(`/api/imagens/${datos.imagen}/toggle`, datos).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },


      productoDetailsCj({commit},producto_id){

        return new Promise((resolve, reject) => {
          axios.get(`/api/productos/details/${producto_id}`).then(({data}) => resolve(data)).catch(e => reject(e))
          
        })
      },

      agregarToTravel({commit},pid){
        return new Promise((resolve,reject) => {

          return axios.get(`/api/productos/agregar-to-travel/producto-cj/${pid}`).then(({data}) => resolve(data)).catch(e => reject(e))
        })
      },

      cjProductStock({commit},vid){
        return new Promise((resolve, reject) => {
          axios.get(`/api/productos-cj/vid/${vid}/stock`).then(({data}) => resolve(data)).catch(e => reject(e))
        })
      },


      rangoPrecios({commit}){
        return new Promise((resolve, reject) => {
          axios.get('/api/productos/rango/precios').then(({data}) => resolve(data)).catch(e => reject(e))
        })
      }



  }
}