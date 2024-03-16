import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SquareState } from "./types";

/*
 * Players can take turns to place an X or a O on an N x N board.
 * A player wins if M of their marks are in a horizontal, vertical, or diagonal row.
 * Display the current game status at the top: whose turn it is, winner (if any), or draw.
 * Add a "Reset" button to allow the game to be restarted at any time.
 */
const N = 5;
const M = 4;

function getDefaultBoardState() {
  return Array<Array<SquareState>>(N)
    .fill(Array<SquareState>(N))
    .map((s) => s.fill(SquareState.BLANK));
}

interface TicTacToeState {
  N: number;
  M: number;
  state: SquareState[][];
  player: SquareState;
  winner: SquareState | undefined;
}

interface SetSquarePayload {
  row: number;
  col: number;
}

const initialState: TicTacToeState = {
  N,
  M,
  state: getDefaultBoardState(),
  player: SquareState.EX,
  winner: undefined,
};

function checkVector(vector: SquareState[], player: SquareState): boolean {
  let count = 0;
  for (var item of vector) {
    if (item === player) {
      count++;
      if (count === M) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  return false;
}

function checkWin(state: SquareState[][], row: number, col: number): boolean {
  const player = state[row][col];

  if (checkVector(state[row], player)) {
    return true;
  }

  const vertical = [];
  for (const row of state) {
    vertical.push(row[col]);
  }
  if (checkVector(vertical, player)) {
    return true;
  }

  const diagonal = [];
  let rowIndex = row >= col ? row - col : 0;
  let colIndex = col >= row ? col - row : 0;
  for (; rowIndex < N && colIndex < N; rowIndex++, colIndex++) {
    diagonal.push(state[rowIndex][colIndex]);
  }
  if (diagonal.length >= M && checkVector(diagonal, player)) {
    return true;
  }

  return false;
}

const slice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setSquare: (
      state: TicTacToeState,
      action: PayloadAction<SetSquarePayload>,
    ) => {
      if (
        !!state.winner ||
        state.state[action.payload.row][action.payload.col] !==
          SquareState.BLANK
      ) {
        return;
      }

      state.state[action.payload.row][action.payload.col] = state.player;
      if (checkWin(state.state, action.payload.row, action.payload.col)) {
        state.winner = state.player;
      } else {
        state.player =
          state.player === SquareState.EX ? SquareState.OH : SquareState.EX;
      }
    },
    reset: (state: TicTacToeState) => {
      state.state = getDefaultBoardState();
      state.player = SquareState.EX;
      state.winner = undefined;
    },
  },
});

export const { setSquare, reset } = slice.actions;
export default slice.reducer;
