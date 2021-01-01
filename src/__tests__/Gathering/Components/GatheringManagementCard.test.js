import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";

import GatheringManagementHome from "../../../components/Gathering/Components/GatheringManagementCard";
import theme from "../../../theme";


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))


const merchantId = 1;

const cardData = {
    gathering_id: 100,
    title: "MerchantGathering100",
    description: "MerchantGathering100 Description",
    gathering_link: "http://merchantgathering100link.com",
    alt_text: "Merchant gathering location indoors",
    img_urls: [null]
};


const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <GatheringManagementHome cardData={cardData} merchantId={merchantId} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders();
    const deleteButton = screen.getByText(/Delete Gathering/i);
    const gatheringDescriptionElement = screen.getByText(/MerchantGathering100 Description/i);
    expect(deleteButton).toBeInTheDocument();
    expect(gatheringDescriptionElement).toBeInTheDocument();
})