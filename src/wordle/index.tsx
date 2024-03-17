import './index.css'

import GuessBoard from './components/guessBoard'
import Keyboard from './components/keyboard'

// https://www.greatfrontend.com/questions/user-interface/wordle

export default function Wordle() {
  return <>
    <a href="https://www.greatfrontend.com/questions/user-interface/wordle" target="_blank">Great Frontend</a>
    <div className="centered wordle">
      <h2>Wordle</h2>
      <div className="separator"></div>
      <GuessBoard />
      <Keyboard />
    </div>
  </>
}
