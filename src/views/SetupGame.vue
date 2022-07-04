<template>
  <h1>{{t('setup.title')}}</h1>

  <Players/>
  <DifficultyLevel/>
  <Expansions/>

  <router-link to="/setupGameAutoma" class="btn btn-primary btn-lg mt-4">
    {{t('setupGameAutoma.title')}}
  </router-link>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Players from '@/components/setup/Players.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import Expansions from '@/components/setup/Expansions.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    Players,
    DifficultyLevel,
    Expansions,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
