import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import CartHome from '../../components/Purchase/CartHome';
import theme from "../../theme";
import cartReducer from "../../reducers/cartReducer";

import { createStore } from "redux"


// const initStoreEmpty = {
    // orderList:{
    //     orders: [
    //         {}
    //     ]
    // },
// }

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
}

const createTestStore = (setStoreState) => {
    const store = createStore(cartReducer, setStoreState);
    return store;
}


const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CartHome />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store);
    const productSalePrice = screen.getByText("Sale Price: $5");
    const cartTotal = screen.getByText("Cart Total: $10")
    const productName = screen.getByText(/TestProduct1Name/i);

    expect(productSalePrice).toBeInTheDocument();
    expect(cartTotal).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
})