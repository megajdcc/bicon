
export default {

  namespaced:true,
  state(){
    return {
      video:{
        id:null,
        titulo:'',
        descripcion:null,
        roles:[],
        videos:[],
      },

      videos:[],
    }
  },

  getters:{
    draft(state){
      return clone(state.video)
    }
  },

  mutations:{

    clear(state){
      state.video = {
        id:null,
        titulo:'',
        descripcion:null,
        roles:[],
        videos:[],
      }

    },

    setVideo(state,video){
      if(video){
        state.video = video
      }
    },

    setVideos(state,videos){
      state.videos = videos
    },

    push(state,video){
      state.videos.push(video)
    },
    put(state,video_id){

      let i = state.videos.findIndex(val => val.id == video_id)

      if(i != -1){
        state.videos.splice(i,1)
      }

    },

    update(state,video){

      let i = state.videos.findIndex(val => val.id == video.id)

      if(i != -1){
        state.videos[i] = video
      }

      if(state.video.id === video.id){
        state.video  = video
      }

    },

    capturar(state,id_video){

      let i = state.videos.findIndex(val => val.id == id_video)

      if(i != -1){
       state.video = state.videos[i]
      }

     
    }


  },

  actions:{

    fetchData({commit},filtro){
      return new Promise((resolve, reject) => {
        
        axios.post(`/api/academias/videos/fetch-data`,filtro).then(({data}) => {

          commit('setVideos',data.videos)
          resolve(data)
        
        }).catch(e => reject(e))


      })
    },


    guardar({state,commit},datos){

      return new Promise((resolve, reject) => {
        
        if(datos.id){
          
          axios.put(`/api/academia-videos/${datos.id}`,datos).then(({data}) => {

            if(data.result){
              commit('update',data.video)
            }

            resolve(data)

          }).catch( e => reject(e))


        }else{
          axios.post(`/api/academia-videos`,datos).then(({data}) => {
            commit('push',data.video)
            resolve(data)
          }).catch(e => reject(e))

        }
      })
    },

    fetch({commit},id_video){

      return new Promise((resolve, reject) => {
        axios.get(`/api/academia-videos/${id_video}/fetch-data`).then(({data}) => {

          commit('setVideo',data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },


    eliminar({state,commit},video_id){

      return new Promise((resolve, reject) => {
        
        axios.delete(`/api/academia-videos/${video_id}`).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))

      })
    },


    cargarVideosNegocio({state,commit}){

      return new Promise((resolve, reject) => {
        axios.get(`/api/academia-videos/get/panel/negocio`).then(({data}) => resolve(data)).catch(e => reject(e))
      })
      
    }
  }

}