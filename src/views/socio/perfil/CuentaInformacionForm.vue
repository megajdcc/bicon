<template>
  <b-card>
    <!-- form -->
    <b-form @submit.prevent="guardarCambios" >
      <b-row>
        <!-- bio -->
        <b-col cols="12">
          <b-form-group
            label="Acerca de usted"
            label-for="bio-area"
          >
            <b-form-textarea
              id="bio-area"
              v-model="formulario.bio"
              rows="4"
              placeholder="Redacte algo de usted, una pequeña Bio ... "
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
           <b-form-group
            label="Dirección"
            label-for="bio-domicilio"
          >
            <b-form-textarea
              id="bio-domicilio"
              v-model="formulario.direccion"
              rows="4"
              placeholder="Dirección de domicilio"
            />
          </b-form-group>
        </b-col>
        <!--/ bio -->

        <!-- birth date -->
        <b-col md="6">
          <b-form-group
            label-for="example-datepicker"
            label="Fecha de Nacimiento"
          >
            <flat-pickr
              v-model="formulario.fecha_nacimiento"
              class="form-control"
              name="date"
              placeholder="Fecha de nacimiento"
            />
          </b-form-group>
        </b-col>
        <!--/ birth date -->

        <!-- Country -->
        <b-col md="6">
          <b-form-group
            label-for="website"
            label="Sitio web"
          >
            <b-form-input
              id="website"
              v-model="formulario.website"
              placeholder="Sitio web"
            />
          </b-form-group>
        </b-col>
        <!--/ Country -->
        <!-- phone -->
        <b-col md="6">
          <b-form-group
            label-for="phone"
            label="Phone"
          >
            <cleave
              id="phone"
              v-model="formulario.telefono"
              class="form-control"
              :raw="false"
              :options="clevePhone"
              placeholder="Número de telefono"
            />
          </b-form-group>
        </b-col>
        <!-- phone -->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1" 
            v-loading="loading"
            type="submit"
          >
            Guardar Cambios
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            type="reset"
            class="mt-1"
            variant="outline-secondary"
           
          >
            Limpiar
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import { BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BFormTextarea } from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import Cleave from 'vue-cleave-component'

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'
import {mapState,mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BFormTextarea,
    vSelect,
    flatPickr,
    Cleave,
  },
  directives: {
    Ripple,
  },

  data() {
    
   

    return {
       formulario:{
      	id              :null,
				nombre          :'Jhonatan',
				apellido        :'Crespo',
				telefono        :'',
				bio:'',
				website:'',
				fecha_nacimiento:'',
				imagen          :'',
				direccion       :'',
				email           :'',
				password        :'',
				rol             :null,
				avatar          :'',
				is_dueno :false
    },

      countryOption: ['USA', 'India', 'Canada'],
      clevePhone: {
        phone: true,
        phoneRegionCode: 'US',
      },
    }
  },

  computed:{
     ...mapState(['loading','errors']),
    ...mapState('usuario',['usuario']),
  },

  mounted(){
      this.formulario = clone(this.usuario);
  },
  methods: {

    ...mapMutations(['setError','toggleLoading','clearErrors']),
    ...mapActions('usuario',['guardarUsuario','clearsErrors']),
    ...mapMutations('usuario',['updatePerfil']),

    guardarCambios(){

      this.toggleLoading();

      this.guardarUsuario(this.formulario).then(respon => {
        
        if(respon.data.result){
          this.$notify.success('Se ha guardado con éxito los cambios')
          this.updatePerfil(respon.data.usuario)
        }else{
         this.$notify.info('Los cambios no surtierón efecto, inténtelo de nuevo')
        } 

        this.clearErrors();

      }).catch(e => {
        console.log(e)
      }).then(() => {
        this.toggleLoading()
      })
    }
  
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
