<template>
	<b-container fluid class="px-0 mx-0">

		<!-- Table Container Card -->
		<b-card no-body class="mb-0">

			<div class="m-2">
				<!-- Table Top -->
				<b-row>
					<!-- Per Page -->
					<b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
						<per-page v-model="perPage" :perPageOptions="perPageOptions"></per-page>
					</b-col>

					<b-col md="6">
						<div class="d-flex align-items-center justify-content-end">

							<b-input-group size="sm">

								<b-form-input v-model="searchQuery" type="search" placeholder="..." />

								<template #append>
									<b-button variant="dark" :to="{name:'create.role'}">
										<feather-icon size="18" icon="PlusSquareIcon" />
										Añadir
									</b-button>
								</template>
							</b-input-group>


						</div>
					</b-col>

				</b-row>

			</div>

			<b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
				:sort-by.sync="sortBy" empty-text="No se encontró ningún Rol" :sort-desc.sync="isSortDirDesc"
				sticky-header="700px" :no-border-collapse="false" borderless outlined small>

				<!-- Column: Actions -->
				<template #cell(actions)="{item}">

					<b-button-group size="sm">

						<b-button :to="{name:'edit.role',params:{id:item.id}}" variant="primary" title="Editar Rol">
							<feather-icon icon="EditIcon" />
						</b-button>

						<b-button @click="eliminarRol(item.id)" variant="danger" title="Eliminar Rol">
							<feather-icon icon="TrashIcon" />
						</b-button>

					</b-button-group>

				</template>

			</b-table>

			<paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" />


			<b-container class="mb-1">
				<b-row>
					<b-col class="px-1">
						<b-button @click="regresar" size="sm">Regresar</b-button>
					</b-col>
				</b-row>
			</b-container>


		</b-card>
	</b-container>
</template>


<script>

import useRolTable from './useRolTable'
import {
	BCard,
	BContainer,
	BRow,
	BCol,
	BTable,
	BButtonGroup,
	BButton,
	BInputGroup,
	BFormInput

} from 'bootstrap-vue'

import { regresar } from '@core/utils/utils'
import store from '@/store'

	export default{

		components:{
			BCard,
			BContainer,
			BRow,
			BCol,
			BTable,
			BButtonGroup,
			BButton,
			PerPage:() => import('components/PerPage.vue'),
			PaginateTable:() => import('components/PaginateTable.vue'),
			BInputGroup,
			BFormInput

		},

		setup(props){


			const {
				perPageOptions,
				currentPage,
				perPage,
				searchQuery,
				sortBy,
				isSortDirDesc,
				refTable,
				total,
				dataMeta,
				refetchData,
				fetchData,
				tableColumns,
				eliminarRol
			} = useRolTable();


			


			return {
				perPageOptions,
				currentPage,
				perPage,
				searchQuery,
				sortBy,
				isSortDirDesc,
				refTable,
				total,
				dataMeta,
				refetchData,
				fetchData,
				tableColumns,
				eliminarRol,
				regresar
			}
		}
	}

</script>