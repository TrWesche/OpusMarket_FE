import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";

import GatheringManagementList from "../../../components/Gathering/Components/GatheringManagementList";
import theme from "../../../theme";


jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const merchantId = 1;

const cardList = [{
        gathering_id: 100,
        title: "MerchantGathering100",
        description: "MerchantGathering100 Description",
        gathering_link: "http://merchantgathering100link.com",
        alt_text: "Merchant gathering location indoors",
        img_urls: [null]
    },
    {
        gathering_id: 200,
        title: "MerchantGathering200",
        description: "MerchantGathering200 Description",
        gathering_link: "http://merchantgathering200link.com",
        alt_text: "Merchant gathering location outdoors",
        img_urls: [null]
    }
];


const renderWithProviders = () => {
    return render(
        <ThemeProvider theme={theme}>
            <GatheringManagementList gatherings={cardList} merchantId={merchantId} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders();
    const deleteButton = screen.getAllByText(/Delete Gathering/i);
    const gathering100DescriptionElement = screen.getByText(/MerchantGathering100 Description/i);
    const gathering200DescriptionElement = screen.getByText(/MerchantGathering200 Description/i);
    expect(deleteButton.length).toBe(2);
    expect(gathering100DescriptionElement).toBeInTheDocument();
    expect(gathering200DescriptionElement).toBeInTheDocument();
})