<template>
  <b-modal v-model="show" size="xl"  centered title="Como llegar" hide-footer @show="getDirections()" lazy >
      <b-container fluid>
        <b-row>
          <b-col cols="12" md="8">
                <GmapMap :zoom="zoom"
                    :center="origen"
                    map-type-id="roadmap"
                    style="width: 100%; height: 400px"
                    :options="{ styles: stylosMap }"
                    ref="refMap"
                    :streetViewControl="true"
                    :draggable="true"
                    >
                    <GmapMarker
                    :visible="true"
                    :draggable="true"
                    :icon="iconMapa"
                    :clickable="true"
                    :position="origen"
                    @mouseup="moviendomapa($event, 'origin')" @position_changed="posicionCambiada()">
                    <GmapInfoWindow :options="optionsPlace(usuario.id ? `${usuario.username}` :'Yo') " >
                    </GmapInfoWindow>
                </GmapMarker>

                <GmapMarker
                      :visible="true"
                      :draggable="false"
                      :icon="iconMapa"
                      :clickable="true"
                      :position="destination"
                      @mouseup="moviendomapa($event, 'destino')" @position_changed="posicionCambiada()"
                    >
                    <GmapInfoWindow :options="optionsPlace(destinoName)" >
                    </GmapInfoWindow>
                  </GmapMarker>
              <DirectionsRenderer :options="directionsOptions" :directions="directions" v-if="directions" />
            </GmapMap>
          </b-col>

          <b-col cols="12" md="4">
              <b-tabs class="show-directions" active-tab-class="mt-0" >
                <b-tab :title="$t('Ver detalles de la ruta')" active>
                  <div class="datails-direction">
                
                    <div v-if="direcciones">
                      <h2>{{ direcciones[0].summary }}</h2>
                      <ul>
                        <li v-for="({instructions, iconClass }, i) in direcciones[0].legs[0].steps" :key="i" style="text-decoration: none; list-style:none" >
                          <font-awesome-icon :icon="['fas', iconClass]" size="lg" class="mr-1" />
                          <span v-html="instructions"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </b-tab>
                <template #tabs-end>
                    <li  class="nav-item">
                        <b-button role="button"  class="nav-link" variant="text" @click="openDirections">
                          <font-awesome-icon icon="fas fa-map-location-dot" />
                            {{ $t('Abrir en Google Maps') }}
                        </b-button>
                    </li>
                  </template>
              </b-tabs>
          </b-col>
        </b-row>
      </b-container>
  </b-modal>
</template>

