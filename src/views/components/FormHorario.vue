<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{ handleSubmit }">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>

               <b-row>

                  <b-col cols="12">
                     <h3 v-if="horarios.length">Horarios</h3>
                     <h3 v-else>No hay horario. ¿ Desea Aperturar Horario ? </h3>
                  </b-col>

                  <b-col cols="12">
                     <p>El horario de trabajo indica a los turístas en qu&eacute; d&iacute;as de la semana hay apertura.</p>
                     <ul>
                        <li>Al especificar el horario de un d&iacute;a, es necesario ingresar la hora de entrada y la
                           hora de salida (ambas).
                        </li>
                        <li>Para indicar un d&iacute;a cerrado basta con dejar en blanco el horario de entrada, o siplemente al pulsar sobre el status se alterna entre cerrado o abierto</li>
                        <li>Ejemplos: Entrada: 08:30, Salida: 22:00.</li>
                        
                     </ul>
                  </b-col>

               </b-row>

               <b-row v-loading="loading">
                  <b-container fluid>
                     <div class="row my-1">

                        <div class="col-12">
                            <table class="table table-sm table-hover table-striped w-100" border="0">
                              <thead>
                                 <th>
                                    Día
                                 </th>
                                 <th>
                                    Estatus
                                 </th>
                                 <th>
                                    ¿ Turno doble ?
                                 </th>
                                 <th>
                                    Horario
                                 </th>
                              </thead>

                              <tbody>
                                 <tr v-for="(horario,i) in horarios" :key="i">

                                    <td>
                                        <label class="font-weight-bolder">{{ horarioDia(horario) }}</label>
                                    </td>
                                    <td>
                                       <b-button size="sm" @click="alternarHorario(i)" :variant="horario.apertura[0] && horario.cierre[0] ? 'success' : 'danger'">
                                          {{  horario.apertura[0] && horario.cierre[0] ? 'Abierto' : 'Cerrado'  }}
                                       </b-button>
                                       
                                    </td>
                                    <td>
                                       <b-form-checkbox v-model="horario.doble_turno" switch :value="true" :unchecked-value="false"></b-form-checkbox>
                                    </td>

                                    <td class="d-flex justify-content-between">

                                       <section v-if="horario.doble_turno" class="d-flex w-100 container-fluid">
                                             <div class="row w-100">
                                                <div class="col-12 col-md-6">

                                                   <el-divider content-position="left">
                                                      Turno Mañana
                                                   </el-divider>

                                                     <b-form-group label="Entrada">

                                                      <!-- <b-form-timepicker v-model="horario.apertura[0]" locale="es"  
                                                                reset-button @hidden="guardarHorario(horario)" placeholder="Entrada" 
                                                                label-close-button="Ok" hour12 size="sm" /> -->
                                                            <el-time-picker
                                                               v-model="horario.apertura[0]"
                                                               placeholder="Entrada"
                                                               value-format="HH:mm:SS"
                                                               @change="guardarHorario(horario)" class="w-100">
                                                            </el-time-picker>
                                                            <!-- <b-form-input type="time" v-model="horario.apertura[0]" 
                                                            placeholder="Entrada" @input="guardarHorario(horario)" ></b-form-input> -->

                                                   </b-form-group>

                                                   <b-form-group label="Salida">

                                                       <el-time-picker
                                                                  v-model="horario.cierre[0]"
                                                                  placeholder="Salida"
                                                                   value-format="HH:mm:SS"
                                                                  @change="guardarHorario(horario)" class="w-100">
                                                               </el-time-picker>
                                                         <!-- <b-form-timepicker v-model="horario.cierre[0]" locale="es"  reset-button 
                                                                  @hidden="guardarHorario(horario)" placeholder="Salida" 
                                                                  label-close-button="Ok" hour12  size="sm"/> -->

                                                   </b-form-group>

                                                </div>

                                                 <div class="col-12 col-md-6">
                                                       <el-divider content-position="left">
                                                         Turno Tarde
                                                      </el-divider>

                                                        <b-form-group label="Entrada">


                                                          <el-time-picker
                                                                     v-model="horario.apertura[1]"
                                                                     placeholder="Entrada"
                                                                      value-format="HH:mm:SS"
                                                                     @change="guardarHorario(horario)" class="w-100">
                                                                  </el-time-picker>
                                                         <!-- <b-form-timepicker v-model="horario.apertura[1]" locale="es"  
                                                                   reset-button @hidden="guardarHorario(horario)" 
                                                                   placeholder="Entrada" label-close-button="Ok" hour12 size="sm" /> -->
                                                      </b-form-group>

                                                      <b-form-group label="Salida">

                                                          <el-time-picker
                                                                     v-model="horario.cierre[1]"
                                                                     placeholder="Salida"
                                                                      value-format="HH:mm:SS"
                                                                     @change="guardarHorario(horario)" class="w-100">
                                                                  </el-time-picker>
                                                            <!-- <b-form-timepicker v-model="horario.cierre[1]" locale="es"  reset-button 
                                                                     @hidden="guardarHorario(horario)" placeholder="Salida" 
                                                                     label-close-button="Ok" hour12 size="sm" /> -->
                                                      </b-form-group>
                                                </div>
                                             </div>  
                                             

                                              
                                       </section>

                                       <section v-else class="d-flex w-100">

                                          <el-time-picker
                                                   v-model="horario.apertura[0]"
                                                   placeholder="Entrada"
                                                    value-format="HH:mm:SS"
                                                   @change="guardarHorario(horario)" class="w-100">
                                                </el-time-picker>

                                             <!-- <b-form-timepicker v-model="horario.apertura[0]" locale="es"  
                                                      reset-button @hidden="guardarHorario(horario)" label-close-button="Ok" size="sm" hour12  /> -->

                                                   <!-- <b-form-timepicker v-model="horario.cierre[0]" locale="es"  reset-button  
                                                   @hidden="guardarHorario(horario)" label-close-button="Ok" hour12 size="sm" /> -->


                                          <el-time-picker
                                                   v-model="horario.cierre[0]"
                                                   placeholder="Salida"
                                                    value-format="HH:mm:SS"
                                                   @change="guardarHorario(horario)" class="w-100">
                                                </el-time-picker>
                                       </section>
                                                   
                                        
                                    </td>

                                 </tr>
                              </tbody>
                           </table>
                        </div>
                       




                     </div>
                  </b-container>

               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">

                        <b-button @click="aperturarHorario" v-if="!horarios.length" variant="primary">
                           Aperturar Horario
                        </b-button>

                        <b-button variant="danger" v-else @click="quitarHorario()" v-loading="loading">
                           <feather-icon icon="TrashIcon" />
                           Quitar Horario
                        </b-button>

                        <b-button variant="dark" @click="regresar" v-loading="loading">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
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
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BForm,
   BFormTimepicker,
   BBadge,
   BFormCheckbox,
   BFormGroup,
   BInputGroup
} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'

