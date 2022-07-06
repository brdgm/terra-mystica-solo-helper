<template>
  <div>
    <Icon type="cult-track-selection" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import CultTrackSelection from '@/services/enum/CultTrackSelection'
import Icon from '@/components/structure/Icon.vue'

export default defineComponent({
  name: 'CultTrackSelection',
  components: {
    Icon
  },
  props: {
    type: {
      type: Object as PropType<CultTrackSelection>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 3rem;
}
</style>
