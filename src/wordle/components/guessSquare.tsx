import { GuessState, type BoardSquare } from "../store";

export interface GuessSquareProps {
  state: BoardSquare
}

export default function GuessSquare({ state }: GuessSquareProps) {
  const classes = ['guess-square', GuessState[state.guess]]

  return (
    <span className={classes.join(' ')}>
      { state.charCode ?  String.fromCharCode(state.charCode) : '' }
    </span>
  )
}
