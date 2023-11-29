import { ref, onMounted } from 'vue'

export function useRegisterSW() {
  const updateSW = ref(undefined)
  const offlineReady = ref(false)
  const needRefresh = ref(false)

  const onOfflineReadyFn = () => {
    console.log('onOfflineReady')
  }

  const onNeedRefreshFn = () => {
    console.log('onNeedRefresh')
  }

  const closePromptUpdateSW = () => {
    offlineReady.value = false
    needRefresh.value = false
  }

  const updateServiceWorker = () => {
    if(updateSW.value != undefined){
      updateSW.value(true)
      console.log(updateSW.value)
    }
    
  }

  const handleSWManualUpdates = (swRegistration) => {
    // Implement your logic for handling manual SW updates here
  }

  const handleSWRegisterError = (error) => {
    // Implement your logic for handling SW registration errors here
  }

  onMounted(async () => {
    try {
      const { registerSW } = await import('virtual:pwa-register')
      updateSW.value = registerSW({
        immediate: true,
        onOfflineReady() {
          offlineReady.value = true
          onOfflineReadyFn()
        },
        onNeedRefresh() {
          needRefresh.value = true
          onNeedRefreshFn()
        },
        onRegistered(swRegistration) {
          swRegistration && handleSWManualUpdates(swRegistration)
        },
        onRegisterError(e) {
          handleSWRegisterError(e)
        }
      })
      
    } catch {
      console.log('PWA disabled.')
    }
  })

  return {
    updateSW,
    offlineReady,
    needRefresh,
    closePromptUpdateSW,
    updateServiceWorker
  }
}
