import React from "react";
import { Route, Switch } from "react-router-dom";
import CatalogHome from "../components/Catalog/CatalogHome";
import ProductDetail from "../components/Product/ProductDetail";

function CatalogRoutes () {
    return (
        <Switch>
            <Route exact path="/">
                <CatalogHome />
            </Route>
            <Route exact path="/product/:productID">
                <ProductDetail />
            </Route>
        </Switch>
    )
}

export default CatalogRoutes;