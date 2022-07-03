<template>
  <h4>{{t('roundTurn.turnInfo', {round:round, turn:turn})}}</h4>
  <h1 v-if="roundTurn?.player">{{t('roundTurn.titlePlayer', {player:roundTurn?.player}, playerCount)}}</h1>
  <h1 v-if="roundTurn?.bot">{{t('roundTurn.titleBot', {bot:roundTurn?.bot}, botCount)}}</h1>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo"  endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'RoundTurn',
  components: {
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

    return { t, playerCount, botCount, round, turn, roundTurn }
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
