export default{
  namespaced:true,
  
  state:() => ({
    reunion:{
      id              : null,
      titulo          : '',
      descripcion     : '',
      usuario_id      : null,
      model_id        : null,
      model_type      : null,
      fecha_inicio    : null,
      fecha_fin       : null,
      status          : null,
      recurrente      : false,
      all_dia         : true,
      recurrencia: {
            dia_semana:[],
            hora_inicio:null,
            hora_fin:null,
            id_group:''
         },
      tipo_recurrencia:1, // 0 => diariamente, 1 => semanalmente, 2 => mensual , 3 => anual
      archivo         : null,
      nota            : null,
      estado          : 0,
      participantes   : [],
      recordatorio    : {
         telefono:null,
         email:'',
         participantes:false,
         nota:''
      },
      tipo            : 1,
      usuario         : null,
      model           : null,
    },

    reunions:[]
  }),

  getters:{
    draft(state){
      return state.reunion
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
      },

      getTipo(state){
         let titles = ['Recordatorio', 'Tarea', 'Evento']
         return titles[state.reunion.tipo - 1]
      }
  },

  mutations:{
      clear(state){
         state.reunion = {
            id              : null,
            titulo          : '',
            descripcion     : '',
            usuario_id      : null,
            model_id        : null,
            model_type      : null,
            fecha_inicio    : null,
            fecha_fin       : null,
            status          : null,
            recurrente      : false,
            all_dia         : true,
            recurrencia: {
                  dia_semana:[],
                  hora_inicio:null,
                  hora_fin:null,
                  id_group:''
               },
            tipo_recurrencia:1, // 0 => diariamente, 1 => semanalmente, 2 => mensual , 3 => anual
            archivo         : null,
            nota            : null,
            estado          : 0,
            participantes   : [],
            recordatorio    : {
               telefono:null,
               email:'',
               participantes:[],
               nota:''
            },
            tipo            : 1,
            usuario         : null,
            model           : null,
         }
      },


      setReunion(state,reunion){
         state.reunion = reunion
      },

      update(state,reunion){
         const i = state.reunions.findIndex(val => val.id === reunion.id)

         if(i !=-1){
            state.reunions[i] = reunion
         }

         if(state.reunion.id === reunion.id){
            state.reunion = reunion
         }
      },

      push(state,reunion){
         state.reunions.push(reunion)

      },

      put(state,reunion_id){
         state.reunions.splice(
            state.reunions.findIndex(val => val.id === reunion_id),
            1
         )
      },

      capturar(state,reunion_id){
         const reunion  = state.reunions.find(val => val.id === reunion_id)

         if(reunion != undefined){
            state.reunion = reunion
         }
      },

      setReunions(state,reunions){
         state.reunions = reunions
      },

      setModel(state,modelo){
         Object.assign(state.reunion,modelo)
        
      }

  },

  actions:{
    getReunions({commit},usuario_id){
         return new Promise((resolve, reject) => {
            axios.get('/api/reunions/usuario/${usuario_id}/get/all').then(({data}) => {
               commit('setReunions',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/reunions/fetch/data`,datos).then(({data}) => {
               commit('setReunions',data.reunions)
               resolve(data)
            }).catch(e => reject(e))

         })

      },


      fetchReunions({state,commit},datos){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/reunions/fetch/reunions`,datos).then(({data}) => {
               commit('setReunions',data)
               resolve(data)
            }).catch(e => {
               console.log(e)
               reject(e)
            })

         })
      },

      fetch({state,commit},reunion_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/reunions/${reunion_id}/fetch/data`).then(({data}) => {
               commit('setReunion',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      guardar({commit,dispatch},datos){

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/reunions/${datos.id}`,datos).then(({data}) => {
                  if(data.result){
                     commit('update',data.reunion)
                  }
                  resolve(data)
               }).catch(e => reject(e))

            }else{


               axios.post(`/api/reunions`,datos).then(({data}) => {
                  if(data.result){
                     if(datos.archivo){
                        dispatch('guardarArchivo',{archivo:datos.archivo,reunion:data.reunion.id}).then(({data:dat}) => {
                           if(dat.result){
                               commit('push',dat.reunion)
                           }
                        })
                     }else{
                        commit('push',data.reunion)
                     }
                    
                  }
                  resolve(data)
               }).catch(e => reject(e))

            }
         })
       
      },

      guardarArchivo({commit},datos){
         return new Promise((resolve, reject) => {
            let formData = new FormData();

            formData.append('archivo',datos.archivo);

            axios.post(`/api/reunions/${datos.reunion}/guardar/archivo`,formData,{
               headers:{ContentType:'multipart/form-data'}
            }).then(({data}) => {
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      eliminar({ commit }, reunion_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/reunions/${reunion_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      }
      
  }
}