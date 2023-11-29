<template>
  <b-card>
    <!-- form -->
    <b-form @submit.prevent="guardarCambios" id='form-cambiar-pass'>
      <b-row class="my-2">
        <!-- old password -->
        <b-col md="6">

          <div class="form group">
            <label for="">Contraseña Anterior <span class="required">*</span></label>

            <div class="input-group">
              <b-form-input type="password" v-model="formulario.contrasenaAnterior" class="w-100" placeholder="Contraseña anterior" show-password size="small">
              </b-form-input>
               <small v-if="errors.contrasenaAnterior" v-text="errors.contrasenaAnterior[0]" role='alert' class="text-danger font-wight-bold"></small>
            </div>
          </div>


      


        </b-col>
        <!--/ old password -->
      </b-row>
      <b-row>
        <!-- new password -->
        <b-col md="6">
            <div class="form group">
            <label for="">Contraseña Nueva <span class="required">*</span></label>

            <div class="input-group">
              <b-form-input type="password" v-model="formulario.contrasenaNueva" class="w-100" placeholder="Contraseña anterior" show-password size="small"></b-form-input>
               <small v-if="errors.contrasenaNueva" v-text="errors.contrasenaNueva[0]" role='alert' class="text-danger font-wight-bold"></small>
            </div>
          </div>
        </b-col>
        <!--/ new password -->

        <!-- retype password -->
        <b-col md="6">
          <div class="form group">
            <label for="">Repita la nueva contraseña <span class="required">*</span></label>

            <div class="input-group">
              <b-form-input type="password" v-model="formulario.retypePassword" class="w-100" :class="{'is-invalid' : errors.retypePassword } " placeholder="Contraseña anterior" show-password size="small"></b-form-input>
               <small v-if="errors.retypePassword" v-text="errors.retypePassword[0]" class="text-danger font-wight-bold"></small>
            </div>
          </div>
        </b-col>
        <!--/ retype password -->

        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            type="submit"
          >
            Guardar Cambios
          </b-button>

          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            variant="outline-secondary"
            class="mt-1"
          >
            Limpiar
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';

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
  },
  directives: {
    Ripple,
  },
  data() {
    return {


      formulario:{
        contrasenaAnterior: '',
        contrasenaNueva: '',
        retypePassword: '',
      }
     

    }
  },
  computed: {
    ...mapState(['errors','loading']),

    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {

    ...mapMutations(['setError','toggleLoading','clearErrors']),
    ...mapActions('usuario',['cambiarContrasena','clearsErrors']),

    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },

    guardarCambios(){
      this.cambiarContrasena(this.formulario).then(({result}) => {
        
        if(result){
          this.$notify.success('Contraseña actualizada de forma correcta')
          document.querySelector('#form-cambiar-pass').reset()
        }else{
          this.$notify.info('La contraseña no se pudo cambiar')
        }


        this.clearErrors();

      }).catch(e => {
        if(e.response.status == 422 ){
          this.setError(e.response.data.errors);
        }else{
          console.log(e)
        }


      })


    }

  },
}
</script>
