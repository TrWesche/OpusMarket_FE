import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantHome from '../../components/Merchant/MerchantHome';
import theme from "../../theme";
import merchantDetails from "../../reducers/merchantDetails";

import { createStore } from "redux"

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
    
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn,
    useHistory: jest.fn
}))
// const initStoreEmpty = {
//     productCatalog:{
//         featuredProducts: [],
//         bestSellingProducts: []
//     }
// }

const initStoreFilled = {
    merchantDetails:{
        id: 1,
        display_name: "TestMerchant1DisplayName",
        about: [{
            headline: "TestHeadline1Headline",
            about: "TestAbout1",
            logo_wide_url: "http://testlogowideurl.com/1",
            logo_narrow_url: "http://testlogonarrowurl.com/1"
        }],
        bios: [{
            name: null,
            bio: null,
            image_url: null,
            alt_text: null
        }],
        images: [{
            url: null,
            alt_text: null
        }],
        products: [{id: 5, name: "standardProduct1", description: "standardProduct1_Description", base_price: 500, avg_rating: "5", qty_purchases: 5000, img_urls: [null], promotion_price: 250, qty_matches: "5"}],
        featured_products: [{id: 1, name: "featuredProduct1", description: "featuredProduct1_Description", base_price: 100, avg_rating: "1", qty_purchases: 1000, img_urls: [null], promotion_price: 50, qty_matches: "10"}],
        gatherings: [{
            gathering_id: 1,
            merchant_id: 1,
            title: "TestGathering1",
            description: "TestGathering1_Description",
            images: [{url: null, alt_text: null, weight: null}]
        }]
    },
}

const createTestStore = (setStoreState) => {
    const store = createStore(merchantDetails, setStoreState);
    return store;
}

const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <MerchantHome />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store);
    const merchantDisplayName = screen.getByText(/TestMerchant1DisplayName/i);
    const merchantHeadline = screen.getByText(/TestHeadline1Headline/i);
    const merchantAbout = screen.getByText(/TestAbout1/i);
    const standardProduct = screen.getByText(/standardProduct1/i);
    const featuredProduct = screen.getByText(/featuredProduct1/i);
    const gatheringSection = screen.getByText(/Gatherings/i);
    expect(merchantDisplayName).toBeInTheDocument();
    expect(merchantHeadline).toBeInTheDocument();
    expect(merchantAbout).toBeInTheDocument();
    expect(standardProduct).toBeInTheDocument();
    expect(featuredProduct).toBeInTheDocument();
    expect(gatheringSection).toBeInTheDocument();
})