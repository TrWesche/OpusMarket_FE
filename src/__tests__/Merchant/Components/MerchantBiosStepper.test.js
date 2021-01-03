import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantBiosStepper from '../../../components/Merchant/Components/MerchantBiosStepper';
import theme from "../../../theme";

const bios = [{
    name: "TestMerchantBioName1",
    bio: "TestMerchantBioText1",
    image_url: "http://testmerchant1bioimg.com",
    alt_text: "TestMerchantBioAltText1"
}];

const renderWithProviders = (listToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <MerchantBiosStepper merchantBios={listToRender} />
        </ThemeProvider>
    );
}

test('it renders without crashing', () => {
    renderWithProviders(bios);
    const buttonNext = screen.getByText(/Next/i);
    const buttonBack = screen.getByText(/Back/i);
    const bioName = screen.getByText(/TestMerchantBioName1/i);
    expect(buttonNext).toBeInTheDocument();
    expect(buttonBack).toBeInTheDocument();
    expect(bioName).toBeInTheDocument();
})