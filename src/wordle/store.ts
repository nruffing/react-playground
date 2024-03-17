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
  charCode?: number,
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
  guess?: GuessState,
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
]

export interface WordleState {
  target: string,
  guesses: BoardSquare[],
  keyboard: KeyboardKey[][],
}

const initialState = {
  target: getRandomTarget(),
  guesses: getDefaultBoardState(),
  keyboard: getDefaultKeyboardState(),
}

const slice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    reset: (state: WordleState) => {
      state.target = getRandomTarget()
      state.guesses = getDefaultBoardState()
      state.keyboard = getDefaultKeyboardState()
    }
  }
})

export const { reset } = slice.actions;
export default slice.reducer;
