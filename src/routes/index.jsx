import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { useEffect, useState } from "react";

const Routes = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/register">
        <Register auth={auth} />
      </Route>
      <Route exact path="/login">
        <Login auth={auth} setAuth={setAuth} />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard auth={auth} setAuth={setAuth} />
      </Route>
      <Route exact path="/">
        <Home auth={auth} />
      </Route>
    </Switch>
  );
};

export default Routes;
