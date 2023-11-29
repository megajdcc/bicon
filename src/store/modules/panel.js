export default{
   namespaced:true,

   state:() => ({
      panel:{
         id:null,
         panel:'',
         permisos:[]
      },

      panels:[]
   }),


   getters:{
      draft(state){
         return clone(state.panel)
      },


     
   },

   mutations:{
      clear(state){
         state.panel = {
            id: null,
            panel: '',
            permisos: []
         }
      },


      setPanel(state,panel){
         state.panel = panel
      },

      update(state,panel){
         const i = state.panels.findIndex(val => val.id === panel.id)

         if(i !=-1){
            state.panels[i] = panel
         }

         if(state.panel.id === panel.id){
            state.panel = panel
         }
      },

      push(state,panel){
         state.panels.push(panel)

      },

      put(state,panel_id){
         state.panels.splice(
            state.panels.findIndex(val => val.id === panel_id),
            1
         )
      },

      capturar(state,panel_id){
         const panel  = state.panels.find(val => val.id === panel_id)

         if(panel != undefined){
            state.panel = panel
         }
      },

      setPanels(state,panels){
         state.panels = panels
      }
   },

   actions:{

      getPanels({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/panels/get/all').then(({data}) => {
               commit('setPanels',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/panels/fetch/data`,datos).then(({data}) => {

               commit('setPanels',data.panels)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({state,commit},panel_id){

         return new Promise((resolve, reject) => {
            axios.get(`/api/panels/${panel_id}/fetch/data`).then(({data}) => {
               commit('setPanel',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            if (datos.id) {
               axios.put(`/api/panels/${datos.id}`,datos).then(({data}) => {
                  if(data.result){
                     commit('update',data.panel)

                  }
                  resolve(data)
               }).catch(e => reject(e))

            }else{

               axios.post(`/api/panels`,datos).then(({data}) => {
                  if(data.result){
                     commit('push',data.panel)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })
       
      },

      eliminar({ commit }, panel_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/panels/${panel_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      }

   },







}