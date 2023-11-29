<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">

    <b-form @submit.prevent="handleSubmit(enviarReserva)">
      <b-modal :visible="isShowDialog" centered @hide="cerrarModal" :title="$t('Crea tu reserva')" @show="cargarForm">
        <b-form-group>
          <template #label>
            {{ $t('Fecha de la reserva') }}: <span class="text-danger">*</span>
          </template>
        
          <validation-provider name="fecha" #default="{valid,errors}">
        
            <flat-pickr v-model="formulario.fecha" class="form-control"
              :config="{ dateFormat: 'Y-m-d', minDate: 'today', defaultDate: 'today', onChange:(_,dateStr) => consultarHoras(dateStr)  }"
              placeholder="Today " />
        
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        
          </validation-provider>
        </b-form-group>

        <el-divider content-position="left">{{$t('Horas Disponibles')}}</el-divider>
        
        <section class="d-flex flex-wrap" v-if="horas.length > 0 ? true : false">
          <b-form-group :description="$t('AL seleccionar la hora, buscaremos la cantidad de lugares disponibles')">
        
            <validation-provider name="hora" rules="required" #default="{valid,errors}">
        
              <b-form-radio v-model="formulario.hora" v-for="(hora,i) in horas"  :key="i" button button-variant="primary"
                class="btn-horas" size="sm mx-1" :value="hora.hora" :disabled="verificarDisponibilidad(hora.hora,hora.lugares)" :state="valid"
                @change="establecerLugaresDisponibles($event,hora.lugares)">
                {{ hora.hora | fecha('hh:mm A',true) }}
              </b-form-radio>
        
              <b-form-invalid-feedback :state="valid">
                {{ errors[0] }}
              </b-form-invalid-feedback>
        
        
        
            </validation-provider>
          </b-form-group>
        </section>
        
        <section v-else class="bg-danger horas-no-disponible">
          <h3 class="text-white">{{ $t('Sin horas disponibles') }}</h3>
        </section>

        <b-form-group>

          <template #label>
            {{$t('Número de Personas')}}: <span class="text-danger">*</span>
          </template>
        
          <validation-provider name="personas" rules="required|min:1" #default="{valid,errors}">
        
            <b-form-spinbutton v-model="formulario.personas" :min="0" :max="lugares" :disabled="!formulario.hora"
              :state="valid"></b-form-spinbutton>
        
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        
          </validation-provider>

        </b-form-group>
        
        <b-form-group :label="$t('Observación')" :description="$t('Agregue una observación o requerimiento a su Reserva')">
        
          <validation-provider name="observacion" #default="{valid,errors}">
            <b-form-textarea v-model="formulario.observacion" :state="valid" :rows="4" :placeholder="$t('Agregue una observación o requerimiento a su Reserva')"></b-form-textarea>
        
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }} 
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>



        <template #modal-footer="{hide}">
            <b-button-group size="sm">
              <b-button variant="primary" @click="enviarReserva" :title="$t('Enviar Reserva')" :disabled="loading || formulario.personas < 1" v-loading="loading">
                <font-awesome-icon icon="fas fa-paper-plane" />
                {{ $t('Enviar Reserva') }}
              </b-button>

              <b-button variant="dark" title="Cerrar" @click="hide" >
                <font-awesome-icon icon="fas fa-xmark" />
                {{ $t('Cerrar') }}
              </b-button>
            </b-button-group>
          </template>

      </b-modal>
    </b-form>
   
  </validation-observer>
   
</template>


<script>

import {
  BModal,
  BContainer,
  BRow,
  BButtonGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BFormInvalidFeedback,
  BForm,
  BFormRadio,
  BFormSpinbutton,
  BFormTextarea

} from 'bootstrap-vue';

import flatPickr from 'vue-flatpickr-component'
import {ValidationObserver,ValidationProvider}  from 'vee-validate'
import {required} from '@validations';

