import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantCard from '../../../components/Merchant/Components/MerchantCard';
import theme from "../../../theme";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const merchant = {
    id: 1, 
    display_name: "TestMerchant1Name", 
    headline: "TestMerchant1Headline",
    logo: "http://testmerchant1logo.com/1"
};

const renderWithProviders = (dataToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <MerchantCard cardData={dataToRender} />
        </ThemeProvider>
    );
}

test('it renders without crashing', () => {
    renderWithProviders(merchant);
    const merchantName = screen.getByText(/TestMerchant1Name/i);
    const merchantHeadline = screen.getByText(/TestMerchant1Headline/i);
    expect(merchantName).toBeInTheDocument();
    expect(merchantHeadline).toBeInTheDocument();
})