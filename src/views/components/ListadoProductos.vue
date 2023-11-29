<template>
  <b-container fluid class="px-0 mx-0">
    
    <b-row>
      <b-col cols="12">
          <slot name="titulo" :total="total">
            
          </slot>
      </b-col>
    </b-row>

    <b-row>
      

      <b-col cols="12" md="3">
        <b-card>
            <div class="price-slider" v-if="!hideSliderPrices">
              
              <h6 class="filter-title">
                {{ $t('Selecciona una Categoría y un rango de precio') }}
              </h6>

              <vue-slider v-model.lazy="precios" :lazy="true" :min="0" :max="precio_maximo"
                 :tooltipFormatter="(val) => `$ ${val}`" :interval=".2" >
              </vue-slider>

            </div>

            
           <b-form-group :label="$t('Categorías')">
            
            <b-form-checkbox-group  v-if="!cjDropShipping" v-model="categoria_id" :options="listCategorias" :text-field="cjDropShipping ? 'categoryFirstName' : 'nombre'" :value-field="cjDropShipping ? 'categoryFirstId' : 'id'" stacked >
            
            </b-form-checkbox-group>

            <el-tree
              v-else
              :data="categories"
              accordion
              node-key="label"
              @node-click="nodoSelected"
              :props="defaultProps">
            </el-tree>

           </b-form-group>


           <b-form-group :label="$t('Tiendas')" v-if="!cjDropShipping">
               <b-form-checkbox-group  v-model="tienda_id" :options="tiendas" text-field="nombre" value-field="id" stacked >
              </b-form-checkbox-group>

          </b-form-group>
           
        </b-card>
      </b-col>

      <b-col cols="12" md="9">
        <b-container fluid>
          <b-row>
            
            <b-col cols="12" class="px-0">
              <section id="ecommerce-header">
                <div class="ecommerce-header-items d-flex justify-content-between align-items-center flex-wrap">
              
                  <div class="result-toggler">

                    <div class="search-results">
                      {{ total }} {{ $t('Productos encontrados') }}
                    </div>
              
                  </div>
              
                  <div class="view-options d-flex flex-wrap">
              
                    <v-select v-model="sortBy" :options="sortByOptions.map(v => ({text:$t(v.text),value:v.value}))" label="text" :reduce="option => option.value" style="min-width: 150px;" v-if="!cjDropShipping">
                    </v-select>
              
                    <b-form-radio-group v-model="itemView" class="ml-1 ml-md-1 list item-view-radio-group" buttons size="sm"
                      button-variant="outline-primary">
                      <b-form-radio v-for="option in itemViewOptions" :key="option.value" :value="option.value">
                        <feather-icon :icon="option.icon" size="18" />
                      </b-form-radio>
                    </b-form-radio-group>

                    <b-button size="sm" variant="outline-primary" @click="refreshData" class="ml-1" v-if="cjDropShipping" v-loading="loading">
                      <font-awesome-icon icon="fas fa-rotate-right"/>
                    </b-button>
              
                    <slot name="btn-action">
                      
                    </slot>

                  </div>
                </div>
              
              </section>

            </b-col>

            <b-col cols="12" class="mt-1 px-0">

              <b-input-group class="input-group-merge">
                <b-form-input v-model="searchQuery" :placeholder="$t(placeholderSearch)" class="search-product" />
                <b-input-group-append is-text>
                  <feather-icon icon="SearchIcon" class="text-muted" />
                </b-input-group-append>
              </b-input-group>

            </b-col>

            <b-col cols="12" class="mt-1 px-0" v-if="iskm0">
              <p>
                <strong class="text-danger">{{ $t('IMPORTANTE') }}:</strong>{{ $t('Los productos en la categoría “Km. 0” son productos locales de cada destino que solo pueden entregarse en las tiendas de cada destino. No hay envío a domicilio ni devolución en estas compras.') }}
              </p>
            </b-col>

             <b-col cols="12" class="px-0">
              <section  class="w-100 mt-1" style="min-height:100px">
                <slot name="contenido" :items="items" :eliminar="eliminar" :fetchData="fetchData" 
                  :sortBy="sortBy" :isSortDirDesc="isSortDirDesc" :perPage="perPage" :itemView="itemView">
                </slot>
              </section>
             </b-col>
             <b-col cols="12" class="px-0">
                <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" class="mt-1" />
             </b-col>
          </b-row>
        </b-container>
      </b-col>


    </b-row>

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
  BCarousel,
  BCarouselSlide,
  BImg,
  VBPopover,
  BSpinner,
  BFormCheckboxGroup,
  BFormGroup,
  BDropdown,
  BDropdownItem,
  BFormRadio,
  BFormRadioGroup

} from 'bootstrap-vue'

import store from '@/store'

import { ref, toRefs, computed, onActivated,onMounted,watch,inject } from 'vue'
// import VueSlider from 'vue-slider-component'

