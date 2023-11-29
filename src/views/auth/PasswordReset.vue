<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Reset Password v1 -->
      <b-card class="mb-0">

        <!-- Brand logo-->
        <b-link class="brand-logo">

          <img :src="logotipo" alt="Logo" />
         
        </b-link>
        <!-- /Brand logo-->
        <b-card-title class="mb-1">
          {{ $t('Restablecer la contraseña') }} 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          {{ $t('Su nueva contraseña debe ser diferente de las contraseñas utilizadas anteriormente') }}
        </b-card-text>

        <!-- form -->
        <validation-observer ref="refValidate" #default="{handleSubmit}">
          <b-form  class="auth-reset-password-form mt-2" @submit.prevent="handleSubmit(cambiar)">

            <!-- email -->
            <b-form-group label="Email" label-for="login-email">
              <validation-provider #default="{ errors,valid }" name="Email" vid="email" rules="required|email">
                <b-form-input id="login-email" v-model="formulario.email" :state="valid"
                  name="login-email" placeholder="Coloque su correo" size="lg" autocomplete="username" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>


            <!-- password -->
            <b-form-group :label="$t('Nueva contraseña')" label-for="reset-password-new">
              <validation-provider #default="{ errors,valid }" name="password" vid="password" rules="required|password">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-form-input id="reset-password-new" v-model="formulario.password" :type="passwordFieldType"
                    :state="valid" class="form-control-merge" name="reset-password-new"
                    placeholder="············" />
                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleicon" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- confirm password -->
            <b-form-group label-for="reset-password-confirm" :label="$t('Confirmar Contraseña')">
              <validation-provider #default="{ errors,valid }" name="Confirm Password" rules="required|confirmed:password">
                <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                  <b-form-input id="reset-password-confirm" v-model="formulario.password_confirmation" :type="passwordFieldType"
                    class="form-control-merge" :state="valid" name="reset-password-confirm"
                    placeholder="············" />
                  <b-input-group-append is-text>
                    <feather-icon class="cursor-pointer" :icon="passwordToggleicon" @click="togglePasswordVisibility" />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button block type="submit" variant="primary">
              {{ $t('Establecer nueva contraseña') }}
            </b-button>
          </b-form>
        </validation-observer>

        <p class="text-center mt-2">
          <b-link :to="{ name: 'login' }">
            <feather-icon icon="ChevronLeftIcon" /> {{ $t('Volver al login') }}
          </b-link>
        </p>

      </b-card>
      <!-- /Reset Password v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BCard,
  BCardTitle,
  BCardText,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BFormInput,
  BButton,
} from 'bootstrap-vue'
import { required,email,confirmed,password } from '@validations'
import { ref, toRefs, computed,inject } from 'vue';

import logotipo from 'images/logos/logotipo.png'
import logotipoblanco from 'images/logos/logotipo.png'
import store from '@/store';
import router from '@/router';

import useTogglePassword from '@core/utils/useTogglePassword';
export default {
  components: {
    VuexyLogo,
    BCard,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    token: {
      type: String,
      required: true,
    }
  },


  setup(props) {
    const { token } = toRefs(props)
    const { layout } = toRefs(store.state.appConfig)
    const skin = computed(() => layout.value.skin)
    const i18n = inject('i18n')
    const formulario = ref({
      email:'',
      password:'',
      password_confirmation:'',
      token:computed(() => token.value)
    })

    const refValidate = ref(null)

    const {
        passwordFieldType,
        togglePasswordVisibility,
        passwordToggleicon
      } = useTogglePassword();


    const cambiar = () => {

      axios.post('/api/auth/reset-password',formulario.value).then(respon => {
        if (respon.data.result) {

          router.push('/login')
          toast.success(i18n.t('La contraseña se ha reestablecido exitosamente'))
        } else {
          toast.info((respon.data.status == 'passwords.token') ? i18n.t('EL token ya no es valido, vuelve a enviar el link de reestablecimiento') : respon.data.status)

          if (respon.data.status == 'passwords.token') {
            
            router.push({
              name: 'auth-forgot-password'
            });

          }


        }


      }).catch(e => {
        console.log(e)

        if(e.response.status === 422){
          refValidate.value.setErrors(e.response.data.errors)
        }

      })
    }

    return {
      logotipo: computed(() => skin.value === 'dark' ? logotipoblanco : logotipo),
      passwordFieldType,
      togglePasswordVisibility,
      refValidate,
      passwordToggleicon,
      cambiar,
      email,
      required,
      confirmed,
      password,
      formulario
    }
  }

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>