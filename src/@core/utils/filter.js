import { isToday } from './utils'

export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

export const title = (value, replacer = ' ') => {
  if (!value) return ''
  const str = value.toString()

  const arr = str.split(replacer)
  const capitalizedArray = []
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalizedArray.push(capitalized)
  })
  return capitalizedArray.join(' ')
}

export const avatarText = value => {
  if (!value) return ''
  const nameArray = value.split(' ')
  return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}

export const primerNombre = value => {
  if (!value) return '';

  // console.log(value);
  const NameArray = value.split(' ');

  return NameArray[0].toUpperCase();

 }

 export const horarioDia = (horario) => {

   var dia = ''
   switch (horario.dia) {
     case 1:
       dia = 'Lunes'
       break;
     case 2:
       dia = 'Martes'
       break;
     case 3:
       dia = 'Miercoles'
       break;
     case 4:
       dia = 'Jueves'
       break;
     case 5:
       dia = 'Viernes'
       break;
     case 6:
       dia = 'Sabado'
       break;
     case 7:
       dia = 'Domingo'
       break;
   }
   return dia;
 }

export const getEtapaEdad = (edad) => {

  if (edad <= 5) {
    return 'Infante'
  } else if (edad <= 12) {
    return 'Niñez'
  } else if (edad < 18) {
    return 'Adolescente';
  } else if (edad <= 60) {
    return 'Adulto';
  }

  return 'Adulto mayor';

}
/**
 * Format and return date in Humanize format
 * Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 * Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 * Return short human friendly month representation of date
 * Can also convert date to only time if date is of today (Better UX)
 * @param {String} value date to format
 * @param {Boolean} toTimeForCurrentDay Shall convert to time if day is today/current
 */
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// Strip all the tags from markup and return plain text
export const filterTags = value => value.replace(/<\/?[^>]+(>|$)/g, '')
