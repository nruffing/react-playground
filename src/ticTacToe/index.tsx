import "./index.css";
import { reset } from "./store";
import { useAppDispatch } from "../hooks/useStore";
import { SquareState } from "./types";

// https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii

import { useAppSelector } from "../hooks/useStore";
import Board from "./components/board";

export default function TicTacToe() {
  const player = useAppSelector((s) => s.ticTacToe.player);
  const winner = useAppSelector((s) => s.ticTacToe.winner);
  const dispatch = useAppDispatch();

  return <>
    <a href="https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii" target="_blank">Great Frontend</a>
    <div className="centered">
      {winner ? (
        <span>Player {winner === SquareState.EX ? "X" : "O"} wins!</span>
      ) : (
        <span>Player {player === SquareState.EX ? "X" : "O"}'s turn</span>
      )}
      <Board />
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  </>
}
