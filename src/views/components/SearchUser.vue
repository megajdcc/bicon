<template>

    <section class="d-flex flex-column justify-content-center align-items-center" style="transition:1.5s ease">

      <template v-if="user">
        <section class="w-75" style="overflow-x:hidden">
            <b-card v-show="user != null" class="mb-1 user-selected" plaintext body-class="p-0 user-selected" no-body>
              <b-avatar :src="user.avatar" size="lg" class="mr-1" />
              <main>
                <h3>{{ `${user.nombre} ${user.apellido}` }}</h3>
                <span>
                  {{ `${user.username} - ${user.email}` }}
                </span>
              </main>
            </b-card>
        </section>
      
      </template>

      <section class="w-100 d-flex justify-content-center content-search">
      
      
      
      
        <b-input-group class="el-search" size="md" v-b-tooltip.hover="legendTooltip">
          <b-input-group-prepend is-text>
            <feather-icon icon="SearchIcon" />
          </b-input-group-prepend>
      
          <b-form-input  :value="search" @input="remoteMethod"  :placeholder="textSearch" ref="refInput">
      
          </b-form-input>
      
        </b-input-group>
      
      
      
      
        <b-list-group class="collapseSearch d-flex flex-column align-items-center" ref="refToggle" v-if="search">
          <!-- <b-spinner v-show="loading" variant="primary" class="my-1"></b-spinner> -->
      
      
      
      
          <b-list-group-item v-for="(usuario, i) in resultados" :key="i" class="cursor-pointer" button
            @click="userSelected(usuario)">
      
            <article class="d-flex" @click="userSelected(usuario)">
              <b-avatar :src="usuario.avatar" size="lg" class="mr-1" />
              <!-- <b-img :src="imagen" thumbnail style="height:70px; width:70px;object-fit:fill" class="mr-1" /> -->
              <main>
                <h3>{{ `${usuario.nombre} ${usuario.apellido}` }}</h3>
                <span>
                  {{ `${usuario.username} - ${usuario.email}` }}
                </span>
              </main>
            </article>
          </b-list-group-item>
      
      
      
          <b-list-group-item v-if="!resultados.length" button variant="info">
            <b-link>
              Sin Resultados
            </b-link>
          </b-list-group-item>
      
        </b-list-group>
      
      
      </section>

    </section>
     

</template>

<script>

import { toRefs, ref, computed, onMounted, watch } from 'vue'

import store from '@/store'
import vSelect from 'vue-select'

import {
  BFormInput,
  BCollapse,
  BListGroup,
  BListGroupItem,
  VBToggle,
  BSpinner,
  BImg,
  BContainer,
  BRow,
  BInputGroup,
  BCol,
  BInputGroupText,
  BInputGroupPrepend,
  BLink,
  VBTooltip,
  BAvatar,
  BCard,

} from 'bootstrap-vue'

export default {

  components: {
    BCollapse,
    BFormInput,
    BListGroup,
    BListGroupItem,
    BSpinner,
    BImg,
    BContainer,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupText,
    BInputGroupPrepend,
    BLink,
    vSelect,
    BAvatar,
    BCard,


  },

  directives: {
    'b-toggle': VBToggle,
    'b-tooltip': VBTooltip
  },

  props:{
    textSearch:{
      type:String,
      default:'Nombre de usuario'
    },

    legendTooltip:{
      type:String,
      default:'Busque a su usuario'
    },

    usuarioSeleccionado:{
      type:Object,
      required:false,
    }
  },


  setup(props,{emit}) {

    const search = ref('')
    const refInput = ref(null);
    const resultados = ref([])
    const collapseSearch = ref(null)
    const user = ref(null);
    const {usuarioSeleccionado} = toRefs(props)

    const inputSearch = ref(false)
    const listenToggle = ref(false)
    
    const remoteMethod = _.debounce(query => {
        search.value = query
      
    }, 600)


    const realizarConsulta = () => {
       store.dispatch('usuario/searchUser',search.value)
       .then((data) => resultados.value = data)
       .catch(e => console.log(e))
    }
    
    watch(search,() => realizarConsulta())

    const userSelected = (usuario) => {
        
        user.value = null
        user.value = usuario
        resultados.value = []
        
        search.value = ''
        emit('userSelected',user.value)
        
    } 

    const cargarForm = () => {

      if(usuarioSeleccionado.value.id){
        user.value = usuarioSeleccionado.value
      }

    }

    watch([usuarioSeleccionado],() => cargarForm())

    onMounted(() => {
      cargarForm()
    })

    return {
      remoteMethod,
      loading: computed(() => store.state.loading),
      search,
      resultados,
      collapseSearch,
      refInput,
      inputSearch,
      listenToggle,
      userSelected,
      user
    }

  }

}

</script>

<style lang="scss">
.content-search {
  position: relative;
}

.el-search {
  width: 100%;
}

.collapseSearch {
  width: 100%;
  display: flex;
  // min-height: 50px;
  position: absolute;
  top: 3rem;
  background: #404656;
  transition: 1.5s ease;
  list-style: none;
  z-index: 6000;

  animation: establecerAltura 1.5s;

  height: auto;
  max-height: 300px;
  overflow-y: scroll;

}

@media (min-width:762px) {

  .el-search {
    width: 75% !important;
  }

  .collapseSearch {
    width: 75%;
  }

}

@keyframes establecerAltura {
  to {
    top: 3rem;
  }

  from {
    top: 0rem;
  }


}

.user-selected{
  // background: #f8f8f8;
  width: 100%;
  display: flex !important;
  flex-direction: row !important;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  padding: 0.5rem;
  transition: 3s ease;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 70px !important;
  white-space:nowrap;
  animation:mostrarUser 1.5s;

  main{
    width:100%
  }

}

@keyframes mostrarUser {
  to {
    // top: 3rem;
    transform: translateX(0%);
    // width:75%;
  }

  from {
    transform: translateX(-100%);
    // width: 0%;
  }


}
</style>