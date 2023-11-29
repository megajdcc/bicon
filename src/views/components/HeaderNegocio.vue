<template>
      <b-card body-class="py-1">
        <b-container fluid class="px-0 mx-0">
          <b-row>
            <b-col cols="12" md="5" class="p-0 d-flex align-items-center">
              <b-badge variant="success" class="mr-1">{{ getStatusNegocio }}</b-badge>
              <b-form-checkbox v-model="negocio.publicado" name="check-button" switch @change="togglePublicado" v-b-tooltip.hover.bottom.v-primary="'Cuando tu negocio esté publicado, todos los viajeros podrán encontrarte'">
                {{ $t('Negocio Publicado') }}: <b>({{ getPublicado }})</b>
              </b-form-checkbox>
            </b-col>
      
            <b-col cols="12" md="7" class="p-0">
      
              <section class="d-flex justify-content-end w-100">
                
                <b-link :to="{name:'perfil.negocio',params:{url:negocio.url}}" v-if="negocio.publicado" class="mr-2">

                 {{ $t('Ver perfil de negocio') }}

                </b-link>
      
                <strong>
                  {{ $t('Afiliado desde') }}: {{ negocio.created_at | fecha("MM-DD-YYYY") }}
                </strong>
              </section>
      
            </b-col>
          </b-row>
        </b-container>
      </b-card>
</template>

<script>

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BBadge,
  BLink,
  BFormCheckbox,
  VBTooltip
} from 'bootstrap-vue'

import {toRefs,computed,inject} from 'vue'

import store from '@/store'

export default {

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BBadge,
    BLink,
    BFormCheckbox

  },

  directives:{
    'b-tooltip':VBTooltip
  },

  props:{
    negocio:Object
  },


  setup(props) {

    const {negocio} = toRefs(props)

    const i18n = inject('i18n')
    
    const togglePublicado = () => {
      
      store.dispatch('negocio/togglePublicado',negocio.value.id).then(({result}) => {
        if(result){
          toast.success('Negocio actualizado con éxito')
        }else{
          toast.info('Negocio no se pudo actualizar, inténte de nuevo mas tarde')
        }
      })

    }

    return {
      getStatusNegocio: computed(() => {
        // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
        const statuses = [i18n.t('Activo'), i18n.t('Vacaciones'), i18n.t('Fuera de Servicio')];

        return statuses[negocio.value.status - 1]
      }),

      getPublicado:computed(() => {
        const legends = ['No publicado','Publicado'];

        return legends[negocio.value.publicado ? 1 : 0 ]
      }),
      togglePublicado
    }
  }
  

}
</script>