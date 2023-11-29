import { ref, watch, computed,onMounted } from 'vue'
import store from '@/store'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';
import {toRefs} from 'vue'
export default function useUsersList() {

   const refUserListTable = ref(null)



  let tableColumns = [
      { key: 'nombre', sortable: true,label:'Usuario' },
      { key: 'activo',label:'Estado',sortable:true},
      { key: 'email', sortable: true,label:"Email" },
      { key: 'rol', sortable: true,label:'rol',sortKey:'rol_id' },
      { key: 'actions',sortable:true, sortKey:'id',sortBy:'id' } ,
   ]
 
   
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
      items,
   } = useFilterTable();

   const roleFilter = ref(null)

   watch([currentPage, perPage, searchQuery, roleFilter,refTable], () => {
      refetchData()
   })

   const fetchData = (ctx, callback) => {
      store.dispatch('usuario/fetchUsers', {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value,
            sortBy: sortBy.value,
            isSortDirDesc: isSortDirDesc.value,
            role: roleFilter.value,
         })
         .then(({total:all,items}) => {
            total.value = all
            callback(items)
         })
         .catch((e) => {
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo usuarios',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })
         })
   }


   const resolveUserRoleVariant = role => {
      if (role === 'Administrador') return 'primary'
      if (role === 'Super administrador') return 'warning'
      if (role === 'Desarrollador') return 'warning'
      if (role === 'Invitado') return 'success'
      if (role === 'Coordinador') return 'danger'
      return 'primary'
   }

   const resolveUserRoleIcon = role => {
      if (role === 'Administrador') return 'ServerIcon'
      if (role === 'Super administrador') return 'ServerIcon'
      if (role === 'Desarrollador') return 'ServerIcon'
      if (role === 'Invitado') return 'UserIcon'
      return 'UserIcon'
   }


   const eliminar = (usuario_id) => {
      store.dispatch('usuario/eliminar',usuario_id).then(({result}) => {
         if(result){
            refetchData()
         }

      } ).catch(e => {
         toast.info('No se pudo eliminar al usuario')
      })
   }


   const cambiarEstado = (user_id) => {
      store.dispatch('usuario/cambiarEstado', user_id).then(({ result }) => {

        if (result) {
          toast.success('Se ha cambiado con éxito el estado del usuario')
          refetchData()
        } else {
          toast.info('No se pudo cambiar el Estado del usuario')
          refetchData();
        }
      }).catch(e => console.log(e))

    }

   return {
      fetchData,
      tableColumns,
      perPage,
      currentPage,
      total,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refUserListTable,
      resolveUserRoleIcon,
      resolveUserRoleVariant,
      refetchData,
      eliminar,
      // Extra Filters
      roleFilter,
      refTable,
      items,
      cambiarEstado
   }
}
