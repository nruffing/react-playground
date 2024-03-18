import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const WordSize = 5
export const NumGuesses = 6

const WORDS = Object.freeze([
  'APPLE',
  'BEAST',
  'FAINT',
  'FEAST',
  'FRUIT',
  'GAMES',
  'PAINT',
  'PASTE',
  'TOWER',
  'REACT',
])

let wordsLeft = [...WORDS]

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomTarget() {
  if (!wordsLeft?.length) {
    throw new Error('out of words to play')
  }
  const index = getRandomInt(wordsLeft.length - 1)
  const target = wordsLeft[index]
  wordsLeft = wordsLeft.filter(w => w !== target)
  return target
}

export enum GuessState {
  DEFAULT = 0,
  CORRECT = 1,
  PRESENT = 2,
  ABSENT = 3,
}

export interface BoardSquare {
  key?: string,
  guess: GuessState,
}

function getDefaultBoardState() {
  return Array<BoardSquare>(WordSize * NumGuesses)
    .fill({ guess: GuessState.DEFAULT })
    .map(s => { return { ...s } })
}

export interface KeyboardKey {
  key: string,
  label?: string,
}

export interface KeyboardKeyState {
  key: string,
  guess: GuessState,
}
 
const getDefaultKeyboardState = () => [
  [
    { key: 'Q' },
    { key: 'W' },
    { key: 'E' },
    { key: 'R' },
    { key: 'T' },
    { key: 'Y' },
    { key: 'U' },
    { key: 'I' },
    { key: 'O' },
    { key: 'P' },
  ],
  [
    { key: 'A' },
    { key: 'S' },
    { key: 'D' },
    { key: 'F' },
    { key: 'G' },
    { key: 'H' },
    { key: 'J' },
    { key: 'K' },
    { key: 'L' },
  ],
  [
    { key: 'Enter', label: 'ENTER' },
    { key: 'Z' },
    { key: 'X' },
    { key: 'C' },
    { key: 'V' },
    { key: 'B' },
    { key: 'N' },
    { key: 'M' },
    { key: 'Backspace', label: 'DEL' },
  ]
] as KeyboardKey[][]

export interface WordleState {
  target: string,
  guesses: BoardSquare[],
  guessIndex: number,
  keyboard: KeyboardKey[][],
  keyState: KeyboardKeyState[],
  currentWord: string,
  complete: boolean,
}

const initialState = {
  target: getRandomTarget(),
  guesses: getDefaultBoardState(),
  guessIndex: 0,
  keyboard: getDefaultKeyboardState(),
  keyState: [] as KeyboardKeyState[],
  currentWord: '',
  complete: false,
}

const slice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    reset: (state: WordleState) => {
      state.target = getRandomTarget()
      state.guesses = getDefaultBoardState()
      state.keyboard = getDefaultKeyboardState()
      state.keyState = [] as KeyboardKeyState[],
      state.currentWord = ''
      state.complete = false
    },
    onKey(state: WordleState, action: PayloadAction<string>) {
      if (state.complete) {
        return
      }

      const guess = state.guesses[state.guessIndex]
      guess.key = action.payload
      let keyState = state.keyState.find(s => s.key === action.payload)
      if (!keyState) {
        keyState = { key: action.payload, guess: GuessState.CORRECT }
        state.keyState.push(keyState)
      }

      const colIndex = state.guessIndex % WordSize
      if (state.target.substring(colIndex, colIndex + 1) === guess.key) {
        keyState.guess = GuessState.CORRECT
        guess.guess = GuessState.CORRECT
      } else if (state.target.includes(guess.key)) {
        keyState.guess = GuessState.PRESENT
        guess.guess = GuessState.PRESENT
      } else {
        keyState.guess = GuessState.ABSENT
        guess.guess = GuessState.ABSENT
      }
      
      if (colIndex === 0) {
        state.currentWord = guess.key
      } else {
        state.currentWord +=  guess.key
      }

      if (state.currentWord === state.target ||
        state.guessIndex === state.guesses.length - 1) {
        state.complete = true
        return
      }

      state.guessIndex++
    },
  }
})

export const { reset, onKey } = slice.actions;
export default slice.reducer;
