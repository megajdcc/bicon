<template>
   <b-sidebar  :visible="showFormUser"  :title="`Agregar ${tipo == 1 ? 'Lider' : 'Promotor'}`" backdrop lazy  @hidden="clearForm">
        <validation-observer ref="formValidateLider" #default="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(guardarUsuario)">
            <b-container fluid>
              <b-row>
                <b-col cols="12">


                  <b-form-group label="Username" label-for="username">
                    <validation-provider #default="{ errors, valid }" name="username" rules="required">
                      <b-form-input id="username" v-model="form.username" autofocus :state="valid" trim placeholder="" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>




                  <b-form-group label="Nombre" label-for="nombre">
                    <validation-provider #default="{ errors, valid }" name="nombre" rules="required">
                      <b-form-input id="nombre" v-model="form.nombre" autofocus :state="valid" trim placeholder="" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>



                  <b-form-group label="Apellido" label-for="apellido">

                    <validation-provider #default="{ errors, valid }" name="apellido" rules="required">
                      <b-form-input id="apellido" v-model="form.apellido" autofocus :state="valid" trim
                        placeholder="Crespo" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>


                  <!-- Email -->

                  <b-form-group label="Email" label-for="email">
                    <validation-provider #default="{ errors, valid }" name="email" rules="required|email">
                      <b-form-input id="email" v-model="form.email" :state="valid" trim />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>

                  <!-- Divisa -->
                   <b-form-group label-for="divisa" description="Divisa en la que va a recibir la comisión este lider">
                        
                      <template #label>
                        Divisa: <span class="text-danger">*</span>
                      </template>

                      <validation-provider #default="{ errors, valid }" name="divisa_id" rules="required">
                        <v-select v-model="form.divisa_id" :reduce="option => option.id" label="nombre" :options="divisas.filter(val => val.iso != 'Tp')"></v-select>
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                      </validation-provider>

                  </b-form-group>
                  <!-- Lider Business -->
                  <b-form-group description="Los lideres business, pueden gestionar cuanto cobrarán sus promotores asignados" v-if="tipo == 1" >
                    <template #label>
                      ¿ Lider Business ? 
                    </template>

                    <validation-provider name="lider_business" #default="{ errors, valid }" rules="required">
                      <b-form-radio-group v-model="form.lider_business" :options="[{ text: 'Sí', value: true }, { text: 'No', value: false }]" >
                      </b-form-radio-group>
                    
                         <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
                    </validation-provider>

                  </b-form-group>
                </b-col>
              </b-row>


              <b-row>
                <b-col cols="12">
                  <b-button-group size="sm">
                    <b-button variant="primary" type="submit" title="Guardar" v-loading="loading">
                      <font-awesome-icon icon="fas fa-save" />
                      Guardar
                    </b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </validation-observer>
      </b-sidebar>


</template>
<script>

import {
  BSidebar,
  BForm,
  BFormGroup,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormRadioGroup,
  BFormInput
} from 'bootstrap-vue'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import store from '@/store'

import {computed,toRefs,ref,provide} from 'vue'

import {required,email} from '@validations'
import vSelect from 'vue-select'
export default {
  
  components:{
    BSidebar,
    BForm,
    BFormGroup,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    ValidationObserver,
    ValidationProvider,
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormRadioGroup,
    BFormInput,
    vSelect
  },  

  props:{
    'showFormUser':Boolean,
    tipo:{
      type:Number|String,
      default:1, // 1 Lider, 2 => Promotor 
    },
    liderId:Number

  },

  model:{
    event:'update:showFormUser',
    prop:'showFormUser'
  },

  setup(props,{emit}){
    const {tipo,liderId} = toRefs(props)
    const {divisas} = toRefs(store.state.divisa)
    const coordinador_id = ref();
    const {usuario} = toRefs(store.state.usuario)
    const formValidate = ref(null)
    provide('coordinador_id', coordinador_id)


    const form = ref({
      id: null,
      username: '',
      nombre: '',
      apellido: null,
      email: '',
      lider_id: computed(() => liderId.value),
      coordinador_id: null,
      tipo_usuario: 1, // 1 => Lider , 2 => Promotor
      divisa_id: null,
      lider_business: false,
    })

    

    const cargarForm = () => {
      store.dispatch('divisa/getDivisas')
    }

    const guardarUsuario = () => {

      let url_dispatch = 'usuario/guardarLider';
      if (usuario.value.rol){

        if (!form.value.coordinador_id) {
          form.value.coordinador_id = usuario.value.rol.nombre == 'Coordinador' ? usuario.value.id : null
        }
      }

      if (tipo.value == 2) {
        url_dispatch = 'usuario/guardarPromotor'
      }

      store.dispatch(url_dispatch, form.value).then(({ result }) => {

        if (result) {
          toast.success(`Se ha guardado con éxito al ${tipo.value == 1 ? 'Lider' : 'Promotor'}`)
          
          emit('change')

          clearForm();

          

        } else {  
          toast.info(`No se pudo guardar, al ${tipo.value == 1 ? 'Lider' : 'Promotor'}, inténtelo de nuevo mas tarde.`)
        }
      }).catch(e => {

        if (e.response.status === 422) {
          formValidate.value.setErrors(e.response.data.errors)
        }

        console.log(e)

      })
    } 
    
    const clearForm = () => {

      Object.keys(form.value).forEach(val => {
        if(val != 'lider_id'){
          if(val == 'tipo_usuario'){
            form.value[val] = 1
          }else if(val == 'lider_business'){
            form.value[val] = false
          }else{
            form.value[val] = null
          }
        }
      })
      emit('cerrar')
    }

    cargarForm();
    return {
      guardarUsuario,
      divisas,
      loading:computed(() => store.state.loading),
      clearForm,
      form,
      formValidate,
      required,
      email
    }
  }

}
</script>