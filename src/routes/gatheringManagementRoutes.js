import React from "react";
import { Route, Switch } from "react-router-dom";

function GatheringManagementRoutes () {
    return (
        <Switch>
            <Route exact path="/">
                <GatheringManagementHome />
            </Route>
            <Route exact path="/new">
                <NewGatheringConfiguration />
            </Route>
            <Route exact path="/view/:gatheringID">
                <ViewGatheringConfiguration />
            </Route>
            <Route exact path="/update/:gatheringID">
                <UpdateGatheringConfiguration />
            </Route>
        </Switch>
    )
}

export default GatheringManagementRoutes;