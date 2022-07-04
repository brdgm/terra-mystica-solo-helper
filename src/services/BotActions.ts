import BotAction from "./BotAction"
import Card from "./Card"
import { DifficultyLevelParameterRound } from "./DifficultyLevelParameter"
import DifficultyLevelParameters from "./DifficultyLevelParameters"
import Action from "./enum/Action"
import BotFaction from "./enum/BotFaction"
import DifficultyLevel from "./enum/DifficultyLevel"

/**
 * Determines actions and parameterization based on current action and support card.
 * Faction actions are resolved, dynamic ship level and victory points as well.
 */
export default class BotActions {

  private readonly _actions : BotAction[]
  private readonly _dlParams : DifficultyLevelParameterRound

  constructor(actionCard : Card, supportCard : Card, round : number,
        botFaction : BotFaction, difficultyLevel : DifficultyLevel) {
    this._dlParams = DifficultyLevelParameters.get(difficultyLevel, round)
    this._actions = actionCard.actions
        .flatMap(action => this.toBotActions(action, actionCard, supportCard, round, botFaction))
  }

  public get actions() : readonly BotAction[] {
    return this._actions
  }

  private toBotActions(action : Action, actionCard : Card, supportCard : Card,
        round : number, botFaction : BotFaction) : BotAction[] {
    let result
    
    if (action == Action.FACTION_ACTION) {
      result = this.getFactionBotActions(action, botFaction)
    }
    else {
      result = [{action: action}]
    }

    // apply defaults from support card
    result.forEach(botAction => {
      botAction.shipLevel = botAction.shipLevel || actionCard.shipLevel || this._dlParams.shipLevel
      botAction.tradeMinRound = botAction.tradeMinRound || actionCard.tradeMinRound
      botAction.victoryPointsDifficultyLevel = botAction.victoryPointsDifficultyLevel || actionCard.victoryPointsDifficultyLevel
      if (!botAction.victoryPoints && botAction.victoryPointsDifficultyLevel) {
        botAction.victoryPoints = this._dlParams.victoryPoints
        botAction.victoryPointsDifficultyLevel = undefined
      }
      botAction.structure = botAction.structure || supportCard.structure
      botAction.terrainPriority = botAction.terrainPriority || supportCard.terrainPriority
      botAction.directionalSelection = botAction.directionalSelection || supportCard.directionalSelection
      botAction.directionalSelectionCount = botAction.directionalSelectionCount || supportCard.directionalSelectionCount
      botAction.cultTrackSelection = botAction.cultTrackSelection || supportCard.cultTrackSelection
    })

    // filter out actions not relevant for current round
    return result.filter(botAction => (botAction.action != Action.TAKE_FAVOR_TILE || round >= 5)
        && (botAction.action != Action.TRADE || round >= (botAction.tradeMinRound || 0)))
  }

  private getFactionBotActions(action : Action, botFaction : BotFaction) : BotAction[] {
    switch (botFaction) {
      case BotFaction.SIMPLETONS:
        return [
          {action: Action.TRANSFORM_AND_BUILD},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.KUDDLERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.KUDDLERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.DRUIDS:
        return [
          {action: Action.TRANSFORM_AND_BUILD},
          {action: Action.ADVANCE_CULT_TRACK, botFaction: BotFaction.DRUIDS}
        ]
      case BotFaction.RACELINGS:
        return [
          {action: Action.TRANSFORM_AND_BUILD}
        ]
      case BotFaction.WANDERERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.WANDERERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1}
        ]
      case BotFaction.MIMICS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.MIMICS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.POWERMONGERS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.POWERMONGERS},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 2}
        ]
      case BotFaction.SYMBIONTS:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.SYMBIONTS}
        ]
      case BotFaction.BLIGHT:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.BLIGHT},
          {action: Action.GAIN_VICTORY_POINTS, victoryPoints: 1}
        ]
      case BotFaction.GOGNOMES:
        return [
          {action: Action.TRANSFORM_AND_BUILD, botFaction: BotFaction.GOGNOMES}
        ]
      default:
        throw new Error('Invalid bot faction: ' + botFaction)
    }
  }

}
