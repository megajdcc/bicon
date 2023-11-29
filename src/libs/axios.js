import Vue from 'vue'
import axios from 'axios'
import useAuth from '@core/utils/useAuth.js';

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 0,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
  mode:'no-cors',
  withCredentials: false,
  credentials: 'same-origin',
});


if(localStorage.getItem('token')){

  let token = localStorage.getItem('token');
  axiosIns.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
}

import store from '@/store';
import router from '@/router';

// Intercetamos las peticiones para cambiar el estado de carga (Loading ) de la app enn true
axiosIns.interceptors.request.use((config) => {
  store.commit('toggleLoading')

  return config;

},(error ) => {
  store.commit('toggleLoading')
  return Promise.reject(error);
})

// Intercetamos las respuesta para cambiar el estado de carga (Loading ) de la app en false

axiosIns.interceptors.response.use((response) => {
  store.commit('toggleLoading')
  return Promise.resolve(response)

}, (error) => {

  const {response} = error
  store.commit('toggleLoading')

    if (response && response.status === 401) {

      if (response.data.message == "Unauthenticated.") {

        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('habilidades');

        if (window.location.pathname != '/login') {

          router.push({ name: 'login' })
          if(useAuth().is_loggin){
            useAuth().logout();
          }
        }

      } else if (response.data.message == 'Unauthorized.') {
        
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('usuarioId');
        localStorage.removeItem('habilidades');
        if (window.location.pathname != '/login') {
          useAuth().logout();
          router.push({ name: 'login' })
          
         
        }

      }

      if (response.data.message) {

        // toast({
        //   component: ToastificationContent,
        //   props: {
        //     title: response.data.message,
        //     icon: 'AlertCircleIcon'
        //   }
        // }, {
        //   position: 'bottom-left'
        // })

      }

      // store.commit('toggleLoading',false)

    }

    if (response.status === 404) {
      // location.reload()
      router.push({ name: 'error-404' })
    }

    if (response.status === 419) {


      useAuth().logout();
      // router.push({name:'login'})
      // location.reload()
    }

    if (response.status === 503) {
      router.push({ name: 'show.mantenimiento' })
    }

    return Promise.reject(error);
    
})

axiosIns.interceptors.response.use(undefined, (error) => {

  const response = error.response;
  return Promise.reject(error);

});

Vue.prototype.$http = axiosIns
window.axios = axiosIns;

export default axiosIns
