import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantHeadlineContainer from '../../../components/Merchant/Components/MerchantHeadlineContainer';
import theme from "../../../theme";

const display_name = "TestMerchant1DisplayName";
const about = [{
    headline: "TestMerchant1Headline",
    about: "TestAbout1",
    logo_wide_url: "http://testlogowideurl.com/1",
    logo_narrow_url: "http://testlogonarrowurl.com/1"
}];

const renderWithProviders = (display_name, about) => {
    return render(
        <ThemeProvider theme={theme}>
            <MerchantHeadlineContainer display_name={display_name} about={about} />
        </ThemeProvider>
    );
}

test('it renders without crashing', () => {
    renderWithProviders(display_name, about);
    const merchantDisplayName = screen.getByAltText(/TestMerchant1DisplayName/i);
    const merchantHeadline = screen.getByText(/TestMerchant1Headline/i);
    expect(merchantDisplayName).toBeInTheDocument();
    expect(merchantHeadline).toBeInTheDocument();
})