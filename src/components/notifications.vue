<template>
<div>

  <b-nav-item-dropdown class="dropdown-notification mr-25" menu-class="dropdown-menu-media" lazy right @show="refreshNotificacion()">
    <template #button-content>
      <feather-icon
        :badge="cantidad"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex py-1">
        <h4 class="notification-title mb-0 mr-auto">
          {{$t('Notificaciones')}}
        </h4>

     

        <b-badge
          pill
          variant="light-primary"
        >
          {{ cantidad }} {{$t('sin leer')}}

        </b-badge>
      </div>

      <div class="dropdown-header pb-1 pt-0" v-if="sinleer.length > 0">

          <b-button-group size="sm">
             <b-button  variant="outline-dark" @click="todoleido()" size="sm" v-b-tooltip.hover.top="$t('Marcar todos como leído')">
                {{ $t('Marcar todos como leído') }}
            </b-button>

            <b-button variant="outline-dark" v-if="formulario.notificaciones.filter(val => val.seleccionado).length > 0" @click="marcarLeido()" v-b-tooltip.hover.top="$t('Marcar como leídos')" >
              <feather-icon icon="EyeIcon" size="12"/>
            </b-button>

            <b-button variant="outline-dark" v-if="formulario.notificaciones.filter(val => val.seleccionado).length > 0" @click="eliminarSeleccionadas()" v-b-tooltip.hover.top="$t('Eliminar seleccionadas')" >
              <feather-icon icon="TrashIcon" size="12"/>
            </b-button>

          </b-button-group>
          
        
      </div>
    </li>
 
      <b-tabs content-class="mt-1" fill pills end>
        <b-tab>
          <template #title>
            <strong class="mr-1">{{ $t('Sin leer') }}</strong>
            <b-badge pill variant="primary">
                 {{sinleer.length}}
            </b-badge>
          </template>
          <section class="content-notificacion">

            <b-form-checkbox  size="md" inline v-for="(notification,i) in formulario.notificaciones" :key="i" v-model="notification.seleccionado" class="mt-1 ml-2 mr-1">
              <b-link>
                  <b-media @click="verNotificacion(notification)" class="notificacion-list">
                    <template #aside v-if="notification.data">
                      <b-avatar v-if="notification.data.usuario"
                        size="32"
                        :src="notification.data.avatar"
                        :text="notification.data.usuario"
                        :variant="notification.data.type"
                      />

                      <b-avatar v-else
                        size="32"
                        :variant="notification.data.type"
                      >
                        <feather-icon icon="CheckIcon" />
                      </b-avatar>

                    </template>

                 
                      <p class="media-heading">
                        <span class="font-weight-bolder" v-if="notification.data">
                          {{ notification.data.titulo }}
                        </span>
                        </p>
                        <small class="notification-text" v-if="notification.data">
                          {{ notification.data.mensaje[0].substring(0,30) }}{{ $t('...(seguir leyendo)') }}
                        </small>
                    
                    
                  </b-media>
                
              </b-link>
            </b-form-checkbox>
    
            </section>
        </b-tab>

        <b-tab title="Leidos" >

          <template #title>
            <strong class="mr-1">{{ $t('Leídos')  }}</strong>
            <b-badge pill variant="primary">
                 {{leidas.length}}
            </b-badge>
          </template>
         
          <section style="height:300px; overflow-y:auto">
      
            <b-link v-for="(notification,i) in leidas" :key="i" >
              <b-media @click="verNotificacion(notification)" class="p-1 notificacion-list">
                <template #aside>
                  <b-avatar v-if="notification.data.usuario"
                    size="32"
                    :src="notification.data.avatar"
                    :text="notification.data.usuario"
                    :variant="notification.data.type"
                  />

                  <b-avatar v-else
                    size="32"
                    :variant="notification.data.type"
                  >
                    <feather-icon icon="CheckIcon" />
                  </b-avatar>

                </template>
                  <section class="row">
                      <div class="col-12 col-md-8">
                        <p class="media-heading">
                          <span class="font-weight-bolder">
                            {{ notification.data.titulo }}
                          </span>
                        </p>
                        <small class="notification-text">
                          {{ notification.data.mensaje[0].substring(0,30) }}{{ $t('...(seguir leyendo)') }}
                        </small>
                      </div>

                      <div class="col-12 col-md-4">
                        <b-button-group size="sm"  class="btns">
                          <b-button variant="danger" v-b-tooltip.hover.top="$t('Eliminar Notificación')" @click.stop="eliminarNotification(notification.id)">
                            <feather-icon icon="Trash2Icon" size="12"/>
                          </b-button>

                          <b-button variant="dark" v-b-tooltip.hover.top="$t('Marcar como no leída')" @click.stop="noshowNotificacion(notification.id)">
                            <feather-icon icon="EyeOffIcon" size="12"/>
                          </b-button>
                        </b-button-group>
                      </div>
                    </section>

              </b-media>
            </b-link>
            </section>

        </b-tab>
      </b-tabs>

  </b-nav-item-dropdown>

    <b-modal id="modalNotification" content-class="shadow" no-close-on-esc  :title="notification.data.titulo" no-close-on-backdrop ref="modalNotificacion" @hide="cerrarNotification" centered size="lg">

      <p v-for="(mensaje,i ) in notification.data.mensaje" :key="i">{{ mensaje }}</p>

        <template #modal-footer>
          <div class="btn-group d-flex justify-content-start">
						
              <b-button @click="irNotification(notification.data.url)" v-if="notification.data.btn" variant="primary" size="sm">
                {{ notification.data.btnTitle }}
              </b-button>
							
          </div>
        </template>

    </b-modal>

