import React from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux"
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductManagementHome from '../../components/Product/ProductManagementHome';
import theme from "../../theme";
import productCatalog from "../../reducers/productCatalog";

import { AuthContext } from "../../components/App/AuthContext";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const authTokenMerchant = {
    authToken: {
        type: "merchant",
        display_name: "MerchantAccountName"
    }
}

const initStoreFilled = {
    productCatalog:{
        queryProducts: [{
            id: 1, 
            name: "TestProduct1Name", 
            description: "TestProduct1Description", 
            base_price: 1000, 
            avg_rating: "5", 
            qty_purchases: 10, 
            img_urls: [null], 
            promotion_price: 500, 
            qty_matches: "1"
        }],
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(productCatalog, setStoreState);
    return store;
}


const renderWithProviders = (reduxStore, user) => {
    return render(
        <Provider store={reduxStore}>
            <AuthContext.Provider value={user}>
                <ThemeProvider theme={theme}>
                    <ProductManagementHome />
                </ThemeProvider>
            </AuthContext.Provider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store, authTokenMerchant);
    const pageTitle = screen.getByText("Manage Products");
    const productName = screen.getByText("TestProduct1Name");
    const viewListingButton = screen.getByText(/View Listing/i);
    const deleteProductButton = screen.getByText(/Delete Product/i);

    expect(pageTitle).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(viewListingButton).toBeInTheDocument();
    expect(deleteProductButton).toBeInTheDocument();
})