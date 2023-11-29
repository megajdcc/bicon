import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n)
const loadedLanguages = []
const i18n =  new VueI18n({
  locale: localStorage.getItem('locale') ?? 'es',
  fallbackLocale: 'es',
  messages:loadLocaleMessages(localStorage.getItem('locale') || 'es')
})

function loadLocaleMessages(locale) {

  // // const locales = import.meta.globEager('./locales/*.json')
  // // const locales = import.meta.glob('storage/traducciones/*.json',{ as: 'raw', eager: true })
  const messages = import(`./locales/${locale}.json`);

  // const messages = {}
  
  //  for (const path in locales) {  
  //   const matched = path.match(/([A-Za-z0-9-_]+)\.json$/i)
  //   if (matched && matched.length > 1) {
  //     const locale = matched[1]
  //     messages[locale] = locales[path].default
  //   }
  // }

  loadLocaleAsync(locale)
  
  return messages

  
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLocaleAsync(lang){
  // // Si es el mismo idioma
  // if (i18n.locale === lang) {
  //   return Promise.resolve(setI18nLanguage(lang))
  // }

  // Si el idioma ya está cargado
  // if (loadedLanguages.includes(lang)) {
  //   return Promise.resolve(setI18nLanguage(lang))
  // }

  return new Promise((resolve, reject) => {
  
  })
 
  
}

export default i18n;