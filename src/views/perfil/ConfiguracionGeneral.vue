<template>
  <b-card>
    <!-- form -->
    <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form class="mt-2" @submit.prevent="handleSubmit(guardar)">
        <b-row>
          <b-col sm="6">
            <b-form-group label-for="cuenta-nombre">
              
              <template #label>
                Nombre: <span class="text-danger">*</span>
              </template>

              <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                 <b-form-input v-model="formulario.nombre" placeholder="Nombre completo" name="nombre" :state="valid"/>

                 <b-form-invalid-feedback :state="valid">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
             
            </b-form-group>

            <b-form-group label-for="cuenta-email">
              
              <template #label>
                E-mail: <span class="text-danger">*</span>
              </template>

              <validation-provider name="email" rules="required" #default="{ errors, valid }">
                  <b-form-input v-model="formulario.email" placeholder="Email" readonly name="email" :state="valid"/>

                  <b-form-invalid-feedback :state="valid">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </validation-provider>
             
            </b-form-group>

          </b-col>
          

       
       

          <!--/ alert -->

          <b-col cols="12">

            <b-button-group size="sm">
              <b-button variant="primary" :disabled="loading" v-loading="loading" v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit">
                <font-awesome-icon icon="fas fa-save"/>
                Guardar
              </b-button>

              <b-button @click="resetForm" variant="info">
                  <font-awesome-icon icon="fas fa-trash"/>
                  Limpiar
              </b-button>
            </b-button-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
   
  </b-card>
</template>

<script>
import {
  BFormFile, BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BCardText, BMedia, BMediaAside, BMediaBody, BLink, BImg,
  BFormInvalidFeedback,
  BButtonGroup
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref,computed,toRefs,onMounted } from 'vue'

import store from '@/store'

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'

export default {
  components: {
    BButton,
    BForm,
    BImg,
    BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BAlert,
    BCard,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BLink,
    ValidationObserver, 
    ValidationProvider,
    BFormInvalidFeedback,
    BButtonGroup
  },
  directives: {
    Ripple,
  },

  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    const formValidate = ref(null)
    const profileFile = ref(null)

    const formulario = ref(store.getters['usuario/draftUsuario'])
    const {usuario} = toRefs(store.state.usuario)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)


    const cargarImagen  = (file) => {
      
      let form = new FormData();

      form.append('filepond', profileFile.value);

      axios.post('api/upload/avatar', form, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=something'
        }
      }).then(respon => {
        store.commit('usuario/updateAvatar',respon.data)

      }).catch(e => {
        console.log(e)
      })


    }

    const guardar = () => {


      store.dispatch('usuario/guardarUsuario', formulario.value).then(({result}) => {

        if (result) {
          toast.success('Se ha guardado con éxito los cambios');
        } else {
          toast.info('Nó se guardarón los cambios,inténtelo de nuevo...')
        }

      }).catch(e => {
        console.log(e)
      })
    }

    const resetForm = () => {
      // store.commit('usuario/limpiarUsuario')
      formulario.value = usuario.value
    }

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
      loading:computed(() => store.state.loading),
      usuario,
      formulario,
      profileFile,
      cargarImagen,
      guardar,
      formValidate,
      resetForm,
      required
      
    }
  }
}
</script>
