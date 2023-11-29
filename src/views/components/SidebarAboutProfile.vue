<template>
      <section>

       <b-sidebar :visible="showSidebarAboutProfile" @change="$emit('update:showSidebarAboutProfile', $event)"  
        sidebar-class="agenda-form-content" backdrop :width="getAncho > 720 ? '420px' : '320px'" no-header>
          <profile-about :about-data="aboutData" :showEditActive="showEditActive" @toggleActivePromotor="toggleActivePromotor"/>
        </b-sidebar>
         
    </section>
</template>


<script>

import {
  BSidebar,
  BRow,
  BCol,
  BContainer,
  BButtonGroup,
  BButton,
  BBadge,
  BLink,
  VBTooltip
} from 'bootstrap-vue'

import store from '@/store'
import {toRefs,ref,computed,watch,inject} from 'vue'
import { getFecha } from '@core/utils/utils'
export default {
  
  components:{
    BSidebar,
    BRow,
    BCol,
    BContainer,
    BButtonGroup,
    BButton,
    BBadge,
    BLink,
    ProfileAbout:() => import('components/profile/ProfileAbout.vue')
    
  },
  
  directives:{
    'b-tooltip': VBTooltip
  },

  props:{
    showSidebarAboutProfile:Boolean,
    userAbout:{
      type:Object,
      default:() => ({})
    },
    showEditActive:Boolean
  },


  model:{
    prop:'showSidebarAboutProfile',
    event:'update:showSidebarAboutProfile'
  },


  setup(props){

    const currentBreakpoint = computed(() => store.getters['app/currentBreakPoint'])
    const {usuario} = toRefs(store.state.usuario)
    const {userAbout} = toRefs(props)

    const toggleActivePromotor = (valor) => {
      store.dispatch('usuario/cambiarEstado',userAbout.value.id)
    }

    return {
      toggleActivePromotor,  
      currentBreakpoint,
      loading:computed(() => store.state.loading),
      getAncho: computed(() => store.state.app.windowWidth),
      aboutData: computed(() => {
        if(userAbout.value.nombre){
          return {
            nombre: userAbout.value.nombre ? userAbout.value.nombre + " " + userAbout.value.apellido : userAbout.value.username,
            portada: userAbout.value.portada || '/storage/img-portada/banner-travel.jpg',
            avatar: userAbout.value.avatar,
            direccion: userAbout.value.direccion,
            rol: userAbout.value.rol ? userAbout.value.rol.nombre : '',
            pais: userAbout.value.ciudad ? userAbout.value.ciudad.estado.pais.pais : '',
            'teléfono': userAbout.value.telefonos && userAbout.value.telefonos.length ? `<a href="tel:${ userAbout.value.telefonos && userAbout.value.telefonos.length ? userAbout.value.telefonos[0].telefono : ''}">${ userAbout.value.telefonos && userAbout.value.telefonos.length ? userAbout.value.telefonos[0].telefono : ''}</a>` : null,
            'Registrado desde': getFecha(userAbout.value.created_at),
            'Sitio web': userAbout.value.website ?  `<a href="${userAbout.value.website}" target="_blank">${userAbout.value.website}</a>` : null,
            email: `<a href="mailto:${userAbout.value.email}" target="_blank">${userAbout.value.email}</a>`,
            'Acerca': userAbout.value.bio,
            activo:userAbout.value.activo ? 'Sí' : 'No',
            userNivels: userAbout.value.user_nivels
          }
        }else{
          return {}
        }
      })

    }
  }

}
</script>

<style lang="scss">
.agenda-form-content{
  z-index: 1010 !important;
  position: fixed;
}
</style>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>
