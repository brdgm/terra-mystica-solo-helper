import BotFaction from '@/services/enum/BotFaction'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import toggleArrayItem from 'brdgm-commons/src/util/array/toggleArrayItem'
import FinalScoringTile from '@/services/enum/FinalScoringTile'
import { name } from '@/../package.json'

const LOCALSTORAGE_KEY = `${name}.store`

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
  finalScoringTile: FinalScoringTile
  playerSetup: PlayerSetup
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  botFaction: BotFaction[]
}
export interface Round {
  round: number
  turns: RoundTurn[]
}
export interface RoundTurn {
  round: number
  turn: number
  player?: number
  bot?: number
  startPlayer?: boolean
  pass?: boolean
  cardDeck?: CardDeckPersistence
}
export interface CardDeckPersistence {
  deck: string[]
  reserve: string[]
  discard: string[]
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
    baseFontSize: 1.0,
    setup: {
      difficultyLevel: DifficultyLevel.AUTOMALEIN,
      expansions: [],
      finalScoringTile: FinalScoringTile.DEFAULT,
      playerSetup: {
        playerCount: 1,
        botCount: 1,
        botFaction: [BotFaction.SIMPLETONS]
      }
    },
    rounds: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupToggleExpansionFireAndIce(state : State) {
      toggleArrayItem(state.setup.expansions, Expansion.FIRE_AND_ICE)
      if (!state.setup.expansions.includes(Expansion.FIRE_AND_ICE)) {
        state.setup.finalScoringTile = FinalScoringTile.DEFAULT
      }
    },
    setupToggleExpansionMerchantsOfTheSeas(state : State) {
      toggleArrayItem(state.setup.expansions, Expansion.MERCHANTS_OF_THE_SEAS)
    },
    setupFinalScoringTile(state : State, finalScoringTile : FinalScoringTile) {
      state.setup.finalScoringTile = finalScoringTile
    },
    setupPlayer(state : State, playerSetup: PlayerSetup) {
      state.setup.playerSetup = playerSetup
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    roundTurn(state : State, roundTurn : RoundTurn) {
      let round = state.rounds[roundTurn.round - 1]
      if (!round) {
        round = {
          round : roundTurn.round,
          turns: []
        }
      }
      round.turns[roundTurn.turn - 1] = roundTurn
      // delete all "future" turns
      round.turns = round.turns.slice(0, roundTurn.turn)
      state.rounds[roundTurn.round - 1] = round
    },
    resetGame(state : State) {
      state.rounds = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
