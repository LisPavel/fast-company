import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import NavBar from "./components/ui/navBar";

const App = () => {
  const layouts = {
    "/": { component: Main, exact: true, path: "/", name: "Main" },
    "/users": { component: Users, path: "/users", name: "Users" },
    "/login": { component: LogIn, path: "/login/:type?", name: "Login" },
  };
  return (
    <>
      <NavBar items={layouts} />
      <Switch>
        {Object.keys(layouts).map((path) => (
          <Route {...layouts[path]} key={path} />
        ))}
        <Redirect to="/" />
      </Switch>
    </>
  );
  // return <Users />;
};

export default App;
