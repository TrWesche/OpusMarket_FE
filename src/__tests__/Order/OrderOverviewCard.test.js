import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import OrderOverviewCard from '../../components/Order/OrderOverviewCard';
import theme from "../../theme";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const products = [{
    id: 1, 
    name: "TestProduct1Name", 
    description: "TestProduct1Description",
    base_price: 1000,
    avg_rating: "5",
    qty_purchases: "50",
    img_urls: [null],
    promotion_price: 500,
    qty_matches: "1",
    quantity: 2
}];


const renderWithProviders = (dataToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <OrderOverviewCard productDataList={dataToRender} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(products);
    const originalTotal = screen.getByText("Original Total: $20");
    const savingsTotal = screen.getByText("Savings: $10");
    const cartTotal = screen.getByText("Cart Total: $10");
    const proceedToCheckoutButton = screen.getByText(/Proceed to Checkout/i);

    expect(originalTotal).toBeInTheDocument();
    expect(savingsTotal).toBeInTheDocument();
    expect(cartTotal).toBeInTheDocument();
    expect(proceedToCheckoutButton).toBeInTheDocument();
})