import vSelect from 'vue-select'


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
    BImg,
    paginateTable: () => import('components/PaginateTable.vue'),
    BSpinner,
    VueSlider: () => import('vue-slider-component').then((module) => { return module?.default }),
    BFormCheckboxGroup,
    BFormGroup,
    BDropdown,
    BDropdownItem,
    BFormRadioGroup,
    BFormRadio,
    vSelect

  },

  directives: {
    'b-popover': VBPopover,
  },


  props: {
    actions: Object | Function,
    isTable: Boolean,
    hideFooter: Boolean,
    hideHeader: Boolean,
    hideSliderPrices:Boolean,
    cjDropShipping:Boolean,
    placeholderSearch:{
      type:String,
      default:'Buscar Productos'
    }
  },


  setup(props,{emit}) {

    const { actions, cjDropShipping } = toRefs(props)

    let range_precio = ref([0, 20000]);
    const i18n = inject('i18n')
    const itemView = ref('grid-view')

    const itemViewOptions = ref([
      { icon: 'GridIcon', value: 'grid-view' },
      { icon: 'ListIcon', value: 'list-view' },
    ]);

    itemView.value = localStorage.getItem('disposicion_producto') || 'grid-view';

     const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy = 'id',
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      fetchData,
      eliminar,
      items,
      categorias,
      tiendas,
      tienda_id,
      categoria_id,
      precios = [0,100],
      sortByOptions
    } = actions.value;

    watch(itemView , (v) => {
        localStorage.setItem('disposicion_producto',v)
        refetchData()
    })

    onActivated(() => refetchData())

    const cargar_rango_precio = () => {

      if(!cjDropShipping.value){
        
        store.dispatch('producto/rangoPrecios').then((data) => {
            range_precio.value = data
            precios.value = data
        })
      }
     

    }

    onMounted(() => {
      cargar_rango_precio()
    })

   
    const defaultProps = ref({
      children: 'children',
      label: 'label'
    })

    const  convertDataFormat = (data) => {
      var convertedData = [];

      if(data && cjDropShipping.value){
        data.forEach(function(item) {
          var convertedItem = {
            label: item.categoryFirstName,
            children: []
          };

          item.categoryFirstList.forEach(function (categoryFirst) {
            var categoryFirstItem = {
              label: categoryFirst.categorySecondName,
              children: []
            };

            categoryFirst.categorySecondList.forEach(function (categorySecond) {
              var categorySecondItem = {
                label: categorySecond.categoryName,
                children: [],
                categoryId: categorySecond.categoryId
              };

              categoryFirstItem.children.push(categorySecondItem);
            });

            convertedItem.children.push(categoryFirstItem);
          });

          convertedData.push(convertedItem);
        });
      }
      

      return convertedData;
    }

    const categories = computed(() => {
      if(cjDropShipping.value){
         return convertDataFormat(categorias.value)
      }

      return [];
     
    })

    return {
      loading:computed(() => store.state.loading),
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      fetchData,
      eliminar,
      items,
      categorias,
      listCategorias:computed(() => categorias.value.map(cat => {
        return {
          ...cat,
          ...{
            nombre:i18n.t(cat.nombre)
          }
        }
      })),
      categoria_id,
      precios,
      range_precio,
      itemView,
      itemViewOptions,
      sortByOptions,
      precio_minimo:computed(() => redondeo(range_precio.value[0],0)),
      precio_maximo: computed(() => redondeo(range_precio.value[1],0)),
      defaultProps,
      categories,
      tiendas,
      tienda_id,
      convertDataFormat,
      refreshData:() => {
        categoria_id.value = null
        searchQuery.value = ''

        refetchData();

      },
      
      nodoSelected:(nod,opt) => {
      
        if('categoryId' in nod){
          categoria_id.value = nod.categoryId
        }else{
          categoria_id.value = null
        }
      },

      iskm0:computed(() => {
          let km0 = categorias.value.find(val => ['km0','Km 0'].includes(val.nombre))

          return categoria_id.value.includes(km0 ? km0.id : 0);

      })
      

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

<style lang="scss">
@import '@core/scss/vue/libs/vue-slider.scss';
</style>



<style lang="scss">
   @import "@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}

.img-fluid {
    max-width: 100%;
    height: auto;
}


.ecommerce-application .grid-view {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2rem;
}

@media (max-width: 575.98px){
   .ecommerce-application .grid-view {
      grid-template-columns: 1fr !important;
   }

}


@media (max-width: 991.98px){
   .ecommerce-application .grid-view {
      grid-template-columns: 1fr 1fr;
   }
}


.img-fluid {
    height: 100%;
    object-fit: cover;
    object-position: top center;
}


.content-drag{
   border: 1px dotted rgba(255,255,255,0.3);
   border-radius: 10px;
   padding: 0.3rem;
   min-height: 55px;
}



</style>


