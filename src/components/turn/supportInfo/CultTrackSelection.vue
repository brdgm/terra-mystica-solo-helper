<template>
  <div>
    <Icon type="cult-track-selection" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/structure/Icon.vue'

export default defineComponent({
  name: 'CultTrackSelection',
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
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
