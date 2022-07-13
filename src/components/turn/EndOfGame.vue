<template>
  <ol>
    <li v-html="t('endOfGame.cultScoring')"></li>
    <li>
      <span v-html="t('endOfGame.areaScoring')"></span>
      <ShipLevel :shipLevel="shipLevel"/>
    </li>
    <ul v-if="isStrongholdSancturaryScoring || isSettlementsScoring">
      <li class="fire-ice" v-if="isStrongholdSancturaryScoring">
        <Icon type="expansion" name="fire-and-ice" class="expansionIcon"/>
        <span v-html="t('endOfGame.areaScoringFireIceStrongholdSanctuary')"></span>
      </li>
      <li class="fire-ice" v-if="isSettlementsScoring">
        <Icon type="expansion" name="fire-and-ice" class="expansionIcon"/><span v-html="t('endOfGame.areaScoringFireIceSettlements')"></span>
      </li>
    </ul>
    <li v-if="isFactionWanderers"><Icon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('endOfGame.factionWanderers')"></span></li>
    <li v-if="isFactionGognomes"><Icon type="action" name="faction-action" class="factionActionIcon"/><span v-html="t('endOfGame.factionGognomes')"></span></li>
    <li v-html="t('endOfGame.resourceScoring')"></li>
  </ol>
</template>

<script lang="ts">
import DifficultyLevelParameters from '@/services/DifficultyLevelParameters'
import BotFaction from '@/services/enum/BotFaction'
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'
import ShipLevel from './supportInfo/ShipLevel.vue'

export default defineComponent({
  name: "EndOfGame",
  components: {
    Icon,
    ShipLevel
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  props: {
    round : {
      type: Number,
      required: true
    }
  },
  computed: {
    isStrongholdSancturaryScoring() : boolean {
      return this.$store.state.setup.finalScoringTile == FinalScoringTile.STRONGHOLD_SANCTUARY
    },
    isSettlementsScoring() : boolean {
      return this.$store.state.setup.finalScoringTile == FinalScoringTile.SETTLEMENTS
    },
    shipLevel() : number {
      const params = DifficultyLevelParameters.get(this.$store.state.setup.difficultyLevel, this.round)
      return params.shipLevel
    },
    isFactionWanderers() : boolean {
      return this.$store.state.setup.playerSetup.botFaction.includes(BotFaction.WANDERERS)
    },
    isFactionGognomes() : boolean {
      return this.$store.state.setup.playerSetup.botFaction.includes(BotFaction.GOGNOMES)
    }
  }
})
</script>

<style lang="scss" scoped>
.expansionIcon, .factionActionIcon {
  height: 1.3rem;
  margin-right: 0.2rem;
}
.fire-ice {
  color: #a1350e;
}
</style>
