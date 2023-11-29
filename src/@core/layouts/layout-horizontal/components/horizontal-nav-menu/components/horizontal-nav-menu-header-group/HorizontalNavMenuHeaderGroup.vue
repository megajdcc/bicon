<template>
  <li
    v-if="canViewHorizontalNavMenuHeaderGroup(item)"
    class="dropdown nav-item"
    :class="{
      'sidebar-group-active active open': isActive,
      'show': isOpen,
    }"
    @mouseenter="() => updateGroupOpen(true)"
    @mouseleave="() => updateGroupOpen(false)"
  >
    <b-link class="nav-link dropdown-toggle d-flex align-items-center" style="position:relative"> 
      <font-awesome-icon :icon="[item.iconFa || 'fas', item.icon]" v-if="item.fontAwesome"  />
      <feather-icon :icon="item.icon || 'CircleIcon'" v-else />
      <span>{{ t(item.header) }}</span>

      <div class="dot-tag" v-if="item.tag" >

      </div>

    </b-link>
    <ul class="dropdown-menu">
      <component
        :is="resolveHorizontalNavMenuItemComponent(child)"
        v-for="child in item.children"
        :key="child.title"
        :item="child"
      />
    </ul>
  </li>
</template>

<script>
    
import { BLink, BBadge } from 'bootstrap-vue'
import { resolveHorizontalNavMenuItemComponent } from '@core/layouts/utils'
import { useUtils as useAclUtils } from '@core/libs/acl'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useHorizontalNavMenuHeaderGroup from './useHorizontalNavMenuHeaderGroup'
import mixinHorizontalNavMenuHeaderGroup from './mixinHorizontalNavMenuHeaderGroup'

import HorizontalNavMenuGroup from '../horizontal-nav-menu-group/HorizontalNavMenuGroup.vue'
import HorizontalNavMenuLink from '../horizontal-nav-menu-link/HorizontalNavMenuLink.vue'

export default {
  components: {
    BLink,
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
    BBadge
  },
  mixins: [mixinHorizontalNavMenuHeaderGroup],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      isActive,
      updateIsActive,
      isOpen,
      updateGroupOpen,
    } = useHorizontalNavMenuHeaderGroup(props.item)

    const { t } = useI18nUtils()
    const { canViewHorizontalNavMenuHeaderGroup } = useAclUtils()

    return {
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive,
      resolveHorizontalNavMenuItemComponent,

      // ACL
      canViewHorizontalNavMenuHeaderGroup,

      // i18n
      t,
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/scss/variables/variables';

  .dot-tag{
    position:absolute;
    height: 10px;
    width:10px;
    border-radius: 50%;
    background:$danger;
    right:-5px;
    top:-5px;
  }
</style>
