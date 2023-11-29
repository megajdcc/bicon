<template>
  <b-card
   :img-src="usuario.portada"
      img-alt="Portada"
      img-top
      class="card-profile" v-if="usuario">

      <b-container fluid>
        <b-row>
          <b-col cols="12"  class="d-flex flex-column align-items-center flex-nowrap">

              <div class="profile-image-wrapper">
                  <div class="profile-image p-0">
                    <b-avatar
                      size="114"
                      variant="light"
                      :src="usuario.avatar"
                    />
                  </div>
              </div>

              <h3 class="text-capitalize text-center">{{ usuario.nombre }}</h3>
              <h6 class="text-muted my-0" v-if="usuario.pais">
                {{ usuario.pais }}
              </h6>
              <b-badge class="profile-badge" variant="light-primary">
                {{ usuario.rol }}
              </b-badge>
              <h3 class="d-block">{{ $t('Nivel de Viajero') }}</h3>

              <section class="d-flex justify-content-center  justify-content-md-start" v-if="usuario.userNivels && usuario.userNivels.length">

                  <insignia v-for="(insignia, i) in usuario.userNivels.filter((un) => un.en_proceso)" :key="i" 
                                   :avance="insignia.avance"
                                   :nivel="insignia.nivel"
                                   />
              </section>
            
              <b-form-checkbox v-model="form.activo" switch v-if="showEditActive" @change="toggleActive">{{ form.activo ? 'Activo' : 'Inactivo' }}</b-form-checkbox>
          </b-col>

          <b-col cols="12"  class="">
             <!-- about -->
              <div
                v-for="(data, key, i) in aboutData"
                :key="i"
                :class="i == 0 ? 'mt-1' : ''"
              >
                <template v-if="data && !['rol', 'nombre', 'pais', 'avatar', 'portada','userNivels'].includes(key)">
                  <h4 class="text-capitalize mb-0 text-justify">
                    {{ key }}
                  </h4>
          
                  <b-card-text v-if="key == 'teléfono'" class="text-justify ">
                      <div v-html="data">
                      </div>
                  </b-card-text>
                  <b-card-text v-else class="text-justify">
                      <div v-html="data">
                      </div>
                    </b-card-text>
                </template>
              
              </div>
          </b-col>
        </b-row>
      </b-container>
     

   
  </b-card>
</template>

<script>
import { BCard, BCardText,
  BAvatar, BBadge,
  BFormCheckbox,
  BContainer,
  BRow,
  BCol
 } from 'bootstrap-vue'
import {toRefs,ref,onMounted,watch} from 'vue'
export default {
  components: {
    BCard,
    BCardText,
    BAvatar, 
    BBadge,
    BFormCheckbox,
    BContainer,
    BRow,
    BCol,
    insignia: () => import('components/insignia.vue')
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },

    showEditActive:Boolean
  },

  setup(props,{emit}){
   

    const {aboutData:usuario} = toRefs(props)
    const form = ref({
      activo: false
    })

    onMounted(() => {
      
      if(usuario.value.activo){
        form.value.activo = usuario.value.activo
      }

    })

    watch(() => usuario.value.activo,(val) => {
        form.value.activo = usuario.value.activo
    })


    const toggleActive = (val) => {
      emit('toggleActivePromotor',val)
    }

    return {
      usuario,
      form,
      toggleActive
    
    }
  }
}
</script>


<style lang="scss" scoped>
  
  .card-profile{
    max-width:450px;
  }
  .card-profile:deep(.card-img-top){
    max-height: 150px;
    object-fit: cover;
    object-position: center;
  }

  .card-profile .card-body{
    padding: .3rem;
    position: relative;
    height: auto;

    .profile-image-wrapper{
        margin-top:-3rem;
        .profile-image{
          position: relative;
          top:.3rem;
        }
    }
   
  }
</style>