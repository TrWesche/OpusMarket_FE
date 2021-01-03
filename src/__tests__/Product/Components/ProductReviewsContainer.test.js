import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductReviewsContainer from '../../../components/Product/Components/ProductReviewsContainer';
import theme from "../../../theme";

// jest.mock("react-redux", () => ({
//     ...jest.requireActual("react-redux"),
//     useDispatch: jest.fn
// }))

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

const renderWithProviders = (productDetails) => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductReviewsContainer 
                reviews={productDetails.reviews}
            />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(productDetail);
    const reviewTitle = screen.getByText("TestReviewTitleText1");
    const reviewBody = screen.getByText("TestReviewBodyText1");

    expect(reviewTitle).toBeInTheDocument();
    expect(reviewBody).toBeInTheDocument();
})