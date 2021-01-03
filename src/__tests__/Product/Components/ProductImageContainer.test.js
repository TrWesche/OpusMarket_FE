import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductImageContainer from '../../../components/Product/Components/ProductImageContainer';
import theme from "../../../theme";

const productDetail = {
    merchant_id: 1, 
    name: "TestProduct1Name", 
    description: "TestProduct1Description",
    base_price: 1000,
    avg_rating: 5,
    images: [],
    promotion: [
        {id: 1, product_id: 1, promotion_price: 555, active: true, merchant_id: 1}
    ],
    modifiers: [
        {id: 1, product_id: 1, name: "TestProductModifier1Name", description: "TestProductModifier1Description", merchant_id: 1}
    ],
    reviews: [
        {id: 1, product_id: 1, first_name: "TestReviewUserFirstName1", rating: 5, title: "TestReviewTitleText1", body: "TestReviewBodyText1", review_dt: "2020-12-02T01:00:00.000Z", merchant_id: 1}
    ]
}

const renderWithProviders = ( productDetails) => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductImageContainer 
                merchant_id={productDetails.merchant_id}
                imageList={productDetails.images}
            />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(productDetail);
    const meetTheCreatorButton = screen.getByText("Meet the Creator");
    const imageNotFoundText = screen.getByAltText("Product Images Not Available");

    expect(meetTheCreatorButton).toBeInTheDocument();
    expect(imageNotFoundText).toBeInTheDocument();
})