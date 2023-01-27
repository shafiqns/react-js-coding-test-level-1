import "./App.css";
import Home from "./components/pages/Home";
import PokeDex from "./components/pages/PokeDex";
import AuthForm from "./components/auth/AuhtForm";
import Layout from "./components/layout/Layout";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import ProfilePage from "./components/pages/ProfilePage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={AuthForm} />
          <Route path="/pokedex">
            {authCtx.isLoggedIn && <PokeDex />}
            {!authCtx.isLoggedIn && <Redirect to="/" />}
          </Route>

          {/*<Route path='/profile'>
          {authCtx.isLoggedIn && <ProfilePage />}
          {!authCtx.isLoggedIn && <Redirect to='/' />}
          </Route>*/}

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </div>
      </HashRouter>
    </Layout>
  );
}

export default App;
