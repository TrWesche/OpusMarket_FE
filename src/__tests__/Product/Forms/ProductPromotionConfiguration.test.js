import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductPromotionConfiguration from '../../../components/Product/Forms/ProductPromotionConfiguration';
import theme from "../../../theme";


const emptyProduct = {
    id: '',
    name: '',
    description: '',
    base_price: '',
    images: [],
    metas: [],
    modifiers: [],
    promotions: [],
    coupons: []
}


const renderWithProviders = (productData) => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductPromotionConfiguration productData={productData} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(emptyProduct);
    const addNewCouponButton = screen.getByText("Add Promotion");

    expect(addNewCouponButton).toBeInTheDocument();
})