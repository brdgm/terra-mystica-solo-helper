<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="expansionFireAndIce" :checked="hasFireAndIce" @input="toggleFireAndIce">
        <label class="form-check-label" for="expansionFireAndIce">
          <img src="@/assets/icons/expansion/fire-and-ice.png" class="icon"/>
          {{t('expansion.fire-and-ice')}}
        </label>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="expansionMerchantsOfTheSeas" :checked="hasMerchantsOfTheSeas" @input="toggleMerchantsOfTheSeas">
        <label class="form-check-label" for="expansionMerchantsOfTheSeas">
          <img src="@/assets/icons/expansion/merchants-of-the-seas.png" class="icon"/>
          {{t('expansion.merchants-of-the-seas')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'Expansions',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  computed: {
    hasFireAndIce() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.FIRE_AND_ICE)
    },
    hasMerchantsOfTheSeas() : boolean {
      return this.$store.state.setup.expansions.includes(Expansion.MERCHANTS_OF_THE_SEAS)
    }
  },
  methods: {
    toggleFireAndIce() {
      this.$store.commit('setupToggleExpansionFireAndIce')
    },
    toggleMerchantsOfTheSeas() {
      this.$store.commit('setupToggleExpansionMerchantsOfTheSeas')
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 1.5rem;
  width: 2rem;
  object-fit: contain;
}
</style>