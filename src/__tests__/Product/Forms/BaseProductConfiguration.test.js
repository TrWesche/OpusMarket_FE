import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import BaseProductConfiguration from '../../../components/Product/Forms/BaseProductConfiguration';
import theme from "../../../theme";


const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <BaseProductConfiguration />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders();
    const nameInput = screen.getByText("Name");
    const priceInput = screen.getByText("Price (Format: XX.xx)");
    const descriptionInput = screen.getByText("Description");

    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
})