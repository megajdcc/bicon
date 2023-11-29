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
import {
	BContainer,
	BRow,
	BCol
} from 'bootstrap-vue'
import useAppConfig from '@core/app-config/useAppConfig'

export default {

	components:{
		BContainer,
		BRow,
		BCol
	},

	setup(){

		const {
			routerTransition
		} = useAppConfig();

		return {
			routerTransition
		}
	}
}
</script>