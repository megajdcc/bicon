<template>
  <b-card>
    <b-container fluid>

      <b-row v-loading="loading">
        <b-col md="8">
          <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="user-chats scroll-area w-100"
            style="height:450px">
            <b-container fluid>
              <b-row>

                 <template v-if="!hideImagenes">
                <!-- Imagenes -->
                  <el-divider content-position="left">Imagenes</el-divider>
                  <b-col cols="12" md="4" v-for="(imagen, i) in imagenes" :key="imagen.id" class="my-1">

                    <b-card body-class="p-0 m-0" footer-class="p-0 m-0"
                      header-class="p-0 m-0 d-flex justify-content-center">
                      <template #header>
                        <b-img :src="`${pathArchivos}${imagen.imagen}`"
                          style="width:220px; height:220px; object-fit:cover; cursor:pointer; margin:auto 0px"
                          @click="index = i" thumbnail fluid lazy />
                      </template>

                      <template #footer>
                        <b-button-group size="sm">
                          <b-button variant="danger" @click="eliminar(imagen,'imagen')" size="sm" title="Eliminar"
                            v-b-tooltip.hover="'Eliminar'">
                            <feather-icon icon="TrashIcon" />
                          </b-button>
                          <b-form-checkbox v-model="seleccionados" switch v-if="seleccionable"  :value="imagen.id"/>
                        </b-button-group>
                      </template>
                    </b-card>
                  </b-col>
                </template>

                <template v-if="!hideVideos">
                   <el-divider content-position="left">Videos</el-divider>
                    <b-col cols="12" md="4" v-for="(video) in videos" :key="video.id" class="my-1">

                      <b-card body-class="p-0 m-0" footer-class="p-0 m-0"
                        header-class="p-0 m-0 d-flex justify-content-center">
                        <template #header>
                          <b-embed :src="`${pathArchivos}${video.url}`"  style="width:200px; height:auto" controls></b-embed>
                        </template>

                        <template #footer>
                          <b-button-group size="sm">
                            <b-button variant="danger" @click="eliminar(video, 'video')" size="sm" title="Eliminar"
                              v-b-tooltip.hover="'Eliminar'">
                              <feather-icon icon="TrashIcon" />
                            </b-button>

                            <b-form-checkbox v-model="seleccionados" switch v-if="seleccionable"  :value="video.id"/>

                          </b-button-group>
                        </template>
                      </b-card>


                    </b-col>
                </template>
                

              </b-row>
            </b-container>
          </vue-perfect-scrollbar>

        </b-col>

        <b-col md="4" v-loading="loading">
          <b-form-group title="Archivo" v-b-tooltip.hover.v-warning
            description="Presiona encima del recuadro para buscar un archivo.">
            <template #label>
              Adjunta un archivo : <span class="text-danger">*</span>
              <feather-icon icon="HelpCircleIcon" class="text-warning" />
            </template>

            <validation-provider name="archivo" #default="{ errors }">

              <b-form-file v-model="archives" ref="refArchivo" accept="video/*, image/*"
                @input="archivoSeleccionado($event, () => archives = [])" :state="errors.length ? false : null"
                browse-text="Buscar Archivo" multiple :disabled="loading" />

              <b-form-invalid-feedback :state="errors.length ? false : null">
                {{ errors[0] }}
              </b-form-invalid-feedback>

            </validation-provider>

          </b-form-group>

         
        </b-col>

      </b-row>


    </b-container>

    <vue-gallery v-if="imagenes" :images="imagenes.map(val => `${pathArchivos}${val.imagen}`)" :index="index"
      @close="index = null"></vue-gallery>
  </b-card>
</template>

<script>

import { computed, toRefs, ref, onMounted, inject} from 'vue'

import store from '@/store'
import VueGallery from 'vue-gallery';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { regresar } from '@core/utils/utils'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormFile,
  BCarousel,
  BCarouselSlide,
  VBTooltip,
  BImg,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormCheckbox,
  BFormRadio,

  BEmbed

} from 'bootstrap-vue'

export default {

  props: {
    'path-archivos': {
      type: String
    },

    imagenes: {
      type: Array
    },

    videos: {
      type: Array
    },


    actions: {
      type: Function
    },

     hideVideos: {
      type: Boolean,
      default: false,
    },
    hideImagenes: {
      type: Boolean,
      default: false,
    },
    seleccionable: {
      type: Boolean,
      default: false,
    },
   
  },

  components: {
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormFile,
    BFormGroup,
    VueGallery,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BCarousel,
    BCarouselSlide,
    BImg,
    BButtonGroup,
    BButton,
    VuePerfectScrollbar,
    BFormCheckbox,
    BFormRadio,
    BEmbed


  },

  directives: {
    'b-tooltip': VBTooltip
  },


  setup(props) {

    const { seleccionable } = toRefs(props)

    const archives = ref([])

    const seleccionados = inject('seleccionados',ref([]))
    
    const {
      archivoSeleccionado,
      eliminar,
    } = props.actions();

    const index = ref(null)

    const perfectScrollbarSettings = ref({
      maxScrollbarLength: 450,
      wheelPropagation: false,
    })


    return {
      archivoSeleccionado,
      index,
      perfectScrollbarSettings,
      eliminar,
      regresar,
      archives,
      loading: computed(() => store.state.loading),
      seleccionados
    }

  }
}
</script>

<style lang="scss"></style>