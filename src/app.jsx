import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import NavBar from "./components/navBar";

const App = () => {
  const layouts = {
    "/": { component: Main, exact: true, path: "/", name: "Main" },
    "/users": { component: Users, path: "/users", name: "Users" },
    "/login": { component: LogIn, path: "/login", name: "Login" },
  };
  return (
    <>
      <NavBar items={layouts} />
      <Switch>
        {Object.keys(layouts).map((path) => (
          <Route {...layouts[path]} key={path} />
        ))}
      </Switch>
    </>
  );
  // return <Users />;
};

export default App;
