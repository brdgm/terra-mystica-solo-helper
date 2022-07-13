<template>

  <p class="mt-4" v-html="t('playerTurn.text')"></p>

  <button :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4" tag="button" @click="next" :disabled="hasPassed">
    {{t('action.next')}}
  </button>
  <button class="btn btn-outline-danger btn-lg mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#passModal">
    {{t('action.pass')}}
  </button>

  <div class="modal" id="passModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{t('action.pass')}}</h5>
          <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p v-html="t('playerTurn.passConfirm')"></p>
          <p v-html="t('playerTurn.passInfo')"></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" @click="pass" data-bs-dismiss="modal">{{t('action.pass')}}</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import NavigationState from '@/util/NavigationState'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PlayerTurn',
  setup() {
    const { t } = useI18n()
    useStore()
    useRoute()
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
  },
  computed: {
    hasPassed() : boolean|undefined {
      return this.navigationState.roundTurn?.pass
    }
  },
  methods: {
    next() : void {
      this.$router.push(this.nextButtonRouteTo)
    },
    pass() : void {
      const roundTurn = this.navigationState.roundTurn
      if (!roundTurn) {
        return;
      }
      roundTurn.pass = true
      if (!this.navigationState.anyonePassed) {
        roundTurn.startPlayer = true
      }
      this.$store.commit('roundTurn', roundTurn)
      this.$router.push(this.nextButtonRouteTo)
    }
  }
})
</script>
