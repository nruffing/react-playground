import "./styles/App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "./Layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: routes,
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
