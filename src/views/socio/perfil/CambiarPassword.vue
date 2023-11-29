<template>
  <b-card>

    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <!-- form -->
      <b-form @submit.prevent="handleSubmit(guardar)" id='form-cambiar-pass'>
        <b-container fluid>
          <b-row>

            <b-col cols="12">
              <h2>Cambiar Contraseña</h2>
            </b-col>

          </b-row>
          <b-row class="my-2">
            <!-- old password -->
            <b-col md="6">

              <b-form-group>
                <template #label>
                  Contraseña Anterior <span class="required">*</span>
                </template>

                <validation-provider name="contrasenaAnterior" rules="required" #default="{errors}">
                  <el-input type="password" v-model="formulario.contrasenaAnterior" class="w-100"
                    placeholder="Contraseña anterior" show-password size="small" />

                  <b-form-invalid-feedback :state="errors.length ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>

                </validation-provider>

              </b-form-group>

            </b-col>
            <!--/ old password -->
          </b-row>

          <b-row>
            <!-- new password -->
            <b-col md="6">

              <b-form-group>
                <template #label>
                  Contraseña Nueva <span class="required">*</span>
                </template>

                <validation-provider name="contrasenaNueva" rules="required" #default="{errors}">
                  <el-input type="password" v-model="formulario.contrasenaNueva" class="w-100"
                    placeholder="Contraseña nueva" show-password size="small" />

                  <b-form-invalid-feedback :state="errors.length ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>

                </validation-provider>

              </b-form-group>

            </b-col>
            <!--/ new password -->

            <!-- retype password -->
            <b-col md="6">

              <b-form-group>
                <template #label>
                  Repita la nueva contraseña <span class="required">*</span>
                </template>

                <validation-provider name="retypePassword" rules="required" #default="{errors}">
                  <el-input type="password" v-model="formulario.retypePassword" class="w-100"
                    placeholder="Vuelva a repetir la contraseña nueva" show-password size="small" />

                  <b-form-invalid-feedback :state="errors.length ? false : null">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>

                </validation-provider>

              </b-form-group>
            </b-col>
            <!--/ retype password -->
          </b-row>

          <b-row>
            <b-col cols="12">
              <b-button-group size="sm">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" type="submit" variant="primary" v-loading="loading"
                  title="Guardar">
                  <feather-icon icon="SaveIcon" />
                  Guardar cambios
                </b-button>

                <b-button v-ripple.400="'rgba(186, 191, 199, 0.15)'" type="reset" variant="secondary">
                  Limpiar
                </b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-container>


      </b-form>
    </validation-observer>

  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend,
  BContainer,
  BFormInvalidFeedback,
  BButtonGroup
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ValidationObserver,ValidationProvider } from 'vee-validate';
import {required} from '@validations'

import store from '@/store'
import {ref,computed} from 'vue'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    ValidationObserver,
    ValidationProvider,
    BContainer,
    BFormInvalidFeedback,
    BButtonGroup
  },
  directives: {
    Ripple,
  },
  setup(){  
 
    const formulario = ref({
      contrasenaAnterior: '',
      contrasenaNueva: '',
      retypePassword  : '',
    })


    const formValidate = ref(null)

    const guardar = () => {
      
      store.dispatch('usuario/cambiarContrasena',formulario.value).then(({result}) => {

          if(result){
            toast.success('Contraseña actualizada de forma correcta')
            document.querySelector('#form-cambiar-pass').reset()
            formulario.value = {
              contrasenaAnterior: '',
              contrasenaNueva: '',
              retypePassword: '',
            }
          
          }else{
            toast.error('La contraseña no se pudo cambiar')
          }

      }).catch(e => {

        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }

      })



    }


    return {
      required,
      formulario,
      formValidate,
      loading:computed(() => store.state.loading),
      guardar
    }
  }

}
</script>
