import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";

const App = () => {
    const layouts = {
        "/": { path: "/", name: "Main" },
        "/users": { path: "/users", name: "Users" },
        "/login": { path: "/login/:type?", name: "Login" },
    };
    return (
        <>
            <NavBar items={layouts} />
            <Switch>
                <Route component={Main} exact={true} path="/" />
                <ProfessionProvider>
                    <Route component={Users} path="/users" />
                    <Route component={LogIn} path="/login/:type?" />
                </ProfessionProvider>
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
    // return <Users />;
};

export default App;
