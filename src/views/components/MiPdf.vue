<template>


  <section class="w-100" style="position:relative">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton height="600px" width="100%"></b-skeleton>
      </template>
    </b-skeleton-wrapper>

    <template v-if="!loading">
       <vue-pdf-embed :source="`${$root.api_uri}${uri}`" :page="paginaMostrar" @loaded="pdfCargado" :scale="1" class="mipdf" 
       :height="height" :width="1032"/>
                

      <section class="d-flex justify-content-center mt-1">

        <b-button-group size="sm">
          <b-button variant="dark" :href="`${$root.api_uri}${uri}`" download title="Descargar" >
              <font-awesome-icon icon="fas fa-download"/>
          </b-button>
        
          <b-button @click="paginaAnterior" variant="primary" title="Pagina Anterior" 
            v-if="paginasPdf > 1 && paginaMostrar > 1">
              <font-awesome-icon icon="fas fa-arrow-left"/>
          </b-button>

          <b-button @click="siguientePagina" variant="primary" 
            title="Siguiente Pagina"    v-if="paginasPdf > 1 && paginaMostrar < paginasPdf">
            <font-awesome-icon icon="fas fa-arrow-right"/>
          </b-button>
        </b-button-group>
        
        </section>
    </template>
    
  </section>
 
</template>

<script>

import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

import {
  BButton,
  BButtonGroup,
  BSkeleton,
  BSkeletonWrapper
} from 'bootstrap-vue';

import { computed, toRefs, ref, onMounted, nextTick } from 'vue'
import store from '@/store'
export default {
  

  props:{
    path:{
      type:String,
      default:`/storage/negocios/menu/`,
      required:false
    },
    pdf:String,
    width:{
      type:String|Number,
      default:'100%'
    },

    height: {
      type: String|Number,
      default: '450px'
    },

  },

  components:{
      BButton,
      VuePdfEmbed,
      BButtonGroup,
      BSkeleton,
      BSkeletonWrapper

  },


  setup(props){

    const {pdf,path} = toRefs(props)

    const paginasPdf  = ref(0)
    const paginaMostrar  =ref(1)

    const numeroPagina = (sum) => paginasPdf.value = sum;

    const siguientePagina = () => {
        paginaMostrar.value++;
    }

     const paginaAnterior = () => {
      paginaMostrar.value--;
    }


    const pdfCargado = ({ _pdfInfo: info }) => {
      paginasPdf.value = info.numPages
      nextTick()
    }


    return {
      paginasPdf,
      paginaMostrar,
      numeroPagina,
      siguientePagina,
      paginaAnterior,
      uri:computed(() => `${path.value}${pdf.value}`),
      pdfCargado,
      loading:computed(() => store.state.loading)
    }
  }
}
</script>

<style lang="scss">

  .mipdf{
    display: flex !important;
    justify-content: center;
    
  }

  .mipdf canvas{
    height: 100% !important;
    width:100% !important;
  }

</style>