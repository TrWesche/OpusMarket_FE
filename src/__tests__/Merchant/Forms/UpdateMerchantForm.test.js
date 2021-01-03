import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import { createStore } from "redux"
import UpdateMerchantForm from '../../../components/Merchant/Forms/UpdateMerchantForm';
import theme from "../../../theme";
import { CookiesContext } from "../../../contextProviders/CookiesContext";
import currentUser from "../../../reducers/currentUser"


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const initStoreFilled = {
    currentUser:{
        email: "TestMerchant1Email@test.com",
        display_name: "TestMerchant1DisplayName",
        about: {
            id: 1,
            headline: "TestHeadline1Headline",
            about: "TestAbout1",
            logo_wide_url: "http://testlogowideurl.com/1",
            logo_narrow_url: "http://testlogonarrowurl.com/1"
        }
    },
}

const createTestStore = (setStoreState) => {
    const store = createStore(currentUser, setStoreState);
    return store;
}

const updateContextCookies = () => {
    return null;
}

const cookieProviderValuesNull = {
    contextCookies: {},
    updateContextCookies 
}


const renderWithProviders = (reduxStore, cookieProvider) => {
    return render(
        <Provider store={reduxStore}>
            <CookiesContext.Provider value={cookieProvider}>
                <ThemeProvider theme={theme}>
                    <UpdateMerchantForm />
                </ThemeProvider>
            </CookiesContext.Provider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store, cookieProviderValuesNull);
    const pageTitle = screen.getByText(/Merchant Update Profile/i);
    const emailInput = screen.getByText(/Email/i);
    const displayNameInput = screen.getByText(/Display Name/i);
    expect(pageTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(displayNameInput).toBeInTheDocument();
})