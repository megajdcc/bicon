
export const isUserLoggedIn = () => {
  return localStorage.getItem('usuarioId') && localStorage.getItem('accessToken')
}

export const getUserData = () => {
  
}

/**
 * This function is used for demo purpose route navigation
 * In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 * Please note role field is just for showing purpose it's not used by anything in frontend
 * We are checking role just for ease
 * NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */

export const getHomeRouteForLoggedInUser = userRole => {
  
  if(['Desarrollador','Administrador','Super Administrador'].find(val => val === userRole)){
    return {name:'home'}
  }else{
    return {name:'home'}
  }
  
}


