import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductMetaConfiguration from '../../../components/Product/Forms/ProductMetaConfiguration';
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
            <ProductMetaConfiguration productData={productData} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(emptyProduct);
    const addNewCouponButton = screen.getByText("Add New Meta Tag");

    expect(addNewCouponButton).toBeInTheDocument();
})