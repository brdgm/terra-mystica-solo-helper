<template>
  <h4>{{t('roundTurn.turnInfo', {round:round, turn:turn})}}</h4>
  <h1>
    <template v-if="roundTurn?.player">{{t('roundTurn.titlePlayer', {player:roundTurn?.player}, playerCount)}}</template>
    <template v-if="roundTurn?.bot">{{t('roundTurn.titleBot', {bot:roundTurn?.bot, faction:t('botFaction.'+botFaction)}, botCount)}}</template>
    <img v-if="startPlayer" src="@/assets/icons/start-player-token.png" class="startPlayerIcon"/>
  </h1>

  <PlayerTurn v-if="roundTurn?.player" :navigationState="navigationState" :nextButtonRouteTo="nextButtonRouteTo"/>
  <BotTurn v-if="roundTurn?.bot" :navigationState="navigationState" :nextButtonRouteTo="nextButtonRouteTo"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo"  endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import PlayerTurn from '@/components/turn/PlayerTurn.vue'
import BotTurn from '@/components/turn/BotTurn.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    PlayerTurn,
    BotTurn,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const navigationState = new NavigationState(route, store)
    const playerCount = navigationState.playerCount
    const botCount = navigationState.botCount
    const round = navigationState.round
    const turn = navigationState.turn
    const roundTurn = navigationState.roundTurn
    const botFaction = navigationState.botFaction
    const startPlayer = navigationState.roundTurn?.startPlayer

    return { t, navigationState, playerCount, botCount, round, turn, roundTurn, botFaction, startPlayer }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1 || this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn-1}`
      }
      else {
        return ''
      }
    },
    nextButtonRouteTo() : string {
      return `/round/${this.round}/turn/${this.turn+1}`
    },
  }
})
</script>

<style lang="scss" scoped>
.startPlayerIcon {
  height: 2.8rem;
  margin-left: 0.75rem;
  margin-top: -0.5rem;
}
</style>