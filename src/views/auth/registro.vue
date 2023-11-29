<template>
   <div class="auth-wrapper auth-v1 px-2">
      <div class="auth-inner py-2">

         <!-- Register v1 -->
         <b-card class="mb-0">
            <logo url="/"></logo>

            <b-card-title class="mb-1">
               {{ $t('Unete al club') }} 🚀
            </b-card-title>
            <b-card-text class="mb-2">
               {{ $t('No mas de 2 minutos te tomará registrarte') }}.
            </b-card-text>

            <b-card-text class="mb-2">
               <b-button variant="outline-primary" @click="mostrarPreguntas" size="sm">{{ $t('¿Quieres saber mas de Travel Points?') }}</b-button>
            </b-card-text>

            <!-- form -->
            <validation-observer ref="formValidate" #default="{handleSubmit}">
               <b-form class="auth-register-form mt-2" @submit.prevent="handleSubmit(guardar)">
                  <!-- username -->
                  <b-form-group :label="$t('Username (Alias)')" label-for="username">
                     <validation-provider #default="{ errors,valid }" name="username" rules="required">
                        <b-form-input id="username" v-model="formulario.username"
                           :state="valid" name="register-username"
                           placeholder="mariosacramento" />
                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                     </validation-provider>
                  </b-form-group>


                   <b-form-group :label="$t('Nombre')" label-for="nombre">
                        <validation-provider #default="{ errors,valid }" name="nombre" rules="required">
                           <b-form-input id="nombre" v-model="formulario.nombre"
                              :state="valid" name="register-nombre"
                              placeholder="Mario" />
                           <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>
                  </b-form-group>

                  <b-form-group :label="$t('Apellido')" label-for="apellido">
                           <validation-provider #default="{ errors,valid }" name="apellido" rules="required">
                              <b-form-input id="apellido" v-model="formulario.apellido"
                                 :state="valid" name="register-nombre"
                                 placeholder="Porfirio" />
                              
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           </validation-provider>
                     </b-form-group>

                  <!-- email -->
                  <b-form-group :label="$t('Email')" label-for="email">
                     <validation-provider #default="{ errors,valid }" name="email" rules="required|email">
                        <b-form-input id="email" v-model="formulario.email" :state="valid"
                           name="register-email" placeholder="mario@example.com" />
                        
                           <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                     </validation-provider>
                  </b-form-group>

                  <!-- password -->
                  <b-form-group :label="$t('Password')" label-for="password" :description="$t('La contraseña debe contener al menos una mayúscula, una minúscula, un carácter especial(@ # $ % & / ( ) = + ? [ ] ~ – ^) y un dígito que sea facil de recordar')">
                     <validation-provider #default="{ errors,valid }" name="password" rules="required|password">
                        <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                           <b-form-input id="password" v-model="formulario.password" :type="passwordFieldType"
                              :state="valid" class="form-control-merge"
                              name="register-password" placeholder="············" />
                           <b-input-group-append is-text>
                              <feather-icon :icon="passwordToggleIcon" class="cursor-pointer"
                                 @click="togglePasswordVisibility" />
                           </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                        </b-form-invalid-feedback>
                     </validation-provider>
                  </b-form-group>

                  <!-- retype password -->
                  <b-form-group :label="$t('Password')" label-for="password">
                     <validation-provider #default="{ errors,valid }" name="retypePassword" rules="required|password">
                        <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                           <b-form-input id="password" v-model="formulario.retypePassword" :type="passwordFieldType"
                              :state="valid" class="form-control-merge"
                              name="register-password" placeholder="············" />
                           <b-input-group-append is-text>
                              <feather-icon :icon="passwordToggleIcon" class="cursor-pointer"
                                 @click="togglePasswordVisibility" />
                           </b-input-group-append>
                        </b-input-group>
                        <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                     </validation-provider>
                  </b-form-group>


                  <!-- checkbox -->
                  <b-form-group>
                     <b-form-checkbox id="register-privacy-policy" v-model="formulario.condiciones" name="checkbox-1">
                        {{ $t('Acepto los') }}
                        <b-link :to="{path:pageTermino}">{{ $t('Terminos y condiciones') }}</b-link>
                     </b-form-checkbox>
                  </b-form-group>

                  <!-- submit button -->
                  <b-button variant="primary" block type="submit" :disabled="!formulario.condiciones">
                    {{ $t('!Hazme Socio!') }}
                  </b-button>
               </b-form>
            </validation-observer>

            <b-card-text class="text-center mt-2">
               <span>{{ $t('Ya tienes cuenta en TravelPoints?') }} </span>
               <b-link :to="{ name: 'login' }">
                  <span>{{ $t('ir a Login') }}</span>
               </b-link>
            </b-card-text>

            <div class="divider my-2">
               <div class="divider-text">
                  {{ $t('o') }}
               </div>
            </div>

            <!-- social buttons -->
            <div class="auth-footer-btn d-flex justify-content-center">
               <b-button variant="google" type="button" @click.stop="authenticarGoogle(optionsAuth)">
                  <feather-icon icon="MailIcon" />
                  {{ $t('Google') }}
               </b-button>
            </div>
         </b-card>
         <!-- /Register v1 -->
      </div>

      <b-modal v-model="showPreguntas" title="Preguntas Frecuentes" size="xl" centered hide-footer>
         <faqs />
      </b-modal>
   </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
   BCard,
   BLink,
   BCardTitle,
   BCardText,
   BForm,
   BButton,
   BFormInput,
   BFormGroup,
   BInputGroup,
   BInputGroupAppend,
   BFormCheckbox,
   BModal,
   BFormInvalidFeedback
} from 'bootstrap-vue'
import { required, email,password } from '@validations'
import useTogglePassword from '@core/utils/useTogglePassword';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { ref, computed, toRefs, onMounted, watch,inject } from 'vue'
import router from '@/router'
import store from '@/store'

