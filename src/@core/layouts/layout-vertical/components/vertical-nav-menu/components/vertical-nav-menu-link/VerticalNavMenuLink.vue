<template>
  <li
    v-if="canViewVerticalNavMenuLink(item)"
    class="nav-item"
    :class="{
      'active': isActive,
      'disabled': item.disabled
    }"
  >
    <b-link  class="d-flex align-items-center" v-bind="linkProps"  >
      <font-awesome-icon :icon="[ item.iconFa || 'fas',item.icon]" v-if="item.fontAwesome"  />
      <feather-icon :icon="item.icon || 'CircleIcon'" v-else />

      <span class="menu-title text-truncate">{{ t(item.title,item.title) }}</span>

      <b-badge
        v-if="item.tag"
        pill
        :variant="item.tagVariant || 'primary'"
        class="mr-1 ml-2"
      >
        {{ resolverPromiseTag(item) }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
import { useUtils as useAclUtils } from '@core/libs/acl'
import { BLink, BBadge } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useVerticalNavMenuLink from './useVerticalNavMenuLink'
import mixinVerticalNavMenuLink from './mixinVerticalNavMenuLink'
import {ref} from 'vue'

export default {
  components: {
    BLink,
    BBadge,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(props.item)
    const { t } = useI18nUtils()
    const { canViewVerticalNavMenuLink } = useAclUtils()
    const resultTag = ref(0)

    const resolverPromiseTag = (item) => {

      if(item.tag){
        item.tagValue().then((data) => {
          resultTag.value = data
         
        })
        return resultTag.value;
      }
      return 0;
      
    }
    return {
      resolverPromiseTag,
      isActive,
      linkProps,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuLink,

      // i18n
      t,
    }
  },

}
</script>
<style lang="scss">
@import '@/assets/scss/variables/variables';

  .active-nav{
    
    background: $danger !important;

    span{
      color:black;
      font-weight: 400;
    }
    
    svg{
      color:black;
    }

  }

</style>
