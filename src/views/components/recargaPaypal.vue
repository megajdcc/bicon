<template>
        <b-sidebar v-model="showRecarga" right @hidden="$emit('update:showRecarga', false)"  >

            <template #header>
              <h3>{{ $t(title) }}</h3>
            </template>

            <b-container fluid>

              <b-row>
                <b-col cols="12">


                  <b-form-group :label="$t('Monto a recargar')">
                  
                    <validation-provider name="monto" rules="required" #default="{ valid, errors }">
                      <currency-input v-model="monto" :options="optionsCurrency"  InputClass="form-control" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>

                </b-col>

                <b-col cols="12"  v-if="sistema.id">

                  <PayPal :amount="getMount" :currency="iso" :client="credentials" :env="sistema.production_paypal ? 'live' : 'sandbox'" @payment-completed="pagoCompletadoPaypal">
                  </PayPal>

                </b-col>
              </b-row>
            </b-container>

            <template #footer="{ hide }">
              <b-container fluid class="mb-1">
                <b-row>
                  <b-col cols="12" class="d-flex justify-content-end">
                    <b-button-group size="sm">
                      <b-button @click="hide" :title="$t('Cerrar')" variant="danger">
                        {{ $t('Cerrar') }}
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-container>
           
            </template>
          </b-sidebar>

</template>

<script>

import {
  BSidebar,
  BButtonGroup,
  BButton,
  BContainer,
  BRow,
  BCol,
  BForm,BFormGroup,
  BFormInvalidFeedback
} from 'bootstrap-vue'
import {toRefs,ref,computed,onMounted,watch,inject}  from 'vue'
import store from '@/store'

import {ValidationProvider,ValidationObserver} from 'vee-validate';
import CurrencyInput from 'components/CurrencyInput.vue'
import { optionsCurrency } from '@core/utils/utils'
import { required } from '@validations'
import PayPal from 'vue-paypal-checkout'

export default {

  components:{
    BSidebar,
    BButtonGroup,
    BButton,
    BContainer,
    BRow,
    BCol,
    BForm, BFormGroup,
    ValidationProvider,
    ValidationObserver,
    CurrencyInput,
    BFormInvalidFeedback,
    PayPal
  },

  props:{
    showRecarga:Boolean,
    title:{
      type:String,
      default:'Recarga Saldo'
    }
  },

  model:{
    prop:'showRecarga',
    event:'update:showRecarga'
  },

  setup(props,{emit}){

    const formValidate = ref(null)
    const {negocio} = toRefs(store.state.negocio)
    const monto = ref(0)
    const { sistema } = toRefs(store.state.sistema)

    const i18n = inject('i18n')
    const pagoCompletadoPaypal = ({payer,state}) => {
      
        if(state === 'approved'){
          
          store.dispatch('negocio/agregarSaldo',{
              monto:monto.value,
              negocio_id:negocio.value.id,
              concepto:i18n.t('Recarga de Saldo con Paypal Registrado con el número de referencia')`: ${payer.payer_info.payer_id}`

          }).then(({result}) => {
              
              if(result){
                toast.success(i18n.t('Recarga realizada con éxito'), { position: 'bottom-right' })
                
                emit('update:showRecarga',false)
                
                monto.value = 0
              }else{

                toast.info(i18n.t('No pudimos aprobar tu pago, danos 24 horas para verificar tu pago, te estaremos informando'),{position:'bottom-right'})
              }
            
          })
              
        }else{
              toast.info(i18n.t('Su pago no fue cargado...'),{position:'bottom-right'})
        }

    }

    const credentials = ref({
      sandbox: sistema.value.paypal_id || 'ARMAQ0_8KFm9nIJKGSOJUNWBfVWngxhsuu1Vj7N6yL2LVnXBAa_JXIDUeuqkMYU2yONIvpWZZQl-DLiw',
      production: "<production client id>"
    })  

    const iso = computed(() => {
      return negocio.value.divisa ? negocio.value.divisa.iso.toUpperCase() : 'MXN'
    })


    return {
      formValidate,
      loading:computed(() => store.state.loading),
      optionsCurrency,
      required,
      pagoCompletadoPaypal,
      monto,
      getMount: computed(() => String(monto.value)),
      credentials,
      sistema,
      iso
    }
  }
  
}
</script>