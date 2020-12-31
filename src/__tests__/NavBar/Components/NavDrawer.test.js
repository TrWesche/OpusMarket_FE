import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import theme from "../../../theme";
import NavDrawer from '../../../components/NavBar/Components/NavDrawer';;




const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <NavDrawer />
        </ThemeProvider>
    );
}

test('it renders without crashing', () => {
    renderWithProviders();
    const openDrawerButton = screen.getByLabelText(/open drawer/i);
    expect(openDrawerButton).toBeInTheDocument();
})