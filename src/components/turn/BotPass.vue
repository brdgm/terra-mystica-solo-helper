<template>
  <p>Automa <b>passes</b>.</p>
  <ol>
    <li>
      <span>Automa gains a <b>fixed number of Victory points</b> as shown in the lower right corner of the current Scoring tile.</span>
      <Icon name="scoring-tile-cult-color" class="scoringTile"/>
    </li>
    <li>
      <span>Automa takes a <b>Bonus card</b>:</span>
      <Icon type="bonus-card-selection" :name="bonusCardSelection" class="bonusCardSelection"/>
    </li>
    <li>If there are any coins on the Bonus card return them to the general supply.</li>
    <li>Remove current scoring tile from board.</li>
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
