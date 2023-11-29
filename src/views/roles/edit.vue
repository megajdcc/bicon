<script>

import form from './form.vue';
import { h, onMounted, onActivated,toRefs,watch } from 'vue'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {roles} = toRefs(store.state.rol)

      const cargarForm = () => {
         if(!roles.value.length){
            store.dispatch('rol/getRol',id.value)
         }else{
            store.commit('rol/capturarRol', Number(id.value))
         }

      }
      
      onMounted(() => cargarForm())

      watch([id], () => {
         cargarForm()
      })


      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('rol/guardarRol', data).then(({ result, message, rol }) => {

                  if (result) {
                     toast.success(message)
                  } else {
                     toast.error(message)
                  }

               }).catch(e => {
                  console.log(e)
                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  }
               })
            }
         }
      })
   }

}

</script>