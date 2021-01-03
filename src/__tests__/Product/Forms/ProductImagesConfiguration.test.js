import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductImagesConfiguration from '../../../components/Product/Forms/ProductImagesConfiguration';
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
            <ProductImagesConfiguration productData={productData} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(emptyProduct);
    const addNewCouponButton = screen.getByText("Add New Image");

    expect(addNewCouponButton).toBeInTheDocument();
})