import './index.css'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../hooks/useStore"
import { onKey, reset } from './store'
import GuessBoard from './components/guessBoard'
import Keyboard from './components/keyboard'

// https://www.greatfrontend.com/questions/user-interface/wordle

export default function Wordle() {
  const complete = useAppSelector((s) => s.wordle.complete)
  const dispatch = useAppDispatch()

  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key?.toUpperCase()
    if (key.match(/^[A-Z]{1}$/)) {
      dispatch(onKey(key))
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return <>
    <a href="https://www.greatfrontend.com/questions/user-interface/wordle" target="_blank">Great Frontend</a>
    <div className="centered wordle">
      <h2>Wordle</h2>
      <div className="separator"></div>
      <GuessBoard />
      <Keyboard />
      { complete 
        ? <button onClick={() => dispatch(reset())}>Reset</button>
        : null }
    </div>
  </>
}
