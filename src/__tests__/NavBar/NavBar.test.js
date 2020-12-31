import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../../components/NavBar/NavBar';
import theme from "../../theme";
import rootReducer from "../../reducers/rootReducer";

// Import Provider Dependencies
import { AuthContext } from "../../components/App/AuthContext";
import { CookiesContext } from "../../contextProviders/CookiesContext";
import { ThemeProvider } from "@material-ui/core";
import { createStore } from "redux"
import { Provider } from "react-redux";

// Provide necessary Context Data
const updateContextCookies = () => {
    return null;
}

const cookieProviderValuesNull = {
    contextCookies: {},
    updateContextCookies 
}

const authTokenNull = {
    authToken: null
}

const authTokenUser = {
    authToken: {
        type: "user",
        first_name: "UserAccountName"
    }
}

const authTokenMerchant = {
    authToken: {
        type: "merchant",
        display_name: "MerchantAccountName"
    }
}

const store = createStore(
    rootReducer
)

const renderWithProviders = (cookieProvider, user) => {
    return render(
        <Provider store={store}>
            <CookiesContext.Provider value={cookieProvider}>
                <AuthContext.Provider value={user}>
                    <ThemeProvider theme={theme}>
                        <NavBar />
                    </ThemeProvider>
                </AuthContext.Provider>
            </CookiesContext.Provider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(cookieProviderValuesNull, authTokenNull);
    const titleElement = screen.getByText(/OpusMarket/i);
    const loginElement = screen.getAllByText(/Login/i)
    expect(titleElement).toBeInTheDocument();
    expect(loginElement.length).toBe(3);
})

test('it shows user name & logout when user logged in', () => {
    renderWithProviders(cookieProviderValuesNull, authTokenUser);
    const userNameElement = screen.getAllByText(/UserAccountName/i);
    const logoutElement = screen.getByText(/Logout/i)
    expect(userNameElement.length).toBe(2);
    expect(logoutElement).toBeInTheDocument();
})

test('it shows display name & logout when merchant logged in', () => {
    renderWithProviders(cookieProviderValuesNull, authTokenMerchant);
    const merchantNameElement = screen.getAllByText(/MerchantAccountName/i);
    const logoutElement = screen.getByText(/Logout/i)
    expect(merchantNameElement.length).toBe(2);
    expect(logoutElement).toBeInTheDocument();
})