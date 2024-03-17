import { useAppSelector } from "../../hooks/useStore";

export default function Keyboard() {
  const state = useAppSelector((s) => s.wordle.keyboard)

  return (
    <div className="wordle-keyboard">
      { state.map((row, index) => {
        return (
          <div key={index} className="wordle-keyboard-row">
            { row.map(key => {
              return (
                <span key={key.key} className="wordle-keyboard-key">{ key.label ?? key.key }</span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
