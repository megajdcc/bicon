import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay:false,
    version:String(localStorage.getItem('version-app'))| null, 
    showComposeEmail:false
  },

  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },

    setVersion(state,version){
      localStorage.setItem('version-app',version)
      state.version = version
    },

    toggleShowComposeEmail(state){
      state.showComposeEmail = !state.showComposeEmail
    }

  },
  actions: {},
}
