<template>
  <b-row>
    <b-col cols="12" v-if="cupones.length > 0">
     
      <h3>{{ $t(titulo) }}</h3>
      <p>{{ $t(subTitulo) }}</p>
    </b-col>
    <b-col cols="12">
      <listado :actions="actions" hideFooter hideHeader>
        <template #contenido="{ items }">
          <b-container fluid class="px-0 mx-0">
            <b-row>
              <b-col cols="12" md="3" v-for="(item, i) in items" :key="i">
                <div class="card-simple" :style="`background-image:url(${$root.api_uri}/storage/negocios/cupones/${item.imagen})`">
                <agendar :modelId="item.id" :modelType="'App\\Models\\Negocio\\Cupon'" :modelName="`el cupón (${item.nombre})`" />
                  
                  <div class="card-simple-background">
                    <div class="card-simple-content">
                      <h2>
                        <b-link @click="showCupon(item)">
                          {{ $t(item.nombre) }}
                        </b-link>
                      </h2>

                      <div class="card-simple-actions">

                        <b-button-group >
                          <b-button @click="showCupon(item)" variant="outline-primary">
                            <font-awesome-icon icon="fas fa-eye"/>
                          </b-button>

                          <b-button @click="loQuiero(item)" :title="$t('Quiero el Cupón')" v-b-tooltip.hover variant="outline-success" v-if="is_loggin">
                            <font-awesome-icon icon="fas fa-check-to-slot"/>
                          </b-button>

                        </b-button-group>

                      </div><!-- /.card-simple-actions -->
                    </div><!-- /.card-simple-content -->

                    <div class="card-simple-label" >
                       {{ $t(item.negocio.nombre) }}
                    </div>


                    <b-badge class="card-simple-price" variant="success" v-if="item.negocio">
                      {{ item.disponibles > 1 ? `${item.disponibles} `+ $t('Disponibles') : `${item.disponibles} `+$t('Disponible') }}
                    </b-badge>

                

                  </div><!-- /.card-simple-background -->
                </div><!-- /.card-simple -->
              </b-col>
            </b-row>
          </b-container>

        </template>
      </listado>
    </b-col>
    <b-modal v-model="isShowCupon" centered size="lg" hide-footer hide-backdrop>
        <template #modal-title>
           <section class="d-flex justify-content-between align-items-md-center flex-wrap flex-column flex-md-row">
              <section class="d-flex align-items-md-center flex-md-row flex-column">
                <b-badge :variant="getVariantStatus(cupon)" class="mr-1">
                    {{ getStatusCupon(cupon) }}
                </b-badge>
                <strong class="text-warning">
                    {{ $t('Inicia') }}: {{ cupon.expide | fecha('LL') }} & {{ $t('Termina') }}: {{ cupon.vence | fecha('LL') }} | {{ $t('Disponibles') }}: {{
                      cupon.disponibles }} | {{ $t('Valor') }}: {{ cupon.precio | currency(cupon.divisa ? cupon.divisa.iso : 'USD') }}
                </strong>

              </section>
    
              <!-- <b-button-group size="sm">
            </b-button-group> -->

          </section>
        </template>
            <section class="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap">

                <article class="d-flex justify-content-center flex-grow-0 flex-shrink-1 align-items-center">
                      <b-img :src="`${$root.api_uri}/storage/negocios/cupones/${cupon.imagen}`" class="img-card" style="max-width:320px"/>
                </article>

                <main class="flex-grow-1 flex-chrink-0 mt-1 mt-md-0 ml-1">
              
                  <h4 :title="cupon.nombre" class="text-warning">
                      {{ $t(cupon.nombre) }}
                  </h4>
              
                  <p class="text-justify" :title="$t(cupon.nombre)" >
                      {{ $t(cupon.descripcion) }}
                  </p>

                  <section class="d-flex justify-content-between flex-wrap">
                      <article class="d-flex flex-column mr-md-1">
                        <strong class="text-warning font-weight-bolder">{{$t('Condiciones')}}</strong>
                        <p class="text-justify">
                            {{ $t(cupon.condiciones) }}
                        </p>
                      </article>

                      <article class="d-flex flex-column ">
                        <strong class="text-warning font-weight-bolder ">{{ $t('Restricciones') }}</strong>
                        <p class="text-break text-justify">
                            {{ $t(cupon.restricciones) }}
                        </p>
                      </article>
                
                  </section>

          
                </main>

            </section>
    </b-modal>
  </b-row>
</template>


<script>

import {
  BCard,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BLink,
  BBadge,
  VBTooltip,
  BModal,
  BImg
} from 'bootstrap-vue'


import store from '@/store'

import { toRefs, ref, computed, onMounted, watch,inject } from 'vue'
import useCuponesList from '@core/utils/cupones/useCuponesList.js'

import useAuth from '@core/utils/useAuth';


