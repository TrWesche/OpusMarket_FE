import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import FeaturedProductsStepper from '../../../components/Merchant/Components/FeaturedProductsStepper';
import theme from "../../../theme";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const featured_products = [{id: 1, name: "featuredProduct1Name", description: "featuredProduct1_Description", base_price: 100, avg_rating: "1", qty_purchases: 1000, img_urls: [null], promotion_price: 50, qty_matches: "10"}];


const renderWithProviders = (productToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <FeaturedProductsStepper featuredProducts={productToRender} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(featured_products);
    const buttonNext = screen.getByText(/Next/i);
    const buttonBack = screen.getByText(/Back/i);
    const productDisplay = screen.getByText(/featuredProduct1Name/i);
    expect(buttonNext).toBeInTheDocument();
    expect(buttonBack).toBeInTheDocument();
    expect(productDisplay).toBeInTheDocument();
})