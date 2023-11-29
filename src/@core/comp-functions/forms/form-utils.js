export const useInputImageRenderer = (inputEl, callback) => {
  // console.log('enviando imagen')
 
  const inputImageRenderer = () => {
    const file = inputEl.value.files[0]
    const reader = new FileReader()

    reader.addEventListener(
      'load',
      () => {
        callback(reader.result)
      },
      false,
    )

    if (file) {
      reader.readAsDataURL(file)
      // console.log(file)
    }
  }

  return {
    inputImageRenderer,
  }
}

export const _ = null
