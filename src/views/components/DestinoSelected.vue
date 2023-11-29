<template>
    <b-row>
      <b-col cols="12" >
        <h3>{{ $t(titulo)  }}</h3>
        <p v-html="$t(subTitulo)"></p>
      </b-col>
      <b-col cols="12" >
        <listado :actions="actions" hideFooter hideHeader>
          <template #contenido="{ items }">
                <section class="d-flex  flex-wrap justify-content-center">
                  <div class="card-simple mx-1" v-for="(item, i) in items" :key="i" :style="`background-image:url(${portada(item.imagenes)});cursor:pointer; width:300px;height:200px; min-width:270px`" @click="seleccionarDestino(item.id, item.ruta)">
                      <div class="card-simple-background">
                        <div class="card-simple-content">
                          <h2 @click="seleccionarDestino(item.id, item.ruta)" class="d-flex flex-column">
                                <span class="text-uppercase"> {{ $t(item.nombre) }}</span>
                               <strong>{{ item.pais }}</strong>
                          </h2>
                          <!-- <div class="card-simple-rating">
                          <el-rate :value="promedioCalificacion(item)" disabled disabled-void-color="#4f4f4f"
                            void-color="#000000" class="d-flex flex-nowrap" />
                        </div> -->
        
                          <div class="card-simple-actions">
        
                            <strong @click="seleccionarDestino(item.id, item.ruta)" >
                                {{ $t(item.titulo) }}
                            </strong>
        
                          </div><!-- /.card-simple-actions -->
                        </div><!-- /.card-simple-content -->
        
                      </div><!-- /.card-simple-background -->
                    </div><!-- /.card-simple -->
                </section>
        
          </template>
        </listado>
      </b-col>
      </b-row>
    
 
</template>


<script>

import {
  BCard,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BLink,
  BBadge,
  VBTooltip
} from 'bootstrap-vue'


import store from '@/store'
import router from '@/router';

import {toRefs,ref,computed,onMounted,watch} from 'vue'
import useDestinoList from '@core/utils/destinos/useDestinoList.js'


export default{

  components:{
    BCard,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BLink,
    BBadge,
    Listado:() => import('components/Listado.vue'),
  },

  props:{
    titulo:{
      type:String,
      default:'Destinos Travel Points'
    },

    subTitulo: {
      type: String,
      default: 'Descubre lo que cada destino tiene para ti y los negocios que te ofrecen Travel Points.'
    },
    isSelected:Boolean
  },

  directives:{
    'b-tooltip':VBTooltip
  },  

  setup(props,{emit}){

    
    const actions = useDestinoList()
    const {isSelected} = toRefs(props)

    const portada = (imagenes) => {
      console.log(imagenes[0])
      return `${axios.getUri()}/storage/thumbnails/${imagenes[0].imagen}`
    }   


    onMounted(() => setTimeout(() => {
        actions.refetchData()
    }, 1500));

    const seleccionarDestino = (destino_id,ruta) => {

        if(isSelected.value){
          emit('destinoSelected',destino_id)
        }else{
          router.push(ruta)
        }

    } 

    return {
      portada,
      actions,
      seleccionarDestino
    }
  }


}

</script>

<style lang="scss">
.cards-simple-wrapper {
  margin-bottom: -30px;
}

.card-simple {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-backface-visiblity: hidden;
  margin-bottom: 30px;
  overflow: hidden;
  transform: translateZ(0px);
}

.card-simple:hover .card-simple-background:before {
  opacity: 1;
  -webkit-transform: translateY(0%);
  -ms-transform: translateY(0%);
  transform: translateY(0%);
  -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-label {
  margin-top: -25px;
}

.card-simple:hover .card-simple-content,
.card-simple:active .card-simple-content {
  padding-top: 0px;
  transform: translateX(-50%) translateY(-50%);
  -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-rating {
  opacity: 1;
  transition-delay: .05s;
  -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-actions {
  opacity: 1;
  transition-delay: .1s;
  -webkit-backface-visiblity: hidden;
}

.card-simple-background {
  height: 200px;
  position: relative;
}

.card-simple-background img {
  width: 100%;
}

.card-simple-background:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(top, rgba(54, 54, 54, 0) 0%, rgba(54, 54, 54, 0.7) 75%);
  background: linear-gradient(to bottom, rgba(54, 54, 54, 0) 0%, rgba(54, 54, 54, 0.7) 75%);
  content: '';
  opacity: 1;
  -webkit-transform: translateY(50%);
  -ms-transform: translateY(50%);
  transform: translateY(50%);
  transition: all ease .35s;
}

.card-simple-background:after {
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0px;
  content: '';
  display: block;
  left: 0px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;
}

.card-simple-label {
  background-color: #e6b42e;
  color: #fff;
  left: 50%;
  font-size: 13px;
  padding: 3px 15px;
  position: absolute;
  top: 0px;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  transition: all ease .35s;
  z-index: 2;
}

.card-simple-label a {
  color: #fff;
}

.card-simple-label a:hover {
  color: #fff;
  text-decoration: none;
}

.card-simple-content {
  left: 50%;
  padding-top: 85px;
  position: absolute;
  top: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transition: all ease .35s;
  width: 100%;
  z-index: 2;
}

.card-simple-content h2 {
  color: #fff;
  display: block;
  font-size: 20px;
  margin: 0px;
  overflow: hidden;
  padding: 0px 20px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-simple-content h2 a {
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.card-simple-content h2 a:hover {
  text-decoration: none;
}

.card-simple-rating {
  color: #ffd925;
  margin-top: 10px;
  opacity: 0;
  font-size: 15px;
  text-align: center;
  transition: all ease .35s;
  display: flex;
  justify-content: center;

}

.card-simple-rating i {
  margin-right: 2px;
}

.card-simple-actions {
  color: #fff;
  margin-top: 20px;
  opacity: 0;
  text-align: center;
  transition: all ease .35s;
}

.card-simple-actions .fa,
.card-simple-actions .far,
.card-simple-actions .fas {
  border: 1px solid #fff;
  border-radius: 50%;
  color: #fff;
  height: 32px;
  margin: 0px 6px;
  padding-top: 8px;
  transition: all ease .2s;
  width: 32px;
}

.card-simple-actions .fa:hover {
  background-color: #fff;
  color: #363636;
}

.card-simple-actions .fa-search {
  font-size: 18px;
  height: 40px;
  padding-top: 9px;
  width: 40px;
}

.card-simple-price {
  background-color: #0082b7;
  bottom: 0px;
  color: #fff;
  font-size: 13px;
  left: 50%;
  padding: 3px 15px;
  position: absolute;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2;
}
</style>