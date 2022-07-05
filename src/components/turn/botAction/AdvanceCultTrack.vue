<template>
  <div class="col-auto">
    <Icon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="col-auto">
    <DirectionalSelection :type="botAction.directionalSelection!" :count="botAction.directionalSelectionCount!"/>
    <CultTrackSelection :type="botAction.cultTrackSelection!"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'
import CultTrackSelection from '@/components/structure/CultTrackSelection.vue'
import DirectionalSelection from '@/components/structure/DirectionalSelection.vue'

export default defineComponent({
  name: 'AdvanceCultTrack',
  components: {
    Icon,
    DirectionalSelection,
    CultTrackSelection
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
