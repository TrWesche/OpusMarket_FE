import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import NewGatheringConfiguration from "../../components/Gathering/NewGatheringConfiguration"
import theme from "../../theme";



const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <NewGatheringConfiguration />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders();
    const titleElement = screen.getByText(/Create New Gathering/i);
    const submitButton = screen.getByText(/Create Gathering/i);
    expect(titleElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
})