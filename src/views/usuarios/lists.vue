<template>

  <listado :actions="actions" hideFooter>
    <template #header-table>
       <!-- Filters -->
      <users-list-filters  v-model="roleFilter" :role-options="getRols" />
    </template>

    <template #btn-action>
      <b-button variant="primary" type="button" class="d-flex align-items-center" v-loading="loading" :to="{name:'create.usuario'}" v-if="$can('write','usuarios')">
        Nuevo usuario
      </b-button>
    </template>
    <template #contenido="{sortBy,eliminar, isSortDirDesc, fetchData, tableColumns }">

      <b-card no-body>
        <b-table ref="refTable" responsive class="position-relative" :items="fetchData" :fields="tableColumns"
            primary-key="id" :sort-by="sortBy" show-empty empty-text="Usuarios no cargados"
            :sort-desc="isSortDirDesc" stacked="md" :busy="loading">

            <!-- Column: User -->
            <template #cell(nombre)="{ item }">
              <b-media vertical-align="center" class="cursor-pointer">
                <template #aside>
                  <b-avatar size="32" :src="null" :text="avatarText(`${item.nombre}`)"
                    :variant="`light-${resolveUserRoleVariant(item.rol.nombre)}`"
                   />
                </template>
                <b-button  variant="outline-text" size="sm"
                  class="font-weight-bold d-block text-nowrap p-0">
                  {{ item.nombre ? `${item.nombre}` : 'Sin definir nombre' }}
                </b-button>
                <small class="text-muted" v-if="item.email">{{ item.email }}</small>
              </b-media>
            </template>


            <template #cell(activo)="{ item }">
              <b-form-checkbox v-model="item.activo" switch @change="cambiarEstado(item.id)" v-if="['Desarrollador', 'Administrador'].includes(usuario.rol.nombre)">
                 {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
              </b-form-checkbox>

              <span v-else>
                  {{ item.activo ? 'Activo (¿Desactivar?)' : 'Desactivo (¿Activar?)' }}
              </span>
            </template>

            <!-- Column: Rol -->
            <template #cell(rol)="{ item }">
              <div class="text-nowrap">
                <feather-icon :icon="resolveUserRoleIcon(item.rol ? item.rol.nombre : '')" size="18" class="mr-50"
                  :class="`text-${resolveUserRoleVariant(item.rol ? item.rol.nombre : '')}`" />
                <span class="align-text-top text-capitalize">{{ item.rol ? item.rol.nombre : 'Sin definir' }}</span>
              </div>
            </template>


            <!-- Column: Actions -->
            <template #cell(actions)="{item}">
              <b-button-group size="sm">
                  <b-button variant="primary" :to="{ name: 'edit.usuario', params: { id: item.id } }"
                    v-if="$can('update', 'usuarios')">
                    <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button variant="danger"  @click="eliminar(item.id)" v-if="$can('delete', 'usuarios') && usuario.id != item.id">
                    <feather-icon icon="TrashIcon" />
                  </b-button>
              </b-button-group>
             
            </template>

          </b-table>
      </b-card>
      
    </template> 
  </listado>
 
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButtonGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
 
  BPagination,
  BFormCheckbox
} from 'bootstrap-vue'

import store from '@/store'
import { computed,watch,onMounted,onActivated } from 'vue'
import { avatarText } from '@core/utils/filter'
import UsersListFilters from './UsersListFilters.vue'
import useUsersList from './useUsersList'

// import UserListAddNew from './UserListAddNew.vue'

import { toRefs } from 'vue'

export default {
  components: {
    UsersListFilters,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButtonGroup,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
   
    BPagination,
    BInputGroup,
    BFormCheckbox,
    Listado:() => import('components/Listado.vue')
  },

 



  setup() {
    const { usuario } = toRefs(store.state.usuario)
    const actions = useUsersList();
    const {
      cambiarEstado,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
    } = useUsersList();
   
    

    onActivated(() => {
      actions.refetchData();
    })
  

    return {
      loading:computed(() => store.state.loading),
      cambiarEstado,
      avatarText,
      roleFilter:actions.roleFilter,
      usuario,
      actions,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      refTable:actions.refTable,
      getRols:computed(() => store.getters['rol/getRols'])
    }
  }

}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>