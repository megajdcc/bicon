<script>

import form from './form.vue';
import { h, onMounted, onActivated, toRefs, watch } from 'vue'
import store from '@/store'

export default {

   props: ['id'],

   setup(props) {

      const { id } = toRefs(props)
      const { permisos } = toRefs(store.state.permiso)

      const cargarForm = () => {
         if (!permisos.value.length) {
            store.dispatch('permiso/getPermiso', id.value).then((data) => {
               store.commit('permiso/capturarPermiso', Number(id.value))
            })
         } else {
            store.commit('permiso/capturarPermiso', Number(id.value))
         }

      }

      onActivated(() => cargarForm())
      onMounted(() => cargarForm())

      watch([id, permisos], () => {
         cargarForm()
      })


      return () => h(form, {
         on: {
            save: (data, formValidate) => {

               store.dispatch('permiso/guardarPermiso', data).then(({ result, message }) => {

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