<template>
 <section>

  <b-nav-item-dropdown right toggle-class="d-flex align-items-center dropdown-user-link" class="dropdown-user">
    <template #button-content>
      <font-awesome-icon icon="fas fa-money-bill" />

    </template>

    <b-dropdown-item :to="{ name: !isNegocio ?  'micuenta' : 'negocio.movimientos' }" link-class="d-flex align-items-center"
      v-if="is_loggin && $can('read', !isNegocio ? 'Auth' : 'movimientos negocio')">
      <feather-icon size="16" icon="DollarSign" class="mr-50" />
      <span v-if="!isNegocio">
        Tp{{ saldo | currency }}
      </span>
      <span v-else>
        {{ saldo | currency(currencyIso) }}
      </span>
    </b-dropdown-item>

    <template v-if="isNegocio">
       <b-dropdown-item @click="recargar" >
        <font-awesome-icon icon="fab fa-paypal"/>
        {{  $t('Recargar') }}
      </b-dropdown-item>
     
    </template>
   
  </b-nav-item-dropdown>

   <recarga-paypal v-model="showRecarga" :showRecarga.sync="showRecarga"></recarga-paypal>
   </section>
</template>

<script>
import {
  BNavItemDropdown, 
  BDropdownItem, 
  BDropdownDivider, 
  BAvatar,
  BSidebar
} from 'bootstrap-vue'

import { avatarText } from '@core/utils/filter'
import { computed, toRefs,ref,inject } from 'vue';
import store from '@/store';
import useAuth from '@core/utils/useAuth'
import PayPal from 'vue-paypal-checkout'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    PayPal,
    BSidebar,
    recargaPaypal:() => import('components/recargaPaypal.vue')
  },

  props: {

    panel: {
      type: String,
      default: 'travel',
    },

    negocioId: {
      type: Number,
      required: false
    },
    isNegocio:Boolean,


  },


  setup(props) {
    const { usuario } = toRefs(store.state.usuario)

    const { panel, negocioId,isNegocio } = toRefs(props)
    const  showRecarga = ref(false)
    const { negocio } = toRefs(store.state.negocio)
    const i18n = inject('i18n')
    const {
      logout,
      is_loggin,
      isNegocios
    } = useAuth();

    const getRolPanel = computed(() => {

      if (panel.value === 'negocio') {

        const neg = usuario.value.negocios.find(val => val.id === negocioId.value);

        if (neg) {
          const cargo_id = neg.pivot.cargo_id;

          if (cargo_id) {

            const cargo = negocio.value.cargos.find(val => val.id === cargo_id)

            if (cargo) {
              return cargo.cargo;
            }

            return i18n.t('Sin definir');

          }

        }

        return i18n.t('Sin definir');

      }

      return usuario.value.rol.nombre;
    })

    return {
      usuario,
      loading: computed(() => store.state.loading),
      avatarText,
      logout,
      isNegocios,
      is_loggin,
      getRolPanel,
      negocio,
      showRecarga,
      recargar:() => {showRecarga.value = true},
      currencyIso:computed(() => {
        
        if(isNegocio.value){
          if(negocio.value.cuenta){
            return negocio.value.cuenta.divisa.iso
          }else{
            return 'EUR'
          }
        }else{
          return ''
        }

      }),

      saldo:computed(() => {
        
        if(isNegocio.value){
          if(negocio.value.cuenta){
            return negocio.value.cuenta.saldo
          }else{
            return 0;
          }
        }else{
          return usuario.value.cuenta ? Number(usuario.value.cuenta.saldo) : 0
        }

      })

    };
  },


}
</script>
