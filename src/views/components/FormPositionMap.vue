<template>
    <b-container fluid>

      <b-row>
        <b-col cols="12" md="6">
            <b-form-group description="Escribe la dirección ">
              <template #label>
                Dirección: <span class="text-danger">*</span>
              </template>
            
              <validation-provider name="direccion" rules="required" #default="{ errors, valid }">
                <b-form-input v-model="formulario.direccion" :state="valid" />

                <b-form-invalid-feedback :state="valid">
                  {{ errors[0] }}
                </b-form-invalid-feedback>

              </validation-provider>
              </b-form-group>
        </b-col>

        <b-col  cols="12" md="6">
      
          <b-form-group description="Cual es el Aeropuerto mas cercano, selecciona el IATA Correspondiente">
            <template #label>
              IATA: <span class="text-danger">*</span>
            </template>
          
            <validation-provider name="iata_id" rules="required" #default="{ errors, valid }">
          
              <v-select v-model="formulario.iata_id" :reduce="(option) => option.id" :options="iatas" :filter="filterIata">
                <template #option="{ codigo, aeropuerto }">
                  <h6 style="margin: 0">{{ aeropuerto }}</h6>
                  <em> {{ codigo }}</em>
                </template>
          
                <template #no-options>
                  <span> No hay Códigos IATA registrados</span>
                </template>
          
                <template #selected-option="{ codigo, aeropuerto }">
                  <strong style="margin: 0">{{ aeropuerto }} - {{ codigo }}</strong>
                </template>
          
          
              </v-select>
          
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
          
            </validation-provider>
          </b-form-group>
      
        </b-col>

      </b-row>
      <b-row>
      
        <b-col cols="12">
          <el-divider content-position="left">Dirección</el-divider>
      
        </b-col>
      
        <b-col cols="12" md="4">
          <b-form-group>
            <template #label>
              Pais
            </template>
            <validation-provider name="pais_id" rules="required" #default="{ errors, valid }">
      
              <v-select v-model="pais_id" :reduce="(option) => option.id" :options="paises" label="pais" />
      
      
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-col>
      
        <b-col cols="12" md="4">
      
          <b-form-group>
            <template #label>
              Estado: <span class="text-danger">*</span>
            </template>
      
            <validation-provider name="estado_id" rules="required" #default="{ errors, valid }">
      
              <v-select v-model="formulario.estado_id" @input="cargarCiudades($event)" :reduce="(option) => option.id"
                :options="estados" label="estado" />
      
      
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
      
        </b-col>
      
        <b-col cols="12" md="4">
          <b-form-group>
            <template #label>
              Ciudad:
            </template>
            <validation-provider name="ciudad_id" #default="{ errors, valid }">
      
              <v-select v-model="formulario.ciudad_id" :reduce="(option) => option.id" :options="ciudades" label="ciudad" />
      
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </b-form-group>
        </b-col>

         

      </b-row>
      
      
      <!-- google map -->
      <b-row>
        <b-col>
      
          <div class="d-none">
            <gmap-autocomplete class="col-12 py-1" style="z-index:8000 !important" @place_changed="setPlace($event, formulario)" #default="{ attrs, listeners }" id="myAutocomplete" slotRefName="inputAutocomplete">
                <b-input-group class="col-md-6 mt-2" >
                  <b-input-group-prepend is-text>
                      <span class="fas fa-search text-black" aria-hidden="true"></span>
                  </b-input-group-prepend>
                
                  <b-form-input ref="inputAutocomplete"  v-bind="attrs" v-on="listeners" />
                </b-input-group>
            
            </gmap-autocomplete>
          </div>
      
          <GmapMap ref="input" :center="{
            lat: getLatitud(formulario.lat),
            lng: getLongitud(formulario.lng)
          }" :zoom="zoom_map" :options="options_map"
            style="width:100%; height:250px; display: flex; justify-content:center;">
            <GmapMarker :key="0" :position="{
              lat: getLatitud(formulario.lat),
              lng: getLongitud(formulario.lng)
            }" :visible="visibleMarker" :draggable="true" :clickable="true" :icon="iconMarker"
              @mouseup="moviendomapa($event, formulario)" @position_changed="posicionCambiada($event, formulario)">
              <GmapInfoWindow :options="optionsPlace">
              </GmapInfoWindow>
            </GmapMarker>
      
          </GmapMap>
      
        </b-col>
      </b-row>
      
      <!-- Lat y lng  -->
      <b-row>
        <b-col md="6">
      
          <b-form-group label="Latitud">
            <validation-provider name="lat" rules="required" #default="{ errors }">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <span class="fas fa-map-marked-alt"></span>
                </b-input-group-prepend>
      
                <b-form-input v-model="formulario.lat" :state="errors.length ? false : null" />
      
              </b-input-group>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
      
            </validation-provider>
      
          </b-form-group>
      
        </b-col>
      
        <b-col md="6">
      
          <b-form-group label="Longitud">
            <validation-provider name="lng" rules="required" #default="{ errors }">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <span class="fas fa-map-marked-alt"></span>
                </b-input-group-prepend>
                <b-form-input v-model="formulario.lng" :state="errors.length ? false : null" />
              </b-input-group>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
      
          </b-form-group>
      
        </b-col>

        

      </b-row>
    </b-container>
    
</template>

<script>

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BForm,
  BFormTextarea,
  BInputGroupPrepend,
  BInputGroup

 } from 'bootstrap-vue';

import useDireccion from '@core/utils/useDireccion'
import vSelect from 'vue-select'

import { computed, toRefs, ref, onMounted, watch } from 'vue'
import {
  ValidationProvider,
} from 'vee-validate'

export default {
  props:{

    formulario:{
      type:Object,
      default:{}
    }
  },


  components:{
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    BForm,
    BFormTextarea,
    BInputGroupPrepend,
    BInputGroup,
    ValidationProvider,
    vSelect,
    
  },

  setup(props){
      const {formulario} = toRefs(props)

     const {
         paises,
         ciudades,
         estados,
         cargarPaises,
         cargarEstados,
         cargarCiudades,
         pais_id, 
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

      } = useDireccion()
      
      onMounted(() => {
         cargarBuscador()
         cargarIatas()
         cargarform()
      })

    const cargarform = () => {

      if (formulario.value.id) {
        pais_id.value = formulario.value.estado.pais_id

        cargarEstados(pais_id.value)

        cargarCiudades(formulario.value.estado_id)
        optionsPlace.value.content = '<div><strong>' + formulario.value.nombre + '</strong>'
      }

    }

    watch([formulario],() => cargarform())
      
    return {
      paises,
      ciudades,
      estados,
      cargarPaises,
      cargarEstados,
      cargarCiudades,
      pais_id,

      buscadormap,
      visibleMarker,
      zoom_map,
      markers,
      iconMarker,
      input,
      optionsPlace,
      options_map,


      setPlace,
      moviendomapa,
      posicionCambiada,
      getLatitud,
      getLongitud,
      iatas,

      filterIata: (options, search) => {

        return options.filter(({ codigo, aeropuerto }) => {
          return (aeropuerto || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        })


      }
    }

  }
}
</script>