<script>
import { 
  BModal,
  BButton,
  BTabs,
  BTab,
  BContainer,
  BRow,
  BCol
} from 'bootstrap-vue';
import DirectionsRenderer from './DirectionsRenderer.js';
import { helpers, getGoogleMapsAPI } from 'gmap-vue';
import {computed,ref,toRefs,watch,onMounted} from 'vue';
import useMap from '@core/utils/useMap';
import store from "@/store"
export default {
  components: {
    BModal,
    BButton,
    BTabs, BTab,
    BContainer,
    BRow,
    BCol, 
    DirectionsRenderer
  },
  props: {
    showDirections: Boolean,
    destination:{
      type:Object,
      default:() => ({
        lat: 0, 
        lng: 0
      })
    },
    origin: {
      type: Object,
      default: () => ({
        lat: 0,
        lng: 0
      })
    },
    destinoName:{
      type:String,
      default:'Destino'
    }
  },
  model: {
    prop: 'showDirections',
    event: 'update:showDirections'
  },

  setup(props,{emit}){
    const {showDirections,destination,origin} = toRefs(props);
    const { usuario } = toRefs(store.state.usuario)
    const show = ref(false)
    const goog = computed(() => getGoogleMapsAPI());
    const origen = ref({
      lat:0,
      lng:0
    })

    onMounted(() => {
      setTimeout(() => {
          origen.value = origin.value
          
      }, 600);
    })
   

    const center = ref({
      lat: 0, 
      lng: 0
    })

    const directionsOptions = ref({
      preserveViewport: true,
      suppressMarkers: true,
      draggable: true,
      polylineOptions: {
        strokeColor: '#0097CE',
        strokeOpacity: 0.7,
        strokeWeight: 4
      }
    })
    const zoom = ref(14)
    const directions = ref(null)
    const direcciones = ref(null)

    const refMap= ref(null)
    const {
      iconMap,
      iconMapa,
      stylosMap
    } = useMap();

    //  const getDirections = () => {

    //   setTimeout(() => {

    //       if (goog.value) {

    //       const directionsService = new goog.value.maps.DirectionsService();
    //       const placeOrigin = new goog.value.maps.LatLng(origen.value.lat, origen.value.lng)
    //       const placeDestination = new goog.value.maps.LatLng(destination.value.lat, destination.value.lng)

    //       const response = directionsService.route({
    //         origin: placeOrigin,
    //         destination: placeDestination,
    //         provideRouteAlternatives: false,
    //         travelMode: 'DRIVING',
    //       })

    //       response.then(res => {
    //         if (res.status == 'OK') {
    //           directions.value = res;
    //           console.log(directions.value)
    //           direcciones.value= res.routes;

    //         } else {
    //           console.error('Error al obtener las direcroutes[0].legs[0]ciones.');
    //         }
    //       }).catch(e => {
    //         if(e.code && e.code == "ZERO_RESULTS"){
    //           toast.info(e.message)
    //         }
    //         console.log(e)
    //       })

    //     } else {
    //       console.error('La API de Google Maps no se ha cargado correctamente.');
    //     }

    //   }, 300);
      

    // }

    const getDirections = () => {
      
      setTimeout(() => {
          if (goog.value) {
          const directionsService = new goog.value.maps.DirectionsService();
          const placeOrigin = new goog.value.maps.LatLng(origen.value.lat, origen.value.lng);
          const placeDestination = new goog.value.maps.LatLng(destination.value.lat, destination.value.lng);

          const response = directionsService.route({
            origin: placeOrigin,
            destination: placeDestination,
            provideRouteAlternatives: false,
            travelMode: 'DRIVING',
          });

          response.then(res => {
            if (res.status == 'OK') {
              directions.value = res;
              direcciones.value = res.routes;

              // Recorrer los pasos de dirección y asignar el nombre de la clase de Font Awesome
              direcciones.value[0].legs[0].steps.forEach(step => {
                const maneuver = step.maneuver;
                let iconClass = '';

                // Asignar el nombre de la clase de Font Awesome según la maniobra
                switch (maneuver) {
                  case 'turn-left':
                    iconClass = 'fa-arrow-left';
                    break;
                  case 'turn-right':
                    iconClass = 'fa-arrow-right';
                    break;
                  case 'turn-sharp-left':
                    iconClass = 'fa-undo-alt';
                    break;
                  case 'turn-sharp-right':
                    iconClass = 'fa-redo-alt';
                    break;
                  case 'turn-slight-left':
                    iconClass = 'fa-angle-left';
                    break;
                  case 'turn-slight-right':
                    iconClass = 'fa-angle-right';
                    break;
                  case 'uturn-left':
                    iconClass = 'fa-undo';
                    break;
                  case 'uturn-right':
                    iconClass = 'fa-redo';
                    break;
                  case 'merge':
                    iconClass = 'fa-compress-arrows-alt';
                    break;
                  case 'roundabout-left':
                    iconClass = 'fa-undo-alt';
                    break;
                  case 'roundabout-right':
                    iconClass = 'fa-redo-alt';
                    break;
                  case 'fork-left':
                    iconClass = 'fa-code-branch';
                    break;
                  case 'fork-right':
                    iconClass = 'fa-code-branch';
                    break;
                  case 'straight':
                    iconClass = 'fa-arrow-up';
                    break;
                  default:
                    iconClass = 'fa-map-marker-alt'; // Clase predeterminada si no hay coincidencia
                    break;
                }

                // Agregar la propiedad "iconClass" al paso de dirección
                step.iconClass = iconClass;
              });

            } else {
              console.error('Error al obtener las direcciones.');
            }
          }).catch(e => {
            if (e.code && e.code == "ZERO_RESULTS") {
              toast.info(e.message);
            }
            console.log(e);
          });
        } else {
          console.error('La API de Google Maps no se ha cargado correctamente.');
        }
      }, 300);
       
      
    }


    const  openDirections = () =>  {
      const originStr = `${origin.value.lat},${origin.value.lng}`;
      const destinationStr = `${destination.value.lat},${destination.value.lng}`;

      // Generar el enlace de ruta
      const link = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originStr)}&destination=${encodeURIComponent(destinationStr)}`;

      // Abrir el enlace en el navegador del dispositivo
      window.open(link);
    }

    watch(showDirections,(value) => {
      show.value = value;
    })

    watch(show,(value) => {
      emit('update:showDirections',value)
    })

    // watch(origin,() => {
    //   getDirections()
    // })

    const moviendomapa = (dato,to) => {
      
      if(to == 'origin'){
        // emit('originChange',{lat: Number(dato.latLng.lat()) ,lng: Number(dato.latLng.lng())})

        origen.value = { lat: Number(dato.latLng.lat()), lng: Number(dato.latLng.lng()) };
        getDirections();
      }else{
        // emit('destinoChange', { lat: Number(dato.latLng.lat()), lng: Number(dato.latLng.lng())})
        // origen.value = { lat: Number(dato.latLng.lat()), lng: Number(dato.latLng.lng()) };
        // getDirections();
      }
     
    }

    const posicionCambiada = (dato) => { }

    
    watch(origin,() => {
      origen.value = origin.value
    })


    return {
      moviendomapa,
      posicionCambiada,
      getDirections,
      show,
      directions,
      zoom,
      center,
      direcciones,
      goog,
      stylosMap,
      iconMap,
      iconMapa,
      refMap,
      openDirections,
      directionsOptions,
      usuario,
      optionsPlace: (to) => ({

        content: `<strong>${to}</strong>`,
        disableAutoPan: true
      }),
      origen
      
    }
  }
 
};
</script>

<style lang="scss" scoped>
  .datails-direction{
    max-height: 300px;
    overflow-y: auto;
  }

   .show-directions :deep(.tab-content){
    margin-top:.1rem !important;
  }


</style>
