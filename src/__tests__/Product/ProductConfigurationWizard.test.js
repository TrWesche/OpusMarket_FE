import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductConfigurationWizard from '../../components/Product/ProductConfigurationWizard';
import theme from "../../theme";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductConfigurationWizard />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders();
    const productBasicsStep = screen.getByText(/Define Product Basics/i);
    const finishProductStep = screen.getByText(/Finish Product Creation/i);
    const productPriceForm = screen.getByText("Price (Format: XX.xx)");

    expect(productBasicsStep).toBeInTheDocument();
    expect(finishProductStep).toBeInTheDocument();
    expect(productPriceForm).toBeInTheDocument();
})