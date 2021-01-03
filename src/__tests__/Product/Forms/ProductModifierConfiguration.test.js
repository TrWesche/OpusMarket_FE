import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductModifierConfiguration from '../../../components/Product/Forms/ProductModifierConfiguration';
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
            <ProductModifierConfiguration productData={productData} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(emptyProduct);
    const addNewCouponButton = screen.getByText("Add New Modifier");

    expect(addNewCouponButton).toBeInTheDocument();
})