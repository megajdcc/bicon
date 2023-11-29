<template>
  <b-card
    class="profile-header mb-2"
    :img-src="headerData.portada"
    img-top
    alt="cover photo"
    body-class="p-0"
  >
    <b-form-file ref="refInputElPortada" v-model="portadaFile" accept="image/*" :hidden="true" plain @input="cargarPortada" />

    <!-- profile picture -->
    <div class="position-relative">
      <div class="profile-img-container d-flex align-items-center" style="height:200px">
        <div class="profile-img align-self-end">
          <b-img
            :src="headerData.avatar"
            rounded
            fluid
            alt="Avatar"
          />
           <b-form-file ref="refInputEl" v-model="profileFile" accept="image/*" :hidden="true" plain @input="cargarImagen" />
        </div>
        <!-- profile title -->
        <div class="profile-title ml-3">
          <h2 class="text-white text-capitalize">
            {{ headerData.nombre ? `${headerData.nombre} ${headerData.apellido}` : headerData.username }}
          </h2>
          <p class="text-white" >
            {{ headerData.rol.nombre }}
          </p>

          <!-- <hr> -->
          <section class="d-flex align-items-center">
              <h2 class="mb-0">
                <strong class="text-white py-0"> {{ isoDivisa }}{{ miSaldo | currency({ symbol: simboloDivisa }) }}</strong>
              </h2>
              <b-button :to="{ name: 'tienda.travel' }" variant="outline-primary" size="sm" class="ml-1 d-flex align-items-center text-white">
                  <feather-icon icon="ShoppingCartIcon" class="mr-1 font-weight-bolder"/>
                  {{ $t('Ir a tienda') }}
              </b-button>
          </section>
        </div>
      
       
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->

    <!-- profile navbar -->
    <div class="profile-header-nav">
      <b-navbar
        toggleable="md"
        type="light"
      >
        <!-- toggle button -->
        <b-navbar-toggle
          class="ml-auto"
          target="nav-text-collapse"
        >
          <feather-icon
            icon="AlignJustifyIcon"
            size="21"
          />
        </b-navbar-toggle>
        <!--/ toggle button -->

        <!-- collapse -->
        <b-collapse
          id="nav-text-collapse"
          is-nav
        >
          <b-tabs
            pills
            class="profile-tabs mt-1 mt-md-0"
            nav-class="mb-0"
            small
          >
            <template #tabs-start>

               <!-- <b-dropdown :to="{ name: 'miperfil' }" active-class="active" v-if="$can('read', 'perfil')" right  variant="primary" class="mr-auto mr-1" dropup toggle-class="d-flex">
                  <template #button-content>
                      <feather-icon
                      icon="HomeIcon"
                      class="d-block d-md-none"
                    />
                    <span class="font-weight-bold d-none d-md-block">Perfil</span>
                  </template>

                  <b-dropdown-item :to="{ name: 'perfil.editar' }" exact active-class="active" v-if="$can('read', 'perfil')">
                      <font-awesome-icon icon="fas fa-id-card" />
                    Información de perfil
                  </b-dropdown-item>
                  

                </b-dropdown> -->

              <b-nav-item
                role="presentation"
                class="font-weight-bold mr-1"
                :to="{ name: 'miperfil' }"
                active-class="active"
                v-if="$can('read', 'perfil')"
               
              >
                <span class="d-none d-md-block">Perfil</span>
                <feather-icon
                  icon="HomeIcon"
                  class="d-block d-md-none"
                />
              </b-nav-item>

            

              <b-nav-item
                role="presentation"
                class="font-weight-bold mr-1"
                :to="{ name: 'socio.negocio.list' }" 
                active-class="active" 
                v-if="$can('read', 'socio negocios')"
              >
               <span class="d-none d-md-block">Negocio</span>
                <span class="fas fa-briefcase d-block d-md-none" />
              
              </b-nav-item>

              <b-nav-item
                role="presentation"
                class="font-weight-bold mr-1"
                :to="{ name: 'socio.reservaciones' }" 
                active-class="active"
                v-if="$can('read', 'socio reservaciones')"
              >
                <span class="d-none d-md-block">Reservaciones</span>
                <span class="fas fa-credit-card d-block d-md-none"></span>
              </b-nav-item>

              <b-nav-item role="presentation" class="font-weight-bold mr-1" :to="{ name: 'socio.compras' }" active-class="active" v-if="$can('read', 'socio compras')">
                <span class="d-none d-md-block">Compras</span>
                 <span class="fas fa-weight-hanging d-block d-md-none"></span>
              </b-nav-item>

              <b-nav-item role="presentation" class="font-weight-bold mr-1" :to="{ name: 'socio.consumos' }" active-class="active" v-if="$can('read', 'socio consumos')">
                  <span class="d-none d-md-block">Consumos</span>
                  <font-awesome-icon icon="fas fa-concierge-bell" class="d-block d-md-none" />
              </b-nav-item>

              <b-nav-item role="presentation" class="font-weight-bold mr-1" :to="{ name: 'socio.cupones' }" active-class="active" v-if="$can('read', 'socio cupones')">
                  <span class="d-none d-md-block">Mis Cupones</span> 
                 <font-awesome-icon icon="fas fa-tags" class="d-block d-md-none"  />
              </b-nav-item>

            
            </template>

          

            <!-- edit buttons -->
            <template #tabs-end>
               <b-dropdown id="dropdown-up" right  variant="primary" class="ml-auto" dropup toggle-class="d-flex">
                  <template #button-content>
                      <feather-icon
                      icon="EditIcon"
                      class="d-block d-md-none"
                    />
                    <span class="font-weight-bold d-none d-md-block">Editar</span>
                  </template>
                    <b-dropdown-item :to="{ name: 'perfil.editar' }" exact active-class="active" v-if="$can('read', 'perfil')">
                       <font-awesome-icon icon="fas fa-id-card" />
                      Información de perfil
                    </b-dropdown-item>
                    <b-dropdown-item  @click.stop="refInputEl.$el.click()">
                      <font-awesome-icon icon="fas fa-image-portrait" />
                      Cambiar Imagen de perfil
                    
                    </b-dropdown-item>
                    <b-dropdown-item @click.stop="cambiarPortada">
                      <font-awesome-icon icon="fas fa-panorama" />
                      Cambiar imagen de portada
                    </b-dropdown-item>

                    <b-dropdown-item :to="{ name: 'perfil.datos_pago' }" exact active-class="active"
                            v-if="$can('write', 'Datos de pago')">
                        <font-awesome-icon icon="fas fa-money-check-dollar" />
                        Datos de pago
                    </b-dropdown-item>

                     <b-dropdown-item :to="{ name: 'perfil.password' }" exact active-class="active" v-if="$can('write', 'perfil')">
                        <font-awesome-icon icon="fas fa-key" />
                        Cambiar contraseña
                    </b-dropdown-item>

                     <b-dropdown-item :to="{ name: 'perfil.desactivar' }" exact active-class="active" v-if="$can('write', 'perfil')">
                        <span class="fas fa-window-close"></span>
                        Desactivar Cuenta
                      </b-dropdown-item>

                  </b-dropdown>

            </template>

            <!-- edit buttons -->
          </b-tabs>

        </b-collapse>
        <!--/ collapse -->
      </b-navbar>
    </div>
    <!--/ profile navbar -->

    <!-- Porcentaje de perfil -->

    <div class="porcentaje-perfil">
         <!-- apex chart -->
            <vue-apex-charts
              type="radialBar"
              height="270"
              :options="porcentajeOptionsChart.chartOptions"
              :series="[getPorcentajePerfil]"
            />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BImg, BNavbar, BNavbarToggle, BCollapse, BTabs, BNavItem, BButton,BDropdown,BDropdownItem,
  BFormFile,BPopover
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import BannerTravel from '@images/banner/banner-travel.jpg';
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'

