import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'

import '@/assets/scss/app.scss'
Vue.prototype.$eventHub = new Vue();


import './libs/axios.js'
import router from './router'
import store from './store'
import i18n , {loadLocaleAsync} from '@/libs/i18n'
import App from './App.vue'

// Global Components
import './global-components'
import './filters'

// 3rd party plugins

import './libs/acl'
import './libs/toastification'
import './libs/vue-select'

import './directives'


import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')
moment.updateLocale('en',{
  months:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthsShort:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','oct','Nov','Dic'],
  weekdays : [
        "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
    ],
  weekdaysShort : [
        "Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"
  ]
})
window.moment = moment



// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

import '@core/assets/fonts/feather/iconfont.css' // For form-wizard]

import '@/assets/scss/style.scss'

window.clone = (obj)  => JSON.parse(JSON.stringify(obj));

window.random = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

window.redondeo = function (num, decimales = 2) {
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;

  if (decimales === 0)
    return signo * Math.round(num);

  num = num.toString().split('e');

  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}


window.colorRand = () => {
  let colores = [
    '#397DAD',
    '#4D616C',
    '#D02412',
    '#CD960E',
    '#348022',
    '#17B6AA',
    '#5F2626',
    '#00AEFF',
    '#6574cd',
    '#9561e2',
    '#f66d9b',
    '#e3342f',
    '#f6993f',
    '#ffed4a',
    '#38c172',
    '#4dc0b5',
    '#6cb2eb',
    '#444444',
    '#00c0ef',
  ];


  var i = random(0, colores.length);


  return colores[i];

}

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery



import _ from 'lodash';

window._ = _;


Vue.config.productionTip = import.meta.env.DEV;
Vue.config.silent = import.meta.env.PROD;
Vue.config.devtools = import.meta.env.DEV;

let app = new Vue({
  data:() => ({
    api_uri:import.meta.env.VITE_API_URL
  }),
  router,
  store,
  i18n,
  render: h => h(App),
  provide:() =>  ({swal : Vue.swal,i18n:i18n,loadLocaleAsync:loadLocaleAsync})
}).$mount('#app')
