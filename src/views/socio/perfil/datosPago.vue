<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
          <b-card>
            
            <b-card-title>
              <h3>Datos de pago</h3>
            </b-card-title>

            <b-container fluid>
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group>
                    <template #label>
                      Metodo de Pago: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="metodo_pago" rules="required" #default="{valid,errors}">
                        <v-select v-model="formulario.metodo_pago" :reduce="option => option.value" :options="MetodosPagos"></v-select>
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </validation-provider>

                  </b-form-group>
                </b-col>
                 <b-col cols="12" md="6">
                    <template v-if="formulario.metodo_pago == 1">
                        <b-form-group>
                          <template #label>
                            Nombre del banco : <span class="text-danger">*</span>
                          </template>

                          <validation-provider name="nombre_banco" rules="required" #default="{valid,errors}">
                            <b-form-input v-model="formulario.nombre_banco" :state="valid" placeholder="Nombre Banco..." />
                            
                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0]  }}
                            </b-form-invalid-feedback>
                          </validation-provider>
                        </b-form-group>
                    </template>

                    <template v-if="[2,3].includes(formulario.metodo_pago)">
                      <b-form-group >
                        <template #label>
                          Email: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="email" rules="email" #default="{valid,errors}">
                          <b-form-input v-model="formulario.email" :state="valid" ></b-form-input>

                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>

                        </validation-provider>
                      </b-form-group>
                    </template>
                  </b-col>

               
              
              </b-row>

              <template v-if="formulario.metodo_pago == 1">
                <el-divider content-position="left">Datos del Banco</el-divider>
                <b-row>
                    <b-col cols="12" md="4">
                      <b-form-group description="Pais donde opera el banco">
                        <template #label>
                          Pais  : <span class="text-danger">*</span>

                          <validation-provider name="pais_id" rules="required" #default="{valid,errors}">
                            <v-select v-model="formulario.pais_id" :options="paises" :reduce="option => option.id" label="pais" @input="cargarEstados(formulario.pais_id)" class="w-100"></v-select>

                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>
                          </validation-provider> 
                        </template>
                      </b-form-group>
                    </b-col>

                    <b-col cols="12" md="4">
                        <b-form-group> 
                          <template #label>
                            Estado : <span class="text-danger">*</span>

                            <validation-provider name="estado_id" rules="required" #default="{ valid, errors }">
                              <v-select v-model="estado_id" :options="estados" :reduce="option => option.id" label="estado" @option:selected="cargarCiudades($event)" class="w-100"></v-select>

                              <b-form-invalid-feedback :state="valid">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                            </validation-provider> 
                          </template>
                        </b-form-group>
                      </b-col>

                       <b-col cols="12" md="4">
                          <b-form-group description="Ciudad donde opera el banco">
                            <template #label>
                              Ciudad : 

                              <validation-provider name="ciudad_id" #default="{ valid, errors }">
                                <v-select v-model="formulario.ciudad_id" :options="ciudades" :reduce="option => option.id" label="ciudad" class="w-100"></v-select>

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider> 
                            </template>
                          </b-form-group>
                        </b-col>

                        <b-col cols="12" >
                          <b-form-group name="Dirección del Banco">
                            <validation-provider name="direccion_banco" #default="{valid,errors}">  
                              <b-form-textarea v-model="formulario.direccion_banco" :state="valid" :rows="3"></b-form-textarea>
                                <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                </b-form-invalid-feedback>
                            </validation-provider>

                          </b-form-group>
                        </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12" md="4">
                    <b-form-group >
                      <template #label>
                        Titular de la cuenta : <span class="text-danger">*</span>
                      </template>

                      <validation-provider name="titular" rules="required" #default="{valid,errors}">
                        <b-form-input v-model="formulario.titular" :state="valid"></b-form-input>
                          
                        <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                        </b-form-invalid-feedback>

                      </validation-provider>
                    </b-form-group>
                  </b-col>


                  <b-col cols="12" md="4">
                      <b-form-group >
                        <template #label>
                          Iban: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="iban" rules="required" #default="{ valid, errors }">
                          <b-form-input v-model="formulario.iban" :state="valid" v-mask="'AA##'" placeholder="Ejemplo: ES21,..."></b-form-input>
                          
                          <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                          </b-form-invalid-feedback>
                        
                        </validation-provider>
                      </b-form-group>
                    </b-col>

                    <b-col cols="12" md="4">
                        <b-form-group >
                          <template #label>
                            Swift: <span class="text-danger">*</span>
                          </template>

                          <validation-provider name="swift" rules="required" #default="{ valid, errors }">
                            <b-form-input v-model="formulario.swift" :state="valid" v-mask="'AAAAAAAA###'" placeholder="BBVAESMM000"></b-form-input>
                          
                            <b-form-invalid-feedback :state="valid">
                                {{ errors[0] }}
                            </b-form-invalid-feedback>
                        
                          </validation-provider>
                        </b-form-group>
                      </b-col>

                      <b-col cols="12" md="6">
                          <b-form-group >
                            <template #label>
                              Número de Cuenta: <span class="text-danger">*</span>
                            </template>

                            <validation-provider name="numero_cuenta" rules="required" #default="{ valid, errors }">
                              <b-form-input v-model="formulario.numero_cuenta" :state="valid"></b-form-input>
                          
                              <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                              </b-form-invalid-feedback>
                        
                            </validation-provider>
                          </b-form-group>
                        </b-col>
                </b-row>

                


              </template>

              <template v-if="[2,3].includes(formulario.metodo_pago)">
                <b-row>
                   <b-col cols="12" md="4">
                      <b-form-group >
                        <template #label>
                          Titular de la cuenta : <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="titular" rules="required" #default="{ valid, errors }">
                          <b-form-input v-model="formulario.titular" :state="valid"></b-form-input>
                          
                          <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                          </b-form-invalid-feedback>

                        </validation-provider>
                      </b-form-group>
                    </b-col>
                </b-row>
              </template>

              <b-row>
                <b-col cols="12">
                  <b-button-group >
                    <b-button variant="primary" v-loading="loading" type="submit" :disabled="loading">
                      <font-awesome-icon icon="fas fa-paper-plane"/>
                      Guardar
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
      </b-form> 
  </validation-observer>
