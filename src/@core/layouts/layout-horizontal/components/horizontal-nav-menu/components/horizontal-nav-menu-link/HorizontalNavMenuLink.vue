<template>
  <li
    v-if="canViewHorizontalNavMenuLink(item)"
    :class="{
      'active': isActive,
      'disabled': item.disabled
    }"
  >
    <b-link v-bind="linkProps" class="dropdown-item">
      <font-awesome-icon :icon="[item.iconFa || 'fas', item.icon]" v-if="item.fontAwesome"  size="2x" />
        <feather-icon :icon="item.icon || 'CircleIcon'" v-else />
      <span class="menu-title">{{ t(item.title) }}</span>

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
import { BLink,BBadge } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { useUtils as useAclUtils } from '@core/libs/acl'
import useHorizontalNavMenuLink from './useHorizontalNavMenuLink'
import mixinHorizontalNavMenuLink from './mixinHorizontalNavMenuLink'
import { ref } from 'vue'

export default {
  components: {
    BLink,
    BBadge
  },
  mixins: [mixinHorizontalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useHorizontalNavMenuLink(props.item)
    const resultTag = ref(0)
    const { t } = useI18nUtils()
    const { canViewHorizontalNavMenuLink } = useAclUtils()
     const resolverPromiseTag = (item) => {

      if (item.tag) {
        item.tagValue().then((data) => {
          resultTag.value = data

        })
        return resultTag.value;
      }
      return 0;

    }
    return {
      isActive,
      linkProps,
      updateIsActive,

      // ACL
      canViewHorizontalNavMenuLink,

      // i18n
      t,
      resolverPromiseTag
    }
  },

}
</script>
