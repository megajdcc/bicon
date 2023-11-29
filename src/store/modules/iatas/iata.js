export default{
   namespaced:true,


   state:() => ({
      iata:{
         id:null,
         codigo:null,
         aeropuerto:'',
         ciudad_id:null,
         estado_id:null,
         ciudad:null,
         estado:null,
      },


      iatas:[]
   }),


   getters:{
      draft:(state) => clone(state.iata)
   },

   mutations:{
      clear(state){
         state.iata = {
            id: null,
            codigo: null,
            aeropuerto: '',
            ciudad_id: null,
            estado_id: null,
            ciudad: null,
            estado: null,
         }
      },


      setIatas(state,iatas){
         state.iatas = iatas
      },

      setIata(state,iata) {
         state.iata = iata
      },


      capturar(state,iata_id){

         state.iata = state.iatas.find(val => val.id === iata_id)
      },

      push(state,iata){
         state.iatas.push(iata)
      },
      put(state,iata_id){

         state.iatas.splice(
            state.iatas.findIndex(val => val.id === iata_id),
            1
         )
      },


      update(state,iata){

         let i = state.iatas.findIndex(val => val.id === iata.id)


         if(i !=-1){
            state.iatas[i] = iata

            if(state.iata == iata.id){
               state.iata  = iata
            }
         }
      }



   },

   actions:{   

      getIatas({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/iatas/get/all`).then(({data}) => {

               commit('setIatas',data)
               resolve(data)

            }).catch(e => reject(e)
            )
         })
      },


      fetchData({commit},data) {

         return new Promise((resolve, reject) => {
            
            axios.post('/api/iatas/fetch/data',data).then(({data:datos}) => {

               commit('setIatas',datos.iatas)
               resolve(datos)
            }).catch(e => reject(e))

         })
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/iatas/${datos.id}`,datos).then(({data}) => {

                  if(data.result){
                     commit('update', data.iata)
                  }
                 
                  resolve(data)
               }).catch(e => reject(e))

            }else{

               axios.post(`/api/iatas`,datos).then(({ data }) => {

                  if(data.result){
                     commit('push', data.iata)
                  }

                  resolve(data)

               }).catch(e => reject(e))
            }
         })
        

      },


      eliminar({commit},iata_id){

         return new Promise((resolve, reject) => {
            axios.delete(`/api/iatas/${iata_id}`).then(({data}) => {
               
               if(data.result){
                  commit('put',iata_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


      fetch({commit},iata_id){
         return new Promise((resolve, reject) => {
            axios.get(`/api/iatas/${iata_id}/fetch/data`).then(({data}) => {
               commit('setIata',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      }

   }

}