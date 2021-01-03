import React from 'react';
import { Provider } from "react-redux";
import { createStore } from "redux"
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductDetail from '../../components/Product/ProductDetail';
import theme from "../../theme";
import productDetail from "../../reducers/productDetail";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn
}))

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const initStoreFilled = {
    productDetail:{
        merchant_id: 1, 
        name: "TestProduct1Name", 
        description: "TestProduct1Description",
        base_price: 1000,
        avg_rating: "5",
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
}

const createTestStore = (setStoreState) => {
    const store = createStore(productDetail, setStoreState);
    return store;
}


const renderWithProviders = (reduxStore) => {
    return render(
        <Provider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <ProductDetail />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store);
    const productName = screen.getByText("TestProduct1Name");
    const productRating = screen.getByText("Rating: 5.0");
    const productPromotionPrice = screen.getByText("$5.55");
    const productModifierSelection = screen.getByLabelText("TestProductModifier1Description");
    const productReviewBody = screen.getByText("TestReviewBodyText1")

    expect(productName).toBeInTheDocument();
    expect(productRating).toBeInTheDocument();
    expect(productPromotionPrice).toBeInTheDocument();
    expect(productModifierSelection).toBeInTheDocument();
    expect(productReviewBody).toBeInTheDocument();
})