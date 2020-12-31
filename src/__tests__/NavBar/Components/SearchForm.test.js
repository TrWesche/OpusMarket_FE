import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme";
import SearchForm from '../../../components/NavBar/Components/SearchForm';;



const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <SearchForm />
        </ThemeProvider>
    );
}

test('it renders without crashing', () => {
    renderWithProviders();
    const searchFrom = screen.getByPlaceholderText(/Search.../i);
    const dropDownProducts = screen.getByText(/Products/i);
    const dropDownMerchants = screen.getByText(/Merchants/i);
    expect(searchFrom).toBeInTheDocument();
    expect(dropDownProducts).toBeInTheDocument();
    expect(dropDownMerchants).toBeInTheDocument();
})