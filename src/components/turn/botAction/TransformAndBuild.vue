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
      <ol class="mt-2">
        <li v-html="t(`botAction.transformAndBuild.validSpaces.${botAction.structure}`)"></li>
        <li v-html="t('botAction.transformAndBuild.tiebreaker.title')"></li>
        <ol type="a">
          <template v-if="isBlight">
            <li v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else-if="isKuddlers">
            <li v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriorityYourTerrainType')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else-if="isMimics">
            <li v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriorityYourTerrainType')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else>
            <li v-if="isPowerMongers" v-html="t('botAction.transformAndBuild.tiebreaker.factionPowerMongers')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriority')"></li>
            <li v-if="useSpaceFurthestAway" class="fire-ice"><Icon type="expansion" name="fire-and-ice" class="expansionIcon"/> <span v-html="t('botAction.transformAndBuild.tiebreaker.structureFurthest')"></span></li>
            <li v-else v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
        </ol>
        <li v-html="t('botAction.transformAndBuild.execute.title')"></li>
        <ol type="a">
          <li v-html="t('botAction.transformAndBuild.execute.homeTerrainTile')"></li>
          <li v-html="t('botAction.transformAndBuild.execute.dwelling')"></li>
          <li v-if="isMarkedStructure" v-html="t('botAction.transformAndBuild.execute.marked')"></li>
        </ol>
      </ol>
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
import { useStore } from '@/store'
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import Structure from '@/services/enum/Structure'

export default defineComponent({
  name: 'TransformAndBuild',
  components: {
    Icon,
    SupportInfo,
    Upgrade
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
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      isUpgrade: false,
    }
  },
  computed: {
    upgradeBotAction() : BotAction {
      return {
        action: Action.UPGRADE,
        directionalSelection: this.botAction.directionalSelection,
        directionalSelectionCount: this.botAction.directionalSelectionCount
      }
    },
    useSpaceFurthestAway() : boolean {
      const finalScoringTile = this.$store.state.setup.finalScoringTile
      return finalScoringTile == FinalScoringTile.GREATEST_DISTANCE || finalScoringTile == FinalScoringTile.STRONGHOLD_SANCTUARY
    },
    botFaction() : BotFaction {
      return this.navigationState.botFaction as BotFaction
    },
    isKuddlers() : boolean {
      return this.botFaction == BotFaction.KUDDLERS
    },
    isMimics() : boolean {
      return this.botFaction == BotFaction.MIMICS
    },
    isPowerMongers() : boolean {
      return this.botFaction == BotFaction.POWERMONGERS
    },
    isBlight() : boolean {
      return this.botFaction == BotFaction.BLIGHT
    },
    isMarkedStructure() : boolean {
      return this.botAction.structure == Structure.MARKED || this.botAction.structure == Structure.MARKED_REACHING
    }
  }
})
</script>

<style lang="scss" scoped>
.actionIcon {
  width: 6rem;
}
.expansionIcon, .structureIcon {
  height: 1.3rem;
}
.fire-ice {
  color: #a1350e;
}
</style>