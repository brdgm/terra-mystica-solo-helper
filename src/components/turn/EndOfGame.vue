<template>
  <ol>
    <li v-html="t('endOfGame.cultScoring')"></li>
    <li v-html="t('endOfGame.areaScoring')"></li>
    <ul v-if="isStrongholdSancturaryScoring || isSettlementsScoring">
      <li class="fire-ice" v-if="isStrongholdSancturaryScoring">
        <Icon type="expansion" name="fire-and-ice" class="expansionIcon"/>
        <span v-html="t('endOfGame.areaScoringFireIceStrongholdSanctuary')"></span>
      </li>
      <li class="fire-ice" v-if="isSettlementsScoring">
        <Icon type="expansion" name="fire-and-ice" class="expansionIcon"/>
        <span v-html="t('endOfGame.areaScoringFireIceSettlements')"></span>
      </li>
    </ul>
    <li v-html="t('endOfGame.resourceScoring')"></li>
  </ol>
</template>

<script lang="ts">
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: "EndOfGame",
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  computed: {
    isStrongholdSancturaryScoring() : boolean {
      return this.$store.state.setup.finalScoringTile == FinalScoringTile.STRONGHOLD_SANCTUARY
    },
    isSettlementsScoring() : boolean {
      return this.$store.state.setup.finalScoringTile == FinalScoringTile.SETTLEMENTS
    }
  }
})
</script>

<style lang="scss" scoped>
.expansionIcon {
  height: 1.3rem;
}
.fire-ice {
  color: #a1350e;
}
</style>
