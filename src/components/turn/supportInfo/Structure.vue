<template>
  <div>
    <Icon type="structure" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Structure from '@/services/enum/Structure'
import Icon from '@/components/structure/Icon.vue'

export default defineComponent({
  name: 'Structure',
  components: {
    Icon
  },
  props: {
    type: {
      type: Object as PropType<Structure>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.7rem;
}
</style>
