<template>
      <article class="icon-like">
         <font-awesome-icon :icon="['fa-solid', iconLike]" :color="is_loggin && isLike ? '#eb5b5e' : '#3f3f3f'" @click.stop="toggleLike" size="2x" />
      </article>
</template>

<script>

import {

} from 'bootstrap-vue'

import store from '@/store'

import {toRefs,computed,onMounted,watch} from 'vue'
import useAuth  from '@core/utils/useAuth'
import router from '@/router'

export default {

   props:{
      model:{
         type:Object,
         required:true
      }
   },


   setup(props){

      const {model} = toRefs(props)

      const {
         is_loggin
      } = useAuth();

      const isLike = computed(() => store.getters['usuario/isLikeModel'](model.value))

      const iconLike = computed(() => {
         return 'fa-heart';
      })

      const toggleLike = () => {

         if(!is_loggin.value){
            router.push({name:'login'})
         }else{
            store.dispatch('usuario/toggleLike', model.value).then(({ result }) => {
               console.log(result)
            })
         }
        

      }

      return {
         toggleLike,
         loading:computed(() => store.state.loading),
         iconLike,
         isLike,
         is_loggin

      }

   }


}
</script>

<style lang="scss">
.icon-like{

   position: absolute;
   top: 1rem;
   left: auto;
   right: 1rem;

   svg{
      transition:1s ease;
      &:hover{
         transform: scale(1.3)
      }
   }
 

}
</style>