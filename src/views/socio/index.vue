<template>
  <b-container fluid class="px-0">
    <b-row>

      <b-col cols="12" md="3">
        <b-card>
          <b-nav vertical card-header class="menu-socio">
            <b-nav-item :to="{ name: 'miperfil' }" active-class="active" v-if="$can('read', 'perfil')">

              <b-container fluid>
                <b-row class="px-0">

                  <b-col cols="2" class="px-0">
                    <b-avatar :src="usuario.avatar" />
                  </b-col>

                  <b-col cols="10" class="px-0">
                    {{ ` ${usuario.nombre ? usuario.nombre + ' ' + usuario.apellido : usuario.username}` }} <br>
                    <b>@{{ usuario.username }}</b>

                  </b-col>

                

                </b-row>
              </b-container>

            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.negocio.list' }" active-class="active" v-if="$can('read', 'socio negocios')">
              <span class="fas fa-briefcase"></span>
              {{ $t('Negocio') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.reservaciones' }" active-class="active"
              v-if="$can('read', 'socio reservaciones')">
              <span class="fas fa-credit-card"></span>
              {{ $t('Reservaciones') }}
            </b-nav-item>

            <!-- <b-nav-item :to="{ name: 'socio.cupones' }" active-class="active">
                     <span class="fas fa-ticke"></span>
                     Cupones
                  </b-nav-item> -->

            <b-nav-item :to="{ name: 'socio.compras' }" active-class="active" v-if="$can('read', 'socio compras')">
              <span class="fas fa-weight-hanging"></span>
              {{ $t('Compras') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.consumos' }" active-class="active" v-if="$can('read', 'socio consumos')">
              <font-awesome-icon icon="fas fa-concierge-bell" />
              {{ $t('Consumos') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.cupones' }" active-class="active" v-if="$can('read', 'socio cupones')">
              <font-awesome-icon icon="fas fa-tags" />
              {{ $t('Mis Cupones') }}
            </b-nav-item>



          </b-nav>
        </b-card>

        <b-card v-if="route.meta.name == 'negocio'">
          <b-nav vertical card-header class="menu-socio">

            <b-nav-item :to="{ name: 'socio.negocio.list' }" exact active-class="active">
              <span class="fas fa-concierge-bell"></span>
              {{ $t('Mis Negocios') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.negocio.afiliar' }" active-class="active">
              <span class="fas fa-plus-circle"></span>
              {{ $t('Afiliar mi negocio') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.negocio.siguiendo' }" exact active-class="active">
              <span class="fas fa-bookmark"></span>
              {{ $t('Siguiendo') }}
            </b-nav-item>


            <b-nav-item :to="{ name: 'socio.negocio.recomendados' }" exact active-class="active">
              <span class="fas fa-heart"></span>
              {{ $t('Recomendados') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'socio.negocio.solicitudes' }" active-class="active">
              <span class="fas fa-file"></span>
              {{ $t('Solicitudes enviadas') }}

              <b-badge variant="danger" pill>{{ solicitudesSinAceptar }}</b-badge>
            </b-nav-item>
          </b-nav>
        </b-card>

        <b-card v-if="route.meta.name == 'perfil'">

          <b-nav vertical card-header class="menu-socio">
            <b-nav-item :to="{ name: 'miperfil' }" exact active-class="active" v-if="$can('read', 'perfil')">
              <span class="fas fa-user"></span>
              {{  $t('Perfil de socio')  }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'micuenta' }" exact active-class="active"
              v-if="$can('read', 'socio perfil movimientos')">
              <span class="fas fa-money-check"></span>
              {{ $t('Cuenta y Movimientos') }}
            </b-nav-item>


            <b-nav-item :to="{ name: 'mi.tarjetas' }" exact active-class="active"
              v-if="$can('read', 'socio perfil tarjetas')">
              <span class="fas fa-credit-card"></span>
              {{  $t('Tarjetas asociadas')  }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'misreferidos' }" exact active-class="active"
              v-if="$can('read', 'socio perfil amigos')">
              <span class="fas fa-user-plus"></span>
              {{  $t('Mis amigos')  }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'perfil.editar' }" exact active-class="active" v-if="$can('read', 'perfil')">
              <span class="fas fa-user-edit"></span>
              {{  $t('Editar Información')  }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'perfil.datos_pago' }" exact active-class="active"
              v-if="$can('write', 'Datos de pago')">
              <font-awesome-icon icon="fas fa-money-check-dollar" />
              {{ $t('Datos de pago') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'perfil.password' }" exact active-class="active" v-if="$can('write', 'perfil')">
              <span class="fas fa-key"></span>
              {{  $t('Cambiar Contraseña') }}
            </b-nav-item>

            <b-nav-item :to="{ name: 'perfil.desactivar' }" exact active-class="active" v-if="$can('write', 'perfil')">
              <span class="fas fa-window-close"></span>
              {{  $t('Desactivar Cuenta')  }}
            </b-nav-item>
          </b-nav>
        </b-card>


        <b-card v-if="route.meta.name == 'consumos'">

          <b-nav vertical card-header class="menu-socio">

            <b-nav-item :to="{ name: 'socio.consumos' }" exact active-class="active">
              <font-awesome-icon icon="fas fa-concierge-bell" />
              {{ $t('Mis consumos') }}
            </b-nav-item>

          </b-nav>
        </b-card>


      </b-col>

      <b-col cols="12" md="9">
        <router-view></router-view>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import {
  BContainer,
  BRow,
  BCol,
  BCard,
  BCardBody,
  BButton,
  BNav,
  BNavItem,
  BAvatar,
  BBadge

} from 'bootstrap-vue'
import store from '@/store'
import { computed, toRefs, watch, onMounted } from 'vue'

import { useRoute, } from 'vue2-helpers/vue-router'

export default {
  components: {
    BContainer,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BNav,
    BNavItem,
    BAvatar,
    BBadge,
    insignia:() => import('components/insignia.vue')

  },

  setup() {
    const route = useRoute();
    const { solicitudes } = toRefs(store.state.solicitud)
    const { usuario } = toRefs(store.state.usuario)

    onMounted(() => {

      if (!solicitudes.value.length) {
        store.dispatch('solicitud/getMisSolicitudes');
      }
    })


    return {
      usuario,
      route,
      solicitudesSinAceptar: computed(() => `${solicitudes.value.filter(val => val.situacion != 3).length}`)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/scss/variables/variables';

.menu-socio {
  .nav-item {
    a {
      color: #909399;
    }


    .router-link-exact-active,
    .active {
      background: $primary !important;
      color: white;
    }

  }

}

.dark-layout {
  .menu-socio {
    .nav-item {
      a {
        color: white !important;
      }


      .router-link-exact-active,
      .active {
        background: $primary !important;
        color: black !important;
      }

    }

  }
}
</style>
