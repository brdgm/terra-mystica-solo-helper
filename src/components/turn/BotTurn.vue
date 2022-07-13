<template>
  <div class="fixed-bottom text-muted cardDebugInfo">
    {{cardDeck.actionCard?.id}} / {{cardDeck.supportCard?.id}}
  </div>

  <template v-if="isPass">
    <BotPass :navigationState="navigationState"/>
  </template>
  <div v-else class="actions">
    <template v-for="(botAction, index) of botActions" :key="index">
      <hr v-if="index > 0" class="actionSeparator"/>
      <div class="actionRow">
        <component :is="botAction.action" :botAction="botAction" :navigationState="navigationState"/>
      </div>
    </template>
  </div>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import BotFaction from '@/services/enum/BotFaction'
import CardDeck from '@/services/CardDeck'
import BotActions from '@/services/BotActions'
import BotAction from '@/services/BotAction'
import AdvanceCultTrack from './botAction/AdvanceCultTrack.vue'
import BlockPowerAction from './botAction/BlockPowerAction.vue'
import GainVictoryPoints from './botAction/GainVictoryPoints.vue'
import TakeFavorTile from './botAction/TakeFavorTile.vue'
import Trade from './botAction/Trade.vue'
import TransformAndBuild from './botAction/TransformAndBuild.vue'
import Upgrade from './botAction/Upgrade.vue'
import FactionSymbiontsPlaceCube from './botAction/FactionSymbiontsPlaceCube.vue'
import FactionBlightTransformFallowLand from './botAction/FactionBlightTransformFallowLand.vue'
import BotPass from './BotPass.vue'

export default defineComponent({
  name: 'BotTurn',
  components: {
    AdvanceCultTrack,
    BlockPowerAction,
    GainVictoryPoints,
    TakeFavorTile,
    Trade,
    TransformAndBuild,
    Upgrade,
    FactionSymbiontsPlaceCube,
    FactionBlightTransformFallowLand,
    BotPass
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    nextButtonRouteTo: {
      type: String,
      required: true
    }
  },
  computed: {
    botFaction() : BotFaction {
      return this.navigationState.botFaction as BotFaction
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck as CardDeck
    },
    isPass() : boolean {
      return this.cardDeck.isPass()
    },
    botActions() : readonly BotAction[] {
      if (!this.cardDeck.actionCard || !this.cardDeck.supportCard) {
        return []
      }
      const botActions = new BotActions(this.cardDeck.actionCard, this.cardDeck.supportCard,
          this.navigationState.round, this.botFaction, this.navigationState.difficultyLevel)
      return botActions.actions
    }
  }
})
</script>

<style lang="scss">
.actions {
  .actionRow {
    margin-top: 1rem;
    display: flex;
    flex-flow: wrap;
    .actionCol {
      margin: 0.5rem;
    }
  }
  .actionSeparator {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    color: gray;
  }
}
.cardDebugInfo {
  margin-bottom: 2rem;
  padding-right: 0.5rem;
  font-size: 0.6rem;
  background-color: transparent;
  text-align: right;
}
</style>
