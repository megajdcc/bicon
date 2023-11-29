export default{

	namespaced:true,


	state(){
		return{
		
			cantidad_usuarios:0,
		}

	},



	mutations:{
		
		setTablero(state,data){
			
			state.cantidad_usuarios = data.cantidad_usuarios;
		},


		updateTablero(state,data){

		
			state.cantidad_usuarios = data.cantidad_usuarios;
		
		}

	},


	actions:{

		cargarTablero({state,commit}){
			commit('toggleLoading',null,{root:true});
			axios.get('cargar/tablero/admin').then(respon => {
				commit('setTablero',respon.data);
			}).catch(e => {
				console.log(e);
			}).then(() => {
				commit('toggleLoading',null,{root:true});
			});
		}

	}








}