<template>
  <h4>{{t('setupGameAutoma.generalSetup')}}</h4>
  <p v-html="t('setupGameAutoma.generalSetupIntro')"></p>
  <ol>
    <li>
      <Icon name="scoring-tile-setup" class="scoring-tile-icon"/>
      <span v-html="t('setupGameAutoma.step1')"></span>
      <div class="mots" v-if="hasMerchantsOfTheSeas">
        <Icon type="expansion" name="merchants-of-the-seas" class="expansionIcon"/>
        <span v-html="t('setupGameAutoma.step1-mots')"></span>
        <Icon name="scoring-tile-mots-icon" class="expansionIcon"/>
      </div>
    </li>
    <li>
      <Icon name="scoring-tile-game-end-token" class="scoring-tile-icon"/>
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
          <Icon type="expansion" name="merchants-of-the-seas" class="expansionIcon"/>
          <span v-html="t('setupGameAutoma.step5c-mots')"></span>
        </li>
        <li v-html="t('setupGameAutoma.step5d')"></li>
        <li v-html="t('setupGameAutoma.step5e')"></li>
        <li v-if="isFactionSymbionts" v-html="t('setupGameAutoma.step5f',{faction:t('botFaction.symbionts')})"></li>
        <li v-if="isFactionBlight" v-html="t('setupGameAutoma.step5f',{faction:t('botFaction.blight')})"></li>
        <li v-if="isFactionGognomes" v-html="t('setupGameAutoma.step5f',{faction:t('botFaction.gognomes')})"></li>
        <li v-html="t('setupGameAutoma.step5g')"></li>
        <li class="mots" v-if="hasMerchantsOfTheSeas">
          <Icon type="expansion" name="merchants-of-the-seas" class="expansionIcon"/>
          <span v-html="t('setupGameAutoma.step5h-mots')"></span>
        </li>
      </ol>
    </li>
    <li v-html="t('setupGameAutoma.step6',{count:bonusCardCount})"></li>
  </ol>

  <h4>{{t('setupGameAutoma.initialDwelling')}}</h4>
  <p v-html="t('setupGameAutoma.initialDwellingIntro')"></p>
  <ol>
    <li v-html="t('setupGameAutoma.initialDwellingPlayer')"></li>
    <li>
      <Icon type="structure" name="marked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialDwellingMarked', {character:randomCard.initialDwellingMarked})"></span>
    </li>
    <li>
      <Icon type="structure" name="unmarked" class="structureIcon"/>&nbsp;<span v-html="t('setupGameAutoma.initialDwellingUnmarked', {character:randomCard.initialDwellingUnmarked})"></span>
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
import Icon from '../structure/Icon.vue'
import BotFaction from '@/services/enum/BotFaction'

export default defineComponent({
  name: 'AutomaSetup',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    hasMerchantsOfTheSeas() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.MERCHANTS_OF_THE_SEAS)
    },
    bonusCardCount() : number {
      return this.$store.state.setup.playerSetup.botCount + this.$store.state.setup.playerSetup.playerCount + 3
    },
    randomCard(): Card {
      const allCards = Cards.getAll()
      const index = rollDice(allCards.length)
      return allCards[index - 1]
    },    
    isFactionSymbionts() : boolean {
      return this.$store.state.setup.playerSetup.botFaction.includes(BotFaction.SYMBIONTS)
    },
    isFactionBlight() : boolean {
      return this.$store.state.setup.playerSetup.botFaction.includes(BotFaction.BLIGHT)
    },
    isFactionGognomes() : boolean {
      return this.$store.state.setup.playerSetup.botFaction.includes(BotFaction.GOGNOMES)
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
.expansionIcon, .structureIcon {
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