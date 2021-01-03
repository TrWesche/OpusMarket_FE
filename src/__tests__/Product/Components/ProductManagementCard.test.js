import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductManagementCard from '../../../components/Product/Components/ProductManagementCard';
import theme from "../../../theme";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const merchantId = 1;

const productData = {
    id: 1, 
    name: "TestProduct1Name", 
    description: "TestProduct1Description", 
    base_price: 1000, 
    avg_rating: "5", 
    qty_purchases: 10, 
    img_urls: [null], 
    promotion_price: 500, 
    qty_matches: "1"
};


const renderWithProviders = (merchantId, productData) => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductManagementCard 
                cardData={productData}
                merchantId={merchantId}
            />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(merchantId, productData);
    const productName = screen.getByText("TestProduct1Name");
    const viewListingButton = screen.getByText(/View Listing/i);
    const deleteProductButton = screen.getByText(/Delete Product/i);

    expect(productName).toBeInTheDocument();
    expect(viewListingButton).toBeInTheDocument();
    expect(deleteProductButton).toBeInTheDocument();
})