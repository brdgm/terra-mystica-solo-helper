<template>
  <template v-if="!isUpgrade">
    <td>
      <Icon type="action" :name="botAction.action" class="actionIcon"/>
    </td>
    <td>
      <SupportInfo :bot-action="botAction" :structure="true" :terrain-priority="true" :directional-selection="true"/>
    </td>
    <td class="text-muted small">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="isUpgrade=true">{{t('botAction.transformAndBuild.noDwelling')}}</button>
      <p>!! Valid Spaces: within Range of any marked Structure.</p>
      <p>!! Tiebreaker: </p>
    </td>
  </template>
  <template v-else>
    <Upgrade :bot-action="upgradeBotAction"/>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import Upgrade from './Upgrade.vue'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'TransformAndBuild',
  components: {
    Icon,
    SupportInfo,
    Upgrade
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
  },
  data() {
    return {
      isUpgrade: false,
    }
  },
  computed: {
    upgradeBotAction() {
      return {
        action: Action.UPGRADE,
        directionalSelection: this.botAction.directionalSelection,
        directionalSelectionCount: this.botAction.directionalSelectionCount
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
p {
  margin-top: 0.25rem;
  margin-bottom: 0;
}
</style>