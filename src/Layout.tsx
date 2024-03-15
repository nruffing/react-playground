import routes from './routes';
import { NavLink, Outlet } from 'react-router-dom';

export default function () {
  return (
    <>
      <nav>
        {
          routes.map((route) => {
            return (
              <NavLink key={route.path} to={route.path}>{route.name}</NavLink>
            );
          })
        }
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
