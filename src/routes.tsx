import Home from "./home";
import TableOfContents from "./tableOfContents";
import TicTacToe from "./ticTacToe";
import TransferListView from "./transferList";

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
  }
];
