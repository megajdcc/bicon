<script>

import form from './form.vue';
import {h,onMounted,onActivated} from 'vue'
import store from '@/store'
import router from '@/router'

export default {
		
	setup(){

		onActivated(() => store.commit('rol/clearRol'))
		onMounted(() => store.commit('rol/clearRol'))

		return () => h(form,{
			on:{
				save: (data,formValidate) => {

					store.dispatch('rol/guardarRol',data).then(({result,message,rol}) => {

						if(result){
							toast.success(message)
							router.push({name:'edit.role',params:{id:rol.id}})
						}else{
							toast.error(message)
						}

					}).catch(e => {
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