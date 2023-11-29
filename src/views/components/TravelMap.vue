<template>
    <b-container fluid class="mx-0 px-0">
      <b-row>
        <b-col cols="12">

          <GmapMap
              :center="origenMap"
              :zoom="zoom"
              map-type-id="terrain"
              style="width: 100%; height: 600px"
              :options="{ styles: stylosMap, gestureHandling:'greedy' }"
              ref="refMap"
              @zoom_changed="zoomChange" 
            >
            <GmapMarker
              :visible="true"
              :draggable="false"
              :icon="iconMapa"
              :clickable="true"
              v-for="(travel, i) in locations"
              :key="i"
              @click="travelSelected($event,travel)"
              :position="{
                lat: Number(travel.lat),
                lng: Number(travel.lng)
              }"
            >
            <GmapInfoWindow  :opened="showInfoWindow" :options="optionsPlace(travel)" >
            </GmapInfoWindow>
          </GmapMarker>
          
          </GmapMap>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import store from '@/store'
import {toRefs,ref,computed,watch,onMounted} from 'vue'
import useMap from '@core/utils/useMap';
import router from '@/router';
import { useGeolocation } from '@vueuse/core'
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BImg,
  BLink,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormTextarea,
  BForm,
  VBTooltip,
  BFormRadioGroup,
  BFormCheckbox,
  BPopover
} from 'bootstrap-vue'



export default {
  
  components:{
    BContainer,
    BRow,
    BCol,
    BButton,
    BImg,
    BLink,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormTextarea,
    BForm,
    BFormRadioGroup,
    BFormCheckbox,
    BPopover
  },

  props:{
    destino:String|Number
  },

  directives:{
    'b-tooltip' : VBTooltip
  },


  setup(props,{emit}){

    const {destino} = toRefs(props)
    const {destino:origen} = toRefs(store.state.destino)
    const options_map = ref({})
    const refMap = ref(null); 
    const travels = ref([]);
    const showInfoWindow = ref(false);
    const zoom = ref(16)
    const initCoord = ref(false);
    const origin = ref({
      lat:0,
      lng:0
    })

    const {
      coords,localteAt,error,resume,pause
    } = useGeolocation();

    const cargarForm = () => {
      axios.get(`/api/travels/map/destino/${destino.value}`).then(({data}) => {
    
        travels.value = data
      }).catch(e => console.log(e))
    }
    

    cargarForm();

    const {
      iconMap,
      iconMapa,
      stylosMap
    } = useMap();

    watch(destino,() => {
        cargarForm()
    })

    const zoomChange = ( val ) => {
      zoom.value = val
      if(val < 13){
        showInfoWindow.value = false
      }else{
        showInfoWindow.value = true
      }
    }   


    const travelSelected = (mark,travel) => {
      router.push(travel.ruta)
    }

    const getRutaTravel = (travel) => {

        switch (travel.tipo) {
          case 'Destino':
            return {path:travel.ruta}
            break;

          case 'Atracción':
            return { path: travel.ruta }
          break;

          case 'Negocio':
            return { path: `/negocio/${travel.url}` }
          break;
        
          default:
            return { path:'#'}
            break;
        }
    }
    
    const  miLocation =  computed(() => {
      return { lat: coords.value.latitude, lng: coords.value.longitude }
    });

    const locations = computed(() => {
      const travelsPoints = travels.value.map(val => ({
        lng: val.lng,
        lat: val.lat,
        nombre: val.nombre ? val.nombre : 'Sin definir',
        direccion: val.direccion ? val.direccion : '',
        ruta: getRutaTravel(val),
        tipo: val.tipo,
      }))

      travelsPoints.push({
          lat: miLocation.value.lat,
          lng: miLocation.value.lng,
          nombre: "Yo",
          direccion: '',
      })
      return travelsPoints;
     
    })

    onMounted(() => {
      setTimeout(() => {
        showInfoWindow.value = true
      },1500)
      origin.value.lat = coords.value.latitude != 0 ? coords.value.latitude : Number(origen.value.lat)
      origin.value.lng = coords.value.longitude != 0 ? coords.value.longitude : Number(origen.value.lng)

    })

    const asignarLocation =() => {
      origin.value.lat = coords.value.latitude != 0 ? coords.value.latitude : Number(origen.value.lat)
      origin.value.lng = coords.value.longitude != 0 ? coords.value.longitude : Number(origen.value.lng)
      initCoord.value = true
    }

    watch(coords , () => {
      if(!initCoord.value){
        asignarLocation()
      }
    })

    return {
      loading:computed(() => store.state.loading),
      iconMap,
      iconMapa,
      stylosMap,
      zoom,
      zoomChange,
      options_map,
      refMap,
      travels,
      travelSelected,
     
      origen,
      locations,
      optionsPlace: (travel) => ({
        content: travel.tipo ? `<small>${travel.tipo.toUpperCase()}: ${travel.nombre}<br>${travel.direccion}</small>` : 'Yo',
        disableAutoPan:true
      }),

      promedioLatitud:computed(() => {
          let sum = 0;

          travels.value.forEach((val) => {
            sum += Number(val.lat) || 0;
          });

          let result = sum / travels.value.length;
          return Number.isFinite(result) ? result : 0; // Verificar si el resultado es finito
        }),

        promedioLongitud: computed(() => {
          let sum = 0;

          travels.value.forEach((val) => {
            sum += Number(val.lng) || 0;
          });

          let result = sum / travels.value.length;
          return Number.isFinite(result) ? result : 0; // Verificar si el resultado es finito
        }),
        showInfoWindow,
        origenMap:computed(() => origin.value),

    }
  }
}
</script>