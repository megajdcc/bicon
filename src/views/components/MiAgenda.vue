<template>

  <section>

     <b-sidebar :visible="showAgenda" @change="$emit('update:showAgenda',$event)"  
      sidebar-class="agenda-form-content" backdrop :width="getAncho > 720 ? '650px' : '320px'" @shown="cargarReunions" title="Mi Agenda" >

        <full-calendar ref="refCalendar" :options="calendarOptions" class="full-calendar" >
            <template #eventContent="{ event }">
                   <b class="cursor-pointer">{{ event.title }}</b>
            </template>


          </full-calendar>

       
      </b-sidebar>


        <b-sidebar v-model="showEvent" :title="evento.titulo.toUpperCase()" :width="getAncho > 720 ? '650px' : '320px'" backdrop z-index="1060" >
           <template #title>
              {{ $store.getters['reunion/getTipo'].toUpperCase() +' - '+ evento.titulo.toUpperCase() }}
           </template>
           <b-container fluid>
              <b-row>
                 <b-col cols="12" v-if="evento.model_id">
                   <strong>Sobre el: {{ evento.model ? evento.model.nombre : 'Sin definir' }}</strong>
                 </b-col>

                 <b-col cols="12">
                       <small class="text-uppercase">
                          Inicia <br> {{ evento.fecha_inicio | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                          <br> <span v-if="evento.fecha_fin">Finaliza <br>  
                             {{ evento.fecha_fin | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                          </span>
                       </small>
                 
                 </b-col>

                 <b-col cols="12" class="my-1">

                    <b-badge variant="primary">
                       {{ $store.getters['reunion/getStatus'](evento) }}
                    </b-badge>

                     <b-badge variant="info" class="mx-1" >
                          {{ evento.recurrente ? `${$store.getters['reunion/getTipo']} Recurrente` : `${$store.getters['reunion/getTipo'] } no recurrente` }}
                    </b-badge>

                    <b-badge variant="warning" v-if="evento.recurrente" v-b-tooltip.hover="'Tipo de recurrencia'">
                          {{ $store.getters['reunion/getRecurrencia'](evento) }}
                    </b-badge>

                 </b-col>

                <b-col cols="12" v-if="evento.archivo">
                  <a :href="`${$root.api_uri}/storage/reunions/archivos/${evento.archivo}`" download class="text-dark">
                    <font-awesome-icon icon="fas fa-paperclip"/> Un Archivo adjunto
                  </a>
                </b-col>

                 <b-col cols="12">
                    <el-divider content-position="left">Descripción</el-divider>
                    <div v-html="evento.descripcion"></div>
                 </b-col>
              </b-row>
           </b-container>

           <template #footer>
              <b-container fluid class="mb-1">
                 <b-row>
                    <b-col>
                        <b-button-group size="sm" >

                          <b-button variant="danger" @click="eliminar(evento.id)" v-if="$can('delete', 'reunions')">
                            <font-awesome-icon icon="fas fa-trash"/>
                            Eliminar
                          </b-button>
                       </b-button-group>
                    </b-col>
                 </b-row>
              </b-container>
           
           </template>
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
import '@fullcalendar/core/vdom';
import FullCalendar from '@fullcalendar/vue'
import useMiAgendaList from '@core/utils/useMiAgendaList.js'

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
    FullCalendar,
    CardEventReunion:() => import('components/CardEventReunion.vue')
  },
  
  directives:{
    'b-tooltip': VBTooltip
  },

  props:{
    showAgenda:Boolean
  },


  model:{
    prop:'showAgenda',
    event:'update:showAgenda'
  },


  setup(props){

    const currentBreakpoint = computed(() => store.getters['app/currentBreakPoint'])

    const {usuario} = toRefs(store.state.usuario)
    const {reunions} = toRefs(store.state.reunion)
     const {
         fetchEvents,
         eliminar,
         refCalendar,
         isCalendarOverlaySidebarActive,
         calendarOptions,
         refetchEvents,
         isEventHandlerSidebarActive,
         calendarApi,
         showEvent,
         filterOption,
      } = useMiAgendaList(usuario);

    const cargarReunions = () => refetchEvents();

    return {
      currentBreakpoint,
      loading:computed(() => store.state.loading),
      cargarReunions,
      refCalendar,
      fetchEvents,
      eliminar,
      isCalendarOverlaySidebarActive,
      calendarOptions,
      refetchEvents,
      isEventHandlerSidebarActive,
      calendarApi,
      showEvent,
      filterOption,
      evento:computed(() => store.state.reunion.reunion),
      getAncho: computed(() => store.state.app.windowWidth),

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