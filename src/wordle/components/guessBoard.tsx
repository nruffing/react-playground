import { useAppSelector } from "../../hooks/useStore";
import { WordSize } from "../store"
import GuessSquare from "./guessSquare"

export default function GuessBoard() {
  const state = useAppSelector((s) => s.wordle.guesses)

  let index = 0
  const squares = state.map(s => {
    return <GuessSquare key={index++} state={s} />
  })

  return (
    <div className="wordle-board" style={{ gridTemplateColumns: `repeat(${WordSize}, 1fr)`}}>
      { squares }
    </div>
  )
}
