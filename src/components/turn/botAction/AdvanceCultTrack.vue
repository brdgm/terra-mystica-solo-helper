<template>
  <td>
    <Icon type="action" :name="botAction.action" class="actionIcon"/>
  </td>
  <td>
    <SupportInfo :bot-action="botAction" :directional-selection="true" :cult-track-selection="true"/>
  </td>
  <td class="text-muted small">
    <ol>
      <li v-html="t('botAction.advanceCultTrack.notMarker10')"></li>
      <AdvanceCultTrackTrackSelection :bot-action="botAction"/>
      <li v-html="t('botAction.advanceCultTrack.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.advanceCultTrack.execute.placePriest')"></li>
        <li v-html="t('botAction.advanceCultTrack.execute.noPriest')"></li>
      </ol>
    </ol>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import AdvanceCultTrackTrackSelection from './AdvanceCultTrackTrackSelection.vue'

export default defineComponent({
  name: 'AdvanceCultTrack',
  components: {
    Icon,
    SupportInfo,
    AdvanceCultTrackTrackSelection
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