</div>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox,BFormRadio,BModal,BTab,BTabs,BCard,BButtonGroup,VBTooltip,BFormCheckboxGroup
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

import {ref,onMounted, watch,toRefs,computed, onUnmounted,inject} from 'vue';

import store from '@/store';
import router from '@/router';


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
    BFormCheckboxGroup

  },
  directives: {
    'b-tooltip':VBTooltip,
    Ripple,
  },

  setup(props) {

    let {usuario} = toRefs(store.state.usuario)

    let { sinleer,leidas } = toRefs(store.state.notificacion);

    let seleccionados = ref([]);
    const i18n = inject('i18n')


    let formulario  = ref({
      notificaciones:[]
    })


    let cargarForm = () => {
       formulario.value.notificaciones = sinleer.value.map(val => {
        return {
          id:val.id,
          seleccionado:false,
          created_at:val.created_at,
          type:val.type,
          data:val.data,
        }
      })
    }


    cargarForm();

   

    let modalNotificacion = ref(null);
    
    const cargarNotificaciones = (usuario_id) => {
      
      if(usuario_id){
        store.dispatch('notificacion/cargarNotificaciones',usuario_id)
      }
      
    }
    
    onMounted(() => {
       
        cargarNotificaciones(usuario.value.id)

        //  Echo.private(`users.${usuario.value.id}`)
        //  .notification((noti) => {
        //     cargarNotificaciones(usuario.value.id)
        //  })
         
         
    })

    onUnmounted(() => {
      // Echo.leaveChannel(`users.${usuario.value.id}`)
    })
   
      const getFecha = (fecha) => {
         return moment(fecha).format('LLL');

      } 

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      // wheelPropagation: false,
    }

    const notification = ref({
      id:null,
      created_at:'',
      read_at:null,
      data:{
        titulo:''
      }
    });
    
   const verNotificacion = (notificat) => {
      notification.value = notificat
       modalNotificacion.value.show();
      
   }


    const cerrarNotification = () => {

      if(!notification.value.read_at){
          
          store.dispatch('notificacion/marcarLeida',
            {usuario:store.state.usuario.usuario.id,notificacion:notification.value.id}).then(respon => {
              toast.info(i18n.t('Notificación marcada como leída'))
              cargarNotificaciones(store.state.usuario.usuario.id)
            }).catch(e => {
              console.log(e)
            })
      }

      

    }

    const irNotification = (url) => {
      
      modalNotificacion.value.hide();

      router.push(url);
    }

    const refreshNotificacion = () => {

      if(usuario.value.id) {
        cargarNotificaciones(usuario.value.id)
      } 

    }

    const showNotificacion = (notification_id) => {

        store.dispatch('notificacion/marcarLeida',
            {usuario:usuario.value.id,notificacion:notification_id}).then(respon => {
              toast.info(i18n.t('Notificación marcada como leída'))
              cargarNotificaciones(store.state.usuario.usuario.id)
            }).catch(e => {
              console.log(e)
            })

    }

    const noshowNotificacion = (notificacion_id) => {

        store.dispatch('notificacion/marcarNoLeida',{usuario:usuario.value.id,notificacion:notificacion_id}).then(respon => {

          if(respon.data.result){
            toast.info(i18n.t('Se ha pasado a la bandeja de no leídas'))
            
          }else{
            toast.info(i18n.t('No se pudo marcar como no leída, inténtelo de nuevo'))
          }

        }).catch(e => {
          console.log(e)
        }).finally(() => cargarNotificaciones(usuario.value.id))


    } 

    const eliminarNotification = (notification_id) => {

      store.dispatch('notificacion/eliminar',{notificacion:notification_id,usuario:usuario.value.id}).then(({result}) => {
        console.log(result)
        if(result) {
          toast.info(i18n.t('Se ha eliminado con éxito la notificación.'))
          cargarNotificaciones(usuario.value.id);
        }else{
          toast.info(i18n.t('No se pudo eliminar la notificación, inténtelo de nuevo mas tarde.'))
        }

      }).catch(e => {
        console.log(e)
      })


    }

    const todoleido = () => {

      store.dispatch('notificacion/todoleido',usuario.value.id).then(respon => {

        if(respon.data.result){
          toast.info(i18n.t('Se ha marcado todo como leído'))
          cargarNotificaciones(usuario.value.id)
        }else{
          toast.info(i18n.t('Error en servidor inténtelo de nuevo mas tarde'))
        }

      }).catch( e => {
        console.log(e)
      })


    }

    const marcarLeido = () => {

      store.dispatch('notificacion/marcarSeleccionadosLeidos',{
        usuario:usuario.value.id,
        seleccionados:formulario.value.notificaciones.filter(val => val.seleccionado)
        })
      .then(respon => {
        if(respon.data.result){
          // Notification.info('Los seleccionados se han marcados c')
          cargarNotificaciones(usuario.value.id);
        }else{
          toast.info(i18n.t('La operación no tuvo éxito, inténtelo de nuevo mas tarde.'))
        }

      }).catch(e => {
        console.log(e)
      });
    }

    const eliminarSeleccionadas = () => {
      
      store.dispatch('notificacion/eliminarSeleccionados',{
        usuario:usuario.value.id,
        seleccionados:formulario.value.notificaciones.filter(val => val.seleccionado)
        })
      .then(({result}) => {

        if(result){
          cargarNotificaciones(usuario.value.id);
        }else{
            toast.info(i18n.t('La operación no tuvo éxito, inténtelo de nuevo mas tarde.'))
        }

      }).catch(e => {
        console.log(e)
      });
    }



    watch(usuario,(val) => {
      cargarNotificaciones(usuario.value.id);
    })

    watch(sinleer,(val) => {
      cargarForm();
    })

    return {

      perfectScrollbarSettings,
      cargarNotificaciones,
      getFecha,
      verNotificacion,
      cerrarNotification,
      notification,
      irNotification,
      modalNotificacion,
      usuario,
      refreshNotificacion,
      showNotificacion,
      eliminarNotification,
      noshowNotificacion,
      todoleido,
      sinleer,
      formulario,
      seleccionados,
      marcarLeido,
      eliminarSeleccionadas,
      loading:computed(() => store.state.loading),
      cantidad:computed(() => store.getters['notificacion/cantidad']),
      leidas
    }
  },
}
</script>

<style lang="scss" scope>

.notificacion-list:hover{
  .btns{
    display: flex !important;
  }
  
}

.btns{
  display: none;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}

.content-notificacion{
  height:300px; 
  overflow-y:auto; 
  display:flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap:wrap;

  >div{
    flex:1 1 auto;

    label{
      width:100%;
    }

  }


}

</style>


