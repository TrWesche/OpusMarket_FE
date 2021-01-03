import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductDetailsContainer from '../../../components/Product/Components/ProductDetailsContainer';
import theme from "../../../theme";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const productId = 1;

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

const renderWithProviders = (productId, productDetails) => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductDetailsContainer 
                product_id={productId}
                name={productDetails.name}
                description={productDetails.description}
                base_price={productDetails.base_price}
                avg_rating={productDetails.avg_rating}
                promotions={productDetails.promotion}
                modifiers={productDetails.modifiers}
            />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(productId, productDetail);
    const productName = screen.getByText("TestProduct1Name");
    const productRating = screen.getByText("Rating: 5.0");
    const productPromotionPrice = screen.getByText("$5.55");
    const productModifierSelection = screen.getByLabelText("TestProductModifier1Description");

    expect(productName).toBeInTheDocument();
    expect(productRating).toBeInTheDocument();
    expect(productPromotionPrice).toBeInTheDocument();
    expect(productModifierSelection).toBeInTheDocument();
})