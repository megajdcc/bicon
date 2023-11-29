
<template>
  <b-toast :visible="offlineReady || needRefresh" toaster="b-toaster-bottom-right" no-auto-hide solid variant="primary">
    
    <div class="message">
      <span v-if="offlineReady">
        {{ $t('TravelPoints ya está listo para trabajar en modo fuera de linea') }}
      </span>
      <span v-else>
       {{ $t('Tienes una nueva versión de esta aplicación, click en recargar para actualizar') }} 
      </span>
    </div>
    <b-button variant="primary" v-if="needRefresh" @click="updateServiceWorker()">
      {{ $t('Recargar') }}
    </b-button>
    
  </b-toast>
</template>

<script>
import { useRegisterSW } from '@/composables/useRegisterSW'

import {
  BToast,
  BButton
} from 'bootstrap-vue'

export default {
  name: 'ReloadPrompt',

  components:{
    BToast,
    BButton
  },

  
  setup(){

    const {
      offlineReady,
      needRefresh,
      updateServiceWorker,
    } = useRegisterSW();

    return {
      offlineReady,
      needRefresh,
      updateServiceWorker,
    }

  }
}
</script>


<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}

.pwa-toast .message {
  margin-bottom: 8px;
}

.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>