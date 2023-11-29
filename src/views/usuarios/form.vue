<template>

   <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
         <b-card>
            <b-container fluid>
               <b-row>
                  <b-col md="6">
                      <b-form-group label-for="nombre">
                           <template #label>
                              Nombre: <span class="text-danger">*</span>
                           </template>

                           <validation-provider #default="{ errors, valid }" name="nombre" rules="required">
                              <b-form-input id="nombre" v-model="form.nombre" autofocus
                              trim placeholder="Nombre Completo"  :state="valid" />

                              <b-form-invalid-feedback :state="valid">
                                 {{ errors[0] }}
                              </b-form-invalid-feedback>

                           </validation-provider>
                        </b-form-group>

                         <b-form-group label="Email" label-for="email">
                                 <template #label>
                                 Email: <span class="text-danger">*</span>
                                 </template>

                                 <validation-provider #default="{ errors,valid }" name="email" rules="required|email">
                                 <b-form-input id="email" v-model="form.email"
                                    :state="valid" trim />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              </validation-provider>
                        </b-form-group>

                  </b-col>
                  <b-col md="6">
                     <b-form-group label-for="user-role" >

                     <template #label>
                        Rol de usuario: <span class="text-danger">*</span>
                     </template>


                     <validation-provider #default="{ errors, valid }" name="rol_id" rules="required">
               
                     <v-select v-model="form.rol_id" :options="getRols"
                        :reduce="val => val.value" :clearable="false" input-id="user-role"
                        :class="{ 'border-danger': !valid }"   />

                        <b-form-invalid-feedback :state="valid">
                           {{ errors[0] }}
                        </b-form-invalid-feedback>
                     </validation-provider>

                  </b-form-group>
                  </b-col>
               </b-row>

            </b-container>

            <template #footer>
                <b-button-group size="sm">
                  <b-button title="regresar" :to="{name:'listar.usuarios'}">
                     <feather-icon icon="ArrowLeftIcon" />
                     Regresar
                  </b-button>

                   <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="warning" type="button" v-loading="loading" :to="{name:'create.usuario'}" v-if="$can('write','usuarios')">
                     Nuevo Usuario
                  </b-button>


                  <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit" v-loading="loading">
                     Guardar
                  </b-button>
               </b-button-group>
            </template>
         </b-card>
      </b-form>
   </validation-observer>

</template>


<script>
import {
   BCol,
   BRow,
   BContainer,
   BForm,
   BFormGroup, 
   BFormInput, 
   BFormInvalidFeedback, 
   BButton, 
   BFormTextarea,
   BTab, 
   BTabs, 
   BCard, 
   BAlert, 
   BLink,
   BInputGroup, 
   BInputGroupPrepend,
   BAvatar,
   BCardHeader,
   BCardTitle,
   BFormCheckbox,
   BFormRadioGroup, 
   BFormCheckboxGroup,
   BMedia,
   BMediaAside, 
   BMediaBody,
   BImg,
   BFormFile,
   BCardText,
   BButtonGroup

} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'

import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'
import { ref, watch,toRefs,computed} from 'vue'
import { required, alphaNum, email } from '@validations'
import { title } from '@core/utils/filter'
import useUsersList from './useUsersList'


export default {
   
   components:{
      BMediaAside,
      BMediaBody,
      BImg,
      BFormRadioGroup,
      BFormCheckboxGroup,
      BAvatar,
      BCardHeader,
      BCardTitle,
      BFormCheckbox,
      BTab,
      BTabs,
      BContainer,
      BCard,
      BAlert,
      BLink,
      BForm,
      BCol,
      BRow,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButton,

      ValidationProvider,
      ValidationObserver,
      vSelect,
      BFormTextarea,
      BInputGroup,
      BInputGroupPrepend,
      BMedia,
      BFormFile,
      BCardText,
      BButtonGroup

   },

   directives:{
      Ripple
   },

   setup(props, { emit }) {
      
      const {usuario,user:form} = toRefs(store.state.usuario)

      const { resolveUserRoleVariant } = useUsersList()
      const getRols = computed(() => store.getters['rol/getRols'])

      const formValidate = ref(null)
   

      const profileFile = ref(null)

      const cargarform = () => store.dispatch('rol/cargarRoles')

      cargarform()

      watch([form], () => {
         cargarform();
      })

      const guardar =  () => {
        
         emit('save',form.value,formValidate.value)
      }


      return {
         formValidate,
         guardar,
         form,
         cargarform,
         title,
         resolveUserRoleVariant,
         required,
         alphaNum,
         email,
         usuario,
         profileFile,
         loading:computed(() => store.state.loading),
         getRols,
         form,
      }
  }
}

</script>

<style lang="scss" >
</style>