</template>
<script>

import {computed,toRefs,ref,watch} from 'vue'
import store from '@/store';

import {
  BFormGroup,
  BFormInput,
  BForm,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BCard,
  BContainer,
  BRow,
  BCol,
  BCardTitle,
  BFormTextarea
} from 'bootstrap-vue'

import vSelect from 'vue-select'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import useDireccion from '@core/utils/useDireccion.js'

import {required} from '@validations'

export default {

  components:{
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    vSelect,
    ValidationObserver,
    ValidationProvider,
    BCard,
    BContainer,
    BRow,
    BCol,
    BCardTitle,
    BFormTextarea
  },

  setup(props){

    const {datos:formulario} = toRefs(store.state.datosPago)
    const formValidate = ref(null)
    const {usuario} = toRefs(store.state.usuario)

    const cargarForm = () => {

      
      store.dispatch('datosPago/fetch',usuario.value.id).then((data) => {
        if(!data.id){
          store.commit('datosPago/clear')
        }else{
          if(formulario.value.metodo_pago == 1){
             cargarEstados(formulario.value.pais_id)
              
              if(formulario.value.ciudad_id){
                estado_id.value = formulario.value.ciudad.estado.id
              }

          }
         
        }

      })

    }

    // watch(usuario,() => cargarForm())

    
    cargarForm();

    const guardar = () => {
      formulario.value.usuario_id = usuario.value.id
      store.dispatch('datosPago/guardar',formulario.value).then(({result,datos}) => {
          if(result){
            toast.success('Se ha guardado con éxito')

          }else{
            toast.info('No se ha podido guardar, inténtelo de nuevo')
          }

      }).catch( e => {
          
          if(e.response.status === 422){
            formValidate.value.setErrors(e.response.data.errors)
          }else{
            console.log(e)
          }

      })
        
    }

    const MetodosPagos = ref([
      {label:'Transferencia Bancaria',value:1},
      { label: 'Paypal', value: 2 },
      { label: 'Stripe', value: 3 },
    ])

    const {
      paises,
      ciudades,
      estados,
      cargarPaises,
      cargarEstados,
      cargarCiudades,
      estado_id
    } = useDireccion();

    // watch(() => formulario.value.swift,(val) => formulario.value.swift = val.toUpperCase())

    return {
      loading:computed(() => store.state.loading),
      formulario,
      formValidate,
      guardar,
      required,
      MetodosPagos,

      paises,
      ciudades,
      estados,
      cargarPaises,
      cargarEstados,
      cargarCiudades,
      estado_id

    }

  }
}
</script>