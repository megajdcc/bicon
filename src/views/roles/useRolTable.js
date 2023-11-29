
import {ref,watch} from 'vue'

import useFilterTable from '@core/utils/useFilterTable'

import store from '@/store';

export default function useRolTable(){


   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true,label:"Rol"},
      { key: 'actions',sortKey:"id", sortable: true },
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

   const fetchData = (context,next) => {

      store.dispatch('rol/fetchData',{
         perPage: perPage.value,
         sortBy:sortBy.value,
         isSortDirDesc:isSortDirDesc.value,
         q:searchQuery.value,
         page: currentPage.value,
         
      }).then((data) => {
         
         next(data.roles)
         total.value = Number(data.total)

      }).catch(e => {
         toast.error('Error trayendo data ')
      })

   }

   const eliminarRol = (id) => {

      store.dispatch('rol/eliminarRol', id).then(({ result }) => {

         if (result) {
            toast.success('Rol Eliminado con éxito.')
            refetchData();
         } else {
            toast.error('Rol no se pudo eliminar, inténtelo de nuevo mas tarde')
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
      eliminarRol
   }


}