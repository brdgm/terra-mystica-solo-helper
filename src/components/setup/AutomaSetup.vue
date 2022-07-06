<template>
  <h4>{{t('setupGameAutoma.generalSetup')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetupIntro')"></p>
  <ol>
    <li>
      <img src="@/assets/icons/scoring-tile-setup.png" class="scoring-tile-icon"/>
      <span v-html="t('setupGameAutoma.step1')"></span>
      <div class="mots" v-if="hasMerchantsOfTheSeas">
        <img src="@/assets/icons/expansion/merchants-of-the-seas.png" class="icon"/>
        <span v-html="t('setupGameAutoma.step1-mots')"></span>
        <img src="@/assets/icons/scoring-tile-mots-icon.png" class="icon"/>
      </div>
    </li>
    <li>
      <img src="@/assets/icons/scoring-tile-game-end-token.png" class="scoring-tile-icon"/>
      <span v-html="t('setupGameAutoma.step2')"></span>
    </li>
    <li v-html="t('setupGameAutoma.step3')"></li>
    <li v-html="t('setupGameAutoma.step4')"></li>
    <li>
      <span v-html="t('setupGameAutoma.step5')"></span>
      <ol type="a">
        <li v-html="t('setupGameAutoma.step5a')"></li>
        <li v-html="t('setupGameAutoma.step5b')"></li>
        <li class="mots" v-if="hasMerchantsOfTheSeas">
          <img src="@/assets/icons/expansion/merchants-of-the-seas.png" class="icon"/>
          <span v-html="t('setupGameAutoma.step5c-mots')"></span>
        </li>
        <li v-html="t('setupGameAutoma.step5d')"></li>
        <li v-html="t('setupGameAutoma.step5e')"></li>
        <li v-html="t('setupGameAutoma.step5f')"></li>
        <li v-html="t('setupGameAutoma.step5g')"></li>
        <li class="mots" v-if="hasMerchantsOfTheSeas">
          <img src="@/assets/icons/expansion/merchants-of-the-seas.png" class="icon"/>
          <span v-html="t('setupGameAutoma.step5h-mots')"></span>
        </li>
      </ol>
    </li>
  </ol>

  <h4>{{t('setupGameAutoma.initialDwelling')}}</h4>
  <p v-html="t('setupGameAutoma.initialDwellingIntro')"></p>
  <ol>
    <li v-html="t('setupGameAutoma.initialDwellingPlayer')"></li>
    <li>
      <img src="@/assets/icons/structure/structure-marked.png" class="icon"/>&nbsp;<span v-html="t('setupGameAutoma.initialDwellingMarked', {character:randomCard.initialDwellingMarked})"></span>
    </li>
    <li>
      <img src="@/assets/icons/structure/structure-unmarked.png" class="icon"/>&nbsp;<span v-html="t('setupGameAutoma.initialDwellingUnmarked', {character:randomCard.initialDwellingUnmarked})"></span>
    </li>
    <li v-html="t('setupGameAutoma.initialDwellingPlayerSecond')"></li>
  </ol>
</template>

<script lang="ts">
import Card from '@/services/Card'
import Cards from '@/services/Cards'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from 'brdgm-commons/src/util/random/rollDice'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'AutomaSetup',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    hasMerchantsOfTheSeas() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.MERCHANTS_OF_THE_SEAS)
    },
    randomCard() : Card {
      const allCards = Cards.getAll()
      const index = rollDice(allCards.length)
      return allCards[index - 1]
    }
  }
})
</script>

<style lang="scss" scoped>
li {
  margin-top: 0.5rem;
  clear: both;
  li {
    margin-top: 0rem;
  }
}
.icon {
  height: 1.5rem;
}
.mots {
  color: #007f93;
}
.scoring-tile-icon {
  float: right;
  height: 6rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>