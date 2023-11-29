import {computed,onMounted,ref,toRef,toRefs, watch} from 'vue'

import store from '@/store'

export default function dataSearchBookmars(){

  const paginas = ref({
    key: 'title',
    data: [
      { title: 'Home', route: { name: 'home' }, icon: 'HomeIcon', isBookmarked: false, resource: 'home', action: 'read' },
    ],
  });

  const destinosSearch = ref({key:'title',data:[]})  
  const atraccionesSearch = ref({key:'title',data:[]})


  return {
    paginas,
    destinosSearch,
    atraccionesSearch
  }

}
/* eslint-enable */

