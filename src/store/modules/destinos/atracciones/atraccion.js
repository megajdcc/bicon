
export default {
   namespaced:true,

   state: () => ({

      atraccion: {
         id               : null,
         nombre           : null,
         destino_id       : null,
         destino:null,
         sitio_web        : '',
         email            : null,
         lat              : null,
         lng              : null,
         incluye          : [],
         duracion_sugerida: '',
         
         telefono:{
            telefono:'',
            is_whatsapp:false,
            principal:true
         },

         imagenes:[],
         horarios:[],
         comentarios:[],
         descripcion:'',
         horarios:[],
         opinions:[],

      },

      atracciones: []

   }),


   getters: {

      draft(state) {
         return clone(state.atraccion)
      },


      getPortada(state) {
         const portada = state.atraccion.imagenes.find(val => val.portada)

         if (portada) {
            return `${axios.getUri()}/storage/atracciones/imagenes/${portada.imagen}`


         } else {
            const primeraImagen = state.atraccion.imagenes[0]

            if (primeraImagen) {
               return `${axios.getUri()}/storage/atracciones/imagenes/${primeraImagen.imagen}`
            } else {
               return `${axios.getUri()}/storage/atracciones/imagenes/`
            }

         }

      },

      legendHorario(state){
         let legend = 'Cerrado ahora';
       
         const dia = state.atraccion.horarios.find(val => val.dia == moment().day());

         if(dia){
         const hora1 = moment(moment().format(`Y-M-D ${dia.apertura[0]}`));
         const hora2 = moment(moment().format(`Y-M-D ${dia.cierre[0]}`));

            const horaActual = moment();
            
            if(horaActual.isBetween(hora1,hora2)){
               legend = 'Abierto Ahora'
            }

         }

         return legend;
      },

      horarioHoy(state){

         const dia = state.atraccion.horarios.find(val => val.dia == moment().day());
         
         if(dia){

            const hora1 = moment(moment().format(`Y-M-D ${dia.apertura}`));
            const hora2 = moment(moment().format(`Y-M-D ${dia.cierre}`));
            
            return `${hora1.format('h:mm A')} - ${hora2.format('h:mm A')}`

         }


         return null;

      },


      promedioCalificacion(state) {

         return (atraccion) => {

            let result = 0;

            if (atraccion.opinions.length) {
               const sum_calificacion = atraccion.opinions.reduce((a, b) => a + Number(b.calificacion), 0);

               result = sum_calificacion / atraccion.opinions.length;

            }


            return result;
         }
       
        
      },

      porcentajeOpinions(state){
         return (calificacion) => {
            const cant_cali = state.atraccion.opinions.filter(val => val.calificacion == calificacion).length;
            const total_cali = state.atraccion.opinions.length;
            return { porcentaje: cant_cali * 100 / total_cali, cantidad:cant_cali};
         }

      } 



   },

   mutations: {

      clear(state) {
         state.atraccion = {
            id: null,
            nombre: null,
            destino_id: null,
            destino: null,
            sitio_web: '',
            email: null,
            lat: null,
            lng: null,
            incluye: [],
            duracion_sugerida: '',
            imagenes: [],
            horarios: [],
            comentarios: [],
            descripcion:'',
            horarios: [],
            opinions: [],
            telefono: {
               telefono: '',
               is_whatsapp: false,
               principal: true
            },
            
         }
      },

      capturar(state, atraccion_id) {

         if (atraccion_id) {
            state.atraccion = state.atracciones.find(val => val.id === atraccion_id)
         }

      },

      push(state, atraccion) {
         state.atracciones.push(atraccion)
      },

      put(state, atraccion_id) {
         state.atracciones.splice(
            state.atracciones.findIndex(val => val.id === atraccion_id),
            1
         )
      },

      update(state, atraccion) {
         const i = state.atracciones.findIndex(val => val.id === atraccion.id)

         if (i != -1) {
            state.atracciones[i] = atraccion



         }

         if (state.atraccion.id === atraccion.id) {
            state.atraccion = atraccion
         }

      },


      setAtraccion(state, atraccion) {
         state.atraccion = atraccion
      },

      setAtracciones(state, atracciones) {
         state.atracciones = atracciones
      },

      agregarInclusion(state){

         state.atraccion.incluye.push({
            sujeto:'',
            descripcion:''
         })
      },

      quitarInclusion(state,i) {

         state.atraccion.incluye.splice(
            i,
            1
         )
      },

      togglePortada(state, { imagen_id, portada }) {
         
         if (state.atraccion.id) {

            state.atraccion.imagenes.forEach(val => val.portada = false)

            const image = state.atraccion.imagenes.find(val => val.id === imagen_id)
            image.portada = portada
         }
      
      },


      pushOpinion(state,opinion){
         state.atraccion.opinions.push(opinion)
      }


   },

   actions: {

      fetch({ commit }, atraccion_id) {
         return new Promise((resolve, reject) => {

            axios.get(`/api/atraccions/${atraccion_id}/fetch/data`).then(({ data }) => {
               commit('setAtraccion', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({ commit }, datos) {

         return new Promise((resolve, reject) => {
            axios.post(`/api/atraccions/fetch/data`, datos).then(({ data }) => {
               commit('setAtracciones', data.atracciones)
               resolve(data)
            }).catch(e => reject(e))

         })

      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {

            if (datos.id) {

               axios.put(`/api/atraccions/${datos.id}`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('update', data.atraccion)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            } else {

               axios.post(`/api/atraccions`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.atraccion)

                  }
                  resolve(data)

               }).catch(e => reject(e))

            }
         })
      },

      eliminar({ commit }, atraccion_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/atraccions/${atraccion_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', atraccion_id)
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
            axios.post(`/api/atraccions/${state.atraccion.id}/cargar/imagen`, formData, {
               headers: {
                  ContentType: "multipart/form-data: boundary=something"
               }
            }).then(({ data }) => {

               if (data.result) {
                  commit('update', data.atraccion)

               }

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      eliminarImagen({ state, commit }, imagen_id) {

         return new Promise((resolve, reject) => {

            axios.delete(`/api/atraccions/${state.atraccion.id}/eliminar/imagen/${imagen_id}`).then(({ data }) => {

               if (data.result) {
                  commit('update', data.atraccion);
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },

      aperturarHorario({state,commit}){
         return new Promise((resolve, reject) => {
            
            axios.get(`/api/atraccions/${state.atraccion.id}/aperturar/horario`).then(({data}) => {

               if(data.result){
                  commit('update',data.atraccion)
               }
               resolve(e)
            }).catch(e => reject(e))


         })
      },

      guardarHorario({state,commit},horario){
         
         return new Promise((resolve, reject) => {

            axios.put(`/api/atraccions/${horario.model_id}}/guardar/horario`,horario).then(({data}) => {

               if(data.result){
                  commit('update',data.atraccion)
               }

               resolve(data)
            
            }).catch(e => reject(e))

         })
      },

      quitarHorario({commit},atraccion_id){
         return new Promise((resolve, reject) => {

            axios.get(`/api/atraccions/${atraccion_id}/quitar/horario`).then(({ data }) => {

               if (data.result) {
                  commit('update', data.atraccion)
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

      getAtracciones({commit},destino_id){

         
         return new Promise((resolve,reject) => {

            axios.get(`/api/atraccions/get/all/destino/${destino_id}`).then(({data}) => {
               commit('setAtracciones',data)
               resolve(data)

            }).catch(e => reject(e))
            
         })

      },

      fetchName({ commit }, atraccion_name) {
         return new Promise((resolve, reject) => {

            axios.post(`/api/atraccions/obtener/por-nombre`, { nombre: atraccion_name }).then(({ data }) => {
               if (data.result) {
                  commit('setAtraccion', data.atraccion)
               }
               resolve(data)
            }).catch(e => reject(e))

         })

      },

      getAtraccionesCercanas({commit},atraccion_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/atraccions/${atraccion_id}/otras/cercanas`).then(({data}) => resolve(data)).catch(e => reject(e))
         })

      }


   }


}