import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import Home from '../../components/Home/Home';
import theme from "../../theme";
import catalogReducer from "../../reducers/productCatalog";

import { createStore } from "redux"

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

// const initStoreEmpty = {
//     productCatalog:{
//         featuredProducts: [],
//         bestSellingProducts: []
//     }
// }

const initStoreFilled = {
    productCatalog:{
        featuredProducts: [{id: 1, name: "featuredProduct1", description: "featuredProduct1_Description", base_price: 100, avg_rating: "1", qty_purchases: 1000, img_urls: [null], promotion_price: 50, qty_matches: "10"}],
        bestSellingProducts: [{id: 5, name: "bestSellingProduct1", description: "bestSellingProduct1_Description", base_price: 500, avg_rating: "5", qty_purchases: 5000, img_urls: [null], promotion_price: 250, qty_matches: "5"}]
    },
}

const createTestStore = (setStoreState) => {
    const store = createStore(catalogReducer, setStoreState);
    return store;
}

const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Home />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    console.log(store.getState());
    renderWithProviders(store);
    const featuredProductsSection = screen.getByText(/Featured Products/i);
    const bestSellersSection = screen.getByText(/Best Sellers/i);
    const featuredProduct = screen.getByText(/featuredProduct1/i);
    const bestSeller = screen.getByText(/bestSellingProduct1/i);
    expect(featuredProductsSection).toBeInTheDocument();
    expect(bestSellersSection).toBeInTheDocument();
    expect(featuredProduct).toBeInTheDocument();
    expect(bestSeller).toBeInTheDocument();
})