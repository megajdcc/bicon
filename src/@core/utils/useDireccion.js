
import store from '@/store'

import {ref,onMounted, watch } from 'vue'

export default function useDireccion(){

   const buscadormap = ref('');
   const visibleMarker = ref(true);
   const zoom_map = ref(10);
   const markers = ref([]);
   const iconMarker = ref('');
   const input = ref(null)


   const paises = ref([])
   const ciudades = ref([])
   const estados = ref([])

   const pais_id = ref(null)
   const estado_id =ref(null)
   const iatas = ref([])


   const cargarIatas = () => {
      store.dispatch('iata/getIatas').then((datos) => iatas.value = datos)

   }

   const cargarPaises = () => {

      axios.get(`/api/get/paises`).then(({data}) => {

         paises.value = data
      }).catch(e => {
         console.log(e)
      })
      

   }

   const cargarEstados = (pais_id) => {

      if(pais_id){
         axios.get(`/api/get/estados/${pais_id}`).then(({ data }) => {
            estados.value = data
         }).catch(e => {
            console.log(e)
         })
      }
      

   }

   const cargarCiudades = (estado) => {

      if(estado){
         axios.get(`/api/get/ciudades/${estado}`).then(({ data }) => {
            ciudades.value = data
         }).catch(e => {
            console.log(e)
         })
      }

   }

   onMounted(() => {
      cargarPaises()
   })



   const cargarBuscador = (elementId = 'myAutocomplete')  => {

      input.value.$mapPromise.then((map) => {

         var myControl = document.getElementById(elementId);
         myControl.index = 1;
         map.controls[google.maps.ControlPosition.TOP_LEFT].push(myControl);
      });
   }




   watch(pais_id,(val) => {
      cargarEstados(val)
   })

   watch(estado_id, (val) => {
      cargarCiudades(val)
   })

   const optionsPlace = ref({
      content: '<strong>Méxio City</strong>',
   })

   const options_map = ref({
      mapTypeControl: false,
      zoomControl: true,
   })

   const getLatitud = (lat) => {
      return Number(lat)
   }

   const getLongitud = (lng) => {
      return Number(lng);
   }

   const setPlace = (place,formulario) => {
      visibleMarker.value = false;
      var address = '';
      if (place.address_components) {
         address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
         ].join(' ');
      }

      zoom_map.value = 17

      formulario.lat = Number(place.geometry.location.lat());
      formulario.lng = Number(place.geometry.location.lng());

      iconMarker.value = {
         url: place.icon,
         size: new google.maps.Size(71, 71),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(17, 34),
         scaledSize: new google.maps.Size(35, 35)
      };

      visibleMarker.value = true;

      optionsPlace.value.content = '<div><strong>' + place.name + '</strong><br>' + address
   }


   const moviendomapa = (dato,formulario) => {
      formulario.lat = Number(dato.latLng.lat())
      formulario.lng = Number(dato.latLng.lng())
   }

   const posicionCambiada = (dato,formulario) => { }




   
   return {
      paises,
      ciudades,
      estados,
      cargarPaises,
      cargarEstados,
      cargarCiudades,
      pais_id,
      estado_id,

      buscadormap,
      visibleMarker,
      zoom_map,
      markers,
      iconMarker,
      input,
      optionsPlace,
      options_map,
      getLatitud,
      getLongitud,

      setPlace,
      moviendomapa,
      posicionCambiada,
      cargarBuscador,
      iatas,
      cargarIatas

   }

}