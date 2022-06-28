import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Users from "./layouts/users";
import Main from "./layouts/main";
import LogIn from "./layouts/login";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import "react-toastify/dist/ReactToastify.css";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
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
            <AuthProvider>
                <NavBar items={layouts} />
                <ProfessionProvider>
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
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
    // return <Users />;
};

export default App;
