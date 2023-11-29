export default{

   namespaced:true,

   state:() => ({

      publicacion:{
         id:null,
         titulo:null,
         contenido:null,
         model_id:null,
         model_type:null,
         imagenes:[],
         model:null
      }   ,
      
      publicaciones:[]
   }),

   getters:{
      
      draft(state){
         return clone(state.publicacion)
      }

   },

   mutations:{
      clear(state) {
         state.publicacion = {
            id: null,
            titulo: null,
            contenido: null,
            model_id: null,
            model_type: null,
            imagenes: [],
            model: null
         }
      },


      setPublicacion(state, publicacion) {
         state.publicacion = publicacion
      },

      update(state, publicacion) {
         const i = state.publicaciones.findIndex(val => val.id === publicacion.id)

         if (i != -1) {
            state.publicaciones[i] = publicacion
         }

         if (state.publicacion.id === publicacion.id) {
            state.publicacion = publicacion
         }
      },

      push(state, publicacion) {
         state.publicaciones.push(publicacion)

      },

      put(state, publicacion_id) {
         state.publicaciones.splice(
            state.publicaciones.findIndex(val => val.id === publicacion_id),
            1
         )
      },

      capturar(state, publicacion_id) {
         const publicacion = state.publicaciones.find(val => val.id === publicacion_id)

         if (publicacion != undefined) {
            state.publicacion = publicacion
         }
      },

      setPublicaciones(state, publicaciones) {
         state.publicaciones = publicaciones
      },


      togglePortada(state, { imagen_id, portada }) {



         if (state.publicacion.id) {

            state.publicacion.imagenes.forEach(val => val.portada = false)
 

            const image = state.publicacion.imagenes.find(val => val.id === imagen_id)

            image.portada = portada


         }

      },


   },

   actions:{
      getPublicaciones({ commit },model) {
         return new Promise((resolve, reject) => {
            axios.post(`/api/publicacions/get/all`,model).then(({ data }) => {
               commit('setPublicaciones', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({ state, commit }, datos) {

         return new Promise((resolve, reject) => {
            axios.post(`/api/publicacions/fetch/data`, datos).then(({ data }) => {

               commit('setPublicaciones', data.publicaciones)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({ state, commit }, publicacion_id) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/publicacions/${publicacion_id}/fetch/data`).then(({ data }) => {
               commit('setPublicacion', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            
            if(datos.id) {

               axios.put(`/api/publicacions/${datos.id}`, datos).then(({ data }) => {
                  
                  if (data.result) {
                     commit('update', data.publicacion)
                  }

                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/publicacions`, datos).then(({ data }) => {
                  if (data.result) {
                     commit('push', data.publicacion)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })

      },

      eliminar({ commit }, publicacion_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/publicacions/${publicacion_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },


      togglePortada({ commit }, datos) {

         commit('togglePortada', { imagen_id: datos.imagen, portada: datos.portada })

         return new Promise((resolve, reject) => {

            axios.put(`/api/imagens/${datos.imagen}/toggle`, datos).then(({ data }) => {

               if (data.result) {
                 
               }

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      addImagenes({ commit }, { publicacion_id, imagenes }) {

         const formData = new FormData();

         imagenes.forEach(val => formData.append('imagenes[]', val));

         formData.append('_method', 'PUT')

         return new Promise((resolve, reject) => {

            axios.post(`/api/publicacions/${publicacion_id}/add/imagen`, formData,
               { headers: { ContentType: 'multipart/form-data' } })
               .then(({ data }) => {

                  if (data.result) {
                     commit('update', data.publicacion)
                  }

                  resolve(data)

               }).catch(e => reject(e))

         })

      },

      eliminarImagen({ commit }, imagen_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/publicacions/eliminar/imagen/${imagen_id}`).then(({ data }) => {
               if (data.result) {
                  commit('update', data.publicacion)
               }
               resolve(data)

            }).catch(e => reject(e))

         })
      },

   }


   
}