<template>

  <section class="d-flex justify-content-center flex-column align-items-center mr-1 " v-b-tooltip.hover="$t(nivel.nombre)">
    
    <div class="nivel mx-auto" :id="`popover-reactive-${nivel.id}`">
      <el-progress type="circle" class="progress" :percentage="avance" :show-text="false"  :stroke-width="5" color="#61A60E">
      </el-progress>
        <b-img :src="`${$root.api_uri}/storage/insignias/${nivel.insignia}`" alt="Insignia" class="insignia" />

    </div>

    <strong class="">{{ $t(nivel.nombre) }}</strong>

     <b-popover
        :target="`popover-reactive-${nivel.id}`"
        triggers="hover"
        :show.sync="popoverShow"
        placement="top"
        container="my-container"
        custom-class="mi-popover"
        ref="popoverRef"
      >

            <template #title >
              {{ $t(nivel.nombre) }}
           </template>
           <b-container fluid v-if="nivel.id" class="px-1">
              <b-row>
                 <b-col cols="12" v-if="nivel.insignia" class="d-flex justify-content-center">
                      <div class="nivel mx-auto">
                          <el-progress type="circle" class="progress" :percentage="avance" :show-text="false"  :stroke-width="5" color="#61A60E">
                          </el-progress>
                            <b-img :src="`${$root.api_uri}/storage/insignias/${nivel.insignia}`" alt="Insignia" class="insignia" />

                        </div>
                 </b-col>
              </b-row>

              <b-row class="px-0">
               
                 <b-col cols="12" class="px-0">
                   <strong>{{ $t('Nivel que pertenece al grupo') }}: {{ nivel.grupo ? $t(nivel.grupo.nombre) : $t('Sin definir') }}</strong> <br>
                   <hr>
                   <template v-if="!nivel.nivel_inicial">
                    <!-- <strong >Este nivel fue logrado gracias a que completaste los siguientes items:</strong> -->
                    <strong v-if="nivel.nivel_siguiente">{{ $t('El siguiente nivel se logra') }} {{ legendSiguienteNivel() }}</strong>
                    <hr>

                   </template>
                   
                   <section v-else>
                    <strong>{{ $t('El siguiente nivel se logra') }} {{ legendSiguienteNivel() }}</strong>
                    <hr>
                   </section>

                  <section v-if="nivel.baja_nivel">
                      <strong>{{ $t('Este nivel baja si no realizas ningún consumo durante un (1) año') }}</strong>
                     </section>
                 </b-col>


                 <b-col cols="12">
                  <span>{{ $t('Progreso de') }} : <strong>{{ avance > 100 ? '100' : avance }}% </strong> {{ $t('para subir de nivel') }}</span>
                    <b-progress :max="100" height="2rem">
                      <b-progress-bar :value="avance">
                        <span><strong>{{ avance > 100 ? '100' : avance }}% </strong></span>
                      </b-progress-bar>
                    </b-progress>
                 </b-col>

             
              </b-row>
           </b-container>
      </b-popover>

  </section>
  

</template>

<script>

import {
  BImg,
  VBTooltip,
  BPopover,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BCarousel,
  BCarouselSlide,
  BLink,
  BBadge,
  BProgress,
  BProgressBar
} from 'bootstrap-vue'

import { computed, toRefs,ref,inject} from 'vue'
export default {

  components:{
    BImg,
    BPopover,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BCarousel,
    BCarouselSlide,
    BLink,
    BBadge,
    BProgress,
    BProgressBar
  },

  directives:{
    'b-tooltip':VBTooltip
  },

  props: {
    nivel: Object,
    avance: Number,
  },
  computed: {
   avanceStyle() {
      return {
        transform: `rotate(${360 - (this.avance / 100) * 360}deg)`,
      };
    },
  },


  setup(props){
    const {nivel} = toRefs(props)
    const popoverShow = ref(false)
    const i18n = inject('i18n')
    const legendSiguienteNivel = () => {
      let legend = ''; 
      const nivel_siguiente = nivel.value.nivel_siguiente;
      let valor_registro = nivel_siguiente.activacion.valor_registro;
      let negocios_diferente = nivel_siguiente.activacion.negocios_diferente;
      let cant_negocios = nivel_siguiente.activacion.cantidad_negocios;
      
      switch(nivel_siguiente.activacion.tipo_registro){
        case 1 :
          if (negocios_diferente) {
            legend = `${i18n.t('alcanzando un total de')} ${valor_registro} ${valor_registro > 1 ?  i18n.t('registros (consumos)')   : i18n.t('registro (consumo)') }  ${i18n.t('en')} ${cant_negocios} ${i18n.t('negocios diferentes')}.`
          } else {
            legend = `${i18n.t('alcanzando un total de')} ${valor_registro} ${valor_registro > 1 ? i18n.t('consumos.') : i18n.t('consumo.') }`;
          }
        break;

        case 2 :

         if (negocios_diferente) {
            legend = `${i18n.t('alcanzando un total de')} $ ${valor_registro} ${i18n.t('USD en suma total de consumos en')} ${cant_negocios} ${i18n.t('negocios diferentes.')}`
          } else {
            legend = `${i18n.t('alcanzando un total de')} $ ${valor_registro} ${i18n.t('USD en suma total de tus consumos')}`;
          }
        break;

        case 3 :

        if (negocios_diferente) {
            legend = `${i18n.t('alcanzando registros en')} ${valor_registro > 1 ? valor_registro + ' iatas' : valor_registro +' iata'} ${i18n.t('del mismo pais , ademas de ser en')} ${cant_negocios} ${cant_negocios > 1 ? i18n.t('negocios') : i18n.t('negocio')} ${i18n.t('diferente')}.`
          } else {
            legend = `${i18n.t('alcanzando registros en')} ${valor_registro > 1 ? valor_registro + ' iatas' : valor_registro + ' iata'} ${i18n.t('del mismo pais')}.`;
        }


        break;

        case 4 : 

        if (negocios_diferente) {
            legend = `${i18n.t('alcanzando registros en')} ${valor_registro > 1 ? valor_registro + ' '+i18n.t('paises') : valor_registro + ' '+ i18n.t('pais')}, ${i18n.t('ademas de ser en')} ${cant_negocios} ${cant_negocios > 1 ? i18n.t('negocios') : i18n.t('negocio')} ${i18n.t('diferente')}.`
          } else {
            legend = `${i18n.t('alcanzando registros en')} ${valor_registro > 1 ? valor_registro + ' ' + i18n.t('paises') : valor_registro + ' ' + i18n.t('pais')}.`;
          }

        break;


        default :
          if(negocios_diferente){ 
            legend = `${i18n.t('alcanzando un total de')} ${valor_registro} ${i18n.t('consumos en')} ${ cant_negocios } ${i18n.t('negocios diferentes')}.`
          }else{
            legend = `${i18n.t('alcanzando un total de')} ${valor_registro} ${valor_registro > 1 ? ' ' + i18n.t('consumos.') : ' ' + i18n.t('consumo.')}`;
          }

      }
      return legend;
    }

    return {
      popoverShow,
      legendSiguienteNivel,
      getElementEvent: computed(() => document.querySelector(`.nivel-${nivel.value.id}`)),
    }
  }
};
</script>

<style scoped lang="scss">
.nivel {
  display: inline-block;
  position: relative;
  text-align: center;
  margin-right: 2rem;

  .progress {
    position:absolute;
    height:100%;
    width:100%;
  
  }
  .insignia{
    max-width: 100%;
    width: 70px;
    /* Ancho de la insignia */
    height: 70px;
    /* Alto de la insignia */
  }
}

</style>