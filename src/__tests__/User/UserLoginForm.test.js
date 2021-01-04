import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import UserLoginForm from '../../components/User/UserLoginForm';
import theme from "../../theme";
import { CookiesContext } from "../../contextProviders/CookiesContext";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const updateContextCookies = () => {
    return null;
}

const cookieProviderValuesNull = {
    contextCookies: {},
    updateContextCookies 
}

const renderWithProviders = (cookieProvider) => {
    return render(
        <CookiesContext.Provider value={cookieProvider}>
            <ThemeProvider theme={theme}>
                <UserLoginForm />
            </ThemeProvider>
        </CookiesContext.Provider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(cookieProviderValuesNull);
    const pageTitle = screen.getByText(/User Login/i);
    const emailInput = screen.getByText(/Email/i);
    const passwordInput = screen.getByText(/Password/i);
    
    expect(pageTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
})