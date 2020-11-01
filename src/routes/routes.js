import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home"
import Catalog from "../components/Catalog/Catalog"

function Routes () {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/c">
                <Catalog />
            </Route>
            <Route exact path="/c/:dept">

            </Route>
        </Switch>
    )
}

export default Routes;