<template>
	<b-card>

		<validation-observer ref="formValidate" #default="{handleSubmit}">
			<b-form @submit.prevent="handleSubmit(guardar)">
				<b-container fluid>
					<b-row>
						<b-col cols="12">
							<b-form-group>
								<template #label>
									Nombre Rol | <span class="text-danger">*</span>
								</template>
								<validation-provider name="nombre" rules="required" #default="{errors}">
									<b-form-input v-model="formulario.nombre" :state="errors.length ? false : null" />

									<b-form-invalid-feedback :state="errors.length ? false : null">
										{{ errors[0] }}
									</b-form-invalid-feedback>
								</validation-provider>

							</b-form-group>

						</b-col>
					</b-row>

					<b-row>
						<b-col cols="12">
							<b-card no-body class="border mt-1">
								
								<b-card-header class="p-1">
									<b-card-title class="font-medium-2">
										<feather-icon icon="LockIcon" size="18" />
										<span class="align-middle ml-50">Permisos</span>
									</b-card-title>
								</b-card-header>

										<b-table striped :fields="fieldsTable" small class="mb-0" 
												:items="formulario.permisos">

													<template #cell(module)="data">
														{{ data.value }}
													</template>
											
													<template #cell(read)="{ item }">
														<b-form-checkbox v-model="item.read" />
													</template>
											
													<template #cell(write)="{ item }">
														<b-form-checkbox v-model="item.write" />
													</template>
											
											
													<template #cell(update)="{ item }">
														<b-form-checkbox v-model="item.update" />
													</template>
											
											
													<template #cell(delete)="{ item }">
														<b-form-checkbox v-model="item.delete" />
													</template>
										
										</b-table>
							

								
							</b-card>
						</b-col>
					</b-row>

					<b-row>
						<b-col cols="12">
							<b-button-group size="sm">
								<b-button variant="primary" type="submit" v-loading="loading">
									<feather-icon icon="SaveIcon" />
									Guardar
								</b-button>

								<b-button variant="secondary" @click="regresar">
									<feather-icon icon="ArrowLeftIcon" />
									Regresar
								</b-button>
							</b-button-group>
						</b-col>
					</b-row>
				</b-container>
			</b-form>
		</validation-observer>

	</b-card>

</template> 


<script>

import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BButtonGroup,
  BContainer,
  BFormInvalidFeedback
} from 'bootstrap-vue'


	import { ValidationObserver, ValidationProvider } from 'vee-validate';
	import {required} from '@validations';

	import store from '@/store'
	import {ref,onMounted,watch,computed,toRefs} from 'vue'

	import { regresar } from '@core/utils/utils';
	export default{  
		components: {
			ValidationObserver,
			ValidationProvider,
			BButton,
			BMedia,
			BAvatar,
			BRow,
			BCol,
			BFormGroup,
			BFormInput,
			BForm,
			BTable,
			BCard,
			BCardHeader,
			BCardTitle,
			BFormCheckbox,
			BButtonGroup,
			BContainer,
			BFormInvalidFeedback
		},
			
		setup(_,{emit}){

			const formValidate = ref(null)	

			const refTable = ref(null)

			const {permisos} = toRefs(store.state.permiso)

			const {rol:formulario} = toRefs(store.state.rol) 

			const getPermissionUser = computed({
				get: () =>store.getters['permiso/getPermissionUser'],
				set: (permis) => store.getters['permiso/getPermissionUser'](permis)
			});


			const getPermissionUserForPanel = computed({
				get: () => store.getters['permiso/getPermissionUserForPanel'],
				set:(val) => () => store.getters['permiso/getPermissionUserForPanel'](val)
			})

			const cargarForm = () => {
				formulario.value.permisos = clone(getPermissionUserForPanel.value(formulario.value))
			}

			store.dispatch('permiso/cargarPermisos')

			onMounted(() => {
				cargarForm();
			})

			watch([() => formulario.value.id,permisos],() => {
				cargarForm()
			})

			const guardar = () => {
				// formulario.value.permisos = refTable.value
				emit('save',formulario.value,formValidate.value)
			}

	
			return {
				guardar,
				formValidate,
				required,
				formulario,
				loading:computed(() => store.state.loading),
				regresar,
				getPermissionUser,
				refTable,
				permisos,
				fieldsTable:[{ key: 'module' }, { key: 'read' }, { key: 'write' }, { key: 'update' }, { key: 'delete' }]
			}
		}

	} 

</script>