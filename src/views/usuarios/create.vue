<script>

import form from './form.vue';

import { h,onMounted } from 'vue'
import store from '@/store'
import router from '@/router'


export default {
   
   setup(){
      
      store.commit('usuario/clearUsuario')
      return () => h(form, {
         
         on:{
            
            save:(data,formValidate) => {

               store.dispatch('usuario/guardar',data).then(({result,usuario}) => {

                  if(result){
                     toast.success('Se ha registrado al usuario con éxito...')
                     store.commit('usuario/pushUsuario',usuario)
                     router.push({name:'edit.usuario',params:{id:usuario.id}})
                  }else{
                     toast.error('No se pudo registrar al usuario, inténtelo de nuevo mas tarde')

                  }

               }).catch( e => {
                  console.log(e)
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }
               })
           
            }

         }
      })

   }

}
</script>