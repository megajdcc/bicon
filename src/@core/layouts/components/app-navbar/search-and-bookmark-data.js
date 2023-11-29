import {computed,onMounted,ref,toRef,toRefs, watch} from 'vue'
import store from '@/store'

/* eslint-disable */
// prettier-ignore


export default function dataSearchBookmars(){

  const paginas = ref({
    key: 'title',
    data: [
      { title: 'Home', route: { name: 'home' }, icon: 'HomeIcon', isBookmarked: false, resource: 'home', action: 'read' },

      { title: 'Billetera', route: { name: 'listar.movimientos' }, icon: 'ListIcon', isBookmarked: false, resource: 'billetera', action: 'read' },

      { title: 'Reservaciones', route: { name: 'listar.reservaciones' }, icon: 'CheckCircleIcon', isBookmarked: false, resource: 'reservaciones', action: 'read' },

      { title: 'Agencias', route: { name: 'listar.agencias' }, icon: 'ListIcon', isBookmarked: false, resource: 'agencias', action: 'read' },

      { title: 'Hoteles', route: { name: 'listar.hoteles' }, icon: 'HomeIcon', isBookmarked: false, resource: 'hotel', action: 'read' },

      { title: 'Amenidades', route: { name: 'listar.amenidades' }, icon: 'ListIcon', isBookmarked: false, resource: 'amenidades', action: 'read' },

      { title: 'Pagos', route: { name: 'listar.pagos' }, icon: 'DollarSignIcon', isBookmarked: false, resource: 'pagos', action: 'read' },

      { title: 'Integraciones', route: { name: 'api' }, icon: 'SettingsIcon', isBookmarked: false, resource: 'api', action: 'read' },

      { title: 'Ventas', route: { name: 'listar.ventas' }, icon: 'ListIcon', isBookmarked: false, resource: 'ventas', action: 'read' },

      { title: 'Usuarios', route: { name: 'listar.usuarios' }, icon: 'UsersIcon', isBookmarked: false, resource: 'usuarios', action: 'read' },

      { title: 'Roles', route: { name: 'listar.roles' }, icon: 'KeyIcon', isBookmarked: false, resource: 'roles', action: 'read' },

      { title: 'Bancos', route: { name: 'listar.bancos' }, icon: 'ListIcon', isBookmarked: false, resource: 'bancos', action: 'read' },


      { title: 'Observaciones', route: { name: 'listar.observaciones' }, icon: 'MessageSquareIcon', isBookmarked: false, resource: 'observaciones', action: 'read' },

      { title: 'Actualizaciones', route: { name: 'listar.actualizaciones' }, icon: 'ListIcon', isBookmarked: false, resource: 'actualizaciones', action: 'read' },

      { title: 'Depositos', route: { name: 'depositos' }, icon: 'DollarSignIcon', isBookmarked: false, resource: 'depositos', action: 'read' },

      { title: 'Plantillas', route: { name: 'listar.plantillas' }, icon: 'ListIcon', isBookmarked: false, resource: 'plantillas', action: 'read' },

      // { title: 'Analytics Cards', route: { name: 'card-analytic' }, icon: 'CreditCardIcon', isBookmarked: false },
      // { title: 'Apex Chart', route: { name: 'charts-apex-chart' }, icon: 'PieChartIcon', isBookmarked: false },
      { title: 'Bodas', route: { name: 'listar.bodas' }, icon: 'HeartIcon', isBookmarked: false },
    ],
  });

  const bodas = ref({key:'title',data:[]})  

  // const reservaciones = ref({key:'title',data:[]})

  const { bodas:matrimonios} = toRefs(store.state.boda)
  // const { reservaciones:reservas } = toRefs(store.state.reserva)

  const cargarForm = () => {
    if (matrimonios.value.length) {

      bodas.value.data = matrimonios.value.map(val => {
        return {
          novios: `${val.novios.novia} & ${val.novios.novio}`,
          title: `${val.novios.novia} & ${val.novios.novio}`,
          icon: 'HeartIcon',
          route: { name: 'rooming.list', params: { id: val.id } }
        }

      })

    } else {
      store.dispatch('boda/cargarBodas')
    }

    // if (reservas.value.length) {
    //   reservaciones.value.data = reservas.value.map(val => {
    //     return {
    //       novios:(val.boda) ? `${val.boda.novios.novia} & ${val.boda.novios.novio}` : 'Sin definir',
    //       title: (val.boda) ? `${val.invitado} - ${val.boda.novios.novia} & ${val.boda.novios.novio} - ${val.nro_reserva}` : `${val.invitado} - ${val.nro_reserva}`,
    //       icon: 'CheckCircleIcon',
    //       route:(val.boda) ? { name: 'rooming.list', params: { id: val.boda.id } } : {name:'home'}
    //     }
    //   })
    // } else {
    //   store.dispatch('reserva/cargarReservaciones')
    // }
  }
  onMounted(() => cargarForm())

  watch(matrimonios, () => {
    cargarForm();
  })


  return {
    paginas,
    bodas,
    // reservaciones
  }

}
/* eslint-enable */
