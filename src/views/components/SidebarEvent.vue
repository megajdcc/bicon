<template>
      <b-sidebar ></b-sidebar>
</template>

<script>

import {
  BSidebar,
  BContainer,
  BRow,
  BCol,
  BButtom,
  BButtonGroup,

} from 'bootstrap-vue'

export default {
  
  components:{
    BSidebar,
    BContainer,
    BRow,
    BCol,
    BButtom,
    BButtonGroup,
  },

  props:{
    showSidebar:Boolean
  },


  setup(props){

  }
}
</script>