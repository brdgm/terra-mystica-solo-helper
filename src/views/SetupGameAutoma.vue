<template>
  <h1>{{t('setupGameAutoma.title')}}</h1>

  <AutomaSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame">
    {{t('action.startGame')}}
  </button>

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
  },
  methods: {
    startGame() : void {
      this.$store.commit('resetGame')
      this.$router.push('/round/1/income')
    }
  }
})
</script>
