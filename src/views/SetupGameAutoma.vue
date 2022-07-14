<template>
  <h1>{{t('setupGameAutoma.title')}}</h1>

  <AutomaSetup/>

  <router-link to="/round/1/income" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </router-link>

  <FooterButtons backButtonRouteTo="/setupGame"  endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import AutomaSetup from '@/components/setup/AutomaSetup.vue'

export default defineComponent({
  name: 'SetupGameAutoma',
  components: {
    AutomaSetup,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
