
export default{

	namespaced:true,

	state(){
		return{
			rol:{
				nombre    :null,
				id      :null,
			
				permisos: [],
			},
			roles:[],

		}
	},

	mutations:{

		setRol(state,data){
			state.rol = {
					nombre    :data.nombre,
					id      :data.id,
					permisos: data.permisos.map(val => {

						const actions = JSON.parse(val.pivot.actions);

						return {
							module: val.nombre,
							read: actions.find(va => va == 'read') ? true : false,
							write: actions.find(va => va == 'write') ? true : false,
							update: actions.find(va => va == 'update') ? true : false,
							delete: actions.find(va => va == 'delete') ? true : false,

						};

					}),
					permissions:data.permisos
				}
		},

		clearRol(state){
			state.rol = {
				nombre  : null,
				id      : null,
			
				permisos: [],
			}

		},

		capturarRol(state,id_rol){
			state.rol = state.roles.find((rol) => rol.id == id_rol);
		},

		setRoles(state,data){
			
			state.roles = [];
			data.forEach((rol,i) => {
				state.roles.push({
						nombre    :rol.nombre,
						id      :rol.id,
						permisos:rol.permisos.map(val => {
							const actions = JSON.parse(val.pivot.actions);

							return {
								module: val.nombre,
								read:actions.find(va => va == 'read')? true : false,
								write: actions.find(va => va == 'write') ? true :  false,
								update: actions.find(va => va == 'update') ? true : false,
								delete: actions.find(va => va == 'delete') ? true : false,

							};
						}),
						permissions:rol.permisos
				})
			})

		
		},

		pushRol(state,role){

			if(state.roles.find((rol) => rol.id == role.id)){

				state.roles.forEach((rol,i) => {
					if(rol.id == role.id){
						state.roles[i] = {
									nombre    :role.name,
									id      :role.id,
									permisos: role.permisos.map(val => {
										const actions = JSON.parse(val.pivot.actions);

										return {
											module: val.nombre,
											read: actions.find(va => va == 'read') ? true : false,
											write: actions.find(va => va == 'write') ? true : false,
											update: actions.find(va => va == 'update') ? true : false,
											delete: actions.find(va => va == 'delete') ? true : false,

										};
									}),
									permissions:role.permisos
							}
					}

				})

			}else{
				state.roles.push({
						nombre    :role.nombre,
						id      :role.id,
						permisos: role.permisos.map(val => {
							const actions = JSON.parse(val.pivot.actions);

							return {
								module: val.nombre,
								read: actions.find(va => va == 'read') ? true : false,
								write: actions.find(va => va == 'write') ? true : false,
								update: actions.find(va => va == 'update') ? true : false,
								delete: actions.find(va => va == 'delete') ? true : false,

							};
						}),
						permissions:role.permisos
				});
			}

		},

		putRol(state,id_rol){

			var index = state.roles.findIndex((rol) => rol.id == id_rol);

			if(index) {
				state.roles.splice(index,1);
			}

		},
		
		updateRol(state,data){

			let i = state.roles.findIndex(val => val.id == data.id)

			if(i != -1){
				state.roles[i] = data
				
				if(state.rol.id == data.id){
					state.rol = data
				}
			}

		}


	},


	getters:{

		draft(state){
			return clone(state.rol);
		},

		getRols(state) {
			return state.roles.map(val => {
				return {label:val.nombre,
							value:val.id, 
							id:val.id}
			})
		}

	},

	actions:{

		cargarRoles({commit}){
			
			return new Promise((resolve, reject) => {
				axios.get('/api/listar/roles').then(({data}) => {
					commit('setRoles',data);
					resolve(data)
				}).catch(e => {
					reject(e)
					console.log(e)
				})
			})
			

		},

		fetchData({commit},data){

			return new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})

				axios.post(`/api/fetch/roles`,data).then(({data}) => {
					commit('setRoles',data.roles)
					resolve(data)
				}).catch(e => reject(e))
				.then(() => commit('toggleLoading',null,{root:true}))
			})

		},

		guardarRol({state,commit},data){

			return new Promise((resolve, reject) => {
				commit('toggleLoading', null, { root: true })
				if (state.rol.id) {
					
					axios.put(`/api/roles/${state.rol.id}`, data).then(({data:datos}) => {

						if (datos.result){
							commit('pushRol', datos.rol)
						}
						resolve(datos)

					}).catch(e => reject(e))
					.then(() => commit('toggleLoading',null,{root:true}))
				} else {
					axios.post('/api/roles', data).then(({data:datos}) => {

						if (datos.result) {
							commit('pushRol', datos.rol)
						}
						resolve(datos)

					}).catch(e => reject(e))
					.then(() => commit('toggleLoading', null, { root: true }))
				}
			})
			
		},


		eliminarRol({commit},id_rol){
			return new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})
				axios.delete(`/api/roles/delete/${id_rol}`).then(({data}) => {
					resolve(data)
					commit('putRol',id_rol)
				}).catch(e => reject(e))
				.then(() => commit('toggleLoading',null,{root:true}))

			})
		},


		getRol({commit},id_rol){
			return new Promise((resolve, reject) => {
				axios.get(`/api/roles/${id_rol}/get`).then(({ data }) => {
					commit('setRol',data)
					resolve(data)
				}).catch(e => reject(e))
					
			})
			
		}
	}
}