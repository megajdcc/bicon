import {ref,computed} from 'vue'

export default function useForm(){

  const passwordFieldType = ref('password')

  const togglePasswordVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }
  const passwordToggleIcon = computed(() => {
      return passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon'
  })

  return {
    togglePasswordVisibility,
    passwordFieldType,
    passwordToggleIcon
  }
}