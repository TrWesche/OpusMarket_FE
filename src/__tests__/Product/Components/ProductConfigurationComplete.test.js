import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductConfigurationComplete from '../../../components/Product/Components/ProductConfigurationComplete';
import theme from "../../../theme";


const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductConfigurationComplete />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders();
    const pageTitle = screen.getByText("Product Configuration Complete!");

    expect(pageTitle).toBeInTheDocument();
})