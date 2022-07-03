import DifficultyLevel from "@/services/enum/DifficultyLevel"
import PlayerOrder from "@/services/PlayerOrder"
import { Round, RoundTurn, Setup, State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  private readonly playerOrder : PlayerOrder
  readonly round : number
  readonly turn : number
  readonly roundTurn? : RoundTurn

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)

    const roundData = this.getRound(this.round, store)
    this.playerOrder = new PlayerOrder(roundData.turns, setup.playerSetup.playerCount, setup.playerSetup.botCount)

    this.roundTurn = this.getRoundTurn(roundData, this.turn, store)
  }

  private getRound(round : number, store : Store<State>) : Round {
    let roundData = store.state.rounds[round - 1]
    if (!roundData) {
      roundData = {
        round: round,
        turns: []
      }
    }
    return roundData
  }

  private getRoundTurn(roundData : Round, turn : number, store : Store<State>) : RoundTurn|undefined {
    let turnData : |RoundTurn|undefined = roundData.turns[turn - 1]
    if (!turnData) {
      turnData = this.getNextRoundTurn(roundData.round, turn, store)
    }
    return turnData
  }

  private getNextRoundTurn(round : number, turn : number, store : Store<State>) : RoundTurn|undefined {
    const nextPlayer = this.playerOrder.getNextPlayer()
    if (nextPlayer) {
      const turnData = { round : round, turn : turn, player : nextPlayer.player, bot : nextPlayer.bot }
      store.commit('roundTurn', turnData)
      return turnData
    }
    return undefined
  }

}
