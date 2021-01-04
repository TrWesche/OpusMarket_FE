import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import NewUserForm from '../../components/User/NewUserForm';
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
                <NewUserForm />
            </ThemeProvider>
        </CookiesContext.Provider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(cookieProviderValuesNull);
    const pageTitle = screen.getByText(/User Signup/i);
    const emailInput = screen.getByText(/Email/i);
    const firstNameInput = screen.getByText(/First Name/i);
    const lastNameInput = screen.getByText(/Last Name/i);
    const passwordInput = screen.getByText(/Password/i);
    expect(pageTitle).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
})