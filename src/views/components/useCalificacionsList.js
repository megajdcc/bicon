
import store from '@/store'
import useFilterTable from '@core/utils/useFilterTable'
import {ref,watch,onMounted,computed} from 'vue'

export default function useCalificacionList(model) {

   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(4)
   const currentPage = ref(1)
   const total = ref(0);
   const items = ref([])
   
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

      const localItemsCount = items.value ? items.value.length : 0

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      fetchData((vals) => {
         items.value = vals
      })
   }

   watch([currentPage, perPage, searchQuery], () => {
      refetchData()
   })
   
   const fetchData = (next) => {
      store.dispatch('opinion/fetchDataModel',{
         ...model.value,
         q: searchQuery.value,
         perPage: perPage.value,
         page: currentPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
      }).then(({opinions,total:all}) => {

         total.value = all
         next(opinions)

      }).catch(e => {
         console.log(e)
         toast.info('Error Trayendo data',{position:'bottom-right'})
      })

   } 

   onMounted(() => refetchData())


   return {
      fetchData,
      refetchData,
      perPageOptions,
      dataMeta,
      items,
      sortBy,
      searchQuery,
      perPage,
      currentPage,
      total,
   }

}