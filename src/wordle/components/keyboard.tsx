import { useAppSelector } from "../../hooks/useStore";
import { GuessState, KeyboardKey } from "../store";

export default function Keyboard() {
  const keys = useAppSelector((s) => s.wordle.keyboard)
  const state = useAppSelector((s) => s.wordle.keyState)

  const onKey = (key: KeyboardKey) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: key.key }))
  }

  return (
    <div className="wordle-keyboard">
      { keys.map((row, index) => {
        return (
          <div key={index} className="wordle-keyboard-row">
            { row.map(key => {
              const guess = state.find(s => s.key === key.key)
              const classes = ['wordle-keyboard-key', guess?.guess ? GuessState[guess.guess] : '']
              return (
                <span
                  key={key.key}
                  className={classes.join(' ')}
                  onClick={() => onKey(key)}
                >
                  { key.label ?? key.key }
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
