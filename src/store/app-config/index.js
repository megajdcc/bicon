import { $themeConfig } from '@themeConfig'

export default {
  
  namespaced: true,

  state: {
    layout: {
      
      isRTL: $themeConfig.layout.isRTL,
      skin: localStorage.getItem('vuexy-skin') || $themeConfig.layout.skin,
      routerTransition: localStorage.getItem('transition') ||  $themeConfig.layout.routerTransition,
      type: localStorage.getItem('layout_type') ||  $themeConfig.layout.type,

      contentWidth: $themeConfig.layout.contentWidth,
      
      menu: {
        hidden: $themeConfig.layout.menu.hidden,
      },
      
      navbar: {
        type: localStorage.getItem('navbar_type') || $themeConfig.layout.navbar.type,
        backgroundColor: localStorage.getItem('navbar_color') || $themeConfig.layout.navbar.backgroundColor,
      },
      
      footer: {
        type: localStorage.getItem('footer_type') || $themeConfig.layout.footer.type,
      },


    },
  },
  
  getters: {},

  mutations: {

    TOGGLE_RTL(state) {
      state.layout.isRTL = !state.layout.isRTL
      document.documentElement.setAttribute('dir', state.layout.isRTL ? 'rtl' : 'ltr')
    },
    
    UPDATE_SKIN(state, skin) {
      state.layout.skin = skin

      // Update value in localStorage
      localStorage.setItem('vuexy-skin', skin)

      // Update DOM for dark-layout
      if (skin === 'dark') document.body.classList.add('dark-layout')
      else if (document.body.className.match('dark-layout')) document.body.classList.remove('dark-layout')
    },
    
    UPDATE_ROUTER_TRANSITION(state, val) {


      state.layout.routerTransition = val

      localStorage.setItem('transition', val)


    },

    UPDATE_LAYOUT_TYPE(state, val) {
      state.layout.type = val

      localStorage.setItem('layout_type', val)


    },
    
    UPDATE_CONTENT_WIDTH(state, val) {
      state.layout.contentWidth = val
    },
    
    UPDATE_NAV_MENU_HIDDEN(state, val) {
      state.layout.menu.hidden = val

      // localStorage.setItem('menu_hidden', val)

    },
    
    UPDATE_NAVBAR_CONFIG(state, obj) {
      

      Object.assign(state.layout.navbar, obj)

      const k = Object.keys(obj)[0]

      if (k == 'backgroundColor'){
        localStorage.setItem('navbar_color',obj.backgroundColor);
      }
      
      if(k == 'type'){
        localStorage.setItem('navbar_type',obj.type)
      }

    },

    UPDATE_FOOTER_CONFIG(state, obj) {
      Object.assign(state.layout.footer, obj)

      if (obj.type) {
        localStorage.setItem('footer_type', obj.type)
      }
    },

  },

  actions: {},
}
