<template>
  <h5 v-html="t('botPass.title')"></h5>
  <ol>
    <li>
      <span v-html="t('botPass.scoringTile')"></span>
      <Icon name="scoring-tile-cult-color" class="scoringTile"/>
    </li>
    <li>
      <span v-html="t('botPass.bonusCard')"></span>
      <Icon type="bonus-card-selection" :name="bonusCardSelection" class="bonusCardSelection"/>
    </li>
    <li v-html="t('botPass.bonusCardGold')"></li>
    <li v-html="t('botPass.removeScoringTile')"></li>
  </ol>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/structure/Icon.vue'
import NavigationState from '@/util/NavigationState'
import BonusCardSelection from '@/services/enum/BonusCardSelection'

export default defineComponent({
  name: 'BotPass',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    bonusCardSelection() : BonusCardSelection {
      return this.navigationState.cardDeck?.supportCard?.bonusCardSelection as BonusCardSelection
    }
  }
})
</script>

<style lang="scss" scoped>
.scoringTile {
  display: block;
  width: 6rem; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 3rem;
}
.bonusCardSelection {
  display: block;
  width: 6rem; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 3rem;
}
</style>
