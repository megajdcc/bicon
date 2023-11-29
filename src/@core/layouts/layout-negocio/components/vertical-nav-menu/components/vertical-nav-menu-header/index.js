import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { useUtils as useAclUtils } from '@core/libs/acl'

const { t } = useI18nUtils()
const { canViewVerticalNavMenuHeader } = useAclUtils()

export default {
  
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  render(h) {
    
    const span = h('span', {}, t(this.item.header))
    const icon = h('font-awesome-icon', { props: { icon: 'fa-solid fa-horizontal-rule', size: 'xl' } })

    if (canViewVerticalNavMenuHeader(this.item)) {
      return h('li', { class: 'navigation-header text-truncate' }, [span, icon])
    }

    return h()
  
  },

}
