import Vue from 'vue'

Vue.filter('fecha',(val,format = 'LL', time= false) => {
  if(val && !time) {
    return moment(new Date(val)).locale('es').format(format);
  }else if(val && time){

    return moment(`2020-01-01 ${val}`).locale('es').format(format);
  }
  return 'error en la fecha';

})

Vue.filter('dia',(val) => {
  const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  return dias[val - 1]
})
