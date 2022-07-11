<template>
  <div class="actionCol">
    <Icon type="action" :name="botAction.action" class="actionIcon"/>
  </div>
  <div class="actionCol">
    <SupportInfo :bot-action="botAction" :directional-selection="true"/>
  </div>
  <div class="actionCol text-muted small">
    <ol>
      <li v-html="t('botAction.upgrade.tiebreaker.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.upgrade.tiebreaker.tradingHouse')"></li>
        <li v-html="t('botAction.upgrade.tiebreaker.littlePower')"></li>
        <li v-html="t('botAction.upgrade.tiebreaker.directionalSelection')"></li>
      </ol>
      <li v-html="t('botAction.upgrade.execute.title')"></li>
      <ol type="a">
        <li v-html="t('botAction.upgrade.execute.highestPowerStructure')"></li>
        <li class="mots" v-if="hasMerchantsOfTheSeas">
          <Icon type="expansion" name="merchants-of-the-seas" class="expansionIcon"/>
          <span v-html="t('botAction.upgrade.execute.motsShipyardPreferred')"></span>
        </li>
      </ol>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import Icon from '@/components/structure/Icon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import { useStore } from '@/store'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'Upgrade',
  inheritAttrs: false,
  components: {
    Icon,
    SupportInfo
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    botAction: {
      type: Object as PropType<BotAction>,
      required: true
    }
  },
  computed: {
    hasMerchantsOfTheSeas(): boolean {
      return this.$store.state.setup.expansions.includes(Expansion.MERCHANTS_OF_THE_SEAS)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.expansionIcon {
  height: 1.5rem;
}
.mots {
  color: #007f93;
}
</style>