
import { ref, watch, computed, onMounted } from 'vue'
import store from '@/store';
import useFilterTable from '@core/utils/useFilterTable';


export default function useCuentaList({model_type,model_id}) {

   const items = ref([])
   const divisa = ref(null)
   const tableColumns = ref([
      { key:'id',label:'#',sortBy:'id',sortable:true},
      { key:'created_at', label: 'Fecha',sortable: true},
      { key: 'concepto', label: 'Concepto', sortable: true,sortBy:'concepto' },
      { key: 'monto', label: 'Monto', sortable: true,class:'text-nowrap' },
      { key: 'balance', label: 'Balance', sortable: true },
   ]);

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


   watch([currentPage, perPage], () => {
      refetchData()
   })

   const fetchData = (ctx , next) => {

      if(model_id.value){
         store.dispatch('movimiento/fetchData', {
            model_id: model_id.value,
            model_type: model_type,
            sortBy: sortBy.value,
            isSortDirDesc: isSortDirDesc.value,
            perPage: perPage.value,
            currentPage: currentPage.value,
            q: searchQuery.value
         }).then(({ movimientos, total: all,divisa:div }) => {

            total.value = all
            items.value = movimientos
            divisa.value = div
            next(movimientos)



         }).catch(e => {
            toast.error('Error cargado data')
         })
      }else{
         items.value = [];
         total.value = 0
         next([])
      }
    


   }
   
   const descargarPdf = () => {

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
      items,
      tableColumns,
      fetchData,
      descargarPdf,
      divisa

   }

}
