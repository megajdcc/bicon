<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filtro
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Rol de usuario</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="roleFilter"
            :options="roleOptions"
  
            class="w-100"
            :reduce="val => val.id"
            @input="(val) => $emit('update:roleFilter', val)"
          />
        </b-col>

      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BCardBody, BRow, BCol } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
  },
  props: {
    roleFilter: {
      type: [Number, null],
      default: null,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
  },

  model:{
    prop:'roleFilter',
    event:'update:roleFilter'
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
