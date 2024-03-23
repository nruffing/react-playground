import DeepClone from "./deepClone";
import Home from "./home";
import TableOfContents from "./tableOfContents";
import TicTacToe from "./ticTacToe";
import TransferListView from "./transferList";
import UndoableCounter from "./undoableCounter";
import Wordle from "./wordle";

export default [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Table of Contents",
    path: "/toc",
    element: <TableOfContents />,
  },
  {
    name: "Tic-Tac-Toe",
    path: "/tic-tac-toe",
    element: <TicTacToe />,
  },
  {
    name: "Transfer List",
    path: "transfer-list",
    element: <TransferListView />
  },
  {
    name: "Wordle",
    path: "wordle",
    element: <Wordle />
  },
  {
    name: "DeepClone",
    path: "deep-clone",
    element: <DeepClone />,
  },
  {
    name: "Undoable Counter",
    path: "undoable-counter",
    element: <UndoableCounter />
  },
];
