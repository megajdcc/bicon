<script>

import form from './form.vue';
import { h, onMounted, onActivated } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

	setup() {

		onActivated(() => store.commit('permiso/clearPermiso'))
		onMounted(() => store.commit('permiso/clearPermiso'))

		return () => h(form, {
			on: {
				save: (data, formValidate) => {

					store.dispatch('permiso/guardarPermiso', data).then(({ result, message, permiso }) => {

						if (result) {
							toast.success(message)
							router.push({ name: 'edit.permiso', params: { id: permiso.id } })
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