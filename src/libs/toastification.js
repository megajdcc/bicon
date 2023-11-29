import Vue from 'vue'
import Toast from 'vue-toastification'
import { createToastInterface } from 'vue-toastification'


import '@core/scss/vue/libs/toastification.scss'
const pluginsOptions = {
  hideProgressBar: false,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
  position:'bottom-right'

  
}

const toast = createToastInterface(pluginsOptions)
window.toast = toast

Vue.use(Toast, {
  hideProgressBar: false,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
  position:'bottom-right'
})
  