export default{
  namespaced:true,
  
  state:() => ({

    tienda:{
      id       : null,
      nombre:'',
      divisa_id: null,
      fisica   : false,
      iata_id  : null,
      ciudad_id: null,
      estado_id: null,
      lat      : null,
      lng      : null,
      direccion:'',
      ciudad:null,
      estado:null,
      iata:null,
      divisa:null,
      productos:[],
      horarios:[],
      telefonos:[]
    },

    tiendas:[]
  }),


  getters:{
    draft(state){
      return clone(state.tienda)
    },


    getCurrency(state) {
      return (tienda_id) => {
          const tienda = state.tiendas.find(val => val.id === tienda_id)

          if(tienda != undefined){
            return tienda.divisa.iso
          }

          return 'MXN';
          
      }

    }
  },


  mutations:{

    clear(state) {
      state.tienda = {
        id: null,
        nombre: '',
        divisa_id: null,
        fisica: false,
        iata_id: null,
        ciudad_id: null,
        estado_id: null,
        lat: null,
        lng: null,
        direccion: '',
        ciudad: null,
        estado: null,
        iata: null,
        divisa: null,
        productos: [],
        horarios:[],
        telefonos:[]

      }
    },


    setTienda(state, tienda) {
      state.tienda = tienda
    },

    update(state, tienda) {
      const i = state.tiendas.findIndex(val => val.id === tienda.id)

      if (i != -1) {
        state.tiendas[i] = tienda
      }

      if (state.tienda.id === tienda.id) {
        state.tienda = tienda
      }
    },

    push(state, tienda) {
      state.tiendas.push(tienda)

    },

    put(state, tienda_id) {
      state.tiendas.splice(
        state.tiendas.findIndex(val => val.id === tienda_id),
        1
      )
    },

    capturar(state, tienda_id) {
      const tienda = state.tiendas.find(val => val.id === tienda_id)

      if (tienda != undefined) {
        state.tienda = tienda
      }
    },

    setTiendas(state, tiendas) {
      state.tiendas = tiendas
    },
    agregarTelefono(state){

				state.tienda.telefonos.push({
					telefono: '',
					is_whatsapp: false,
					principal: false
				})

		},

		quitarTelefono(state,i){
				state.tienda.telefonos.splice(
					i,
					1
				) 
		},

    actualizarTelefono(state,telefono){
			const i = state.tienda.telefonos.findIndex(val => val.telefono === telefono.telefono)
			if (i != -1){
				state.tienda.telefonos[i] = telefono
			}
		},

    quitarHorario(state){
        state.tienda.horarios = []
    },

  },

  actions:{

    getTiendas({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/tiendas/get/all').then(({ data }) => {
          commit('setTiendas', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    fetchData({ state, commit }, datos) {

      return new Promise((resolve, reject) => {
        axios.post(`/api/tiendas/fetch/data`, datos).then(({ data }) => {

          commit('setTiendas', data.tiendas)

          resolve(data)
        }).catch(e => reject(e))

      })

    },

    fetch({ state, commit }, tienda_id) {

      return new Promise((resolve, reject) => {
        axios.get(`/api/tiendas/${tienda_id}/fetch/data`).then(({ data }) => {
          commit('setTienda', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    guardar({ commit }, datos) {

      return new Promise((resolve, reject) => {
        if (datos.id) {
          axios.put(`/api/tiendas/${datos.id}`, datos).then(({ data }) => {
            if (data.result) {
              commit('update', data.tienda)

            }
            resolve(data)
          }).catch(e => reject(e))

        } else {

          axios.post(`/api/tiendas`, datos).then(({ data }) => {
            if (data.result) {
              commit('push', data.tienda)
            }

            resolve(data)

          }).catch(e => reject(e))

        }
      })

    },

    eliminar({ commit }, tienda_id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/tiendas/${tienda_id}`).then(({ data }) => {

          resolve(data)

        }).catch(e => reject(e))

      })

    },

    quitarTelefono({commit},telefono){
			return new Promise((resolve, reject) => {
				axios.delete(`/api/telefonos/${telefono.id}`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))

			})
		},

    guardarTelefono({state,commit},{telefono,tienda}){
			
			return new Promise((resolve, reject) => {

				axios.put(`/api/tiendas/${tienda}/add/telefono`,telefono).then(({data}) => {
					
					if(data.result){

						if(state.tienda.id === tienda){
							commit('actualizarTelefono',data.telefono)
						}
					}

					resolve(data)

				}).catch(e => {
					reject(e)
				})

			})
		},

     aperturarHorario({commit},tienda_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/tiendas/${tienda_id}/aperturar/horario`).then(({data}) => {

               if(data.result){
                  commit('update',data.tienda)
               }

               resolve(data)
            }).catch(e => reject(e))



         })
      },

      guardarHorario({commit},horario){

         return new Promise((resolve, reject) => {
            
            axios.put(`/api/horarios/${horario.id}`,horario).then(({data}) => {

               resolve(data)

            }).catch(e => reject())


         })
      },


      quitarHorario({commit},tienda_id){

        

         return new Promise((resolve, reject) => {
            axios.get(`/api/tiendas/${tienda_id}/quitar/horario`).then(({data}) => {

               if(data.result){
                  commit('quitarHorario');
               }

               resolve(data)
            
            }).catch(e => reject(e))


         })
      },



    
  }
}