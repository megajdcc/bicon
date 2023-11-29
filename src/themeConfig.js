// Theme Colors
// Initially this will be blank. Later on when app is initialized we will assign bootstrap colors to this from CSS variables.
export const $themeColors = {}

// App Breakpoints
// Initially this will be blank. Later on when app is initialized we will assign bootstrap breakpoints to this object from CSS variables.
export const $themeBreakpoints = {}

import logotipo from '@images/logos/logotipo.png'
import logotipowhite from '@images/logos/logotipo.png'

// APP CONFIG
export const $themeConfig = {
  
  app: {
    appName: 'Beacons', // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage:logotipo, // Will update logo in navigation menu (Branding)
    applogoImageWhite:logotipowhite
  },
  
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    routerTransition: 'fade', // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
    type: 'vertical', // vertical, horizontal
    contentWidth: 'full', // full, boxed

    menu: {
      hidden: false,
      isCollapsed: false
    },
    
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: '' // BS color options [primary, success, etc]
    },
    
    footer: {
      type: 'static' // static, sticky, hidden
    },
    
    customizer: true,
    enableScrollToTop: true
  
  }
}
