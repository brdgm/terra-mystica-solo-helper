<template>

  <p>Bot turn ...</p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'BotTurn',
  setup() {
    const { t } = useI18n()
    useStore()

    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    nextButtonRouteTo: {
      type: String,
      required: true
    }
  }
})
</script>
