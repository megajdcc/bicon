<template>
   
   <b-card>
      <validation-observer ref="formValidate" #default="{ handleSubmit }">
         <b-form @submit.prevent="handleSubmit(guardar(formulario,formValidate,clearForm))">
            <b-container fluid>
               <b-row>
                  
                  <b-col cols="12">

                   <b-button v-b-toggle.collapse-form variant="primary">
                     Agregar Teléfono
                   </b-button>

                   <b-collapse id="collapse-form" class="mt-1">
                     <b-card>
                        <b-container fluid>
                           <b-row>
                              <b-col cols="12" md="4">
                                 <b-form-group>
                                    <template #label>
                                       Teléfono: <span class="text-danger">*</span>
                                    </template>
                                 
                                    <validation-provider rules="required" name="telefono" #default="{valid,errors}">
                                       <b-form-input v-model="formulario.telefono" :state="valid" v-mask="'+#############'" />
                                 
                                       <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                       </b-form-invalid-feedback>
                                    </validation-provider>
                                 </b-form-group>
                              </b-col>

                           <b-col cols="12" md="4">
                              <b-form-group>
                                 <template #label>
                                    ¿ Es número principal ?: <span class="text-danger">*</span>
                                 </template>
                           
                                 <validation-provider rules="required" name="principal" #default="{valid,errors}">
                                    
                                    <b-form-checkbox switch v-model="formulario.principal" :state="valid" :unchecked-value="false" :value="true">
                                       <font-awesome-icon :icon="formulario.principal ? 'fa-check-double' : 'fa-check'"/>
                                       {{ formulario.principal ? 'Sí' : 'Nó' }}
                                    </b-form-checkbox>
                           
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                 </validation-provider>
                              </b-form-group>
                           </b-col>


                           <b-col cols="12" md="4">
                              <b-form-group>
                                 <template #label>
                                    ¿ Está asociado a whatsapp ?: <span class="text-danger">*</span>
                                 </template>
                              
                                 <validation-provider rules="required" name="is_whatsapp" #default="{valid,errors}">
                              
                                    <b-form-checkbox switch v-model="formulario.is_whatsapp" :state="valid" :unchecked-value="false" :value="true">
                                       <font-awesome-icon :icon="formulario.is_whatsapp ? 'fa-check-double' : 'fa-check'" />
                                       {{ formulario.is_whatsapp ? 'Sí' : 'Nó' }}
                                    </b-form-checkbox>
                              
                                    <b-form-invalid-feedback :state="valid">
                                       {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                 </validation-provider>
                              </b-form-group>
                           </b-col>

                           <b-col cols="12">
                              <b-button type="submit" variant="primary" v-loading="loading">
                                 <feather-icon icon="SaveIcon" />
                                 Guardar
                              </b-button>
                           </b-col>
                        </b-row>

                        </b-container>
                       
                     </b-card>
                   </b-collapse>
                  
                  </b-col>

                  <b-col cols="12" class="mt-2">
                     <h3 >Teléfonos asociados</h3>
                     <table class="table table-sm table-hover w-100">
                        <thead>
                           
                           <th>Teléfono</th>
                           <th>¿Es el principal?</th>
                           <th>¿Asociado a whatsapp?</th>
                           <th></th>

                        </thead>

                        <tbody>
                           <tr v-for="(telefono,i) in telefonos" :key="i">
                              <td>{{ telefono.telefono  }}</td>
                              <td>{{ telefono.principal ? 'Sí' : 'No' }}</td>
                              <td>{{ telefono.is_whatsapp ? 'Sí' : 'No' }}</td>
                              <td>
                                 <b-button size="sm" @click="quitarTelefono(telefono.id)">
                                    <font-awesome-icon icon="fa-trash"></font-awesome-icon>
                                    Quitar Teléfono
                                 </b-button>
                              </td>
                           </tr>
                        </tbody>

                     </table>
                  </b-col>
               </b-row>
            </b-container>
         </b-form>
      </validation-observer>
   </b-card>      
</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup,
   BCollapse,
   BForm,
   VBToggle,
   BFormGroup,
   BFormCheckbox
} from 'bootstrap-vue'

import {
   ValidationObserver,
   ValidationProvider
} from 'vee-validate'

import {
   required
} from '@validations'

import {computed,onMounted,ref,toRefs} from 'vue'
import store from '@/store'
import {regresar} from '@core/utils/utils'

export default {
   
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormInvalidFeedback,
      ValidationObserver,
      ValidationProvider,
      BButton,
      BButtonGroup,
      BCollapse,
      BForm,
      BFormGroup,
      BFormCheckbox



   },
   directives:{
      'b-toggle': VBToggle
   },

   props:{

      actions:{
         type:Function
      },

      telefonos:{
         type:Array
      }
   },

   setup(props){
      const formValidate = ref(null)

      const formulario = ref({
         telefono:'',
         is_whatsapp:false,
         principal:false
      })

      const {
         quitarTelefono,
         guardar
      } = props.actions();


      const clearForm =() => {
         formulario.value = {
            telefono: '',
            is_whatsapp: false,
            principal: false
         }
      }

      return {
         required,
         loading: computed(() => store.state.loading),
         regresar,
         formValidate,
         quitarTelefono,
         guardar,
         formulario,
         clearForm


      }
   }


}
</script>