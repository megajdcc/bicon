<template>
  <div class="btn-agendar" v-if="is_loggin">
    <b-button variant="primary" @click.stop="agendar" v-b-tooltip.hover.left.v-dark="$t('Agendar')"  size="sm" >
      <font-awesome-icon icon="fas fa-calendar-plus" size="lg" />
    </b-button>
  </div>
</template>

<script>

import {
  BButton,
  BButtonGroup,
  VBTooltip

} from 'bootstrap-vue'

import {toRefs,ref,computed,inject,watch} from 'vue'
import useAuth from '@core/utils/useAuth'
import store from '@/store'

export default {
  
  components:{
    BButton,
    BButtonGroup,
  },

  directives:{
    'b-tooltip':VBTooltip
  },

  props:{
    modelType:{
      type:String,
      default:"App\\Models\\Negocio\\Negocio"
    },
    modelId:{
      type:Number|String,
      required:true
    },
    modelName:String,
  },

  setup(props) {
    const {modelType,modelId, modelName } = toRefs(props)

    const showAgenda = inject('showAgenda')
    const tipoAgenda = inject('tipoAgenda')
    const sobre = inject('sobre')

    if(modelName.value){
      sobre.value =  modelName.value
    }

    const {
      is_loggin
    } = useAuth();
 
    const agendar = () => {
        store.commit('reunion/setModel',{model_id:modelId.value,model_type:modelType.value})
        tipoAgenda.value = 1
        sobre.value = modelName.value
        showAgenda.value = true;
        
    }
    return {
      is_loggin,
      agendar
    }

  },
}
</script>

<style lang="scss">
  .btn-agendar{
    position:absolute;
    left:auto;
    right:3%;
    top:3%;

    z-index:900;
  }

</style>