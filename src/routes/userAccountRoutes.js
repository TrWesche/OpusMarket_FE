import React from "react";
import { Route, Switch } from "react-router-dom";
import UserLoginFrom from "../components/User/UserLoginForm";
import NewUserForm from "../components/User/NewUserForm";
import UserProfile from "../components/User/UserProfile";
import UpdateUserForm from "../components/User/UpdateUserForm";
import UpdateUserPasswordForm from "../components/User/UpdateUserPasswordForm";


function UserAccountRoutes () {
    return (
        <Switch>
            <Route exact path="/login">
                <UserLoginFrom />
            </Route>
            <Route exact path="/register">
                <NewUserForm />
            </Route>
            <Route exact path="/profile">
                <UserProfile />
            </Route>
            <Route exact path="/update">
                <UpdateUserForm />
            </Route>
            <Route exact path="/cpw">
                <UpdateUserPasswordForm />
            </Route>
        </Switch>
    )
}

export default UserAccountRoutes;