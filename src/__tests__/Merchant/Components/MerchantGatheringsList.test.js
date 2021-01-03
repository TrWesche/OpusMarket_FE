import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantGatheringsList from '../../../components/Merchant/Components/MerchantGatheringsList';
import theme from "../../../theme";

const gatherings= [{
    gathering_id: 1,
    merchant_id: 1,
    title: "TestGathering1_Title",
    description: "TestGathering1_Description",
    images: [{url: null, alt_text: null, weight: null}]
}];

const renderWithProviders = (dataToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <MerchantGatheringsList gatherings={dataToRender} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(gatherings);
    const gatheringTitle = screen.getByText(/TestGathering1_Title/i);
    const gatheringDescription = screen.getByText(/TestGathering1_Description/i);
    expect(gatheringTitle).toBeInTheDocument();
    expect(gatheringDescription).toBeInTheDocument();
})