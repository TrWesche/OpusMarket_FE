import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home"
import PageNotFound from "../components/NotFound/PageNotFound";

import UserAccountRoutes from "./userAccountRoutes";
import MerchantRoutes from "./merchantRoutes";
import CatalogRoutes from "./catalogRoutes";
import PurchaseRoutes from "./purchaseRoutes";
import OrderRoutes from "./orderRoutes";

import MerchantAccountRoutes from "./merchantAccountRoutes";
import ProductManagementRoutes from "./productManagementRoutes";
import GatheringManagementRoutes from "./gatheringManagementRoutes";


import routeConstructor from "../utils/routeConstructor";


function Routes () {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            {routeConstructor(UserAccountRoutes)};
            {routeConstructor(MerchantRoutes)};
            {routeConstructor(CatalogRoutes)};
            {routeConstructor(PurchaseRoutes)};
            {routeConstructor(OrderRoutes)};
            {routeConstructor(MerchantAccountRoutes)};
            {routeConstructor(ProductManagementRoutes)};
            {routeConstructor(GatheringManagementRoutes)};

            <Route path="/">
                <PageNotFound />
            </Route>
        </Switch>
    )
}

export default Routes;