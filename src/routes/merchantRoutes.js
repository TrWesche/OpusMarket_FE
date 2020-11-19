import React from "react";
import { Route, Switch } from "react-router-dom";

import MerchantHome from "../components/Merchant/MerchantHome";
import MerchantAbout from "../components/Merchant/MerchantAbout";
import MerchantStore from "../components/Merchant/MerchantStore";
import MerchantEvents from "../components/Merchant/MerchantEvents";

function MerchantRoutes () {
    return (
        <Switch>
            <Route exact path="/:merchantID">
                <MerchantHome />
            </Route>
            <Route exact path="/:merchantID/about">
                <MerchantAbout />
            </Route>
            <Route exact path="/:merchantID/store">
                <MerchantStore />
            </Route>
            <Route exact path="/:merchantID/events">
                <MerchantEvents />
            </Route>
        </Switch>
    )
}

export default MerchantRoutes;