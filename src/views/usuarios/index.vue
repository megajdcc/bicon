<script>
import { h } from 'vue'
import Views from 'components/Views.vue'
import store from '@/store'

export default {

	setup: () => {
		store.dispatch('rol/cargarRoles');
		return () => h(Views)
	}

}
</script>