import React from "react";
import { Route, Switch } from "react-router-dom";

function MerchantAccountRoutes () {
    return (
        <Switch>
            <Route exact path="/login">
                <MerchantLoginFrom />
            </Route>
            <Route exact path="/register">
                <NewMerchantForm />
            </Route>
            <Route exact path="/profile">
                <MerchantProfile />
            </Route>
            <Route exact path="/update">
                <UpdateMerchantForm />
            </Route>
            <Route exact path="/cpw">
                <UpdateMerchantPasswordForm />
            </Route>
        </Switch>
    )
}

export default MerchantAccountRoutes;