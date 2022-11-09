<template>
  <template v-if="!isUpgrade">
    <div class="actionCol">
      <div class="shipLevel">{{botAction.shipLevel}}</div>
      <AppIcon type="action" :name="botAction.action" class="actionIcon"/>
    </div>
    <div class="actionCol">
      <SupportInfo :bot-action="botAction" :structure="true" :terrain-priority="true" :directional-selection="true"/>
    </div>
    <div class="actionCol text-muted small">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="isUpgrade=true">{{t('botAction.transformAndBuild.noDwelling')}}</button>
      <ol class="mt-2">
        <li v-if="isWanderers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.validSpaces.factionWanderers')"></span></li>
        <li v-else v-html="t(`botAction.transformAndBuild.validSpaces.${botAction.structure}`)"></li>
        <li v-html="t('botAction.transformAndBuild.tiebreaker.title')"></li>
        <ol type="a">
          <template v-if="isKuddlers">
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></span></li>
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriorityYourTerrainType',{terrainPriority:botAction.terrainPriority})"></span></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else-if="isMimics">
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriorityYourTerrainType',{terrainPriority:botAction.terrainPriority})"></span></li>
            <li><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.structureClosest')"></span></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.directionalSelection')"></li>
          </template>
          <template v-else>
            <li v-if="isPowerMongers"><AppIcon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.factionPowerMongers')"></span></li>
            <li v-html="t('botAction.transformAndBuild.tiebreaker.terrainPriority',{terrainPriority:botAction.terrainPriority})"></li>
            <li v-if="useSpaceFurthestAway" class="fire-ice"><AppIcon type="expansion" name="fire-and-ice" class="expansionIcon"/><span v-html="t('botAction.transformAndBuild.tiebreaker.structureFurthest')"></span></li>
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
    </div>

    <div class="modal" tabindex="-1" id="modalReaching">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">{{t('botAction.transformAndBuild.reaching.title')}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="t('action.close')"></button>
          </div>
          <div class="modal-body">
            <p v-html="t('botAction.transformAndBuild.reaching.text1')"></p>
            <p v-html="t('botAction.transformAndBuild.reaching.text2')"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <Upgrade :bot-action="upgradeBotAction" :navigation-state="navigationState"/>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import BotAction from '@/services/BotAction'
import AppIcon from '@/components/structure/AppIcon.vue'
import SupportInfo from '../supportInfo/SupportInfo.vue'
import Upgrade from './ActionUpgrade.vue'
import Action from '@/services/enum/Action'
import { useStore } from '@/store'
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import Structure from '@/services/enum/Structure'

export default defineComponent({
  name: 'ActionTransformAndBuild',
  inheritAttrs: false,
  components: {
    AppIcon,
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
    botFaction() : BotFaction|undefined {
      return this.botAction.botFaction
    },
    isFactionAction() : boolean {
      return this.botFaction != undefined
    },
    isKuddlers() : boolean {
      return this.botFaction == BotFaction.KUDDLERS
    },
    isWanderers() : boolean {
      return this.botFaction == BotFaction.WANDERERS
    },
    isMimics() : boolean {
      return this.botFaction == BotFaction.MIMICS
    },
    isPowerMongers() : boolean {
      return this.botFaction == BotFaction.POWERMONGERS
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
.expansionIcon, .structureIcon, .factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
.fire-ice {
  color: #a1350e;
}
:deep(a) {
  text-decoration: underline dotted;
  color: #000;
}
.shipLevel {
  position: absolute;
  margin-left: 3rem;
  margin-top: 3.65rem;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: black;
}
</style>