<template>
  <div>

    <b-nav-item-dropdown class="dropdown-notification mr-25" menu-class="dropdown-menu-media" lazy right
      @show="refreshCarrito()" ref="carritoRef">

      <template #button-content>
        <feather-icon :badge="cantidad" badge-classes="bg-danger" class="text-body" icon="ShoppingCartIcon" size="21" />
      </template>

      <!-- Header -->
      <li class="dropdown-menu-header">
        <div class="dropdown-header d-flex py-1">
          <h4 class="notification-title mb-0 mr-auto">
            {{ $t('Carro de Compras') }}
          </h4>

          <b-badge pill variant="light-primary">
            {{ cantidad }} {{ $t('Productos') }}
          </b-badge>

        </div>
      </li>

      <section class="content-notificacion">
         <b-media  class="notificacion-list w-100 p-1" v-for="(producto,i) in carrito " :key="i" >
              <template #aside v-if="producto.imagenes ? producto.imagenes.length ? true : false : false">
                <b-img :alt="producto.nombre" fluid class="card-img-top img-fluid" 
                v-if="producto.imagenes.length"
                :src="getImagenPrincipal(producto)" style="width: auto; height: 50px; object-fit: contain"/>
              </template>

              <section class="d-flex justify-content-between">
                <section>
                   <p class="media-heading">
                    <span class="font-weight-bolder" >
                      {{ $t(producto.nombre) }}
                    </span>
                  </p>
                  <small class="notification-text">
                    {{ $t(producto.breve) }}
                  </small>
                </section>
                <b-button @click="$store.dispatch('carrito/quitarProducto',{producto_id: producto.id, usuario_id:usuario.id })" variant="danger" size="sm">
                  <font-awesome-icon icon="fas fa-times"/>
                </b-button>
              </section>
             
          </b-media>
      </section>

       <li class="dropdown-footer">
          <b-button-group class="w-100" v-if="carrito.length">
            
         

            <b-button variant="primary" title="Ir A Caja." @click="irCaja">
              <font-awesome-icon icon="fas fa-cash-register"/>
                {{ $t('Pasar por caja') }}
            </b-button>

            <b-button variant="secondary" title="Ir a tienda" :to="{name:'tienda.travel'}" v-if="$router.currentRoute.name != 'tienda.travel'">
              <font-awesome-icon icon="fas fa-store"/>
                {{ $t('Seguir comprando en tienda') }}
            </b-button>
            

          </b-button-group>
      </li>

    </b-nav-item-dropdown>

  </div>

</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox, BFormRadio, BModal, BTab, BTabs, BCard, BButtonGroup, VBTooltip, BFormCheckboxGroup, BImg
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

import { ref, onMounted, watch, toRefs, computed, onUnmounted } from 'vue';

import store from '@/store';
import router from '@/router';
import useAuth from '@core/utils/useAuth';

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
    BModal,
    BTabs,
    BTab,
    BCard,
    BButtonGroup,
    BFormRadio,
    BFormCheckboxGroup,
    BImg,


  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },

  setup(props) {

    let { usuario } = toRefs(store.state.usuario)
    const {carrito} = toRefs(store.state.carrito)
    const carritoRef = ref(null)
    const api_uri = axios.getUri();
    const {
      is_loggin
    } = useAuth();

    let cargarForm = () => {

      if(is_loggin.value){
        // store.dispatch('carrito/getCarrito', usuario.value.id)
        setInterval(() => {
          store.dispatch('carrito/getCarrito', usuario.value.id)
        }, 60000);
      }

    }

    cargarForm();

    const irCaja = () => {
      router.push({ name: 'caja' })

      carritoRef.value.hide();

    }

    watch([usuario],() => cargarForm());

    const getFecha = (fecha) => {
      return moment(fecha).format('LLL');

    }

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      // wheelPropagation: false,
    }

    return {

      perfectScrollbarSettings,
      getFecha,
      usuario,
      loading: computed(() => store.state.loading),
      cantidad: computed(() => carrito.value.length),
      carrito,
      carritoRef,
      irCaja,
      refreshCarrito: () => store.dispatch('carrito/getCarrito',usuario.value.id),

      getImagenPrincipal: (produc) => {

        const imagen_principal = produc.imagenes.find(val => val.portada)

        if (imagen_principal) {
          return `${api_uri}/storage/productos/${imagen_principal.imagen}`
        }
        return `${api_uri}/storage/productos/${produc.imagenes[0].imagen}`
      }
    }
  },
}
</script>

<style lang="scss" scope>
.notificacion-list:hover {
  .btns {
    display: flex !important;
  }

}

.btns {
  display: none;
}

.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}

.content-notificacion {
  height: 300px;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;

  >div {
    flex: 1 1 auto;

    label {
      width: 100%;
    }

  }


}
</style>


