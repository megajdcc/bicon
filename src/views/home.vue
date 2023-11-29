
<template>
  <div>
      Tablero
  </div>
</template>
<script>

import {h,computed} from 'vue'
import store from '@/store'

export default {

  setup(props){

    return {
      loading:computed(() => store.state.loading)
    }
    
  }
}
</script>

