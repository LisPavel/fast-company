import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualitiesProvider } from "./hooks/useQualities";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
    const layouts = {
        "/": { component: Main, exact: true, path: "/", name: "Main" },
        "/users": {
            component: Users,
            path: "/users",
            name: "Users",
            onLoggedIn: true,
        },
        "/login": {
            component: LogIn,
            path: "/login/:type?",
            name: "Login",
            onLoggedIn: false,
        },
    };
    return (
        <>
            <AuthProvider>
                <NavBar items={layouts} />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            {Object.keys(layouts).map((path) => (
                                <Route {...layouts[path]} key={path} />
                            ))}
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
    // return <Users />;
};

export default App;
