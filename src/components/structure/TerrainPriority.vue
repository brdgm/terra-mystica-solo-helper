<template>
  <div>
    <div class="letter">{{type}}</div>
    <Icon name="terrain-priority" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import TerrainPriority from '@/services/enum/TerrainPriority'
import Icon from '@/components/structure/Icon.vue'

export default defineComponent({
  name: 'TerrainPriority',
  components: {
    Icon
  },
  props: {
    type: {
      type: Object as PropType<TerrainPriority>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.letter {
  position: absolute;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: -0.3rem;  
}
.icon {
  margin-left: 1.1rem;
  height: 1.7rem;
}
</style>
