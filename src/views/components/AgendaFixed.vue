<template>
  <section class="content-agenda" v-if="is_loggin" :style="{bottom:y >= 250 ? '12%' : '5%'}">

      <b-button variant="primary" class="mb-1 agenda-option agenda-option-recordatorio" :class="{'show' : isShowOption, 'scroll' : y > 250} " size="sm" :title="$t('Recordatorio')" v-b-tooltip.hover.left.v-danger @click="toggleAgenda(1)">
              <font-awesome-icon icon="fas fa-user-clock" size="lg" />
      </b-button>

     <b-button variant="primary" class="mb-1 agenda-option agenda-option-tarea"  :class="{ 'show': isShowOption, 'scroll': y > 250 }" size="sm" :title="$t('Tarea')" v-b-tooltip.hover.left.v-danger @click="toggleAgenda(2)" >
             <font-awesome-icon icon="fas fa-clipboard-check" size="lg" />
      </b-button>


     <b-button variant="primary" class="mb-1 agenda-option agenda-option-evento"  :class="{ 'show': isShowOption, 'scroll': y > 250 }" size="sm" :title="$t('Evento')" v-b-tooltip.hover.left.v-danger  @click="toggleAgenda(3)">
           <font-awesome-icon icon="fas fa-calendar-day" size="lg" />
      </b-button>

     <div class="agenda-fixed">
      <b-button variant="primary" class="rounded btn-calendar" @click="toggleOptions">
        <font-awesome-icon :icon="['fas', !isShowOption ? 'fa-calendar-plus' : 'fa-calendar-minus']" size="2x" />
      </b-button>
    </div>

   
  </section>
 
</template>


<script>

import {toRefs,ref,computed,inject} from 'vue'
import { useWindowScroll } from '@vueuse/core'
import useAuth from '@core/utils/useAuth';
import {
  BButton,
  VBTooltip
} from 'bootstrap-vue'

export default {
  
  
  components:{
    BButton,
  },

  directives:{
    'b-tooltip':VBTooltip
  },

  setup(props){

    const isShowOption = ref(false)
    
    const { y } = useWindowScroll()

    const tipoAgenda = inject('tipoAgenda')
    const showAgenda = inject('showAgenda')


    const {
      is_loggin
    } = useAuth();  


    const toggleOptions = () => {
      isShowOption.value = !isShowOption.value
    }


    const toggleAgenda = (tipo) => {
      tipoAgenda.value = tipo
      showAgenda.value = true
    }

    return {
      is_loggin,
      toggleOptions,
      isShowOption,
      y,
      toggleAgenda,
    }

  }

}
</script>

<style lang="scss" scoped>

  .content-agenda{

    position: fixed;
    right: 30px;
    z-index: 1010;
    display: flex;
    flex-direction: column;
    align-items:flex-end;
    width: 60px;
    height: auto;
    transition: all .5s ease;

    .agenda-option-tarea{
       &.show{
      bottom: 24%;

      position: fixed;
      transition: all .5s ease;

        &.scroll{
          bottom: 32%;
        }
     
      }
    }
    .agenda-option-recordatorio{
       &.show{
        bottom: 18%;

        position: fixed;
        transition: all .5s ease;


        &.scroll{
          bottom: 26%;
        }
    
      }
    }
    .agenda-option-evento{
       &.show{
        bottom: 12%;

        position: fixed;
        transition: all .5s ease;

        &.scroll{
          bottom: 20%;
        }
    
      }
    }

    .agenda-option{
      width:30px;
      height: 30px;
      padding: 0px;
      z-index: 98;
      position: fixed;
      bottom: 5%;
      right: 33px;
      transition: all .5s ease;


      &.scroll{
        bottom: 12%;
      }

      &.show{
      // bottom: 28%;

      position: fixed;
      transition: all .5s ease;

     
      }
    }
    .agenda-fixed{
      // position: fixed;
      // bottom: 12%;
      // right: 30px;
      z-index: 110;
      transition: all .5s ease;
    }

    .btn-calendar{
      height: 50px;
      width: 50px;
      padding: 0px;
      transition: all ease-in 60ms;
     
      svg{
        opacity: 0.7;
       
      }

      &:hover > svg{
        opacity: 1;
      }

      &:hover{
        height: 55px;
        width: 55px;
        transition: all ease-in-out 60ms;

      }

    }
  }
</style>