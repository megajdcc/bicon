import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

// Import Modulos

import usuario from './modules/usuario';
import rol from './modules/configuracion/rol.js';
import permiso from './modules/configuracion/permiso.js';
// 
import notificacion from './modules/notificaciones.js';



Vue.use(Vuex)


export default new Vuex.Store({

  
	state: {
		errors: {},
		loading: false,
    token:null,
    canales:[],
    auth:{
      message:null
    }
	},

	mutations: {



		cerrarApp(state) {
			state.usuario = null
		},

		toggleLoading(state,bol = null) {
			state.loading = (bol != null) ? bol : !state.loading
		},



		setError(state, data) {

      
      if (typeof data === 'string'){
        state.errors.message = data;
      }else{
        state.errors = data;
      }

		},

		clearErrors(state) {

			state.errors = {
				carta: {}
			}

		},
    
    setAuthMessage(state,data){
      state.auth.message = data;

    },

    setToken(state,token){
      state.token = token
    },

    pushCanal(state,canal){
      state.canales.push(canal)
    }


	},

	actions: {

    async cerrarSesion({ state, commit }) {
      
      return await axios.get('/api/auth/logout',null,{
        headers: {
          'WWW-Authenticate': 'Bearer', 'Authorization': (state.token) ? state.token : localStorage.getItem('accessToken')
        }
      });

    },


    searchPublic({commit},{query,destino}){
      return new Promise((resolve, reject) => {
        
        axios.post(`/api/search/public`,{q:query,destino:destino}).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    searchLocation({commit},location){
      return new Promise((resolve, reject) => {
        axios.post(`/api/search/location`,location).then(({data}) => resolve(data)).catch(e => reject(e))
      })
    },

    getPermisosPorPanel({commit},panel){

      return new Promise((resolve, reject) => {
        axios.get(`/api/panels/${panel}/get/permisos`).then(({data}) => resolve(data)).catch(e => reject(e))
        
      })
    }



	},

  
  modules: {
    app,
    appConfig,
    verticalMenu,
    usuario,
    rol,
    notificacion,
    permiso,
  },
  strict:false,

})
