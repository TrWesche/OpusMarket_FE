import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home"

import UserAccountRoutes from "./userAccountRoutes";
import MerchantRoutes from "./merchantRoutes";
import CatalogRoutes from "./catalogRoutes";
import PurchaseRoutes from "./purchaseRoutes";


import MerchantAccountRoutes from "./merchantAccountRoutes";
import ProductManagementRoutes from "./productManagementRoutes";
import GatheringManagementRoutes from "./gatheringManagementRoutes";

function Routes () {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/uac">
                <UserAccountRoutes />
            </Route>
            <Route exact path="/catalog">
                <CatalogRoutes />
            </Route>
            <Route exact path="/merchants">
                <MerchantRoutes />
            </Route>
            <Route exact path="/p">
                <PurchaseRoutes />
            </Route>
            <Route exact path="/mac">
                <MerchantAccountRoutes />
            </Route>
            <Route exact path="/pman">
                <ProductManagementRoutes />
            </Route>
            <Route exact path="/gman">
                <GatheringManagementRoutes />
            </Route>
        </Switch>
    )
}

export default Routes;