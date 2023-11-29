export default {
   namespaced:true,

   state:() => ({

      empleado:{
         id:null,
         usuario_id:null,
         negocio_id:null,
         cargo_id:null,
         usuario:null,
         negocio:null,
         cargo:null,
         permisos:[]
      },

      empleados:[]
   }),


   getters:{
      draft(state){
         return clone(state.empleado)
      },

      permissionsUser(state){
         return ({permisos,userPermisos}) => {
            
            const permissions = [];

            permisos.forEach(val => permissions.push(val.permiso))

            return permissions.map(val => {
               let actions = null;

               if (userPermisos) {
                  const permis = userPermisos.find(va => va.id == val.id);
                  actions = permis ? JSON.parse(permis.pivot.action) : null;
               }

               return {
                  module: val.nombre,
                  read: actions ? actions.find(v => v == 'read') ? true : false : true,
                  write: actions ? actions.find(v => v == 'write') ? true : false : true,
                  update: actions ? actions.find(v => v == 'update') ? true : false : true,
                  delete: actions ? actions.find(v => v == 'delete') ? true : false : true,
               }
            })
         }
      }

   },

   mutations:{
      clear(state) {
         state.empleado = {
            id: null,
            usuario_id: null,
            negocio_id: null,
            cargo_id: null,
            usuario: null,
            negocio: null,
            cargo: null,
            permisos: []

         }
      },


      setEmpleados(state, empleados) {
         state.empleados = empleados
      },

      setEmpleado(state, empleado) {
         state.empleado = empleado
      },


      capturar(state, empleado_id) {

         const empleado = state.empleados.find(val => val.id === empleado_id)

         if (empleado) {
            state.empleado = empleado
         }
      },

      push(state, empleado) {
         state.empleados.push(empleado)
      },
      put(state, empleado_id) {

         state.empleados.splice(
            state.empleados.findIndex(val => val.id === empleado_id),
            1
         )
      },


      update(state, empleado) {

         let i = state.empleados.findIndex(val => val.id === empleado.id)


         if (i != -1) {
            state.empleados[i] = empleado

            if (state.empleado == empleado.id) {
               state.empleado = empleado
            }
         }
      }


   },

   actions:{
      getEmpleados({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/empleados/get/all`).then(({ data }) => {

               commit('setEmpleados', data)
               resolve(data)

            }).catch(e => reject(e)
            )
         })
      },


      fetchData({ commit }, datos) {

         return new Promise((resolve, reject) => {

            axios.post('/api/empleados/fetch/data', datos).then(({ data }) => {

               commit('setEmpleados', data.empleados)
               resolve(data)

            }).catch(e => reject(e))

         })
      },

      fetch({ commit }, empleado_id) {
         return new Promise((resolve, reject) => {
            axios.get(`/api/empleados/${empleado_id}/fetch/data`).then(({ data }) => {

               if (data.id) {
                  commit('setEmpleado', data)
               }
               resolve(data)

            }).catch(e => reject(e))


         })
      },


      guardar({ commit }, datos) {

         return new Promise((resolve, reject) => {
            if (datos.id) {

               axios.put(`/api/empleados/${datos.id}`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('update', data.empleado)
                  }

                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/empleados`, datos).then(({ data }) => {

                  if (data.result) {
                     commit('push', data.empleado)
                  }

                  resolve(data)

               }).catch(e => reject(e))
            }
         })


      },


      eliminar({ commit }, empleado_id) {

         return new Promise((resolve, reject) => {
            axios.delete(`/api/empleados/${empleado_id}`).then(({ data }) => {

               if (data.result) {
                  commit('put', empleado_id)
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },


    
   }
}
