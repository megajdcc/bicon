<template>
  <b-navbar-nav class="nav">

    <template v-for="(bookmark, index) in bookmarks">
      <b-nav-item :id="`bookmark-${index}`" :key="index" :to="bookmark.route"
        v-if="$can(`${bookmark.action}`,`${bookmark.resource}`)">
        <feather-icon :icon="bookmark.icon" size="21" />
        <b-tooltip triggers="hover" :target="`bookmark-${index}`" :title="bookmark.title"
          :delay="{ show: 1000, hide: 50 }" />
      </b-nav-item>

    </template>

    <b-nav-item-dropdown link-classes="bookmark-star" lazy @hidden="resetsearchQuery"
      v-if="usuario.id && usuario.rol.nombre == 'Desarrollador'">
      <feather-icon slot="button-content" icon="StarIcon" size="21" class="text-warning" />

      <!-- Dropdown Content -->
      <li style="min-width:300px">
        <div class="p-1">
          <b-form-input id="boomark-search-input" v-model="searchQuery" placeholder="Busque..." autofocus />
        </div>

        <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="search-list search-list-bookmark scroll-area"
          :class="{'show': filteredData.paginas && filteredData.paginas.length }" tagname="ul">

          <template v-for="(suggestion, index) in filteredData.paginas || bookmarks">
            <b-dropdown-item :key="index" class="suggestion-group-suggestion cursor-pointer"
              link-class="d-flex align-items-center" :to="suggestion.route" @mouseenter="currentSelected = index"
              v-if="$can(`${suggestion.action}`,`${suggestion.resource}`)">
              <feather-icon :icon="suggestion.icon" class="mr-75" size="18" />
              <span class="align-middle">{{ suggestion.title }}</span>
              <feather-icon icon="StarIcon" class="ml-auto" size="16" :class="{'text-warning': suggestion.isBookmarked}"
                @click.stop.prevent="toggleBookmarked(suggestion)" />
            </b-dropdown-item>
          </template>

          <b-dropdown-item v-show="!(filteredData.paginas && filteredData.paginas.length) && searchQuery" disabled>
            Sin Resultados
          </b-dropdown-item>
        </vue-perfect-scrollbar>
      </li>
    </b-nav-item-dropdown>

  </b-navbar-nav>
</template>

<script>
import {
  BNavbarNav, BNavItem, BTooltip, BNavItemDropdown, BFormInput, BDropdownItem,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import useAutoSuggest from '@core/components/app-auto-suggest/useAutoSuggest'
import { ref, watch } from 'vue'
import router from '@/router'
import store from '@/store'
import dataSearchBookmars from '../search-and-bookmark-data'
import {mapState} from 'vuex';

export default {
  components: {
    BNavbarNav, BNavItem, BTooltip, BNavItemDropdown, BFormInput, VuePerfectScrollbar, BDropdownItem,
  },

  computed:{
    ...mapState('usuario',['usuario'])
  },

  setup() {


    const {
      paginas,
      bodas,
    } = dataSearchBookmars();
    const searchAndBookmarkDataPages = ref(dataSearchBookmars.paginas)

    // const bookmarks = ref(searchAndBookmarkData.pages.data.filter(page => page.isBookmarked))
    const bookmarks = ref(JSON.parse(localStorage.getItem('bookmarks')) || [])
    const currentSelected = ref(-1)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const {
      searchQuery,
      resetsearchQuery,
      filteredData,
    } = useAutoSuggest({ data: { paginas: paginas.value }, searchLimit: 6 })

    watch(searchQuery, val => {
      store.commit('app/TOGGLE_OVERLAY', Boolean(val))
    })

    watch(filteredData, val => {
      currentSelected.value = val.paginas && !val.paginas.length ? -1 : 0
    })

    const suggestionSelected = () => {
      const suggestion = filteredData.value.paginas[currentSelected.value]
      router.push(suggestion.route).catch(() => {})
      resetsearchQuery()
    }

    const toggleBookmarked = item => {

      const pageIndexInBookmarks = bookmarks.value.findIndex(i => i.route === item.route)

      // If index is > -1 => Item is bookmarked => Remove item from bookmarks array using index
      // Else => Item is not bookmarked => Add item to bookmarks' array
      if (pageIndexInBookmarks > -1) {
        bookmarks.value[pageIndexInBookmarks].isBookmarked = false
        bookmarks.value.splice(pageIndexInBookmarks, 1)
      } else {
        bookmarks.value.push(item)
        bookmarks.value[bookmarks.value.length - 1].isBookmarked = true
      }

      localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))

    }


    return {
      bookmarks,
      perfectScrollbarSettings,
      currentSelected,
      suggestionSelected,
      toggleBookmarked,

      // AutoSuggest
      searchQuery,
      resetsearchQuery,
      filteredData,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/base/bootstrap-extended/include';

ul
{
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
}

.nav-bookmar-content-overlay {
    position: fixed;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
    z-index: -1;

    &:not(.show) {
      pointer-events: none;
    }

    &.show {
      cursor: pointer;
      z-index: 10;
      opacity: 1;
    }
}
</style>
