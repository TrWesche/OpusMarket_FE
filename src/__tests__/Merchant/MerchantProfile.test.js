import React from 'react';
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { render, screen } from '@testing-library/react';
import MerchantProfile from '../../components/Merchant/MerchantProfile';
import theme from "../../theme";
import currentUser from "../../reducers/currentUser";

import { createStore } from "redux"

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

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
    currentUser:{
        email: "TestMerchant1@test.com",
        display_name: "TestMerchantDisplayName",
        about: {
            id: 1, 
            headline: "TestMerchant1Headline",
            about: "TestMerchant1About",
            logo_wide_url: "http://testmerchant1logowide.com/1",
            logo_narrow_url: "http://testmerchant1logonarrow.com/1"
        }
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(currentUser, setStoreState);
    return store;
}


const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <MerchantProfile />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    renderWithProviders(store);
    const greetingElement = screen.getByText(/Hi TestMerchantDisplayName/i);
    const updateAccountOption = screen.getByText(/Update Display Name & Email/i);
    const addProductOption = screen.getByText(/Add A New Product/i);
    const addGatheringOption = screen.getByText(/Add A New Gathering/i);
    expect(greetingElement).toBeInTheDocument();
    expect(updateAccountOption).toBeInTheDocument();
    expect(addProductOption).toBeInTheDocument();
    expect(addGatheringOption).toBeInTheDocument();
})