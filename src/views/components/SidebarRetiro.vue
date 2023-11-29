<template>
  <section>
          <b-sidebar :visible="showSidebarRetiro" :title="$t('Solicitud de retiro')" @hidden="$emit('update:showSidebarRetiro',false)">
           <validation-observer ref="formValidate" #default="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(retirar)">
                 <b-container fluid>
                    <b-row>
                       <b-col cols="12">
                          <b-form-group>
                             <template #label>
                                {{ $t('Monto') }}: <span class="text-danger">*</span>
                             </template>

                             <validation-provider name="monto" :rules="`required|mountMax:${getSaldo}`" #default="{ valid, errors }">
                                <currency-input v-model="formulario.monto" :options="{
                                  ...optionsCurrency, ...currencyOptions
                                }" InputClass="form-control" />

                                <b-form-invalid-feedback :state="valid">
                                   {{ errors[0] }}
                                </b-form-invalid-feedback>
                             </validation-provider>
                          </b-form-group>



                          <b-form-group :label="$t('Nota')">
                             <validation-provider name="nota" #default="{ valid, errors }">
                                <b-form-textarea v-model="formulario.nota" :rows="3" :state="valid"/>

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
                             <b-button variant="primary" type="submit" v-loading="loading"
                                :disabled="loading || !formulario.monto > 0" :title="$t('Enviar')">
                                {{ $t('Enviar Solicitud') }}
                             </b-button>
                          </b-button-group>
                       </b-col>
                    </b-row>

                 </b-container>
              </b-form>
           </validation-observer>
        </b-sidebar>


  </section>
</template>

<script>

import {
  BSidebar,
  BRow,
  BCol,
  BContainer,
  BButtonGroup,
  BButton,
  BBadge,
  BLink,
  VBTooltip,
  BCard,
  BTable,
  BFormInput,
  BInputGroup,
  BForm, BFormGroup,
  BFormInvalidFeedback,
  BFormTextarea
} from 'bootstrap-vue'

import store from '@/store'
import { toRefs, ref, computed, watch, inject } from 'vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, mountMax } from '@validations'
import { optionsCurrency } from '@core/utils/utils'

export default {

  components: {
    BSidebar,
    BRow,
    BCol,
    BContainer,
    BButtonGroup,
    BButton,
    BBadge,
    BLink,
    BCard,
    BTable,
    BFormInput,
    BInputGroup,
    BForm, BFormGroup,
    BFormInvalidFeedback,
    BFormTextarea,
    ValidationObserver, 
    ValidationProvider,
    CurrencyInput: () => import('components/CurrencyInput.vue'),

  },

  directives: {
    'b-tooltip': VBTooltip
  },

  props: {
    showSidebarRetiro: Boolean
  },


  model: {
    prop: 'showSidebarRetiro',
    event: 'update:showSidebarRetiro'
  },


  setup(props,{emit}) {

    const currentBreakpoint = computed(() => store.getters['app/currentBreakPoint'])
    const { usuario } = toRefs(store.state.usuario)
    const formValidate = ref(null)
    const { retiro: formulario } = toRefs(store.state.retiro)

   
    const retirar = () => {

      formulario.value.usuario_id = usuario.value.id
      formulario.value.status = 1;

      store.dispatch('retiro/guardar', formulario.value).then(({ result }) => {
        if (result) {
          toast.success('Se ha enviado con éxito tu solicitud de retiro')
          store.commit('retiro/clear')
          emit('showSidebarRetiro',false)

        } else {
          toast.info('No se pudo procesar tu retiro, inténtelo de nuevo mas tarde...')
        }
      }).catch(e => {

        if (e.response.status === 422) {
          formValidate.value.setErrors(e.response.data.errors)
        }

        console.log(e)
      })

    } 

    const getCurrency = computed(() => {
      if (usuario.value.cuenta) {
        return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.iso : 'Tp'
      } else {
        return 'Tp'
      }
    })


      
    return {
      currentBreakpoint,
      required, 
      mountMax,
      formValidate,
      retirar,
      formulario,
      optionsCurrency,
      loading: computed(() => store.state.loading),
      getAncho: computed(() => store.state.app.windowWidth),
      getSaldo: computed(() => {
        return usuario.value.cuenta ? usuario.value.cuenta.saldo : 0
      }),
      currencyOptions:computed(() => ({
          currency:getCurrency.value == 'Tp' ? 'USD' : getCurrency.value,
          currencyDisplay: getCurrency.value == 'Tp' ? 'hidden' : 'symbol'
        })),


    }
  }

}
</script>

<style lang="scss">
.agenda-form-content {
  z-index: 1010 !important;
  position: fixed;
}
</style>

<style lang="scss">
@import "@core/scss/vue/apps/calendar.scss";
</style>