import store from "..";

export default {

	namespaced:true,

	state:() => ({

			usuario: {
				id: null,
				nombre:'',
        email:'',
        token:null,
        is_password:false,
        activo:false,
        rol_id:null,
				rol:null,
				habilidades:[]

			},

			user: {
				id: null,
				nombre:'',
        email:'',
        token:null,
        is_password:false,
        activo:false,
        rol_id:null,
				rol:null,
				habilidades:[]


			},

			usuarios: [],

		}),


	getters:{

		draft(state){
			return clone(state.user);
		},

		draftUsuario(state){
			return clone(state.usuario)
		},

		conPermiso:(state) => {
			return (permiso) => {

				if(state.usuario){
					return (state.usuario.roles[0].permissions.find((permission) => permission.name == permiso))
				}

				return false;
				
			}
		},

		getUsuarios: (state) => {
			return (rol) => {
				return state.usuarios.filter(user => {
					let i  = user.roles.findIndex((val,i ) => val.name == rol)
					if(i > 0 ){
						return true;
					}else{
						return false;
					}

				});
			} 
		},


		getUsuario:(state) => {
			return (id) => {
				return state.usuarios.find(user => user.id ==  id);
			}
		},


		getListado:(state) => {
			return (users_id) => {

				var users = [];

				users_id.forEach((e,i) => {

					var us = state.usuarios.find((u) => {

					 return (u.id == e.user_id);
					})

					if(us != undefined){
						if(users.find((u) => u.id == us.id)  == undefined){
							users.push(us);
						}
						
					}
					
				});


				return users;

			}
		},


		isRol(state){
			return (rol) => {
				if(state.usuario.rol){
					return rol  == state.usuario.rol.nombre
				}
				return false;
			}
		},


		getFullName : (state) => `${state.usuario.nombre} ${state.usuario.apellido}`, 

		avatar:(state) => state.usuario.avatar,
		


		getFilterUsers:(state) => {
			return (roles_name) => {
				let result =  state.usuarios.filter(val => {
					return (roles_name.find(value => value == val.rol.nombre) != undefined) ? true : false
				});
				
				return result.map(val => {
					return {label:val.nombre,value:val.id,id:val.id,email:val.email};
				})
			}
		},

		rolUser(state){
			return state.usuario.rol ? state.usuario.rol.nombre : ''
		},

		rolName(state){
			return state.usuario.rol ? state.usuario.rol.nombre : '';
		}
		
	},

	mutations:{

		cargarUser(state,data){
			localStorage.setItem('userData',JSON.stringify(data))			
			state.usuario = {...state.usuario,...data};
		},

		setTelefono(state,numero){
			state.usuario.telefono = numero
		},

		setUsuarios(state,usuarios){
			if(usuarios.length){
				state.usuarios = usuarios;
			}
		},

		setUsuario(state,usuario){
			if(usuario != undefined || usuario != null){
				state.user = usuario
			}
			
		},

		pushUsuario(state,usuario){
			state.usuarios.push(usuario);
		},

		capturarUsuario(state,id_usuario){
			state.user = state.usuarios.find((user) => user.id == id_usuario)
		},

		clearUsuario(state){
			state.user = {
				id: null,
				nombre:'',
        email:'',
        token:null,
        is_password:false,
        activo:false,
        rol_id:null,
				rol:null,
				habilidades:[]
			}
		},

		updateUsuario(state,data){
			var i = state.usuarios.findIndex((user) => user.id == data.id);

			if(i != -1){
				state.usuarios[i] = data;
				state.user = data;
			}

		},

		update(state,data){

			var i = state.usuarios.findIndex((user) => user.id == data.id);
			if(i != -1){
				state.usuarios[i] = data;
			}
		},

		updateAvatar(state,avatar){
			const user = JSON.parse(localStorage.getItem('userData'))
			user.avatar = avatar;
			localStorage.setItem('userData',JSON.stringify(user))
			state.usuario.avatar = avatar;
		},

		updatePortada(state,portada){
			const user = JSON.parse(localStorage.getItem('userData'))
			user.portada = portada;
			localStorage.setItem('userData',JSON.stringify(user))
			state.usuario.portada = portada;
		},

		actualizarAvatarDeUsuario(state,avatar){
			let user = state.usuarios.find(val => val.id == state.user.id)

			if(user != undefined){
				user.avatar = avatar
			}

		},

		updatePerfil(state,data){
			localStorage.setItem('userData',JSON.stringify(data))
			state.usuario = {...state.usuario,...data}
		},

		desactivarCuenta(state, result) {
			const user = JSON.parse(localStorage.getItem('userData'))
			user.activo = !result;
			localStorage.setItem('userData', JSON.stringify(user))

			state.usuario.activo = !result;

		},


		limpiarUsuario(state){

			state.usuario = {
				id: null,
				nombre:'',
        email:'',
        token:null,
        is_password:false,
        activo:false,
        rol_id:null,
				rol:null,
				habilidades:[]

			}
		}
	},

	

	actions:{

		cargarUsuarios({state,commit}){

			return new Promise((resolve, reject) => {
				axios.get('/api/usuarios/all').then(({data}) => {
					commit('setUsuarios',data);
					resolve(data)
				}).catch( e => reject(e))
			})

		},

		async guardar({state,commit,dispatch},data){

			return new Promise((resolve, reject) => {
				if (data.id) {
						
						axios.put(`/api/usuarios/` + data.id, data).then(({data:datos}) => {

							if(datos.result){
								commit('update',datos.usuario)
							}
							resolve(datos)

						}).catch(e => reject(e))



				} else {
					
					axios.post('/api/usuarios', data).then(({data:datos}) => {

						if(datos.result){
							commit('pushUsuario',datos.usuario)
						}
						resolve(datos)
					
					 }).catch(e => reject(e))
				}
			
			})
			
	   
		},

		async guardarUsuario({state,commit},data){

			return await new Promise((resolve, reject) => {

				axios.put(`/api/perfil/update/usuario/${state.usuario.id}`,data).then(({data}) => {
					if(data.result){
						commit('updatePerfil',data.usuario)
					}
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		async cambiarContrasena({commit,state},data){
			return await new Promise((resolve, reject) => {
				axios.put(`/api/cambiar/contrasena/usuario/${state.usuario.id}`,data).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		async eliminar({state},usuario_id){
			return await axios.delete(`/api/usuarios/${usuario_id}`);
		},
		
		async updateAvatarUser({state},data){
			return await axios.post(`/api/usuario/${state.user.id}/update/avatar`,data,{
				headers: {
					'Content-Type': 'multipart/form-data; boundary=something'
				}
			})
		},

		updatePortada({state,commit},datos){

			let formData = new FormData();

			formData.append('portada',datos.portada)

			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios/${state.usuario.id}/toggle-portada`,formData,{
					headers:{
						ContentType:"multipart/form-data"
					}
				}).then(({data}) => {

					if(data.result){
						commit('updatePortada',data.portada)
					}
					resolve(data)
				}).catch( e => reject(e))

			})

		},

		

		fetchUsers({state,commit},searchQuery){
				return new Promise((resolve, reject) => {
					axios.post('/api/fetch/usuarios', searchQuery)
						.then(({data}) => {
							commit('setUsuarios',data.items)
							resolve(data)
						})
						.catch(error => reject(error))
				});
		},


		getUsuario({state,commit},id_usuario){
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${id_usuario}/get`).then(({data}) => {
					commit('setUsuario',data)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		async desactivarCuenta({commit},data) {
			return await new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})

				axios.post(`/api/desactivar/usuario`,data).then(({data:datos}) => {
					commit('desactivarCuenta',datos.result)
					resolve(datos)

				}).catch( e => reject(e))
				.then(() => {
					commit('toggleLoading', null, { root: true })
				})

			})
		},

		

		async verificarCodigoReferido({commit},codigo){
			return await new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})
				axios.get(`/api/usuarios/verificar/codigo/${codigo}`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
				.then(()=> {
					commit('toggleLoading', null, { root: true })
				})
			})
		},

		async nuevoUsuario({commit},data){

			return await new Promise((resolve, reject) => {

				axios.post('/api/auth/nuevo/usuario',data).then(({data:datos}) => {
					resolve(datos)
				}).catch(e => {
					reject(e)
				})

			})

		},
		async misReferidos({commit},data){

			return new Promise((resolve, reject) => {
					commit('toggleLoading',null,{root:true})

					axios.post('/api/usuario/perfil/referidos',data).then(({data:datos}) => {
						resolve(datos)
					}).catch(e => reject(e))
					.then(() => commit('toggleLoading',null,{root:true}))

			})

		},


		guardarTelefono({state,commit},{telefono,usuario}){
			
			return new Promise((resolve, reject) => {

				axios.put(`/api/usuarios/${usuario}/add/telefono`,telefono).then(({data}) => {
					
					if(data.result){

						if(state.usuario.id === usuario){
						
							commit('actualizarTelefono',data.telefono)
							commit('updatePerfil', state.usuario)
						}

						if(state.user.id){
							commit('updateTelefono', data.telefono)
						}

						
					}

					resolve(data)

				}).catch(e => {
					reject(e)
				})

			})
		},

		quitarTelefono({commit},telefono){
			return new Promise((resolve, reject) => {
				
				axios.delete(`/api/telefonos/${telefono.id}`).then(({data}) => {
					resolve(data)
				
				}).catch(e => reject(e))

			})
		},


		toggleLike({state,commit},model){

			return new Promise((resolve, reject) => {
				
				axios.put(`/api/usuarios/${state.usuario.id}/toggle-like`,model).then(({data}) => {

					if(data.result){
						commit('setLikesUser',data.likes)
						commit('updatePerfil',state.usuario)
					} 

					resolve(data)
				
				}).catch(e => reject(e))

			})
		},


		searchUser({commit},query){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/users/search`,{q:query}).then(({data}) => resolve(data)).catch(e => reject(e))
			})
		},


		getStatusPromotor({commit},usuario_id){

			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/tablero/promotor/get-status/${usuario_id}`).then(({data}) => {
					commit('setStatusPromotor',data.status)
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		getStatusLider({commit},usuario_id){

			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/tablero/lider/${usuario_id}/get-status`).then(({data}) => {
					commit('setStatusLider',data.status)
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		getStatusCoordinador({commit}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/tablero/coordinador/get-status`).then(({data}) => {

					commit('setStatusCoordinador',data.status)
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		cambiarDivisa({commit},dato){

			return new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${dato.usuario}/change-divisa`,dato).then(({data}) => {

					commit('update',data.usuario)

					resolve(data)
				}).catch(e => reject(e))
			})
		},

		cambiarEstado({commit},usuario_id){
			
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${usuario_id}/cambiar/estado`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))

			})
		},


		fetchPromotores({commit},filtro){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/usuarios/promotores/fetch/data`,filtro).then(({data}) => {
					// commit('setUsuarios',data.promotores)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		fetchLideres({commit},filtro){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/usuarios/lideres/fetch/data`,filtro).then(({data}) => {
					commit('setUsuarios',data.lideres)
					resolve(data)
				}).catch(e => reject(e))
			})
		},


		fetchCoordinadores({commit},filtro){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/usuarios/coordinadores/fetch/data`,filtro).then(({data}) => {
					commit('setUsuarios',data.coordinadores)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		asignarLiderPromotor({commit},dato) {
			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios/promotor/asignar/lider`,dato).then(({data}) => {
					resolve(data)

				}).catch(e => reject(e))
			})
		},

		asignarCoordinadorLider({commit},dato) {

			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios/lider/asignar/coordinador`,dato).then(({data}) => {
					resolve(data)

				}).catch(e => reject(e))
			})

		},


		quitarLider({commit},promotor){
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/promotor/${promotor}/quitar/lider`).then(({data}) => resolve(data)).catch(e => reject(e))
				
			})
		},

		quitarCoordinador({commit},lider){
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/lider/${lider}/quitar/coordinador`).then(({data}) => resolve(data)).catch(e => reject(e))
				
			})
		},


		guardarPromotor({commit},datos){
			return new Promise((resolve, reject) => {
				axios.post('/api/usuarios/promotor/save',datos).then(({data}) => {

					resolve(data)

				}).catch(e => reject(e))

			})
		},
		
		guardarLider({commit},datos){
			return new Promise((resolve, reject) => {
				axios.post('/api/usuarios/lider/save',datos).then(({data}) => {

					resolve(data)

				}).catch(e => reject(e))
			})
		},


		getPromotores({commit}){

			return new Promise((resolve, reject) => {
				axios.get('/api/usuarios/get/all/promotores').then(({data}) => {
					resolve(data)

				}).catch(e => reject(e))

			})
		},

		asociarTarjeta({state,commit},tarjeta){

			return new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${state.usuario.id}/asociar/tarjeta`,tarjeta).then(({data}) => {
					if(data.result){
						commit('updatePerfil',data.usuario)
					}

					resolve(data)
					
				}).catch(e => reject(e))
			})
		},

		cancelarTarjeta({state,commit},tarjeta_id){
			return new Promise((resolve, reject) => {
				axios.delete(`/api/usuarios/${state.usuario.id}/cancelar/tarjeta/${tarjeta_id}`).then(({data}) => {
					if(data.result){
						commit('updatePerfil',data.usuario)
					}

					resolve(data)
				}).catch(e => reject(e))
				
			})
		},

		getMovimientosPorMes({state,commit},datos){
			return new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${datos.usuario}/get-movimiento-por-mes`,datos).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		getAcumuladoPorAno({state,commit},usuario_id){
			return new Promise((resolve,reject) => {
				if(state.usuario.id){
						axios.get(`/api/usuarios/${usuario_id}/get-acumulado-por-ano`).then(({data}) => {
							resolve(data)
						}).catch(e => reject(e))
				}else{
					reject()
				}
			

			})
		},

		getEfectividad({state},usuario_id){

			return new Promise((resolve, reject) => {
				if(usuario_id){
					axios.get(`/api/usuarios/${usuario_id}/get-efectividad`).then(({data})  => resolve(data)).catch(e => reject(e))
				}else{
					reject();
				}
				
			})
		},
		
		cargarStatus({state,commit}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${state.usuario.id}/get-status`).then(({data}) => resolve(data)).catch(e => reject(e))
			})
		},

		misInvitados({state,commit},datos){
			return new Promise((resolve, reject) => {
				if(state.usuario.id){
					axios.post(`/api/usuarios/${state.usuario.id}/mis-invitados`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
				}else{
					reject()
				}
					
			})
		},

		fetchUser({state,commit},id_user){
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${id_user}/fetch-data-user`).then(({data}) => {
					commit('setUsuario',data)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		fetchViajeros({commit},datos){

			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios-viajeros/fetch-data`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
				
			})
		},

		fetchDataReportPromotores({commit},datos){
			
			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/fetch-data-promotores`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
				
			})

		},

		fetchDataReportLideres({commit},datos){
			
			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/fetch-data-lideres`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
			})

		},


		downloadReportPromotores(_,datos){

			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/descargar/fetch-data-promotores`,datos).then(({data}) => {
						resolve(data)
				}).catch(e => {
					reject(e)
				})
			})
		
		},

		downloadReportLider(_,datos){
			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/descargar/fetch-data-lideres`,datos).then(({data}) => {
						resolve(data)
				}).catch(e => {
					reject(e)
				})
			})
		},

		guardarComisionPromotor({commit,state},datos){
			return new Promise((resolve, reject) => {
				
				axios.put(`/api/usuarios/${datos.id}/update-comision-promotors`,datos).then(({data}) => {
					if(data.result){
						commit('updateComisionPromotors',datos)
					}
					resolve(data)

				}).catch(e => reject(e))

			})
		},

		cargarDashboardCoordinador({commit,state},usuario_id){
			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/coordinador/${usuario_id}/fetch-data`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
			})

		},


		fetchLideresCoordinador({commit},coordinador_id){

			return new Promise((resolve,reject) => {
				axios.get(`/api/coordinador/${coordinador_id}/fetch-lideres`).then(({data}) => resolve(data)).catch(e => reject(e))
			})
			
		},

		fetchViajeros({commit},filtro){
			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios-viajeros/fetch-data`,filtro).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		toggleLider({commit},form){

			return new Promise((resolve, reject) => {
				axios.put(`/api/promotor/${form.promotor_id}/toggle-lider`,form).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
			})
			
		},

		reportFetchViajeros({commit},filtro){
			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/fetch-data-viajeros`,filtro).then(({data}) => resolve(data))
				.catch(e => reject(e))
			})
		},

		reportFetchViajerosDescargar({commit},filtro){
			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/fetch-data-viajeros-descargar`,filtro).then(({data}) => resolve(data))
				.catch(e => reject(e))
			})
		},

		reportFetchDataEquipo({commit},filtro){

			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/fetch-data-equipo`,filtro).then(({data}) => resolve(data)).catch(e => reject(e))
			})
		},

		reportFetchDataEquipoDescargar(_,filtro){
			return new Promise((resolve, reject) => {
				axios.post(`/api/reporte/fetch-data-equipo-descargar`,filtro).then(({data}) => resolve(data)).catch(e => reject(e))
			})
		},


		updateLocale({commit},{usuario,locale}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${usuario}/update-locale/${locale}`).then(({data}) => {

					if(data.result){
						commit('updateLocale',locale)
					}
					resolve(data)
				}).catch(e => reject(e))
				
			})
		},

		getNivelUser({commit}){
			return new Promise((resolve, reject) => {
				
				axios.get(`/api/get/nivel-user`).then(({data}) => {
					commit('updatePerfil',data)
					resolve(data)
				}).catch(e => reject(e))
				

			})
		}

	}

} 