

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function usePermiso() {


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Permiso" },
      { key: 'actions', sortKey: "id", sortable: true },
   ];

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
   } = useFilterTable();

   const fetchData = (context, next) => {

      store.dispatch('permiso/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         isSortDirDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value
      }).then((data) => {

         next(data.permisos)
         total.value = Number(data.total)

      }).catch(e => {
         toast.error('Error trayendo data ')
      })

   }

   const eliminarPermiso = (id) => {

      store.dispatch('permiso/eliminarPermiso', id).then(({ result }) => {

         if (result) {
            toast.success('Permiso Eliminado con éxito.')
            refetchData();
         } else {
            toast.error('El Permiso no se pudo eliminar, inténtelo de nuevo mas tarde')
         }

      }).catch(e => {
         console.log(e)
      })

   }



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
      eliminarPermiso
   }


}