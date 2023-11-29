<template>
   <b-container fluid class="mx-0 px-0">

      <slot name="titulo" :total="total">
         
      </slot>

      <slot name="header-table" :total="total"></slot>
      
      <!-- Table Container Card -->
      <b-card no-body class="mb-0" v-if="!hideHeader">

         <div class="my-1 container-fluid">
            <!-- Table Top -->
            <b-row>
               <!-- Per Page -->
               <b-col cols="12" md="4" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <per-page v-model="perPage" :perPageOptions="perPageOptions" v-if="!hidePerPage"></per-page>
               </b-col>

               <b-col md="8" class="d-flex w-100">
                  <slot name="btn-action-prepend"></slot>
                  <b-input-group size="sm" class="mr-0 d-flex justify-content-end">
                   
                     <b-form-input :value="searchQuery" @input="updateQ" type="search" :placeholder="searchPlaceholder" v-if="!hideSearch" />
                     <b-input-group-append >
                        <b-button size="sm" @click="refetchData()" :title="$t('Recargar')">
                           <font-awesome-icon  icon="fas fa-rotate-right"/>
                        </b-button>
                        <slot name="btn-action"></slot>
                     </b-input-group-append>
                  </b-input-group>
               </b-col>

            </b-row>

         </div>

      </b-card>

      <!-- <section class="w-100 d-flex justify-content-center py-3" v-if="!isTable && loading"  >
         <b-spinner>
         </b-spinner>
      </section> -->

      <section v-loading="loading" class="w-100 mt-1" style="min-height:100px">

         <slot name="header-contenido">

         </slot>
         <slot name="contenido" :items="items" :eliminar="eliminar" :fetchData="fetchData" :tableColumns="tableColumns"
            :sortBy="sortBy" :isSortDirDesc="isSortDirDesc" :perPage="perPage" :refTable="refTable">
         </slot>
      </section>

      <slot name="prePaginate" :items="items">
         
      </slot>

      <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total"
         class="mt-1" v-if="!hidePaginate"/>

      <b-card class="mt-1" v-if="!hideFooter">


         <b-container class="mb-1">
            <b-row>
               <b-col class="px-1">
                  <b-button-group size="sm">

                     <slot name="botonera-footer">

                     </slot>
                  
                  </b-button-group>
                 
               </b-col>
            </b-row>
         </b-container>


      </b-card>
      <slot name="otros"></slot>

   </b-container>
</template>

<script>

import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BFormInput,
   BInputGroup,
   BInputGroupAppend,
   BInputGroupPrepend,

   BCarousel,
   BCarouselSlide,
   BImg,
   VBPopover,
   BSpinner

} from 'bootstrap-vue'

import store from '@/store'
import router from '@/router'

import { ref, toRefs, computed, onActivated } from 'vue'

import { regresar } from '@core/utils/utils.js'

export default {

   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BInputGroup,
      BFormInput,
      BCarousel,
      BCarouselSlide,
      BInputGroupAppend,
      BInputGroupPrepend,
      BImg,
      perPage: () => import('components/PerPage.vue'),
      paginateTable: () => import('components/PaginateTable.vue'),
      BSpinner
   },

   directives: {
      'b-popover': VBPopover
   },


   props:{
      actions:Object|Function,
      isTable:Boolean,
      hideFooter:Boolean,
      hideHeader:Boolean,
      hidePaginate:{
         type:Boolean,
         default:false,
         required:false
      },
      hidePerPage: {
         type: Boolean,
         default: false,
         required: false
      },
      hideSearch: {
         type: Boolean,
         default: false,
         required: false
      },
      searchPlaceholder:{
         type:String,
         default:'...'
      }
   },


   setup(props) {

      const { actions } = toRefs(props)

      const {
         isSortDirDesc,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         items,
         perPageOptions,
         dataMeta,
         refetchData,
         fetchData,
         eliminar = null,
         tableColumns = [],
         refTable = null,
      } = actions.value;

      onActivated(() => refetchData())

      const updateQ = _.debounce(value => {
            searchQuery.value = value
      },600)

      const updateValue =  _.debounce(function (value) {
         searchQuery.value = value
      }, 600)

      return {
         items,
         isSortDirDesc,
         sortBy,
         searchQuery,
         perPage,
         currentPage,
         total,
         perPageOptions,
         dataMeta,
         refetchData,
         fetchData,
         loading: computed(() => store.state.loading),
         regresar,
         eliminar,
         tableColumns,
         refTable,
         updateQ,
         irEditar: (negocio) => router.push({ name: 'negocio.edit', params: { id: negocio ? negocio.id : null } })
      }

   }


}
</script>

<style lang="scss" scoped>
.logotipos {
   width: 100% !important;
   height: auto;
   object-fit: cover;
}
</style>