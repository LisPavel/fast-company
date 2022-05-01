import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Users from "./components/users";

const App = () => {
  return (
    <Switch>
      <Route path="/users" component={Users} />
      <Redirect from="/" to="/users" />
    </Switch>
  );
  // return <Users />;
};

export default App;
