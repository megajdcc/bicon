import Vue from 'vue'
let contentElement = document.createElement('div')
contentElement.className  = 'content-loading';
contentElement.style.display = 'none'

contentElement.style.position  = 'absoluite';
let elementLoading = document.createElement('div')
elementLoading.className  = 'lds-roller';

for (let index = 0; index < 8; index++) {
  elementLoading.appendChild(document.createElement('div'))
}

contentElement.append(elementLoading)

Vue.directive('loading',{
  bind:function(el,{value}) {
    el.style.position = 'relative';
  },

  inserted:(el,{value}) => {
    
    if(!el.contains(contentElement)){
      el.appendChild(contentElement)
    }
  },  



  update(el,{value}){
    if(value){
      contentElement.style.display = 'flex'
    }else{
      contentElement.style.display = 'none'
    }

  },

  unbind(el, binding) {
    // Si el valor del binding es false, elimina el elemento de carga
    if (!binding.value) {
      contentElement.style.display = 'none'
    }
  },
})