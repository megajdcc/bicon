<template>
  <section>

    <b-sidebar v-model="showAcademia"  right backdrop :title="$t('Academia')" >
        <b-container fluid>
          <b-row>
            <b-col>
              <section class="d-flex flex-wrap w-100" style="overflow-y:auto">
                
                <b-card v-for="(a, i) in academia" :key="i" :title="a.titulo">

                  <video class="mx-1" width="222" v-for="(video,e) in a.videos" :key="e" loop muted controls="false" style="max-width:222px">
                    <source :src="`${$root.api_uri}/storage/multimedias/${video.url}`">
                  </video>

                   <b-button @click="verVideo(a)" variant="primary">{{ $t('Ver') }}</b-button>
                </b-card>
               

              </section>
            </b-col>
          </b-row>
        </b-container>
    </b-sidebar>


    <b-modal v-model="showContenido" size="lg" centered hide-footer lazy modal-class="modalContenido">  
      <section class="d-flex justify-content-center flex-wrap" v-if="contenido">
          <h3 class="text-uppercase" > {{  $t(contenido.titulo)  }}</h3>

            <b-embed  class="mx-1 mb-1" type="iframe" :aspect="relation" v-for="(video, e) in contenido.videos" :key="e" :src="`${$root.api_uri}/storage/multimedias/${video.url}`"
                    allowfullscreen>
            </b-embed> 
                     
          <el-divider content-position="left">{{ $t('Descripción') }}</el-divider>
            <span class="" v-html="$t(contenido.descripcion)">
          </span>
      </section>
    </b-modal>


  </section>
  
</template>

<script>

import {
  BSidebar,
  BCard,
  BContainer,
  BRow,
  BCol,
  BNavItem,
  BButton,
  BEmbed,
  BDropdownItem
} from 'bootstrap-vue'

import {computed,ref,toRefs,onMounted,inject} from 'vue'
import store from '@/store'

export default{

  components:{
    BSidebar,
    BCard,
    BContainer,
    BRow,
    BCol,
    BNavItem,
    BButton,
    BEmbed,
    BDropdownItem

  },

  props:{
    isNegocio:Boolean,
  },


  setup(props,{emit}) {


    const {usuario} = toRefs(store.state.usuario)
    const showAcademia = inject('showAcademia')
    const showContenido = ref(false)
    const academia = ref([])
    const { windowWidth } = toRefs(store.state.app)

    const api_uri = computed(() => axios.getUri() ?? '')

    const contenido = ref(null)


    const verVideo = (a) => {
      contenido.value = a
      showContenido.value = true
    }

  

    onMounted(() => {

        academia.value = usuario.value.rol ? usuario.value.rol.academia : []
        if(props.isNegocio) {
          cargarVideosNegocio()
        }
    
    })

    const cargarVideosNegocio = () => {

      store.dispatch('academiaVideos/cargarVideosNegocio').then(({videos}) => {
        academia.value = [
          ...academia.value,
          ...videos
        ]
      }).catch(e => console.log(e))

    } 

    return {
      api_uri,
      academia,
      verVideo,
      showContenido,
      contenido,
      showAcademia,
      relation: computed(() => {
        return windowWidth.value < 762 ? '4by3' : '21by9'
      })
    }

  },

}
</script>
<!-- 
<style lang="scss" >
  .modalContenido{
    z-index:1100 !important;
  }
</style> -->