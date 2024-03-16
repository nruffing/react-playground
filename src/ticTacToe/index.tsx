import "./index.css";
import { reset } from "./store";
import { useAppDispatch } from "../hooks/useStore";

// https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii

import { useAppSelector } from "../hooks/useStore";
import Board from "./components/board";

export default function TicTacToe() {
  const message = useAppSelector((s) => s.ticTacToe.message);
  const dispatch = useAppDispatch();

  return (
    <>
      {message ? <span>{message}</span> : null}
      <Board />
      <button onClick={() => dispatch(reset())}>Reset</button>
    </>
  );
}
