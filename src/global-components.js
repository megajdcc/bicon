import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import TheMask from 'vue-the-mask';
import VueMask from 'v-mask'

Vue.component(FeatherIcon.name, FeatherIcon)
Vue.use(TheMask);
Vue.use(VueMask);

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas,fab,far)
Vue.component('font-awesome-icon', FontAwesomeIcon)
