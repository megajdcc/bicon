<template>
  <b-nav-item-dropdown
    class="dropdown-notification "
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        badge-classes="bg-danger"
        class="text-body"
        icon="ClipboardIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Observación
        </h4>

      </div>
    </li>


         <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <Label>Puedes agregar tantas observaciones como desees.</Label>
                <small><strong>Nota</strong></small>
                <br>
                <small class="text-justify">Las Observaciones se registran considerando el módulo en donde te encuentras. <br>Encargate de que tu observación este pensado en que mejoremos el mismo. </small><br>
                <small class="text-justify">
                  SI tu observación no tiene nada que ver con este módulo, lo desacheremos. <br>
                  Atenderemos las observaciones a la brevedad.
                </small>

                <div class="form-group">
                  <label for="comentario">Observación</label>

                  <div class="input-group input-group-sm">

                    
                    <el-input type="textarea" v-model="observacion.comentario" id="comentario" :row="3" class="w-100" placeholder="Ingrese su Observación"></el-input>
                  
                    <div class="invalid-feedback" role="alert" v-if="errors.comentario">
                      <strong v-text="errors.comentario[0]"></strong>
                    </div>

                  </div>
                
                </div>


                <div class="form-group">
                  <label for="adjunto">Adjunte un archivo o un capture (recomendado) | opcional</label>

                  <div class="input-group input-group-sm">
                    <b-form-file v-model="observacion.adjunto" size="sm" ref="imagen"  :state="Boolean(observacion.adjunto)" placeholder="Archivo..."/>
                  
                    <div class="invalid-feedback" role="alert" v-if="errors.adjunto">
                      <strong v-text="errors.adjunto[0]"></strong>
                    </div>
                    
                  </div>
                
                </div>

              
              </div>
            </div>

           


          </div>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer"><b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
      :disabled="observacion.comentario.length < 15 "
      @click="enviarObservacion"
     
    >Enviar Observación</b-button>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox, BFormFile
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import {mapState, mapActions } from 'vuex';


export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    BButton,
    BFormCheckbox,
    BFormFile
  },
  directives: {
    Ripple,
  },


   data(){
      return {
          observacion:{
            id        :null,
            modulo    :'',
            comentario:'',
            adjunto   :null,
            usuario_id:null,
            usuario   :null,
            atendido  :false
         },

      }
   },



  computed:{
    	...mapState(['loading','errors']),
		...mapState('usuario',['usuario']),
  },

   mounted(){
      // this.observacion.comentario = this.draft.comentario;
   },


  methods:{

    ...mapActions('observaciones',['guardarObservacion']),

			enviarObservacion(){
				
				this.observacion.modulo = window.location.pathname;


				let formData = new FormData();
				
				formData.append('modulo', window.location.pathname);
				formData.append('comentario', this.observacion.comentario);
				formData.append('adjunto', this.observacion.adjunto);
				formData.append('usuario_id', this.usuario.id);

				this.guardarObservacion(formData).then(respon => {
					
					if(respon.data.success){
						this.observacion.comentario = '';
						this.observacion.adjunto = null;
						this.$notify.success('Tu observación se ha enviado exitosamente')
					}else{
						this.$notify.info('Tu observación no se pudo enviar, inténtelo de nuevo mas tarde')
					}

				}).catch(e => {
					console.log(e);
				});

			}


  },


  	watch:{
			
      draft(){
         // this.observacion.comentario = this.draft.comentario;
      }

  },


}
</script>

<style lang="scss" scope>
	.text-popover{
		overflow-wrap:normal;
		text-align:center;
		line-height: 15pt;
		font-size:12pt;
	}

	small,label{
		word-break: normal;
	}

</style>
