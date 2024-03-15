import Home from "./views/Home";
import TableOfContents from "./views/TableOfContents";

export default [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'Table of Contents',
    path: '/toc',
    element: <TableOfContents />,
  },
]
