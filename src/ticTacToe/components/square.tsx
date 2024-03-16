import { useAppSelector, useAppDispatch } from "../../hooks/useStore";
import { SquareState } from "../types";
import { setSquare } from "../store";

export default function Square({ row, col }: { row: number; col: number }) {
  const squareState = useAppSelector((s) => s.ticTacToe.state[row][col]);
  const boardSize = useAppSelector((s) => s.ticTacToe.N);
  const dispatch = useAppDispatch();

  const classes = [];
  if (row === 0) {
    classes.push("row-start");
  } else if (row === boardSize - 1) {
    classes.push("row-end");
  }

  if (col === 0) {
    classes.push("col-start");
  } else if (col === boardSize - 1) {
    classes.push("col-end");
  }

  if (squareState === SquareState.EX) {
    classes.push("ex");
  } else if (squareState === SquareState.OH) {
    classes.push("oh");
  }

  function onClick() {
    dispatch(setSquare({ col, row, value: SquareState.EX }));
  }

  return <span className={classes.join(" ")} onClick={onClick}></span>;
}
