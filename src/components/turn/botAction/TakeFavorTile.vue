<template>
  <div class="col-auto">
    <Icon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="col-auto">
    <SupportInfo :bot-action="botAction" :directional-selection="true" :cult-track-selection="true"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'

export default defineComponent({
  name: 'TakeFavorTile',
  components: {
    Icon,
    SupportInfo
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