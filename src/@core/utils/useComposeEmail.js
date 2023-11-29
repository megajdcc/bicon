import { ref, watch, computed } from 'vue'


export default function useComposeEmail() { 

   const showComposeEmail = ref(false)

   return {
      showComposeEmail
   }

}