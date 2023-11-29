<template>
  <div>

    <strong :id="`popover-reactive-${event.id}`" class="text-wrap">{{ event.title.toUpperCase() }}</strong>
    <b-popover
      :target="getElementEvent"
      triggers="hover"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      custom-class="mi-popover"
      ref="popoverRef"
    >

          <template #title >
           {{ evento.titulo.toUpperCase() }}
         </template>

         <b-container fluid v-if="evento.id">
          
            <b-row>
               
               <b-col cols="12" v-if="evento.model_id">
                 <strong>Evento de: {{ evento.model ? evento.model.nombre : 'Sin definir' }}</strong>
               </b-col>

               <b-col cols="12">
                     <small class="text-uppercase">
                        Inicia <br> {{ evento.fecha_inicio | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                        <br> <span v-if="evento.fecha_fin">Finaliza <br>  
                           {{ evento.fecha_fin | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                        </span>
                     </small>
                 
               </b-col>

               <b-col cols="12">

                  <b-badge variant="primary">
                     {{ $store.getters['reunion/getStatus'](evento) }}
                  </b-badge>

                   <b-badge variant="info" >
                        {{ evento.recurrente ? 'Evento Recurrente' : 'Evento no recurrente' }}
                  </b-badge>

                  <b-badge variant="warning" v-if="evento.recurrente" v-b-tooltip.hover="'Tipo de recurrencia'">
                        {{ $store.getters['reunion/getRecurrencia'](evento) }}
                  </b-badge>

               </b-col>

               <b-col cols="12">
                  <el-divider content-position="left">Descripción</el-divider>
                  <div v-html="evento.descripcion" style="max-height:200px; overflow-y: scroll;"></div>
               </b-col>
            </b-row>
         </b-container>

         


    </b-popover>
     
  </div>
     
</template>

<script>

import {
  BPopover,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  VBTooltip,
  BCarousel,
  BCarouselSlide,
  BLink,
  BBadge
} from 'bootstrap-vue'

import {onMounted,ref,toRefs,watch,computed} from 'vue'

export default {
  components:{
    BPopover,
    BButton,
    BContainer,
    BRow,
    BCol,
    VBTooltip,
    BCarousel,
    BCarouselSlide,
    BButtonGroup,
    BLink,
    BBadge

  },

  directives:{
    'b-tooltip':VBTooltip
  },

  props:['event'],


  setup(props){
    const {event} = toRefs(props)
    const popoverShow = ref(false)
    const popoverRef = ref(null)

    return {
      popoverShow,
      popoverRef,
      getElementEvent:computed( () => document.querySelector(`.evento-${event.value.id}`)),
      evento:computed(() => event.value.extendedProps)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mi-popover{
    width:450px !important;
    min-width:450px !important;

  }

  strong{
    color:black ;
  }

  .dark-layout{
    strong{
      color:white !important;
    }
  }
</style>