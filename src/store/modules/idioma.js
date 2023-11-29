import esFlag from '@images/flags/es.png'
export default{
  namespaced:true,
  state(){
    return{
      idioma:{
        id:null,
        languaje:null,
        shortLang:null,
        flag:null,
        default:false
      },

      idiomas:[],
      locales:[{locale:'es',img:esFlag,name:'Español'}]
    }
  },


  getters:{
    draft(state){
      return state.idioma
    }
  },

  mutations:{

    clear(state){
      state.idioma = {
        id:null,
        languaje:null,
        shortLang:null,
        flag:null,
        default:false
      }
    },

    setIdioma(state,idioma){
      if(idioma){
        state.idioma = idioma
      }
    },
    
    setIdiomas(state,idiomas){
      state.idiomas = idiomas
    },

    setLocales(state,locales){
      state.locales = locales
    },

    put(state,idioma_id){

      if(state.idiomas.length){
        state.idiomas.splice(
          state.idiomas.findIndex(i => i.id === idioma_id),
          1
        )
      }
    },


    updateLocale(state,idioma){
        let i = state.locales.findIndex(v => v.locale === idioma.shortLang)

        if(i != -1){
          state.locales[i] = {
            locale:idioma.shortLang,
            img:`${axios.getUri()}/storage/flags/${idioma.flag}`,
            name:idioma.languaje
          }
        }
    },

    pushLocale(state,idioma){

      state.locales.push({
        locale:idioma.shortLang,
        img:`${axios.getUri()}/storage/flags/${idioma.flag}`,
        name:idioma.languaje
      })
    }
  },

  actions:{

    fetch({commit},idioma_id){
      return new Promise((resolve, reject) => {
        axios.get(`/api/idiomas/${idioma_id}/fetch-data`).then(({data}) => {
          commit('setIdioma',data)
          resolve(data)
        }).catch(e  => reject(e))

      })
    },
    
    fetchData({commit},filtro){
      return new Promise((resolve, reject) => {
        axios.post(`/api/idiomas/fetch-data`,filtro).then(({data})  => {
          commit('setIdiomas',data.idiomas)
          resolve(data)
        }).catch(e => reject(e))
      })
    },

    eliminar({commit},idioma_id){
      return new Promise((resolve, reject) => {
        axios.delete(`/api/idiomas/${idioma_id}`).then(({data}) => {
          if(data.result){
            commit('put',idioma_id)
          }

          resolve(data)
        }).catch(e => reject(e))
      })
    },


   guardar({commit},datos){
    let formData = new FormData();

    Object.keys(datos).forEach(v => {
      formData.append(v,datos[v])
    }) 

    const headers = {
      headers:{
        ContentType:'multipart/form-data'
      }
    };


    return new Promise((resolve, reject) => {
      if(datos.id){

        formData.append('_method','PUT');

        axios.post(`/api/idiomas/${datos.id}`,formData,headers).then(({data}) => {
          commit('updateLocale',data.idioma)
          resolve(data)
        }).catch(e => reject(e))
      }else{
        axios.post(`/api/idiomas`,formData,headers).then(({data}) => {
          commit('pushLocale',data.idioma)
          resolve(data)
        }).catch(e => reject(e))
      }
    })
   },

   cargarIdiomas({commit}){
    return new Promise((resolve, reject) => {
      axios.get(`/api/idiomas/get-locales`).then(({data}) => {
        commit('setLocales',data)
        resolve(data)
      }).catch(e => reject(e))
    })
   },

   fetchForShortLang({commit},lang){
    return new Promise((resolve, reject) => {
      
      axios.get(`/api/idiomas/fetch-for-short-lang/${lang}`).then(({data}) => {
        
        commit('setIdioma',data.idioma)
        resolve(data)
      }).catch(e => reject(e))

    })
   },

   guardarJson({commit},{idioma,json}){

    return new Promise((resolve, reject) => {

      axios.put(`/api/idiomas/${idioma}/change-json`,{json:json}).then(({data}) => resolve(data)).catch(e => reject(e))
    })
   }
    


  }
}