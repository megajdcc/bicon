<template>
   <section>
     <listado :actions="actions">

            <template #titulo>
               <h3 v-if="!hideTitle">{{ $t('Movimientos de Cuentas') }}</h3>
            </template>

            <template #contenido="{ fetchData, tableColumns, isSortDirDesc, sortBy, perPage }">
               <b-card>
                  <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
                     :sort-by="sortBy" :empty-text="$t('No se encontró ningun movimiento...')" :sort-desc="isSortDirDesc"
                     sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
                     showEmpty small stacked="md">

                     <template #cell(created_at)="{ item }">
                        {{ item.created_at | fecha('LLL') }}
                     </template>

                     <template #cell(monto)="{ item }">
                        <span style="color:black" class="font-weight-bolder text-nowrap">
                           {{ item.tipo_movimiento == 1 ? '+' : '-' }}
                           {{ item.divisa_id ? item.divisa.iso : 'Tp' }}
                           {{ item.monto | currency({
                              symbol: item.divisa_id ? item.divisa.simbolo :
                                 '$'
                           }) }}
                        </span>
                     </template>

                     <template #cell(balance)="{ item }">
                        <span style="color:black" class="font-weight-bolder text-nowrap">
                           {{ item.balance < 0 ? '-' : '' }}{{ item.divisa_id ? item.divisa.iso :
                              'Tp' }}{{ item.balance | currency({symbol: item.divisa_id ? item.divisa.simbolo : '$'}) }}
                        </span>
                     </template>

                  </b-table>
               </b-card>

            </template>

            <template #botonera-footer>
               <b-button size="sm" variant="primary" title="Solicitar retiro" @click="mostrarFormRetiro">
                  {{ $t('Solicitar Retiro') }}
               </b-button>
            </template>

         </listado>

         <b-sidebar v-model="showDialogRetiro" :title="$t('Solicitud de retiro')">
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
   BContainer,
   BCard,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BFormInput,
   BInputGroup,
   BSidebar,
   BForm, BFormGroup,
   BFormInvalidFeedback,
   BFormTextarea

} from 'bootstrap-vue'

import useCuentaList from './useCuentaList.js'
import store from '@/store'
import { ref, toRefs, computed, onMounted,inject } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, mountMax } from '@validations'
import { optionsCurrency } from '@core/utils/utils'

import vSelect from 'vue-select'
export default {

   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BInputGroup,
      BFormInput,
      Listado: () => import('components/Listado.vue'),
      BSidebar,
      BForm,
      BFormGroup,
      BFormInvalidFeedback,
      vSelect,
      BFormTextarea,
      ValidationObserver,
      ValidationProvider,
      CurrencyInput: () => import('components/CurrencyInput.vue'),

   },

   props: {
      id: Number | String,
      isReport:Boolean,
      hideTitle:Boolean,
      isFilter:Boolean
   },

   setup(props) {

      const { usuario } = toRefs(store.state.usuario)
      const { sistema } = toRefs(store.state.sistema)
      const showDialogRetiro = ref(false)
      const { retiro: formulario } = toRefs(store.state.retiro)
      const formValidate = ref(null)

      const { id,isReport } = toRefs(props)
      const route = useRoute();
      const showSidebarRetiro = inject('showSidebarRetiro')

      const actions = useCuentaList({
         model_id: computed(() => route.meta.layout == 'travel' ? usuario.value.id : id.value ? id.value : sistema.value.id),
         model_type: route.meta.layout == 'travel' ? 'User' : id.value ? 'User' : 'Sistema'
      });

      onMounted(() => {
         setTimeout(() => actions.refetchData(), 1000)
      })


      const mostrarFormRetiro = () => {
         
         showSidebarRetiro.value = true
      }

      const retirar = () => {
         formulario.value.usuario_id = usuario.value.id
         formulario.value.status = 1;
         store.dispatch('retiro/guardar', formulario.value).then(({ result }) => {
            if (result) {
               toast.success('Se ha enviado con éxito tu solicitud de retiro')
               store.commit('retiro/clear')
               showDialogRetiro.value = false;
               actions.refetchData();
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
         refTable: actions.refTable,
         loading: computed(() => store.state.loading),
         actions,
         mostrarFormRetiro,
         showDialogRetiro,
         formulario,
         retirar,
         formValidate,
         required,
         optionsCurrency,
         getCurrency,
         mountMax,
         showSidebarRetiro,
         descargarPdf: actions.descargarPdf,
         getSaldo:computed(() => {
            return usuario.value.cuenta ? usuario.value.cuenta.saldo : 0
         }), 
         currencyOptions: computed(() => ({
            currency: getCurrency.value == 'Tp' ? 'USD' : getCurrency.value,
            currencyDisplay: getCurrency.value == 'Tp' ? 'hidden' : 'symbol'
         })),
       
         
      }

   }


}
</script>