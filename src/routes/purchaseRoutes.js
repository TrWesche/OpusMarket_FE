import React from "react";
import { Route, Switch } from "react-router-dom";

function PurchaseRoutes () {
    return (
        <Switch>
            <Route exact path="/cart">
                <CartHome />
            </Route>
            <Route exact path="/cart/destination">
                <SquareDelivery />
            </Route>
            <Route exact path="/cart/payment">
                <SquarePayment />
            </Route>
            <Route exact path="/order/:orderID">
                <OrderDetails />
            </Route>
            <Route exact path="/order-history">
                <OrderHome />
            </Route>
        </Switch>
    )
}

export default PurchaseRoutes;


// https://developer.squareup.com/blog/online-payments-form-react/

// https://github.com/square/react-square-payment-form