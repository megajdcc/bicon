<template>
  <b-tabs vertical content-class="col-12 col-md-9 mt-1 mt-md-0" pills nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left">

    <!-- general tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon icon="UserIcon" size="18" class="mr-1" />
        <small class="font-weight-bold">General</small>
      </template>

      <configuracion-general />
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon icon="LockIcon" size="18" class="mr-1" />
        <small class="font-weight-bold">Cambiar contraseña</small>
      </template>

      <cambiar-password />
    </b-tab>
    <!--/ change password tab -->

  


    <!-- Desactivar Cuenta-->
    <b-tab>

      <!-- title -->
      <template #title>
        <font-awesome-icon icon="fas fa-power-off" class="mr-1"/>
        <small class="font-weight-bold">Desactivar mi cuenta</small>
      </template>

      <desactivar-cuenta />
    </b-tab>




  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import ConfiguracionGeneral from './ConfiguracionGeneral.vue'
import CambiarPassword from './CambiarPassword.vue'

import { mapState, } from 'vuex';

export default {
  components: {
    BTabs,
    BTab,
    ConfiguracionGeneral,
    CambiarPassword,
    DesactivarCuenta: () => import('./desactivar.vue'),
  },
  data() {
    return {
      options: {},
    }
  },

  computed: {
    ...mapState('usuario', ['usuario']),

  },

}
</script>
