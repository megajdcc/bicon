export default {

  namespaced:true,

  state:() => ({
    categoria:{
      id:null,
      nombre:'',
      descripcion:'',
      productos:[],
    },

    categorias:[],

  }),

  getters:{
    draft(state){ return clone(state.categoria)}
  },
  
  mutations:{
    clear(state) {
      state.categoria = {
        id: null,
        nombre: '',
        descripcion: '',
        productos: [],
      }
    },


    setCategoria(state, categoria) {
      state.categoria = categoria
    },

    update(state, categoria) {
      const i = state.categorias.findIndex(val => val.id === categoria.id)

      if (i != -1) {
        state.categorias[i] = categoria
      }

      if (state.categoria.id === categoria.id) {
        state.categoria = categoria
      }
    },

    push(state, categoria) {
      state.categorias.push(categoria)

    },

    put(state, categoria_id) {
      state.categorias.splice(
        state.categorias.findIndex(val => val.id === categoria_id),
        1
      )
    },

    capturar(state, categoria_id) {
      const categoria = state.categorias.find(val => val.id === categoria_id)

      if (categoria != undefined) {
        state.categoria = categoria
      }
    },

    setCategorias(state, categorias) {
      state.categorias = categorias
    }
  },

  actions:{
    getCategorias({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/categoria-productos/get/all').then(({ data }) => {
          commit('setCategorias', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    fetchData({ state, commit }, datos) {

      return new Promise((resolve, reject) => {
        axios.post(`/api/categoria-productos/fetch/data`, datos).then(({ data }) => {

          commit('setCategorias', data.categorias)

          resolve(data)
        }).catch(e => reject(e))

      })

    },

    fetch({ state, commit }, categoria_id) {

      return new Promise((resolve, reject) => {
        axios.get(`/api/categoria-productos/${categoria_id}/fetch/data`).then(({ data }) => {
          commit('setCategoria', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    guardar({ commit }, datos) {

      return new Promise((resolve, reject) => {
        if (datos.id) {
          axios.put(`/api/categoria-productos/${datos.id}`, datos).then(({ data }) => {
            if (data.result) {
              commit('update', data.categoria)

            }
            resolve(data)
          }).catch(e => reject(e))

        } else {

          axios.post(`/api/categoria-productos`, datos).then(({ data }) => {
            if (data.result) {
              commit('push', data.categoria)
            }

            resolve(data)

          }).catch(e => reject(e))

        }
      })

    },

    eliminar({ commit }, categoria_id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/categoria-productos/${categoria_id}`).then(({ data }) => {

          resolve(data)

        }).catch(e => reject(e))

      })

    },

    getCategoriasDropShipping({commit}){
      return new Promise((resolve, reject) => {
        axios.get('/api/categoria-productos/categories-dropshipping').then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))
        

      })
    }
  }

}


