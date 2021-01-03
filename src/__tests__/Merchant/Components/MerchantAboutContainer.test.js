import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantAboutContainer from '../../../components/Merchant/Components/MerchantAboutContainer';
import theme from "../../../theme";

const about = [{
    headline: "TestHeadline1Headline",
    about: "TestAbout1",
    logo_wide_url: "http://testlogowideurl.com/1",
    logo_narrow_url: "http://testlogonarrowurl.com/1"
}];


const renderWithProviders = (aboutToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <MerchantAboutContainer about={aboutToRender} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(about);
    const aboutUsHeader = screen.getByText(/About Us/i);
    const aboutText = screen.getByText(/TestAbout1/i);
    expect(aboutUsHeader).toBeInTheDocument();
    expect(aboutText).toBeInTheDocument();
})