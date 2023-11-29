export default{
   
   namespaced:true,

   state(){
      return {
         categoria:{
            id:null,
            categoria:'',
            descripcion:'',
            imagen:null
         },
         categorias:[],

      }

   },

   getters:{
      
      draft(state){
         return clone(state.categoria)
      }

   },

   mutations:{

      setCategorias(state,data) {
         state.categorias = data
      },


      clear(state){
         state.categoria ={
            id: null,
            categoria: '',
            descripcion: '',
            imagen: null
         }
      },


      push(state,data){
         state.categorias.push(data)
      },

      put(state,data_id){
         state.categorias.splice(
            state.categorias.findIndex(val => val.id === data_id),
            1
         )
      },

      capturar(state,data_id){
         let categoria = state.categorias.find(val => val.id === data_id)

         if(categoria){
            state.categoria = categoria
         }
      },

      update(state,data){
         let i = state.categorias.findIndex(val => val.id === data.id)

         if(i != -1){
            state.categorias[i] = data

            if(state.categoria.id === data.id){
               state.categoria = data
            }

         }

      }

   },

   actions:{

      fetchData({commit},data){

         return new Promise((resolve, reject) => {
            commit('toggleLoading',null,{root:true})
            axios.post(`/api/negocio/categorias/fetch/data`,data).then(({data:datos}) => {

               resolve(datos)
               commit('setCategorias',datos.categorias)

            }).catch(e => reject(e))
            .then(() => commit('toggleLoading',null,{root:true}))
         })
      },

      guardar({commit},data){


         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })
            let formData = new FormData();

            Object.keys(data).forEach(val => {
               formData.append(val,data[val]);
            })

            if(data.id){
               
               formData.append("_method",'put')

               axios.post(`/api/negocio/categorias/${data.id}`,formData,{
                  headers:{
                     ContentType:"multipart/form-data; boundary=something",
                  }
               }).then(({data:datos}) => {

                  if(datos.result){
                     commit('update',datos.categoria)
                  }

                  resolve(datos)

               }).catch(e => reject(e))
               .then(() => commit('toggleLoading',null,{root:true}))

            }else{
               axios.post(`/api/negocio/categorias`, formData, {
                  headers: {
                     ContentType: "multipart/form-data; boundary=something",
                  }
               }).then(({ data: datos }) => {

                  if (datos.result) {
                     commit('push', datos.categoria)
                  }

                  resolve(datos)

               }).catch(e => reject(e))
                  .then(() => commit('toggleLoading', null, { root: true }))

            }
         })
      },


      eliminar({commit},data_id){

         return new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.delete(`/api/negocio/categorias/${data_id}`).then(({data}) => {

               if(data.result){
                  commit('put',data_id)
               }

               resolve(data)

            }).catch(e => reject(e))
               .then(() => commit('toggleLoading', null, { root: true }))

         })
         
      }, 


      async getCategoria({commit},data_id){
         return await new Promise((resolve, reject) => {
            commit('toggleLoading', null, { root: true })

            axios.get(`/api/negocio/categorias/${data_id}/get`).then(({data}) => {

               commit('push',data)
               resolve(data)

            }).catch(e => reject(e))
            .then(() => {
               commit('toggleLoading', null, { root: true })
            })
         })
      },

      getCategorias({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/negocio/categorias/get/all`).then(({data}) => {

               commit('setCategorias',data)
               resolve(data)

            }).catch(e =>  reject(e))

         })
      }
   }

}