import store from '@/store'
import { toRefs, ref, computed, onMounted,onActivated,watch,inject } from 'vue'
import useAuth from '@core/utils/useAuth';
export default {
  
  components:{
    BModal,
    BContainer,
    BRow,
    BButtonGroup,
    BButton,
    BFormInput,
    BFormGroup,
    BFormInvalidFeedback,
    ValidationObserver,
    ValidationProvider,
    BForm,
    flatPickr,
    BFormRadio,
    BFormSpinbutton,
    BFormTextarea
  },

  props:['isShowDialog'],

  model:{
    prop: 'isShowDialog',
    event:'update:isShowDialog'
  },

  setup(props,{emit}){


    const swal = inject('swal')
    const i18n = inject('i18n')
    const lugares = ref(0)

    const { isShowDialog } = toRefs(props)
    const formValidate = ref(null)
    const {negocio} = toRefs(store.state.negocio)
    const { reservacion: formulario, } = toRefs(store.state.reservacion)
    const horas = ref([])
    const {usuario} = toRefs(store.state.usuario)


    const enviarReserva = () => {
      formValidate.value.validate().then(result => {

          if(result){

            formulario.value.usuario_id = usuario.value.id;


            store.dispatch('reservacion/guardar', formulario.value).then(({ result }) => {

              if (result) {
                // toast.success('Se ha generado con éxito la reservación', { position: 'bottom-right' })

                 swal({
                    icon: 'success',
                    title: i18n.t('Su reserva ha sido enviada con éxito!'),
                    cancelButtonText:'Ok',
                    showCancelButton:true,
                    showConfirmButton:false
                   
                  })

                store.commit('reservacion/clear')

                emit('update:isShowDialog', false)

              } else {
                toast.info(i18n.t('No se pudo generar la reserva, intente de nuevo mas tarde...'), { position: 'bottom-right' })
                emit('update:isShowDialog', false)
              }

            }).catch(e => {

              console.log(e)

              if (e.response.status === 422) {
                formValidate.value.setErrors(e.response.data.errors)
              }

            })

          }

      })
    }

    const consultarHoras = (fecha) => {

      if (!formulario.value.id) {
        formulario.value.hora = null
      }

      lugares.value = 0

      store.dispatch('reservacion/consultarHoras', { negocio: negocio.value.id, fecha: fecha })
        .then((hours) => horas.value = hours)

    } 


    const cargarForm = () => {


      if (negocio.value.id) {

        store.dispatch('reservacion/getReservacionesNegocio', negocio.value.id)

        if (!formulario.value.id) {
          formulario.value.hora = null
        }

        formulario.value.negocio_id = negocio.value.id

        formulario.value.fecha = moment().format('YYYY-MM-DD');


        consultarHoras(formulario.value.fecha)

        if (formulario.value.id) {
          establecerLugaresDisponibles(formulario.value.hora, horas.value.find(val => val.hora === formulario.value.hora).lugares)
        }
      }

    }

    const {
      is_loggin
    } = useAuth();

    onActivated(() => {
        if(is_loggin){
          cargarForm();
        }
    })
    onMounted(
      () => {
        if (is_loggin) {
          cargarForm();
        }
      }
    )
    watch([negocio], () => {
      if (is_loggin) {
        cargarForm();
      }
    })

    const formatoHora = (hora) => moment(`2020-01-01 ${hora}`).format('hh:mm A') 

    const establecerLugaresDisponibles = (hora, lars) => {
      // console.log(hora, lars)
      formulario.value.personas = 0
     

      lugares.value = lars - store.getters['reservacion/lugaresOcupados']({ fecha: formulario.value.fecha, hora: hora })
      let fecha_selected = moment(`${formulario.value.fecha} ${hora}`);

      if(fecha_selected.isBefore(moment())){
        setTimeout(() => {
            formulario.value.hora = null
        }, 400);
          
          swal({
            icon: 'info',
            title: i18n.t('La hora seleccionada ha pasado. Por favor, elige otro momento.'),
            cancelButtonText: 'Ok',
            showCancelButton: true,
            showConfirmButton: false
          })
      }else if(lugares.value < 1){
        setTimeout(() => {
          formulario.value.hora = null
        }, 400);

        swal({
          icon: 'info',
          title: i18n.t('Esta hora no tiene lugares disponibles. Por favor, selecciona otro horario.'),
          cancelButtonText: 'Ok',
          showCancelButton: true,
          showConfirmButton: false
        })
      }

    
    }

    const cerrarModal = () => {

      store.commit('reservacion/clear')

      emit('update:isShowDialog',false)
    }

    const verificarDisponibilidad = (hora,lugrs) => {
      let lugares = lugrs - store.getters['reservacion/lugaresOcupados']({ fecha: formulario.value.fecha, hora: hora })
      let fecha_selected = moment(`${formulario.value.fecha} ${hora}`);

      var result = false;
      if (fecha_selected.isBefore(moment())) {
        result = true
      } else if (lugares < 1) {
        result = true
      }

      return result;

    } 

    return {

      loading:computed(() => store.state.loading),
      formatoHora,
      establecerLugaresDisponibles,
      consultarHoras,
      required,
      formValidate,
      enviarReserva,
      formulario,
      lugares,
      horas,
      cerrarModal,
      cargarForm,
      verificarDisponibilidad
    }

  }

}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.btn-horas {

  .active {
    background-color: $success !important;
    border: 1px solid $success !important;
  }
}

.horas-no-disponible {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  font-weight: 900;

}
.btn-primary.disabled{
  border-color:gray !important;
  background-color: gray !important;
}
</style>