export default {

  components: {
    BCard,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BLink,
    BBadge,
    Listado: () => import('components/Listado.vue'),
    BModal,
    BImg,
    agendar:() => import('components/agendar.vue')

  },

  props: {
    negocios: Array,
    destino: Object,
    atraccion: Object,

    titulo: {
      type: String,
      default: 'Cupones Travel Points'
    },

    subTitulo: {
      type: String,
      default: 'Descubre increíbles descuentos y regalos gratis disponibles en tu destino.'
    }
  },

  directives: {
    'b-tooltip': VBTooltip
  },

  setup(props) {

    const { negocios, destino, atraccion } = toRefs(props)
    const isShowCupon = ref(false)
    const {cupon} = toRefs(store.state.cupones)
    const actions = useCuponesList({ destino: destino.value ? destino : null })
    const {usuario} = toRefs(store.state.usuario)
    const swal = inject('swal')
    const i18n = inject('i18n')
    const api_uri = computed(() => axios.getUri() ?? '')

    onMounted(() => actions.refetchData());
    watch(() => destino.value.id, () => actions.refetchData());

    const showCupon = (cup) => {
      store.commit('cupones/setCupon',cup)
      isShowCupon.value = true
    }   
    
    const {
      is_loggin
    } = useAuth();

    const loQuiero = (cup) => {
      swal({
        title:i18n.t('¿Quieres reservar el cupón?'),
        icon:'question',
        confirmButtonText:i18n.t('Sí, lo quiero!'),
        cancelButtonText:i18n.t('No, no lo quiero'),
        showCancelButton:true,
      }).then(({isConfirmed,isDenied,isDismiseed}) => {
        if(isConfirmed){
          store.dispatch('cupones/reservarCupon',{usuario:usuario.value.id,cupon:cup.id})
          .then(({result,cupon,mensaje}) => {
            if(result){
              toast.success(mensaje)
              actions.refetchData();

            }else{
              toast.info(mensaje)
            }
          })
        }
      })
    }


    return {
      api_uri,
      actions,
      cupones:actions.items,
      isShowCupon,
      cupon,
      showCupon,
       getVariantStatus: (cupo) => {
        let fecha_actual = moment();

        let fecha_inicio = moment(cupo.expide);
        let fecha_termina = moment(cupo.vence);

        return fecha_actual.isBetween(fecha_inicio, fecha_termina) ? 'success' : 'danger'

      },
      is_loggin,
      loQuiero,
      getStatusCupon: (cupo) => {
        let fecha_actual = moment();

        let fecha_inicio = moment(cupo.expide);
        let fecha_termina = moment(cupo.vence);

        if (fecha_actual.isAfter(fecha_termina)) {
          return i18n.t('Expirado');
        }

        return fecha_actual.isBetween(fecha_inicio, fecha_termina) ? i18n.t('Activo') : i18n.t('No Activo')
      
      },
    }
  }


}

</script>

<style lang="scss">
.cards-simple-wrapper {
  margin-bottom: -30px;
}

.card-simple {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-backface-visiblity: hidden;
  margin-bottom: 30px;
  overflow: hidden;
  transform: translateZ(0px);
}

.card-simple:hover .card-simple-background:before {
  opacity: 1;
  -webkit-transform: translateY(0%);
  -ms-transform: translateY(0%);
  transform: translateY(0%);
  -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-label {
  margin-top: -25px;
}

.card-simple:hover .card-simple-content,
.card-simple:active .card-simple-content {
  padding-top: 0px;
  transform: translateX(-50%) translateY(-50%);
  -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-rating {
  opacity: 1;
  transition-delay: .05s;
  -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-actions {
  opacity: 1;
  transition-delay: .1s;
  -webkit-backface-visiblity: hidden;
}

.card-simple-background {
  height: 200px;
  position: relative;
}

.card-simple-background img {
  width: 100%;
}

.card-simple-background:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(top, rgba(54, 54, 54, 0) 0%, rgba(54, 54, 54, 0.7) 75%);
  background: linear-gradient(to bottom, rgba(54, 54, 54, 0) 0%, rgba(54, 54, 54, 0.7) 75%);
  content: '';
  opacity: 1;
  -webkit-transform: translateY(50%);
  -ms-transform: translateY(50%);
  transform: translateY(50%);
  transition: all ease .35s;
}

.card-simple-background:after {
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0px;
  content: '';
  display: block;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;
}

.card-simple-label {
  background-color: #e6b42e;
  color: #fff;
  left: 50%;
  font-size: 13px;
  padding: 3px 15px;
  position: absolute;
  top: 0px;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  transition: all ease .35s;
  z-index: 2;
}

.card-simple-label a {
  color: #fff;
}

.card-simple-label a:hover {
  color: #fff;
  text-decoration: none;
}

.card-simple-content {
  left: 50%;
  padding-top: 85px;
  position: absolute;
  top: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transition: all ease .35s;
  width: 100%;
  z-index: 2;
}

.card-simple-content h2 {
  color: #fff;
  display: block;
  font-size: 20px;
  margin: 0px;
  overflow: hidden;
  padding: 0px 20px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-simple-content h2 a {
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.card-simple-content h2 a:hover {
  text-decoration: none;
}

.card-simple-rating {
  color: #ffd925;
  margin-top: 10px;
  opacity: 0;
  font-size: 15px;
  text-align: center;
  transition: all ease .35s;
  display: flex;
  justify-content: center;

}

.card-simple-rating i {
  margin-right: 2px;
}

.card-simple-actions {
  color: #fff;
  margin-top: 20px;
  opacity: 0;
  text-align: center;
  transition: all ease .35s;
}

.card-simple-actions .fa,
.card-simple-actions .far,
.card-simple-actions .fas {
  border: 1px solid #fff;
  border-radius: 50%;
  color: #fff;
  height: 32px;
  margin: 0px 6px;
  padding-top: 8px;
  transition: all ease .2s;
  width: 32px;
}

.card-simple-actions .fa:hover {
  background-color: #fff;
  color: #363636;
}

.card-simple-actions .fa-search {
  font-size: 18px;
  height: 40px;
  padding-top: 9px;
  width: 40px;
}

.card-simple-price {
  background-color: #0082b7;
  bottom: 0px;
  color: #fff;
  font-size: 13px;
  left: 50%;
  padding: 3px 15px;
  position: absolute;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2;
}
</style>


<style lang="scss">
.img-card {
  max-width: 240px !important;
  object-fit: contain;
  height: 100%;
  object-position: center center;
}
</style>