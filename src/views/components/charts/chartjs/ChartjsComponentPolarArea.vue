<script>
import { PolarArea } from 'vue-chartjs'


export default {
  extends: PolarArea,
  // mixins:[mixins],
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },

  watch:{
    data(val){
      this.renderChart(this.data, this.options)
    }

  }
}
</script>
