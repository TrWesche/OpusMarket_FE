import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantBrowse from '../../components/Merchant/MerchantBrowse';
import theme from "../../theme";
import merchantBrowse from "../../reducers/merchantBrowse";

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
    merchantBrowse:{
        merchants: [{
            id: 1, 
            display_name: "TestMerchant1Name", 
            headline: "TestMerchant1Headline",
            logo: "http://testmerchant1logo.com/1"
        }]
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(merchantBrowse, setStoreState);
    return store;
}

const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <MerchantBrowse />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    console.log(store.getState());
    renderWithProviders(store);
    const merchantName = screen.getByText(/TestMerchant1Name/i);
    const merchantHeadline = screen.getByText(/TestMerchant1Headline/i);
    expect(merchantName).toBeInTheDocument();
    expect(merchantHeadline).toBeInTheDocument();
})