import { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <NavLink to="/">
        <div className={classes.logo}>PokeDex</div>
      </NavLink>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/pokedex">PokeDex</NavLink>
            </li>
          )}
          
          {isLoggedIn && <li onClick={logoutHandler}>Logout</li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
