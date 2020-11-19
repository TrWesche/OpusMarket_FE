import React from "react";
import { Route, Switch } from "react-router-dom";

function ProductManagementRoutes () {
    return (
        <Switch>
            <Route exact path="/">
                <ProductManagementHome />
            </Route>
            <Route exact path="/new">
                <NewProductConfiguration />
            </Route>
            <Route exact path="/view/:productID">
                <ViewProductConfiguration />
            </Route>
            <Route exact path="/update/:productID">
                <UpdateProductConfiguration />
            </Route>
        </Switch>
    )
}

export default ProductManagementRoutes;