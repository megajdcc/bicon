// Full Calendar Plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import { ref, computed, watch, onMounted } from 'vue'
import store from '@/store'

export default function userCalendar() {

  const refCalendar = ref(null)
  

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
    console.log('consultando')
    calendarApi.refetchEvents()
  }


 



  const isEventHandlerSidebarActive = ref(false)

  const isCalendarOverlaySidebarActive = ref(false)

  return {
    refCalendar,
    calendarApi,
    isCalendarOverlaySidebarActive,
    refetchEvents,
    isEventHandlerSidebarActive,
  }
}
