import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import calidad from './routes/calidad'

Vue.use(VueRouter)
const rutas = [
  ...calidad,
  {
    path: '*',
    redirect: 'error-404',
  }
]
    
const router = new VueRouter({
  
  mode: 'history',
  base: import.meta.env.BASE_URL,
  scrollBehavior : (to,from,savePosition)  => {
    if(savePosition){
      return savePosition
    }else{
      if(to.hash){
        return {
          selector:to.hash
        }
      }
      return { x: 0, y: 0 }
    }
  },

  routes:rutas,
})

router.beforeEach((to, from, next) => {
  
  const isLoggedIn = (localStorage.getItem('token'))  ? true : false;

  if (!canNavigate(to) && !isLoggedIn ) {
    return next({name:'login'})
  } else if(!canNavigate(to) && isLoggedIn){
    return next({ name: 'misc-not-authorized' })
  } else if (to.meta.redirectIfLoggedIn === true && isLoggedIn){
    return next({ name: 'home' })
  }else {
    next();
  }

})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')

  if(appLoading) {
    appLoading.style.display = 'none'
   
  }

})

export default router