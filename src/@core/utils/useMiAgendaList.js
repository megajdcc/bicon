
import store from '@/store'

import { ref, computed, onMounted, watch,h } from 'vue'

import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import { createPopper } from '@popperjs/core';


export default function useMiAgendaList(usuario = null) {

      const calendarApi = ref(null)
      const showEvent = ref(false)
      const refCalendar = ref(null)
      const filterOption = ref([]);
      // ------------------------------------------------
      // (UI) updateEventInCalendar
      // ------------------------------------------------
      const updateEventInCalendar = (updatedEventData, propsToUpdate, extendedPropsToUpdate) => {

      }

      // ------------------------------------------------
      // (UI) removeEventInCalendar
      // ------------------------------------------------
      const removeEventInCalendar = eventId => {

      }


      const refetchEvents = () => {
         

         calendarApi.value.refetchEvents()
      }


      const isEventHandlerSidebarActive = ref(false)

      const isCalendarOverlaySidebarActive = ref(false)

      watch([filterOption], () => refetchEvents())

      onMounted(() => {
            calendarApi.value = refCalendar.value.getApi()
            // calendarApi.value.render()
      })

      const fetchEvents = (info,next,failure) => { 

      if (!info) return

      // console.log(info.end.getDate())

      store.dispatch('reunion/fetchReunions',{
         start:info.start.valueOf(),
         end:info.end.valueOf(),
         filterOption:filterOption.value,
         usuario:usuario ? usuario.value.id: null
      }).then((reunions) => {h

         const eventos = reunions.map(val => {
            if(val.recurrente && val.tipo_recurrencia != 3){
               return {
                  title:val.titulo,
                  start:val.fecha_inicio,
                  end:val.fecha_fin,
                  id:val.id,
                  groupId:val.recurrencia.id_group,
                  daysOfWeek:val.recurrencia.dia_semana,
                  startTime:val.recurrencia.hora_inicio,
                  endTime:val.recurrencia.hora_fin,
                  allDay:val.all_dia,
                  extendedProps:val,
                  backgroundColor:colorRand(),
                  eventColor:colorRand(),
                  classNames:[`evento-${val.id}`],
                  startRecur:val.fecha_inicio,
                  endRecur:val.fecha_fin ? val.fecha_fin : null,
                  resourceEditable:false,
                  durationEditable:false,
                  startEditable:false, 
                  editable:false,
                  // display: 'background'
               }
            }
             let objectRecurrencia =  {
               title:val.titulo,
               start:val.fecha_inicio,
               end:val.fecha_fin,
               id:val.id,
               allDay:val.all_dia,
               backgroundColor:colorRand(),
               eventColor:colorRand(),
               classNames:[`evento-${val.id}`],
               extendedProps:val,

             }

            
             if(!val.all_dia && val.tipo_recurrencia == 3){
               let fecha_start = moment(val.fecha_inicio).format('YYYY-MM-DD')+' '+val.recurrencia.hora_inicio;
               let fecha_fin = moment(val.fecha_inicio).format('YYYY-MM-DD')+' '+val.recurrencia.hora_fin;

                  objectRecurrencia = {
                    title:val.titulo,
                    start:fecha_start,
                    end:fecha_fin,
                    id:val.id,
                    allDay:val.all_dia,
                    backgroundColor:colorRand(),
                    eventColor:colorRand(),
                    classNames:[`evento-${val.id}`],
                    extendedProps:val,
                  
                  }
                
              }

            return objectRecurrencia
         });

         next(eventos);
        
      }).catch(e => {
         console.log(e)
         failure(e)
         toast.info('Error trayendo Data', { position: 'bottom-right' })
      })

   }

   const eliminar = (reunion_id) => {
      store.dispatch('reunion/eliminar', reunion_id).then(({ result }) => {
         if (result) {
            toast.success('Se ha eliminado con éxito la reunion', { position: 'bottom-right' })
            refetchEvents();
            showEvent.value = false
         }
      })

   }



   const calendarOptions = ref({

      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      locale:esLocale,
      initialView: 'listMonth',
      dayMaxEvents: true, // allow "more" link when too many events
      headerToolbar: {
         start: 'sidebarToggle, prev,next, title',
        //  end: 'dayGridMonth,timeGridWeek,listMonth',
      },

      events:fetchEvents,
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'narrow',
        omitZeroMinute: true,
        hour12:true
      },
      timeZone: 'Europe/Madrid',
      editable: false,
      eventResizableFromStart: false,
      dragScroll: false,
      dayMaxEvents: 4,

      /*
         Determina si se puede hacer clics en los nombres de dias y semanas
         ? Docs: https://fullcalendar.io/docs/navLinks
      */
      navLinks: false,

      eventClick({ event: clickedEvent }) {
         // isEventHandlerSidebarActive.value = true
         store.commit('reunion/setReunion',clickedEvent.extendedProps)
         showEvent.value = true
      },

      customButtons: {
         sidebarToggle: {
            text: 'sidebar',
            click() {
               isCalendarOverlaySidebarActive.value = !isCalendarOverlaySidebarActive.value
            },
         },
      },

      dateClick(info) {
         isEventHandlerSidebarActive.value = true
      },


      eventDrop({ event: droppedEvent }) {

      },

     

      rerenderDelay: 350,
   })





   return {
      fetchEvents,
      eliminar,
      refCalendar,
      calendarApi,
      isCalendarOverlaySidebarActive,
      calendarOptions,
      refetchEvents,
      isEventHandlerSidebarActive,
      showEvent,
      filterOption
   }

}
