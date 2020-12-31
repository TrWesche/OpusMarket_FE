import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import CatalogHome from '../../components/Catalog/CatalogHome';
import theme from "../../theme";
import catalogReducer from "../../reducers/productCatalog";

import { createStore } from "redux"

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/catalog"
    })
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

// const initStoreEmpty = {
//     productCatalog:{
//         queryProducts: [],
//         queryMetas: [],
//         queryFeatures: []
//     }
// }

const initStoreFilled = {
    productCatalog:{
        queryProducts: [{id: 1, name: "catalogProduct", description: "catalogProduct_Description", base_price: 100, avg_rating: "5", qty_purchases: 10, img_urls: [null], promotion_price: 50, qty_matches: "1"}],
        queryMetas: [{title: "metaTag", meta_frequency: "1"}],
        queryFeatures: [{id: 1}]
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(catalogReducer, setStoreState);
    return store;
}

const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CatalogHome />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    console.log(store.getState());
    renderWithProviders(store);
    const titleElement = screen.getAllByText(/Featured/i);
    const metaElement = screen.getByText(/metaTag/i);
    const productElement = screen.getByText(/catalogProduct/i);
    expect(titleElement.length).toBe(2);
    expect(metaElement).toBeInTheDocument();
    expect(productElement).toBeInTheDocument();
})