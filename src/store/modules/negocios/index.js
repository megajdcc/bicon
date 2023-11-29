export default{
   namespaced:true,

   state:() => ({

      negocio:{
         id:null,
         nombre:'',
         descripcion:'',
         breve:'',
         categoria_id:null,
         comision:0,
         tipo_comision:1, // 1 Porcentaje por venta, 2 Monto por Venta 
         url:'',
         sitio_web:'',
         emails:[],
         direccion:'',
         codigo_postal:null,
         ciudad_id:null,
         estado_id:null,
         lat:0,
         lng:0,
         logo:null,
         vistas:0,
         ultima_recarga:null,
         floor_plan:false,
         acepta_reservas:false,
         status:1, // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
         usuario_id:null,
         solicitud_id:null,
         divisa_id:null,
         iata_id:null,
         iata:null,
         tipo_menu:null,
         menu:null,
         imagenes:[],
         telefonos:[],
         eventos:[],
         cuenta:null,
         horarios:[],

         amenidades:[],
         formas_pago:[],
         precios:[],
         redes: [],
         videos:[],
         ventas:[], 
         reservaciones: [],
         opinions:[],
         modelType:'App\\Models\\Negocio\\Negocio',
         recomendaciones:[],
         seguidores:[],
         tps_referido:0,
         publicado:false




      },

      negocios:[]

   }),


   getters:{
      draft:(state) => clone(state.negocio),

      diasAbiertos:(state) => {
         const diasAbiertos = state.negocio.horarios.filter(val => val.apertura && val.cierre)

         const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

         return diasAbiertos.map(val => ({
            dia:val.dia,
            label:dias[val.dia - 1]
         }))

      },


   promedioCalificacion(state) {

         return (negocio) => {

            let result = 0;

            if (negocio.opinions.length) {
               const sum_calificacion = negocio.opinions.reduce((a, b) => a + Number(b.calificacion), 0);
               result = sum_calificacion / negocio.opinions.length;
            }
            return result;
         }


      },


      porcentajeOpinions(state) {
         return (calificacion) => {
            const cant_cali = state.negocio.opinions.filter(val => val.calificacion == calificacion).length;

            const total_cali = state.negocio.opinions.length;

            return { porcentaje: cant_cali > 0 ? cant_cali * 100 / total_cali : 0, cantidad: cant_cali };
         }

      } 

   },

   mutations:{
      
      clear(state){
         state.negocio = {
            id: null,
            nombre: '',
            descripcion: '',
            breve: '',
            categoria_id: null,
            comision: 0,
            tipo_comision: 1, // 1 Porcentaje por venta, 2 Monto por Venta 
            url: '',
            sitio_web: '',
            emails: [],
            direccion: '',
            codigo_postal: null,
            ciudad_id: null,
            estado_id: null,
            tipo_menu: null,
            menu: null,
            lat: 0,
            lng: 0,
            logo: null,
            vistas: 0,
            ultima_recarga: null,
            floor_plan: false,
            acepta_reservas: false,
            status: 1, // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
            usuario_id: null,
            solicitud_id: null,
            divisa_id: null,
            imagenes: [],
            telefonos: [],
            eventos: [],
            cuenta: null,
            iata_id: null,
            iata: null,
            horarios: [],
            amenidades: [],
            formas_pago: [],
            precios: [],
            redes:[],
            videos: [],
            ventas: [],
            reservaciones:[],
            opinions: [],
            modelType: 'App\\Models\\Negocio\\Negocio',
            recomendaciones: [],
            seguidores: [],
            tps_referido:0,
            publicado:false
            


         }
      },

      
      setNegocio(state,negocio){
         state.negocio = negocio

       
      },


      setNegocios(state,negocios){

         state.negocios = negocios

      },


      update(state,negocio){

         let i = state.negocios.findIndex(val => val.id === negocio.id)

         if(i != -1 ){

            state.negocios[i] = negocio
         }

         if(state.negocio.id === negocio.id){
            state.negocio = negocio
         }


      },


      capturar(state,negocio_id){
         
         const negocio = state.negocios.find(val => val.id === negocio_id)


         if(negocio){
            state.negocio = negocio
         }
        
      },


      push(state,negocio){
         state.negocios.push(negocio)
      },

      put(state,negocio_id){
         state.negocios.splice(
            state.negocios.findIndex(val => val.id == negocio_id),
            1
         )
      },


      updateImagenes(state,imagenes){

         if(state.negocio.id){
            state.negocio.imagenes = imagenes;
         }
        
      },

      togglePortada(state,{imagen_id,portada}){
         


         if(state.negocio.id){
            
            state.negocio.imagenes.forEach(val => val.portada = false)
            // const i = state.negocio.imagenes.findIndex(val => val.portada === true)

            // if (i != -1){
            //    state.negocio.imagenes[i].portada = false
            // }

            const image = state.negocio.imagenes.find(val => val.id === imagen_id)

            image.portada = portada


         }

      },

      quitarTelefono(state,telefono_id){

         state.negocio.telefonos.splice(
            state.negocio.telefonos.findIndex(val => val.id === telefono_id),
            1
         )
      },

      quitarHorario(state){

         state.negocio.horarios = []

      },


      agregarRed(state){

         state.negocio.redes.push({
            nombre:'',
            icono:'',
            url:''
         })
      },

      agregarVideo(state){
         state.negocio.videos.push({
            nombre: '',
            youtube: false,
            url: ''
         })
      },

      quitarRed(state,i){
         state.negocio.redes.splice(i,1)
      },

      quitarVideo(state, i) {
         state.negocio.videos.splice(i, 1)
      },


      quitarRedes(state){
         state.negocio.redes = [];
      },

      quitarVideos(state) {
         state.negocio.videos = [];
      },

      toggleRecomendacion(state,{negocio,usuario}){
         
         let bussines = state.negocios.find(val => val.id == negocio)

         if(bussines != undefined){
           let recomendacion = bussines.recomendaciones.find(val => val.usuario_id === usuario)
            
           if(recomendacion != undefined){
               bussines.recomendaciones.splice(
                  bussines.recomendaciones.findIndex(val => val.usuario_id === usuario),
                  1
               )
           }else{
               bussines.recomendaciones.push({
                  modelType:"App\\Models\\Negocio\\Negocio",
                  model_id:negocio,
                  usuario_id:usuario
             })
           }

         }


          if(state.negocio.id == negocio){
            let recomendacion = state.negocio.recomendaciones.find(val => val.usuario_id === usuario)
            if(recomendacion != undefined){
               state.negocio.recomendaciones.splice(
                  state.negocio.recomendaciones.findIndex(val => val.usuario_id === usuario),
                  1
               )
           }else{
               state.negocio.recomendaciones.push({
                  modelType:"App\\Models\\Negocio\\Negocio",
                  model_id:negocio,
                  usuario_id:usuario
               })
           }
         }

      },

      toggleSeguidor(state,{negocio,usuario}){
         let bussines = state.negocios.find(val => val.id == negocio)

         if(bussines != undefined){
           let seguidor = bussines.seguidores.find(val => val.usuario_id === usuario)
            
           if(seguidor != undefined){
               bussines.seguidores.splice(
                  bussines.seguidores.findIndex(val => val.usuario_id === usuario),
                  1
               )
            

           }else{
               bussines.seguidores.push({
                  modelType:"App\\Models\\Negocio\\Negocio",
                  model_id:negocio,
                  usuario_id:usuario
             })
           }

         }

         if(state.negocio.id == negocio){
            let seguidor = state.negocio.seguidores.find(val => val.usuario_id === usuario)
            if(seguidor != undefined){
               state.negocio.seguidores.splice(
                  state.negocio.seguidores.findIndex(val => val.usuario_id === usuario),
                  1
               )
           }else{
               state.negocio.seguidores.push({
                  modelType:"App\\Models\\Negocio\\Negocio",
                  model_id:negocio,
                  usuario_id:usuario
               })
           }
         }

      }

   },

   actions:{

      fetch({commit},negocio_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/negocios/${negocio_id}/fetch/data`).then(({data}) => {
               commit('setNegocio',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({commit},datos){

         return new Promise((resolve, reject) => {
            axios.post('/api/negocios/fetch/data',datos)
            .then(({data}) => {
               commit('setNegocios',data.negocios)
               resolve(data)
            })
            .catch(e => reject(e))
         })
      },


      guardar({state,commit},datos){

         return new Promise((resolve,reject) => {
            
            if(datos.id) {

               axios.put(`/api/negocios/${datos.id}`,datos).then(({data}) => {

                  if(data.result){
                     commit('update',data.negocio)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }else{

               axios.post(`/api/negocios`,datos).then(({data}) => {

                  if(data.result){
                     commit('push',data.negocio)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })

        

      },


      eliminar({commit},negocio_id){
         return new Promise((resolve, reject) => {
            axios.delete(`/api/negocios/${negocio_id}`).then(({data}) => {

               if(data.result){
                  commit('put',negocio_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


      actualizarLogo({state,commit},{logo}){

         const headers  = {
            ContentType:'multipart/form-data'
         }

         const formData = new FormData();

         formData.append('logotipo',logo)
         formData.append('_method','put')

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/negocios/${state.negocio.id}/actualizar/logo`,formData,{headers}).then(({data}) => {
               
               if(data.result){
                  commit('update',data.negocio)
               }

               resolve(data)

            }).catch(e => reject())

         })

      },

      togglePortada({commit},datos) {

         commit('togglePortada',{imagen_id:datos.imagen,portada:datos.portada})

         return new Promise((resolve, reject) => {
            
            axios.put(`/api/imagens/${datos.imagen}/toggle`,datos).then(({data}) => {

               if(data.result){
                  // commit('update',data.negocio)
               }

             resolve(data)

            }).catch(e => reject(e))

         })

      },

      addImagenes({commit},{negocio_id,imagenes}){

         const formData = new FormData();

         imagenes.forEach(val => formData.append('imagenes[]',val));

         formData.append('_method','PUT') 

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/negocios/${negocio_id}/add/imagen`, formData, 
            { headers: { ContentType: 'multipart/form-data' } })
               .then(({data}) => {
                  
                  if(data.result){
                     commit('update',data.negocio)
                  }

                  resolve(data)

               }).catch(e => reject(e))

         })

      },

      eliminarImagen({ commit }, imagen_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/negocios/eliminar/imagen/${imagen_id}`).then(({ data }) => {
               if (data.result) {
                  commit('update', data.negocio)
               }
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      aperturarHorario({commit},negocio_id){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/negocios/${negocio_id}/aperturar/horario`).then(({data}) => {

               if(data.result){
                  commit('update',data.negocio)
               }

               resolve(data)
            }).catch(e => reject(e))



         })
      },

      guardarHorario({commit},horario){

         return new Promise((resolve, reject) => {
            
            axios.put(`/api/horarios/${horario.id}`,horario).then(({data}) => {

               resolve(data)

            }).catch(e => reject())


         })
      },


      quitarHorario({commit},negocio_id){

        

         return new Promise((resolve, reject) => {
            axios.get(`/api/negocios/${negocio_id}/quitar/horario`).then(({data}) => {

               if(data.result){
                  commit('quitarHorario');
               }

               resolve(data)
            
            }).catch(e => reject(e))


         })
      },


      addTelefono({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.put(`/api/negocios/${state.negocio.id}/add/telefono`,datos).then(({data}) => {

               if(data.result){
                  commit('update',data.negocio)
               }
               
               resolve(data)

            }).catch(e => reject(e))

         })
      },


      quitarTelefono({state,commit},telefono_id){

         commit('quitarTelefono',telefono_id)

         
         return new Promise((resolve, reject) => {
               axios.delete(`/api/telefonos/${telefono_id}`).then(({data}) => {
                  
                  resolve(data)
                 

               }).catch(e => reject(e))

         })

      },

      cargarNegocio({commit}){

         return new Promise((resolve, reject) => {
            let ruta = localStorage.getItem('ultimo-negocio') ? `/api/empleado/cargar/negocio/${localStorage.getItem('ultimo-negocio')}` 
                  : '/api/empleado/cargar/negocio';  
            axios.get(ruta).then(({data}) => {
               
               if(data.id){
                  localStorage.setItem('ultimo-negocio', data.id)
                  commit('setNegocio', data)
               }
               resolve(data)

            }).catch(e => reject())
         })

      },

      cambiarNegocio({commit},id_negocio){

         return new Promise((resolve, reject) => {

            axios.get(`/api/empleado/cambiar/negocio/${id_negocio}`).then(({data}) => {

               if(data.result){
                  localStorage.setItem('ultimo-negocio', data.negocio.id)
                  commit('setNegocio',data.negocio)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },

      guardarAmenidad({ commit }, { negocio, amenidads }){
         
         return new Promise((resolve, reject) => {
            axios.put(`api/negocios/${negocio}/guardar/amenidads`, {amenidads}).then(({ data }) => {

               if (data.result) {
                  commit('update', data.negocio)
               }
               resolve(data)


            }).catch(e => reject(e))

         })

        
         
      },

      guardarFormaPago({commit},{negocio,formas}){

         return new Promise((resolve, reject) => {
            axios.put(`api/negocios/${negocio}/guardar/formas-pago`, { formas }).then(({ data }) => {

               if (data.result) {
                  commit('update', data.negocio)
               }
               resolve(data)


            }).catch(e => reject(e))

         })


  
      },


      agregarRed({state,commit},datos){

         return new Promise((resolve, reject) => {
               axios.put(`/api/negocios/${state.negocio.id}/agregar/red-social`,datos).then(({data}) => {

                  if(data.result){
                     commit('update',data.negocio)
                  }
                  resolve(data)
               }).catch(e => reject())

         })
      },

      quitarRed({state,commit},red){
         return new Promise((resolve, reject) => {
            axios.delete(`/api/negocios/${state.negocio.id}/quitar/red-social/${red}`).then(({data}) => {
               if(data.result){
                  commit('update',data.negocio)
               }
               resolve(data)

            }).catch(e => reject(e))


         })
      },

      quitarAllRedes({commit,state}){
         
        

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/negocios/${state.negocio.id}/quitar/all-redes`).then(({data}) => {
               
               if(data.result){
                 
                  commit('quitarRedes')
               }
               resolve(data)

            }).catch(e => reject(e))


         })
      },

      guardarVideo({state,commit},datos){

         return new Promise((resolve, reject) => {
            
            const formData = new FormData();


            Object.keys(datos).forEach(val => {
               formData.append(val, datos[val])
            })

            formData.append('negocio_id',state.negocio.id)

            axios.post(`/api/negocios/guardar/video`,formData,{
               headers:{
                  ContentType:'multipart/form-data; boundary=something'
               }
            }).then(({data}) => {

               if(data.result){
                  commit('update',data.negocio)
               }
               
               resolve(data)

            }).catch(e => {
               reject(e)
            })

         })
      },


      agregarSaldo({commit,state},{negocio_id,monto,concepto}){

         return new Promise((resolve, reject) => {
            
            axios.put(`/api/negocios/${negocio_id}/cargar/saldo`,{monto,concepto}).then(({data}) => {
               
               if(data.result){
                  commit('update',data.negocio)
               }
               resolve(data)
            }).catch(e => reject(e))
            

         })
      },


      datosHome({commit,state}){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/negocios/${state.negocio.id}/datos/home`).then(({data}) => resolve(data))
            .catch(e => reject(e))

         })
      },

      negocioUrl({commit,state}, urlNegocio) {
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/negocio/obtener-por-url`,{url:urlNegocio}).then(({data}) => {

               if(data.result) {
                  commit('setNegocio',data.negocio)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },

      toggleRecomendacions({commit,state},{negocio,usuario}){

         commit('toggleRecomendacion',{negocio,usuario});
         return new Promise((resolve, reject) => {
            axios.get(`/api/negocios/${negocio}/recomendacions/toggle/user/${usuario}`).then(({data}) => {

               // commit('update',data.negocio);

               resolve(data)
            }).catch(e => reject(e))

         })
      },

      toggleSeguidor({ commit, state }, {usuario,negocio}) {
         commit('toggleSeguidor',{negocio,usuario});

         return new Promise((resolve, reject) => {
            axios.get(`/api/negocios/${negocio}/seguidors/toggle/user/${usuario}`).then(({ data }) => {
               // commit('update', data.negocio);
               resolve(data)
            }).catch(e => reject(e))

         })
      },



      fetchDataPublic({commit},datos) {
         return new Promise((resolve, reject) => {
            axios.post(`/api/negocios/fetch/data/public`,datos).then(({data}) => {
               commit('setNegocios',data.data)
               resolve(data)
            }).catch(e => reject(e))


         })
      },

      negociosAsociados({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/negocios/users/asociado`,datos).then(({data}) => {

               commit('setNegocios',data.negocios)
               resolve(data)
            }).catch(e => reject(e))

            
         })
      },

      guardarMenu({state,commit},datos){

         const formData = new FormData();

         Object.keys(datos).forEach(val => {
               formData.append(val,datos[val])
         })

         formData.append('_method',"PUT");

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/negocios/${state.negocio.id}/update/menu`,formData,{
               headers:{
                  ContentType:'multipart/form-data'
               }
            }).then(({data}) => {

               if(data.result){
                  commit('update',data.negocio)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      
      },


      gestionSaldo({state,commit},datos){
         return new Promise((resolve, reject) => {
            axios.put(`/api/negocios/${state.negocio.id}/gestion/saldo`,datos).then(({data}) => {

               if(data.result){
                  commit('update',data.negocio)
               }

               resolve(data)
            }).catch(e => reject(e))
         })
      },

      getNegocios({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/negocios/get/all`).then(({data}) => {
               commit('setNegocios',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },

     aumentarVisita({state,commit},negocio_id){

      return new Promise((resolve, reject) => {
         axios.get(`/api/negocios/${negocio_id}/aumentar-vistas`).then(({data}) => {

            if(data.result){
               // commit('update',data.negocio)
            }

            resolve(data)

         }).catch(e => reject(e))
      })
     },

     togglePublicado({commit},negocio_id){

      return new Promise((resolve, reject) => {
         axios.get(`/api/negocios/${negocio_id}/toggle-publicado`).then(({data}) => {
            const {negocio,result} = data;

            if(result){
               commit('update',negocio)
            }
            resolve(data)
         }).catch(e => reject(e))
      })
     },


     reportFetchNegocios({commit},filtro){
      return new Promise((resolve, reject) => {
         axios.post(`/api/reporte/fetch-data-negocios`,filtro).then(({data}) => resolve(data))
            .catch(e => reject(e))
      })
     },

     reportFetchNegocioDescargar({commit},filtro){
        return new Promise((resolve, reject) => {
         axios.post(`/api/reporte/fetch-data-negocios-descargar`,filtro).then(({data}) => resolve(data))
            .catch(e => reject(e))
      })
     },

     verificarSaldo({commit},negocio_id){
      return new Promise((resolve, reject) => {
         axios.get(`/api/negocios/${negocio_id}/verificar-saldo`).then(({data}) => resolve(data)).catch(e => reject(e))
      })
     }

   }

}