import store from '@/store'

import { regresar } from '@core/utils/utils'

import { toRefs, ref, computed, watch, onMounted } from 'vue'
import { horarioDia } from '@core/utils/filter';

export default {

   components: {
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormInvalidFeedback,
      ValidationProvider,
      ValidationObserver,
      BButtonGroup,
      BButton,
      BForm,
      BFormTimepicker,
      BBadge,
   BFormCheckbox,
   BFormGroup,
   BInputGroup

   },

   props: {

      horarios:{
         type:Array,
         required:true
      },

      actions:{
         type:Function,
      }

   },

   setup(props) {


      const formValidate = ref(null)
      const {horarios} = toRefs(props)
      const {  
         aperturarHorario,
         guardarHorario,
         quitarHorario
      } = props.actions();


      const optionsApertura = ref({
         start: '07:00',
         step: '00:15',
         end: '23:00',
      })

      const alternarHorario = (i) => {
         if(horarios.value[i].apertura[0] && horarios.value[i].cierre[0]){
            horarios.value[i].apertura[0] = null
            horarios.value[i].cierre[0] = null
         }else{
            horarios.value[i].apertura[0] = '08:00:00'
            horarios.value[i].cierre[0] = '18:00:00'
         }
         guardarHorario(horarios.value[i]);

      }


      return {
         formValidate,
         loading: computed(() => store.state.loading),
         regresar,
         aperturarHorario,
         optionsApertura,
         guardarHorario,
         quitarHorario,
         horarioDia,
         alternarHorario
      }
   }

}
</script>