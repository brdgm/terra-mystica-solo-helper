<template>
  <div class="col-auto">
    <Icon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="col-auto">
    !! Gain <b>{{botAction.victoryPoints}}</b> victory points.
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'

export default defineComponent({
  name: 'GainVictoryPoints',
  components: {
    Icon
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