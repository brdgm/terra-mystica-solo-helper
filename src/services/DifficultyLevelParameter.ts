import DifficultyLevel from "./enum/DifficultyLevel";

export default interface DifficultyLevelParameter {
  difficultyLevel: DifficultyLevel,
  round: DifficultyLevelParameterRound[]
}
export interface DifficultyLevelParameterRound {
  round: number,
  shipLevel: number,
  victoryPoints: number
}