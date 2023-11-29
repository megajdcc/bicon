
import {ref,computed} from 'vue'


export default function useTogglePassword(){

   const passwordFieldType = ref('password')

   const togglePasswordVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
   }

   const passwordToggleicon = computed(() => {
      return passwordFieldType.value === 'password' ? 'fa-eye' : 'fa-eye-slash'
   })


   return {
      passwordFieldType,
      togglePasswordVisibility,
      passwordToggleicon
   }
  

  
}

export const _ = null
