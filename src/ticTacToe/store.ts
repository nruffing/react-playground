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
  message: string;
}

interface SetSquarePayload {
  row: number;
  col: number;
  value: SquareState;
}

const initialState: TicTacToeState = {
  N,
  M,
  state: getDefaultBoardState(),
  message: "Welcome!",
};

const slice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    setSquare: (
      state: TicTacToeState,
      action: PayloadAction<SetSquarePayload>,
    ) => {
      state.state[action.payload.row][action.payload.col] =
        action.payload.value;
    },
    reset: (state: TicTacToeState) => {
      state.state = getDefaultBoardState();
    },
  },
});

export const { setSquare, reset } = slice.actions;
export default slice.reducer;
