
import store from '@/store'

import { ref, computed, onMounted, watch } from 'vue'


export default function useEventosList({destino = null , atraccion = null}) {

  const isSortDirDesc = ref(true)
  const sortBy = ref('id')
  const searchQuery = ref('')
  const perPage = ref(12)
  const currentPage = ref(1)
  const total = ref(0);
  const items = ref([]);
  const perPageOptions = ref([
    {
      label: '12',
      value: 12,
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


  const refetchData = () => fetchData((eventos) => items.value = eventos)

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  // onMounted(() => refetchData())



  const fetchData = (next) => {

    store.dispatch('evento/fetchDataPublic', {
      perPage: perPage.value,
      page: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
      destino: destino ? destino.value.id : null,
      atraccion: atraccion ? atraccion.value.id : null
    }).then(({ meta,data }) => {

      total.value = meta.total
      next(data)
    }).catch(e => {
      toast.info('Error trayendo Data', { position: 'bottom-right' })
    })

  }

  return {
    items,
    isSortDirDesc,
    sortBy,
    searchQuery,
    perPage,
    currentPage,
    total,
    items,
    perPageOptions,
    dataMeta,
    refetchData,
    fetchData,
  }

}
