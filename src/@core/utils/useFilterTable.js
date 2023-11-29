import {ref,watch,computed}  from 'vue'

export default function useFilterTable(ordenar_por = 'id',sortDirDesc = true){

   const items = ref([])

   const refTable = ref(null)
   const isSortDirDesc = ref(sortDirDesc)
   const sortBy = ref(ordenar_por)
   const searchQuery = ref('')
   const perPage = ref(100)
   const currentPage = ref(1)
   const total = ref(0);

   const perPageOptions = ref([
      {
         label: '10',
         value: 10,
      },
      {
         label: '25',
         value: 25,
      },
      {
         label: '50',
         value: 50,
      },
      {
         label: '100',
         value: 100,
      },
      {
         label: 'Todas',
         value: 0,
      },

   ])

   const dataMeta = computed(() => {

      
      const localItemsCount = refTable.value ? refTable.value.localItems.length : 0
      
      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {

      if(refTable.value){
         refTable.value.refresh()
      }
   }

   watch([currentPage, perPage, searchQuery], () => {
      refetchData()
   })

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
      
   }

}
