<template>
   <b-modal id="compose-mail" :visible="showComposeEmail" title="Compose Email" modal-class="modal-sticky"
      footer-class="d-flex justify-content-between" body-class="p-0" :size="tamanoModal" no-fade hide-backdrop static
      @change="(val) => $store.commit('app/toggleShowComposeEmail')" ref="refModal">
      <!-- Modal Header -->
      <template #modal-header>
         <h5 class="modal-title">
            Crear Email
         </h5>
         <div class="modal-actions">
            <feather-icon icon="MinusIcon" class="cursor-pointer"
               @click="() => $store.commit('app/toggleShowComposeEmail')" />
            <feather-icon icon="Maximize2Icon" class="ml-1 cursor-pointer" @click="() => maximize = !maximize" />
            <feather-icon icon="XIcon" class="ml-1 cursor-pointer" @click="discardEmail" />
         </div>
      </template>

      <!-- Modal Footer -->
      <template #modal-footer>
         <!-- Footer: Left Content -->
         <div>

            <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary"
               :disabled="!composeData.to.length || composeData.mensaje.length < 5" @click="enviarEmail">
               <feather-icon icon="SendIcon" size="17" class="cursor-pointer" />
               Enviar
            </b-button>
         </div>
         <!-- Footer: Right Content -->
         <div>
            <!-- Discard Compose -->
            <feather-icon icon="TrashIcon" size="17" class="ml-75 cursor-pointer" @click="clearEmail" />
         </div>
      </template>

      <!-- Modal: Body -->
      <b-form>


         <div class="compose-mail-form-field">
            <label for="email-bodas" class="form-label">Boda: </label>
            <v-select v-model="composeData.boda_id" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
               :reduce="(val) => val.value " label="name" class="flex-grow-1 email-to-selector" :close-on-select="false"
               :options="bodasOptions" input-id="email-bodas">
               <template #option="{ name }">
                  <span class="ml-50"> {{ name }}</span>
               </template>
               <template #selected-option="{ name }">
                  <span class="ml-50"> {{ name }}</span>
               </template>
            </v-select>
         </div>

         <!-- Field: To -->
         <div class="compose-mail-form-field">
            <label for="email-to" class="form-label">To: </label>
            <v-select v-model="composeData.to" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" multiple label="name"
               class="flex-grow-1 email-to-selector" :close-on-select="false" :options="emailToOptions"
               input-id="email-to" :reduce="val => val.email" :tabindex="5">

               <template #option="{ name }">
                  <!-- <b-avatar size="sm" :src="avatar" /> -->
                  <span class="ml-50"> {{ name }}</span>
               </template>

               <template #selected-option="{ name }">
                  <!-- <b-avatar size="sm" class="border border-white" :src="avatar" /> -->
                  <span class="ml-50"> {{ name }}</span>
               </template>

               <template #no-options>
                  No hay invitados que seleccionar, selecciona una boda si no has seleccionado alguna
               </template>

            </v-select>

            <span class="mr-1 cursor-pointer" @click="() => composeData.to = emailToOptions.filter(val => val.value)"
               v-if="emailToOptions.length">Todos</span>
            <span class="mr-1 cursor-pointer" @click="() => composeData.to = []"
               v-if="composeData.to.length">Limpiar</span>
            <span class="cursor-pointer" @click="showCcField = !showCcField">Cc</span>
            <span class="ml-1 cursor-pointer" @click="showBccField = !showBccField">Bcc</span>
         </div>

         <!-- Field: Cc (Hidden Initially) -->
         <div v-show="showCcField" class="compose-mail-form-field w-100">
            <label for="email-cc">CC: </label>


            <validation-provider name="cc" rules="email" #default="{errors}" class="w-100">
               <b-form-tags input-id="tags-limit" class="email-cc-selector w-100" v-model="composeData.cc" :limit="10"
                  remove-on-delete :state="errors.length ? false : null" add-button-text="Agregar correo"
                  duplicate-tag-text="El correo ya está escrito" invalid-tag-text="Correo invalido"
                  limit-tags-text="El limite máximo son 10 correos" placeholder="Cuentas de correos electrónicos"
                  :tag-validator="validarCorreo" />

               <b-form-invalid-feedback>
                  {{ errors[0] }}
               </b-form-invalid-feedback>
            </validation-provider>


         </div>

         <!-- Field: Bcc (Hidden Initially) -->
         <div v-show="showBccField" class="compose-mail-form-field">
            <label for="email-bcc">Bcc </label>
            <validation-provider name="bcc" rules="email" #default="{errors}" class="w-100">
               <b-form-tags input-id="tags-limit" class="email-cc-selector w-100" v-model="composeData.bcc" :limit="10"
                  remove-on-delete :state="errors.length ? false : null" add-button-text="Agregar correo"
                  duplicate-tag-text="El correo ya está escrito" invalid-tag-text="Correo invalido"
                  limit-tags-text="El limite máximo son 10 correos" placeholder="Cuentas de correos electrónicos"
                  :tag-validator="validarCorreo" />

               <b-form-invalid-feedback>
                  {{ errors[0] }}
               </b-form-invalid-feedback>
            </validation-provider>
         </div>

         <!-- Field: Subject -->
         <div class="compose-mail-form-field">
            <label for="email-subject">Subject: </label>
            <b-form-input id="email-subject" v-model="composeData.subject" />
         </div>

         <!-- Field: Message - Quill Editor -->
         <div class="message-editor">
            <quill-editor id="quil-content" v-model="composeData.mensaje" :options="editorOption" />
            <div id="quill-toolbar" class="d-flex border-bottom-0">
               <!-- Add a bold button -->
               <button class="ql-bold" />
               <button class="ql-italic" />
               <button class="ql-underline" />
               <button class="ql-align" />
               <button class="ql-link" />
            </div>
         </div>
      </b-form>

   </b-modal>
