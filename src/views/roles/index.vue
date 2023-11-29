<template>

	<b-container fluid class="px-0">
		<b-row>
			<b-col cols="12">
				<transition :name="routerTransition" mode="out-in">
					<router-view />
				</transition>
			</b-col>
		</b-row>

	</b-container>

</template>

<script>

import useAppConfig from '@core/app-config/useAppConfig'

import store  from '@/store'

import {
	BContainer,
	BRow,
	BCol
} from 'bootstrap-vue'

export default {
	
	components:{
		BContainer,
		BRow,
		BCol
	},

	setup(){
		// store.dispatch('rol/cargarRoles')

		let {
			routerTransition
		} = useAppConfig();

		return {
			routerTransition
		}
	}

}
</script>