import {ref,computed, toRefs } from 'vue'
import store from '@/store'

export default {
  components: {
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
    BDropdown,
    BDropdownItem,
    BFormFile,
    VueApexCharts,
    BPopover
  },
  directives: {
    Ripple,
  },
  props: {
    headerData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props){
    const refInputEl = ref(null)
    const profileFile = ref(null)
    const portadaFile = ref(null)

    const refInputElPortada= ref(null)
    const {headerData:usuario} = toRefs(props)
    const porcentajeOptionsChart = ref({
      chartOptions: {
        plotOptions: {
          radialBar: {
            size: 150,
            offsetY: 20,
            startAngle: -150,
            endAngle: 150,
            hollow: {
              size: '60%',
            },
            track: {
              show:false,
              background: '#283046',
              strokeWidth: '100%',
              borderRadius:'50'
            },
            dataLabels: {
              name: {
                offsetY: -5,
                color: 'white',
                fontSize: '1rem',
                fontWeight:'bolder'
              },
              value: {
                offsetY: 15,
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold'

              },
            },
          },
        },
        colors: [$themeColors.primary],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: .5,
            gradientToColors: [$themeColors.danger],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          dashArray: 3,
        },
        labels: ['Perfil Completado'],
      },
    })

    const cargarImagen = (file) => {
          let form = new FormData();

          form.append('filepond', profileFile.value);

          axios.post('api/upload/avatar', form, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=something'
            }
          }).then(respon => {
            store.commit('usuario/updateAvatar', respon.data)

          }).catch(e => {
            console.log(e)
          })
    }

    const cargarPortada = (file) => {
      store.dispatch('usuario/updatePortada',{portada:portadaFile.value}).then(({result}) => {

        if(result){
          toast.success('Portada Actualizada con éxito')
        }
      }).catch(e => {
        
      })
    }

    const cambiarPortada = () => {
      console.log(refInputElPortada.value)
        refInputElPortada.value.$el.click()
    }

    return {
      BannerTravel,
      refInputEl,
      profileFile,
      portadaFile,
      cargarImagen,
      refInputElPortada,
      cargarPortada,
      cambiarPortada,
      porcentajeOptionsChart,
      getPorcentajePerfil:computed(() => redondeo(props.headerData.porcentaje_perfil,2)),
      miSaldo: computed(() => {
        return usuario.value.cuenta ? usuario.value.cuenta.saldo : 0
      }),

      isoDivisa: computed(() => {
        if (usuario.value.cuenta) {
          return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.iso : 'Tp'
        } else {
          return 'Tp'
        }
      }),
      simboloDivisa: computed(() => {
        if (usuario.value.cuenta) {
          return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.simbolo : '$'
        } else {
          return '$'
        }
      }),
    }

  }
}
</script>

<style lang="scss" scoped>
  .porcentaje-perfil{
    position: absolute;
    top: 0%;
    left: auto;
    right: auto;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    &::before{
      content: '';
      width: 100%;
      height: 100%;
      // background-color: #00000000;
      position: absolute;
      border-radius: 50% 50%;
    }
  }

  @media (min-width:620px){
       .porcentaje-perfil{
          position: absolute;
          top: -3%;
          left: auto;
          right: 0%;
          width: 240px;
          height: 250px;
          
        
        }
  }

  @media (min-width:920px){
       .porcentaje-perfil{
          top: 15%;
        }
  }

  .profile-tabs span{
    font-size: 10pt;
  }

  .porcentaje-perfil :deep(.apexcharts-datalabel-label),
  .porcentaje-perfil :deep(.apexcharts-datalabel-value){
    fill:white !important;
  }
</style>
