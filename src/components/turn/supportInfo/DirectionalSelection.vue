<template>
  <div>
    <div class="count" :class="{leftUp: isLeftUp, rightDown: !isLeftUp}">{{count}}</div>
    <Icon type="directional-selection" :name="type" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DirectionalSelection from '@/services/enum/DirectionalSelection'
import Icon from '@/components/structure/Icon.vue'

export default defineComponent({
  name: 'DirectionalSelection',
  components: {
    Icon
  },
  props: {
    type: {
      type: Object as PropType<DirectionalSelection>,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  computed: {
    isLeftUp() : boolean {
      return this.type == DirectionalSelection.LEFT_UP
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  width: 3rem;
}
.count {
  position: absolute;
  width: 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  &.leftUp {
    text-align: right;
    margin-top: -0.1rem;
  }
  &.rightDown {
    margin-top: 0.1rem;
  }
}
</style>