import useAuth from '@core/utils/useAuth'

export default {

   components: {
      // BSV
      BCard,
      BLink,
      BCardTitle,
      BCardText,
      BForm,
      BButton,
      BFormInput,
      BFormGroup,
      BInputGroup,
      BInputGroupAppend,
      BFormCheckbox,
      // validations
      ValidationProvider,
      ValidationObserver,
      Logo:() => import('components/Logo.vue'),
      faqs:() => import('views/paginas/faqs.vue')
   },

   props:{
      codigo:{
         type:String,
         required:false
      }
   },

   setup(props,{emit}){

      const {codigo } = toRefs(props)
      const { paginas } = toRefs(store.state.pagina)
      const showPreguntas = ref(false)
      const i18n = inject('i18n')
      
      const {
         login,
         authGoogle,
         authenticarGoogle,
         optionsAuth
      } = useAuth();


      const formulario = ref({
         username      : null,
         nombre:null,
         apellido:null,
         email         : null,
         password      : null,
         retypePassword: null,
         condiciones   : false,
         referidor     : codigo.value
      })

      const formValidate = ref(null)

      const {
         passwordFieldType,
         togglePasswordVisibility
      } = useTogglePassword();

      const guardar = () => {
         
         store.dispatch('usuario/nuevoUsuario',formulario.value).then(({result}) => {
            
            if(result){
               toast.success(i18n.t('Tú cuenta ha sido creada con éxito'))
               router.push({name:'login'})
            }else{
               toast.info(i18n.t('La cuenta no pudo ser creada, inténtelo de nuevo mas tarde'))
            }


         }).catch(e => {
            
            console.log(e)
            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errors)
            }

         })

      } 

      const cargarForm =() => {
         if (codigo.value) {
            store.dispatch('usuario/verificarCodigoReferido', codigo.value).then(({ result }) => {

               if (result) {
                  toast.success(i18n.t('Código de referidor cargado'))
               } else {
                  toast.info(i18n.t('El código no se ha podido cargar'))
                  router.push('/register')
               }

            })
         }

          if (!paginas.value.lenth) {
            store.dispatch('pagina/getPaginas')
         }

      }

      onMounted(() => cargarForm())

      watch(codigo,() => cargarForm())

      const mostrarPreguntas = () => {
         showPreguntas.value = true
      }

      return {
         formulario,
         formValidate,
         loading:computed(() => store.state.loading),
         required,
         email,
         password,
         passwordFieldType,
         togglePasswordVisibility,
         passwordToggleIcon:computed(() => {
            return passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'
         }),
         optionsAuth,
         authenticarGoogle,
         guardar,
         pageTermino: computed(() => store.getters['pagina/pageTermino']),
         showPreguntas,
         mostrarPreguntas

      }
   }

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
