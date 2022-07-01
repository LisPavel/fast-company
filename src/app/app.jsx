import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import "react-toastify/dist/ReactToastify.css";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
    const layouts = {
        "/": { component: Main, exact: true, path: "/", name: "Main" },
        "/users": {
            component: Users,
            path: "/users/:id?",
            name: "Users",
            onLoggedIn: true,
            protected: true,
        },
        "/login": {
            component: LogIn,
            path: "/login/:type?",
            name: "Login",
            onLoggedIn: false,
        },
        "/logout": {
            component: LogOut,
            path: "/logout",
        },
    };
    return (
        <>
            <AppLoader>
                <AuthProvider>
                    <NavBar items={layouts} />
                    <Switch>
                        {Object.keys(layouts).map((path) =>
                            layouts[path].protected ? (
                                <ProtectedRoute {...layouts[path]} key={path} />
                            ) : (
                                <Route {...layouts[path]} key={path} />
                            )
                        )}
                        <Redirect to="/" />
                    </Switch>
                </AuthProvider>
            </AppLoader>
            <ToastContainer />
        </>
    );
    // return <Users />;
};

export default App;
