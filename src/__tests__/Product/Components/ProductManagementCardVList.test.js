import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import ProductManagementCardVList from '../../../components/Product/Components/ProductManagementCardVList';
import theme from "../../../theme";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

const merchantId = 1;

const listId = "TestProductList1";

const productDataList = [{
    id: 1, 
    name: "TestProduct1Name", 
    description: "TestProduct1Description", 
    base_price: 1000, 
    avg_rating: "5", 
    qty_purchases: 10, 
    img_urls: [null], 
    promotion_price: 500, 
    qty_matches: "1"
}];


const renderWithProviders = (productList, listId, merchantId) => {
    return render(
        <ThemeProvider theme={theme}>
            <ProductManagementCardVList 
                productDataList={productList}
                listid={listId}
                merchantId={merchantId}
            />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(productDataList, listId, merchantId);
    const productName = screen.getByText("TestProduct1Name");
    const viewListingButton = screen.getByText(/View Listing/i);
    const deleteProductButton = screen.getByText(/Delete Product/i);

    expect(productName).toBeInTheDocument();
    expect(viewListingButton).toBeInTheDocument();
    expect(deleteProductButton).toBeInTheDocument();
})