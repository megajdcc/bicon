export default {

   namespaced:true,


   state(){
      return {
         opinion: {
            id: null,
            calificacion: 5,
            opinion: '',
            titulo: '',
            asistencia: '',
            acompanante: null,
            certificacion: false,
            preguntas: [
               {
                  pregunta: '¿Le recomendarías este lugar o actividad a un amigo que visite el lugar por primera vez ?',
                  respuesta: null,
               },
               {
                  pregunta: '¿Esta atracción es una joya oculta o está fuera del circuito turístico?',
                  respuesta: null,
               },
               {
                  pregunta: '¿Es algo que no te puedes perder si viajas con un grupo grande (más de 5 personas)?',
                  respuesta: null,
               },
               {
                  pregunta: '¿Esta atracción es un buen lugar para visitar durante una luna de miel?',
                  respuesta: null,
               }

            ],
            model_id: null,
            model_type: null,
            usuario_id: null,
            usuario: null,
            imagenes: []
         },

         opinions: []

      }
   },


   getters:{

      draft(state){
         return clone(state.opinion)
      },

      optionsAsistencia(state){
         const asistencia = [];

         for (let index = 11; index >= 0; index--) {

            asistencia.push(moment().subtract(index,'MONTH').format('MMMM YYYY'));
         
         }

         return asistencia

      },

      optionsAcompanante(state){
         const options = [
            {
               value:1,
               label:'Pareja'
            },

            {
               value: 2,
               label: 'Familia'
            },
            {
               value: 4,
               label: 'Amigos'
            },

            {
               value: 5,
               label: 'De Negocios'
            },

            {
               value: 6,
               label: 'Solitario'
            },
         ];

         return options
      }


   },

   mutations:{

      setOpinion(state,opinion){
         state.opinion = opinion
      },

      clear(state){
         state.opinion = {
            id: null,
            calificacion: 5,
            opinion: '',
            titulo: '',
            asistencia: '',
            acompanante: null,
            certificacion: false,
            preguntas: [
               {
                  pregunta: 'Le recomendarias este lugar o actividad a un amigo que visite el lugar por primera vez ?',
                  respuesta: null,
               },
               {
                  pregunta: '¿Esta atracción es una joya oculta o está fuera del circuito turístico?',
                  respuesta: null,
               },
               {
                  pregunta: '¿Es algo que no te puedes perder si viajas con un grupo grande (más de 5 personas)?',
                  respuesta: null,
               },
               {
                  pregunta: '¿Esta atracción es un buen lugar para visitar durante una luna de miel?',
                  respuesta: null,
               }

            ],
            model_id: null,
            model_type: null,
            usuario_id: null,
            usuario: null,
            imagenes: []
         }
      },

      setOpiniones(state,opinions){

         state.opinions = opinions
      },

      push(state,opinion){

         state.opinions.push(opinion)

      },

      put(state,opinion_id){
         
         state.opinions.splice(
            state.opinions.findIndex(val => val.id === opinion_id),
            1
         )

      },

      update(state,opinion){
         let i = state.opinions.findIndex(val => val.id === opinion.id)

         if(i != -1){

            state.opinions[i] = opinion

            
         }

         if(state.opinion.id === opinion.id){
            state.opinion = opinion
         }


      }





   },

   actions:{

      fetchData({commit},datos){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/opinions/fetch/data`,datos).then(({data}) => {

               resolve(data)
            }).catch(e => reject(e))
         })
      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            axios.post(`/api/opinions`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
         })
      },


      fetchDataModel({commit},datos){
         return new Promise((resolve, reject) => {
               axios.post(`/api/opinions/fetch/data/model`,datos).then(({data}) => {

                  resolve(data)
               }).catch(e => reject(e))
               
         })

      }

   }

}