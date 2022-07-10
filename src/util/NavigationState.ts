import * as _ from "lodash"
import BotFaction from "@/services/enum/BotFaction"
import DifficultyLevel from "@/services/enum/DifficultyLevel"
import PlayerOrder from "@/services/PlayerOrder"
import { Round, RoundTurn, State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import CardDeck from "@/services/CardDeck"
import Player from "@/services/Player"
import Expansion from "@/services/enum/Expansion"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  private readonly playerOrder : PlayerOrder
  readonly anyonePassed : boolean
  readonly round : number
  readonly turn : number
  readonly roundTurn? : RoundTurn
  readonly botFaction? : BotFaction
  readonly cardDeck? : CardDeck

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)

    const roundData = this.getRound(this.round, store)
    this.playerOrder = new PlayerOrder(roundData.turns.slice(0, this.turn), setup.playerSetup.playerCount, setup.playerSetup.botCount)
    this.anyonePassed = this.playerOrder.hasAnyonePassed()

    this.roundTurn = _.cloneDeep(this.getRoundTurn(roundData, this.turn, store))
    if (this.roundTurn?.bot) {
      this.botFaction = setup.playerSetup.botFaction[this.roundTurn?.bot - 1]
    }
    if (this.roundTurn?.cardDeck) {
      this.cardDeck = CardDeck.fromPersistence(this.roundTurn?.cardDeck)
    }
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
      turnData = this.createNextRoundTurn(roundData.round, turn, store)
    }
    return turnData
  }

  private createNextRoundTurn(round : number, turn : number, store : Store<State>) : RoundTurn|undefined {
    let nextPlayer
    let startPlayer = false
    // if this is 1st turn detect start player for new game, or from previous round
    if (turn == 1) {
      if (round == 1) {
        nextPlayer = this.playerOrder.getStartPlayer()
      }
      else {
        const previousRound = store.state.rounds[round-2]
        if (previousRound) {
          const playerOrderPreviousRound = new PlayerOrder(previousRound.turns, this.playerCount, this.botCount)
          nextPlayer = playerOrderPreviousRound.getStartPlayer()
        }
      }
      startPlayer = true
    }
    if (!nextPlayer) {
      // otherwise get next player in player order that did not pass
      nextPlayer = this.playerOrder.getNextPlayer()
    }
    if (nextPlayer) {
      startPlayer = startPlayer || this.playerOrder.getStartPlayer().is(nextPlayer)
      const turnData : RoundTurn = { round : round, turn : turn, player : nextPlayer.player, bot : nextPlayer.bot }
      if (startPlayer) {
        turnData.startPlayer = startPlayer
      }
      if (turnData.bot) {
        const cardDeck = this.createCardDeck(round, nextPlayer, store);
        if (cardDeck.isPass()) {
          turnData.pass = true
          if (!this.playerOrder.hasAnyonePassed()) {
            turnData.startPlayer = true
          }
        }
        turnData.cardDeck = cardDeck.toPersistence()
      }
      store.commit('roundTurn', turnData)
      return turnData
    }
    return undefined
  }

  private createCardDeck(round : number, player : Player, store : Store<State>) : CardDeck {
    let cardDeck

    // get card deck from last turn in current round and draw a new card
    let turnData = this.playerOrder.getLastTurn(player)
    if (turnData && turnData.cardDeck) {
      cardDeck = CardDeck.fromPersistence(turnData.cardDeck)
      cardDeck.draw()
      return cardDeck
    }

    // get card deck from previous round and prepare for new round
    const hasMerchantsOfTheSeas = store.state.setup.expansions.includes(Expansion.MERCHANTS_OF_THE_SEAS)
    if (round > 1) {
      const previousRound = store.state.rounds[round-2]
      if (previousRound) {
        const playerOrderPreviousRound = new PlayerOrder(previousRound.turns, this.playerCount, this.botCount)
        turnData = playerOrderPreviousRound.getLastTurn(player)
        if (turnData && turnData.cardDeck) {
          cardDeck = CardDeck.fromPersistence(turnData.cardDeck)
          cardDeck.prepareForNextRound(round, hasMerchantsOfTheSeas)
          cardDeck.draw()
          return cardDeck
        }
      }
    }

    // prepare new card deck
    cardDeck = CardDeck.new(store.state.setup.difficultyLevel, hasMerchantsOfTheSeas)
    cardDeck.draw()
    return cardDeck
  }

}
