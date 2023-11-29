import { $themeConfig } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: JSON.parse(localStorage.getItem('vertical_menu_collapse')) ? JSON.parse(localStorage.getItem('vertical_menu_collapse')) : $themeConfig.layout.menu.isCollapsed,
  },
  getters: {},
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      localStorage.setItem('vertical_menu_collapse', val)
      state.isVerticalMenuCollapsed = val
     
    },
  },
  actions: {},
}
