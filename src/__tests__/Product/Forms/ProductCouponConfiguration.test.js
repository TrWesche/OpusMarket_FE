import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductCouponConfiguration from '../../../components/Product/Forms/ProductCouponConfiguration';
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
            <ProductCouponConfiguration productData={productData} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(emptyProduct);
    const addNewCouponButton = screen.getByText("Add New Coupon");

    expect(addNewCouponButton).toBeInTheDocument();
})