import React from 'react';
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux"
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import OrderPurchase from '../../components/Order/OrderPurchase';
import theme from "../../theme";
import cartReducer from "../../reducers/cartReducer";
import orderReducer from "../../reducers/orderReducer";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const initStoreFilled = {
    cartReducer:{
        products: [
            {
                id: 1, 
                name: "TestProduct1Name", 
                description: "TestProduct1Description",
                base_price: 1000,
                avg_rating: "5",
                qty_purchases: "50",
                img_urls: [null],
                promotion_price: 500,
                qty_matches: "1",
                quantity: 2
            }
        ]
    },
    orderReducer: {
        order: {
            id: 100,
            user_id: 1,
            order_total: 1000,
            products: [
                {
                    id: 200,
                    product_id: 1,
                    product_name: "TestProduct1Name", 
                    quantity: 2,
                    base_price: 1000,
                    promotion_price: 500,
                    coupon_discount: null,
                    final_price: 500,
                    modifier_name: null
                }
            ]
        }
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(combineReducers({
        cartReducer,
        orderReducer
    }), setStoreState)
    return store;
}


const renderWithProviders = (reduxStore) => {
    return render(
        <Provider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <OrderPurchase />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store);
    const headlineText = screen.getByText("Complete Purchase");

    expect(headlineText).toBeInTheDocument();
})