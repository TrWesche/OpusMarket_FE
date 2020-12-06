import { Route } from "react-router-dom";


export default function routeConstructor (routeDefinitionObj) {
    

    const output = routeDefinitionObj.map(route => (
        <Route
            key={route.path}
            path={route.path}
            component={route.component}
            exact={route.exact}
        />
    ));
    return output;
}