
export default{
   namespaced:true,

   state:() => ({

      evento:{
         id          : null,
         titulo      : '',
         contenido   : '',
         fecha_inicio: null,
         fecha_fin   : null,
         status      : 1, // 1 > activo 2 > vencido 3 > prorrateado
         model_id    : null,
         model_type  : '',
         recurrente  : false,
         recurrencia: {
            dia_semana:[],
            hora_inicio:null,
            hora_fin:null,
            id_group:''
         },
         tipo_recurrencia:1, // 0 => diariamente, 1 => semanalmente, 2 => mensual , 3 => anual
         all_dia:false,
         url         : '',
         model       : null,
         imagenes    : []
      },

      eventos:[]

   }),

   getters:{

      draft(state) {
         return clone(state.evento)
      },


      getStatus(state){
         return (event) => {
            let status = ['Activo','Vencido','Aun no inicia'];

            return status[event.status - 1];
         }
      },

       getRecurrencia(state){
         return (event) => {
            let tipo_recurrencia = ['Diariamente','Semanalmente','Mensual','Anual'];

            return tipo_recurrencia[event.tipo_recurrencia];
         }
      }
   },

   mutations:{

      clear(state){
         state.evento = {
            id          : null,
            titulo      : '',
            contenido   : '',
            fecha_inicio: null,
            fecha_fin   : null,
            status      : 1, // 1 > activo 2 > vencido 3 > prorrateado
            model_id    : null,
            model_type  : '',
            recurrente  : false,
            recurrencia: {
               dia_semana:[],
               hora_inicio:null,
               hora_fin:null,
               id_group:''
            },
            tipo_recurrencia:1, // 1 => semanalmente, 2 => mensual , 3 => anual
            all_dia:false,
            url         : '',
            model       : null,
            imagenes    : []
         }
      },

      capturar(state,evento_id){
         state.evento = state.eventos.find(val => val.id === evento_id)
      },

      setEvento(state,evento){
         state.evento = evento
      },

      setEventos:(state,eventos) => {
         state.eventos = eventos
      },

      update(state,evento){
         let i = state.eventos.findIndex(val => val.id === evento.id)

         if(i != -1){
            state.eventos[i] = evento
         }

         if(state.evento.id === evento.id){
            state.evento = evento
         }

      },

      push(state,evento){
         state.eventos.push(evento)
      },

      put(state,evento_id){

         state.eventos.splice(
            state.eventos.findIndex(val => val.id === evento_id),
            1
         )

      },


      togglePortada(state,{imagen_id,portada}){
         


         if(state.evento.id){
            
            state.evento.imagenes.forEach(val => val.portada = false)
          

            const image = state.evento.imagenes.find(val => val.id === imagen_id)

            image.portada = portada


         }

      }

   },

   actions:{

      fetch({state,commit},evento_id){
         return new Promise((resolve, reject) => {
            
            axios.get(`/api/eventos/${evento_id}/fetch/data`).then(({data}) => {

               commit('setEvento',data)
               resolve(data)
            }).catch( e => reject(e))
         })
      },


      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/eventos/fetch/data`,datos).then(({data}) => {
               commit('setEventos',data.eventos)
               resolve(data)
            }).catch(e => reject(e))


         })
      },

      fetchEventos({state,commit},datos){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/eventos/fetch/eventos`,datos).then(({data}) => {
               commit('setEventos',data)
               resolve(data)
            }).catch(e => {
               console.log(e)
               reject(e)
            })


         })
      },

      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            

           
            if(datos.id){
               axios.put(`/api/eventos/${datos.id}`,datos).then(({data}) => {

                  if(data.result){
                     commit('update',data.evento)
                  }
                  resolve(data)

               }).catch( e => reject(e))

            }else{

               axios.post(`/api/eventos`, datos).then(({ data }) => {
                  
                  if (data.result) {
                     commit('push', data.evento)
                  }
                  
                  resolve(data)

               }).catch(e => reject(e))

            }

         })
      },

      eliminar({ commit }, evento_id) {

         return new Promise((resolve, reject) => {

               axios.delete(`/api/eventos/${evento_id}`).then(({ data }) => {

                  if (data.result) {
                    commit('put',evento_id)
                  }
                  resolve(data)

               }).catch(e => reject(e))

          
         })
      },

       cargarImagen({ state, commit }, { imagenes }) {

         let formData = new FormData();

         imagenes.forEach(val => {
            formData.append('imagen[]', val)
         })

         formData.append('_method', 'put')

         return new Promise((resolve, reject) => {
            axios.post(`/api/eventos/${state.evento.id}/cargar/imagen`, formData, {
               headers: {
                  ContentType: "multipart/form-data: boundary=something"
               }
            }).then(({ data }) => {

               if (data.result) {
                  commit('update', data.evento)

               }

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      eliminarImagen({ state, commit }, imagen_id) {

         return new Promise((resolve, reject) => {

            axios.delete(`/api/eventos/${state.evento.id}/eliminar/imagen/${imagen_id}`).then(({ data }) => {

               if (data.result) {
                  commit('update', data.evento);
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },

      togglePortada({ commit }, datos) {

         commit('togglePortada', { imagen_id: datos.imagen, portada: datos.portada })

         return new Promise((resolve, reject) => {

            axios.put(`/api/imagens/${datos.imagen}/toggle`, datos).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      fetchDataPublic({commit},filtro){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/eventos/fetch-data-public`,filtro).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))

         })
      },


      fetchEventPublic({commit},event_url){
         return new Promise((resolve, reject) => {
            axios.get(`/api/eventos/fetch-data/url/${event_url}`).then(({data}) => {

               if(data.result){
                  commit('setEvento',data.evento)
               }

               resolve(data)
            })
            .catch(e => reject(e))

         })
      }





   }

}