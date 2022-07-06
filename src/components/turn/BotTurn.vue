<template>
  <div class="float-end text-muted small">
    {{cardDeck.actionCard?.id}} / {{cardDeck.supportCard?.id}}
  </div>

  <table class="actions">
    <tr class="mt-3" v-for="(botAction, index) of botActions" :key="index">
      <component :is="botAction.action" :botAction="botAction"/>
    </tr>
  </table>

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

export default defineComponent({
  name: 'BotTurn',
  components: {
    AdvanceCultTrack,
    BlockPowerAction,
    GainVictoryPoints,
    TakeFavorTile,
    Trade,
    TransformAndBuild,
    Upgrade
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

<style lang="scss" scoped>
table.actions {
  border-spacing: 1rem;
  border-collapse: separate;
}
</style>