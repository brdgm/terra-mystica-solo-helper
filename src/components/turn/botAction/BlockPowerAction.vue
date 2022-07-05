<template>
  <div class="col-auto">
    <Icon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="col-auto">
    <DirectionalSelection :type="botAction.directionalSelection!" :count="botAction.directionalSelectionCount!"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'
import DirectionalSelection from '@/components/structure/DirectionalSelection.vue'

export default defineComponent({
  name: 'BlockPowerAction',
  components: {
    Icon,
    DirectionalSelection
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
</style>