import { NavLink } from "react-router-dom";
import routes from "../routes";

export default function Home() {
  return (
    <ul>
      {
        routes.map((route) => {
          return (
            <li key={route.path}><NavLink to={route.path}>{route.name}</NavLink></li>
          );
        })
      }
    </ul>
  );
}
