<template>
  <b-card no-body :bg-variant="color" class="card-horizontal">
    <b-card-body class="d-flex justify-content-between align-items-center flex-column"
      style="position:relative; padding: 1rem;">

      <section class="d-flex justify-content-between aling-items-center w-100">
        <div class="truncate">
          <h2 class="mb-25 font-weight-bolder" :class="[colorText]">

            <slot>
              
            </slot>
            <slot name="statistic" :statistic="statistic" :colorText="colorText" >
              {{ statistic }}
            </slot>

          </h2>

          <slot name="titulo">
            <b v-html="statisticTitle" :class="[colorText]" ></b>
          </slot>

          <slot name="legend">
          
          </slot>
          <slot name="btn-card">

          </slot>


        </div>
        <section class="d-flex">
          <b-avatar :variant="`light-${colorIcon}`" class="avatar-icon" @click="ir">
            <slot name="icon">
              <font-awesome-icon :icon="['fa-solid', icon]" size="3x" @click="ir" />
            </slot>
          </b-avatar>

         
        </section>
        
      </section>

      <div class="filtro-statistic w-100">
        <slot name="filtro">
        </slot>
      </div>

    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'
import { toRefs, computed } from 'vue';
import router from '@/router'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    statistic: {
      type: [Number, String],
      required: false,
      default: 0,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
    },

    colorIcon: {
      type: String,
      default: 'dark'
    },
    colorText: {
      type: String,
      default: 'text-black'
    },
    to:{
      type:Object,
      default:() =>({path:'#'}),  
      required:false
    },
  
  },


  setup(props) {
    const { colorText } = toRefs(props)
    const {to} = toRefs(props)
    return {  
      colorTexto: computed(() => colorText.value),
      ir:() => router.push(to.value)
    }

  }
}
</script>

<style lang="scss" scoped>
// $color-text:v-bind(colorTexto);

.avatar-icon {
  cursor: pointer;
  transition: 60ms ease;
  min-height: 60px;
  min-width:60px;
  max-height: 120px;
  padding: 5px;
  flex-grow:1;
  flex-shrink: 0;
  &:hover  {
    transform:scale(1.2);
    transition:30ms ease all;
   
  }
}

// .card-horizontal{
//   h2, span{
//     color: $color-text !important; 
//   }
// }
</style>