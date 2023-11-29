
export default{
   namespaced:true,

   state(){
      return {

         faq:{
            id          : null,
            pregunta    : '',
            respuesta   : '',
            categoria_id: null,
            usuario_id  : null,
            categoria   : null,
            usuario     : null
         },

         faqs:[],

         categoria:{
            id:null,
            nombre:'',
            icono:'',
         },

         categorias:[]

      }

   },

   getters:{

      draft(state) {
         return clone(state.faq)
      },

   

   },

   mutations:{

      // Faqs

      setFaqs(state,data){
         state.faqs = data
      },

      clearFaq(state){
         state.faq = {
            id          : null,
            pregunta    : '',
            respuesta   : '',
            categoria_id: null,
            usuario_id  : null,
            categoria   : null,
            usuario     : null
         }
      },

      capturarFaq(state,faq_id){

         let faq = state.faqs.find(val => val.id === faq_id)

         if(faq){
            state.faq = faq
         }

      },

      updateFaq(state,faq){

         let i = state.faqs.findIndex(val => val.id === faq.id)

         if (i != -1) {
            state.faqs[i] = faq

            if(state.faq.id === faq.id){
               state.faq = faq
            }
         }

      },


      pushFaq(state,data){
         state.faqs.push(data)
      },

      putFaq(state,faq_id){
         state.faqs.splice(
            state.faqs.findIndex(val => val.id === faq_id),
            1
         )
      },


      // Categorias

      setCategorias(state, data) {
         state.categorias = data
      },

      clearCategoria(state) {
         state.categoria = {
            id: null,
            nombre: '',
            icono: '',
         }
      },

      capturarCategoria(state, categoria_id) {

         let categoria = state.categorias.find(val => val.id === categoria_id)

         if (categoria) {
            state.categoria = categoria
         }

      },

      updateCategoria(state, categoria) {

         let i = state.categorias.findIndex(val => val.id === categoria.id)

         if (i != -1) {
            state.categorias[i] = categoria

            if (state.categoria.id === categoria.id) {
               state.categoria = categoria
            }
         }

      },


      pushCategoria(state, data) {
         state.categorias.push(data)
      },

      putCategoria(state, categoria_id) {
         state.categorias.splice(
            state.categorias.findIndex(val => val.id === categoria_id),
            1
         )
      },
   },

   actions:{
      
      fetchFaqs({state,commit},data){
         return new Promise((resolve, reject) => {
            
            commit('toggleLoading',null,{root:true})

            axios.post('/api/faqs/fetch',data).then(({data:datos}) => {
             
               commit('setFaqs',datos.faqs)
               resolve(datos)
            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))

         })
      },

      fetchCategorias({ state, commit }, data) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.post('/api/faqs/categorias/fetch', data).then(({ data: datos }) => {
               resolve(datos)
               commit('setCategorias', datos.categorias)
            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      },

      guardarFaq({commit},data){
         
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            if(data.id){

               axios.put(`/api/faqs/${data.id}`,data).then(({data:datos}) => {
                  commit('updateFaq',datos.faq)
                  resolve(datos)
               }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })
               })

            }else{
               axios.post(`/api/faqs`, data).then(({ data: datos }) => {
                  commit('pushFaq', datos.faq)
                  resolve(datos)
               }).catch(e => reject(e))
                  .then(() => {
                     commit('toggleLoading', null, { root: true })
               })
            }

         })

      },


      guardarCategoria({ commit }, data) {
         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            if (data.id) {

               axios.put(`/api/faqs/faqs-categorias/${data.id}`, data).then(({ data: datos }) => {
                  commit('updateCategoria', datos.categoria)
                  resolve(datos)
               }).catch(e => reject(e))
                  .then(() => {
                     commit('toggleLoading', null, { root: true })
                  })

            } else {
               axios.post(`/api/faqs/faqs-categorias`, data).then(({ data: datos }) => {
                  commit('pushCategoria', datos.categoria)
                  resolve(datos)
               }).catch(e => reject(e))
                  .then(() => {
                     commit('toggleLoading', null, { root: true })
                  })
            }

         })
      },

      eliminarFaq({commit},data_id){

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.delete(`/api/faqs/${data_id}`).then(({data:datos}) => {
               if(datos.result){
                  commit('putFaq',data_id)
                  resolve(datos)
               }
            }).catch(e => {
               reject(e)
            })
            .then(() => commit('toggleLoading',null,{root:true}))

         })
      },

      eliminarCategoria({ commit }, data_id) {

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.delete(`/api/faqs/faqs-categorias/${data_id}`).then(({ data: datos }) => {
               if (datos.result) {
                  commit('putCategoria', data_id)
                  resolve(datos)
               }
            }).catch(e => {
               reject(e)
            })
               .then(() => commit('toggleLoading', null, { root: true }))

         })
      },

      async cargarCategorias({commit}){

         return await new Promise((resolve, reject) => {

            commit('toggleLoading', null, { root: true })
            
            axios.get('/api/faqs/categorias/get/all').then(({data}) => {
               commit('setCategorias',data)
               resolve(data)
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading',null,{root:true})
            })

         })
      },

      async cargarCategoria({ commit },categoria_id) {

         return await new Promise((resolve, reject) => {

            commit('toggleLoading', null, { root: true })

            axios.get(`/api/faqs/categorias/${categoria_id}/get`).then(({ data }) => {
               commit('pushCategoria', data)
               resolve(data)
            }).catch(e => reject(e))
               .then(() => {
                  commit('toggleLoading', null, { root: true })
               })

         })
      },

      async getFaq({commit},faq_id){

         return await new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            axios.get(`/api/faqs/${faq_id}/get`).then(({data}) => {

               resolve(data)
               commit('pushFaq',data)
            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading',null,{root:true})
            })


         })
      },

      async getCategorias({commit},search){

         return await new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})
            axios.post('/api/cargar/categorias',{q:search}).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))

         })
      }



   }
}