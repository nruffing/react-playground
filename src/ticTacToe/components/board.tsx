import { useAppSelector } from "../../hooks/useStore";
import Square from "./square";

export default function Board() {
  const boardState = useAppSelector((s) => s.ticTacToe.state);
  const boardSize = useAppSelector((s) => s.ticTacToe.N);

  var squares = [];
  for (var row = 0; row < boardState.length; row++) {
    for (var col = 0; col < boardState.length; col++) {
      squares.push(<Square key={`${row}${col}`} row={row} col={col} />);
    }
  }

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
    >
      {squares}
    </div>
  );
}