</template>
<script>


import { BDropdown, BDropdownItem, BForm, BFormInput, BAvatar, BDropdownDivider,
BFormInvalidFeedback,
BFormTags,
BButton
} from 'bootstrap-vue'


import { useFullscreen } from '@vueuse/core'

import Ripple from 'vue-ripple-directive'
import { quillEditor } from 'vue-quill-editor'
import vSelect from 'vue-select'

import {ref, toRefs,computed,watch,onMounted} from 'vue'

import store from '@/store'

import { ValidationProvider } from 'vee-validate'

import { email } from '@validations'

import { validarCorreo } from '@core/utils/validations/validators'

export default {

   components:{
      // BButtonGroup,
      // BButton,
      BDropdown,
      BDropdownItem,
      BForm,
      BFormInput,
      BAvatar,
      BDropdownDivider,
      quillEditor,
      vSelect,
      ValidationProvider,
      BFormInvalidFeedback,
      BFormTags,
      BButton

   },

   directives:{
      Ripple
   }, 
   
   setup(_,{emit}) {

      const refModal = ref(null)
      const maximize = ref(false)

      const bodas = computed(() => store.state.boda.bodas)

      onMounted(() => {

         if(bodas.value.length){
            store.dispatch('boda/cargarBodas')
         }

        
      })

         const {
            isFullscreen, enter, exit, toggle
         } = useFullscreen(refModal);


      const composeData = ref({
         boda_id:null,
         to:[],
         cc:[],
         bcc:[],
         subject:'',
         mensaje:''

      })
      const showCcField = ref(false)
      const showBccField = ref(false)

      const editorOption = {
         modules: {
            toolbar: '#quill-toolbar',
         },
         placeholder: 'Mensaje',
      }


      const emailToOptions = computed(() => {

         if(bodas.value.length){
            let boda = bodas.value.find(val => val.id === composeData.value.boda_id);

            if(boda != undefined){

               return boda.reservaciones.map(val => {
                  return {
                     name: val.invitado,
                     value: val.id,
                     email:val.email
                  }
               })
            }
           
         }

         return [];
        

      })


      
      const bodasOptions = computed(() => {

         if(bodas.value.length){
          
            return bodas.value.map(val => {
               
               if(val.novios){
                  return {
                     name: `${val.novios.novia} & ${val.novios.novio}`,
                     value: val.id
                  }
               }

               return {
                  name:'',
                  id:null
               }

            })
         }

         return [];
        
      })

      const enviarEmail = () => {
        
        store.dispatch('plantilla/enviarEmail',composeData.value).then(({result}) => {

            if(result){
               
               toast.success('Correo enviado')

               clearEmail();

            }else{
               toast.success('Correo no enviado')
            }
          

        }).catch(e => {
         console.log(e) 
        });



      }

      const discardEmail = () => {
         clearEmail()
         store.commit('app/toggleShowComposeEmail')
      }

      const clearEmail = () => {
         composeData.value = {
            boda_id: null,
            to: [],
            cc: [],
            bcc: [],
            subject: '',
            mensaje: ''
         }
      }
    


      return {
       
         discardEmail,
         refModal,
         toggle,
         emailToOptions,
         enviarEmail,
         editorOption,
         showCcField,
         showBccField,
         composeData,
         showComposeEmail:computed(() => store.state.app.showComposeEmail),
         bodas,
         bodasOptions,
         email,
         validarCorreo,
         maximize,
         clearEmail,
         tamanoModal:computed(() => {

            return maximize.value ? 'xl' : 'lg' 

         })

      }

      
   },
}

</script>
<style lang="scss">
@import '@core/scss/base/pages/app-email.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/quill.scss';
</style>

<style lang="scss" scoped>
   form ::v-deep {
   // Mail To vue-select style
   .v-select {
      .vs__dropdown-toggle {
         border: 0;
         box-shadow: none;
      }
      .vs__open-indicator {
         display: none;
      }
   }

   // Quill Editor Style
   .quill-editor {
      .ql-container.ql-snow {
         border-bottom: 0 !important;
      }
   }
   }

   

</style>


<style lang="scss">

#compose-mail{
   .vs__selected-options {
      max-height: 60px;
      overflow-y: auto;
   }
}

</style>