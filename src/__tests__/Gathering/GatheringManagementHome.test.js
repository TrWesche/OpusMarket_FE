import React from 'react';
import { render, screen } from '@testing-library/react';

import { AuthContext } from "../../components/App/AuthContext";
import { ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";


import GatheringManagementHome from "../../components/Gathering/GatheringManagementHome"
import theme from "../../theme";
import gatheringReducer from "../../reducers/gatheringReducer";

import { createStore } from "redux"

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const authTokenMerchant = {
    authToken: {
        id: 100,
        type: "merchant",
        display_name: "MerchantAccountName"
    }
}

const initStoreFilled = {
    gatheringReducer:{
        gatherings: [{
            gathering_id: 100,
            title: "MerchantGathering100",
            description: "MerchantGathering100 Description",
            gathering_link: "http://merchantgathering100link.com",
            alt_text: "Merchant gathering location indoors",
            img_urls: [null]
        }]
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(gatheringReducer, setStoreState);
    return store;
}

const renderWithProviders = (store, user) => {
    return render(
        <Provider store={store}>
            <AuthContext.Provider value={user}>
                <ThemeProvider theme={theme}>
                    <GatheringManagementHome />
                </ThemeProvider>
            </AuthContext.Provider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    console.log(store.getState());
    renderWithProviders(store, authTokenMerchant);
    const titleElement = screen.getByText(/Manage Gatherings/i);
    const gatheringDescriptionElement = screen.getByText(/MerchantGathering100 Description/i);
    expect(titleElement).toBeInTheDocument();
    expect(gatheringDescriptionElement).toBeInTheDocument();
})