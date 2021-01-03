import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import OrderHome from '../../components/Order/OrderHome';
import theme from "../../theme";
import orderList from "../../reducers/orderList";

import { createStore } from "redux"

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-redux"),
//     useParams: jest.fn,
//     useHistory: jest.fn
// }))

// const initStoreEmpty = {
    // orderList:{
    //     orders: [
    //         {}
    //     ]
    // },
// }

const initStoreFilled = {
    orderList:{
        orders: [
            {id: 1, order_total: 1000, order_status: "created", status_dt: "2020-11-21T20:00:00.000Z"}
        ]
    },
}

const createTestStore = (setStoreState) => {
    const store = createStore(orderList, setStoreState);
    return store;
}

const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <OrderHome />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store);
    const orderTotal = screen.getByText("Order Total: $10");
    const orderStatus = screen.getByText(/created/i);
    const pageTitle = screen.getByText(/Order History/i);

    expect(orderTotal).toBeInTheDocument();
    expect(orderStatus).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
})