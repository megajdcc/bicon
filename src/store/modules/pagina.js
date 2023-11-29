export default{
   namespaced:true,

   state:() => ({
      pagina:{
         id         : null,
         nombre     : '',
         contenido  : '',
         ruta       : '',
         activo     : false,
         is_termino : false,
         is_politica: false,
         usuario_id : null,
         usuario    : null,
         is_contacto:false,
         showHeader:false,
         icono:''
      },

      paginas:[]
   }),


   getters:{
      draft(state){
         return clone(state.pagina)
      },

      pagePolitica(state){
         if(state.paginas.length){
            let page =  state.paginas.find(val => val.is_politica)
            if(page != undefined){
               return page.ruta
            }else{
               return '';
            }
         }else{
            return ''
         }
      },

      pageTerminos(state){
         if(state.paginas.length){
            let page =  state.paginas.find(val => val.is_termino)
            if(page != undefined){
               return page.ruta
            }else{
               return '';
            }
         }else{
            return ''
         }
      },

       pageContacto(state){
         if(state.paginas.length){
            let page =  state.paginas.find(val => val.is_contacto)
            if(page != undefined){
               return page.ruta
            }else{
               return '';
            }
         }else{
            return ''
         }
      }
   },

   mutations:{
      clear(state){
         state.pagina = {
            id         : null,
            nombre     : '',
            contenido  : '',
            ruta       : '',
            activo     : false,
            is_termino : false,
            is_politica: false,
            usuario_id : null,
            usuario    : null,
            is_contacto:false,
            showHeader:false,
            icono:''

         }
      },


      setPagina(state,pagina){
         state.pagina = pagina
      },

      update(state,pagina){
         const i = state.paginas.findIndex(val => val.id === pagina.id)

         if(i !=-1){
            state.paginas[i] = pagina
         }

         if(state.pagina.id === pagina.id){
            state.pagina = pagina
         }
      },

      push(state,pagina){
         state.paginas.push(pagina)

      },

      put(state,pagina_id){
         state.paginas.splice(
            state.paginas.findIndex(val => val.id === pagina_id),
            1
         )
      },

      capturar(state,pagina_id){
         const pagina  = state.paginas.find(val => val.id === pagina_id)

         if(pagina != undefined){
            state.pagina = pagina
         }
      },

      setPaginas(state,paginas){
         state.paginas = paginas
      }
   },

   actions:{

      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/paginas/fetch-data`,datos).then(({data}) => {
               commit('setPaginas',data.paginas)
               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({state,commit},pagina_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/paginas/${pagina_id}/fetch-data`).then(({data}) => {
               commit('setPagina',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            if (datos.id) {
               axios.put(`/api/paginas/${datos.id}`,datos).then(({data}) => {
                  if(data.result){
                     commit('update',data.pagina)

                  }
                  resolve(data)
               }).catch(e => reject(e))

            }else{

               axios.post(`/api/paginas`,datos).then(({data}) => {
                  if(data.result){
                     commit('push',data.pagina)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })
       
      },

      eliminar({ commit }, pagina_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/paginas/${pagina_id}`).then(({ data }) => {
               resolve(data)

            }).catch(e => reject(e))

         })

      },

      capturarPagina({commit},param){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/paginas/get/page/param/${param}`).then(({data}) => {
               if(data.result){
                  commit('setPagina',data.pagina)
                
               }

               resolve(data)
            }).catch(e => reject(e))

         })
      },

      getPaginas({commit}){

          return new Promise((resolve, reject) => {
            
            axios.get(`/api/paginas/get/all`).then(({data}) => {
              commit('setPaginas',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      }

   },







}