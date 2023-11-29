<template>
  <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
    <div class="p-2">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        aria-controls="sidebar-add-new-event"
        :aria-expanded="String(isEventHandlerSidebarActive)"
        variant="primary"
        block
        :to="{name:negocio ? 'negocio.evento.create' : 'create.evento'}"
        v-if="$can('write','eventos') || $can('write','negocio eventos')" >
        Agregar Evento
      </b-button>

      <template v-if="!negocio">
         
        <el-divider content-position="left">Filtro</el-divider>

        <b-form-group>
          <b-form-checkbox-group :value="filterOption" @change="$emit('update:filterOption',$event)" :options="optionsFilter" stacked>
          </b-form-checkbox-group>
        </b-form-group>
        
      </template>
     
    </div>
  
  </div>
</template>

<script>
import {
  BButton, BFormGroup, BFormCheckboxGroup, BFormCheckbox, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import {ref} from 'vue'

export default {
  directives: {
    Ripple,
  },
  components: {
    BButton,
    BImg,
    BFormCheckbox,
    BFormGroup,
    BFormCheckboxGroup,
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      require: true,
    },

    filterOption:[],
    negocio:Boolean
  },

  model:{
    prop:'filterOption',
    event:'update:filterOption'
  },
  
  setup() {
    
    const optionsFilter = ref([
        {text:'Negocios',value:'App\\Models\\Negocio\\Negocio'},
        { text: 'Atracciones', value: 'App\\Models\\Atraccion' },
        { text: 'Destinos', value: 'App\\Models\\Destino' },
    ])

    return {
        optionsFilter
    }

  },
}
</script>
