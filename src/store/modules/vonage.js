export default{
  namespaced:true,

  state(){
    return{
      mensaje:{
        id:null,
        msisdn:null,
        to:null,
        messageId:null,
        text:null,
        type:null,
        keyword:null,
        messageTimestamp:null,
        timestamp:null,
        nonce:null,
        concat:null,
        concatRef:null,
        concatTotal:null,
        concatPart:null,
        data:null,
        udh:null
      },

      mensajes:[]
    }
  },


  mutations:{

    setMensajes(state,data){
      state.mensajes = data
    }

  },

  actions:{
    fetchData({commit},filtro){

      return new Promise((resolve, reject) => {
        axios.post(`/api/vonages/sms/fetchData`,filtro).then(({data}) => {
          commit('setMensajes',data.mensajes)
          resolve(data);
          
        }).catch(e => {
          reject(e)
        })
      })
    },


    eliminar({commit},mensaje_id){
      return new Promise((resolve, reject) => {
        axios.delete(`/api/vonages/sms/${mensaje_id}/eliminar`).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))
        
      })
    }
  }

}