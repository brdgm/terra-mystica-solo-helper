<template>
  <div class="float-end">
    {{t('income.turnInfo', {round:round})}}
  </div>
  <h1>{{t('income.title')}}</h1>

  <p v-html="t('income.collect')"></p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'RoundIncome',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    useStore()
    const route = useRoute()

    const round = parseInt(route.params['round'] as string)

    return { t, round }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.round > 1) {
        const lastRound = this.$store.state.rounds[this.round-2]
        if (lastRound && lastRound.turns) {
          return `/round/${this.round-1}/turn/${lastRound.turns.length+1}`
        }
      }
      return ''
    },
    nextButtonRouteTo() : string {
      return `/round/${this.round}/turn/1`
    }
  }
})
</script>
