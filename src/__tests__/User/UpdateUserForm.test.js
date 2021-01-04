import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import { createStore } from "redux"
import UpdateUserForm from '../../components/User/UpdateUserForm';
import theme from "../../theme";
import { CookiesContext } from "../../contextProviders/CookiesContext";
import currentUser from "../../reducers/currentUser"


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

// const initStoreEmpty = {
    // currentUser:{
    //     email: "",
    //     first_name: "",
    //     last_name: ""
    // }
// }

const initStoreFilled = {
    currentUser:{
        email: "TestMerchant1@test.com",
        first_name: "TestUserFirstName",
        last_name: "TestUserLastName"
    }
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
                    <UpdateUserForm />
                </ThemeProvider>
            </CookiesContext.Provider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store, cookieProviderValuesNull);
    const pageTitle = screen.getByText(/Update Account Details/i);
    const emailInput = screen.getByText(/Email/i);
    const firstNameInput = screen.getByText(/First Name/i);
    const lastNameInput = screen.getByText(/Last Name/i);
    expect(pageTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
})