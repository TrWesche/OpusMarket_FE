import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import MerchantHeroContainer from '../../../components/Merchant/Components/MerchantHeroContainer';
import theme from "../../../theme";

// jest.mock("react-router-dom", () => ({
//     ...jest.requireActual("react-redux"),
//     useHistory: jest.fn
// }))

// const initStoreEmpty = {
//     productCatalog:{
//         featuredProducts: [],
//         bestSellingProducts: []
//     }
// }

const bios = [{
    name: "TestMerchantBioName1",
    bio: "TestMerchantBioText1",
    image_url: "http://testmerchant1bioimg.com",
    alt_text: "TestMerchantBioAltText1"
}];

const featured_products = [{
    id: 1, 
    name: "featuredProduct1Name", 
    description: "featuredProduct1_Description", 
    base_price: 100, 
    avg_rating: "1", 
    qty_purchases: 1000, 
    img_urls: [null], 
    promotion_price: 50, 
    qty_matches: "10"
}];

const gatherings = [{
    gathering_id: 1,
    merchant_id: 1,
    title: "TestGathering1",
    description: "TestGathering1_Description",
    images: [{url: null, alt_text: null, weight: null}]
}];

const renderWithProviders = (biosIn, featProdsIn, gatheringsIn) => {
    return render(
        <ThemeProvider theme={theme}>
            <MerchantHeroContainer bios={biosIn} featured_products={featProdsIn} gatherings={gatheringsIn} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(bios, featured_products, gatherings);
    const buttonNext = screen.getByText(/Next/i);
    const buttonBack = screen.getByText(/Back/i);
    const featuredProductsTab = screen.getByText(/Featured Products/i);
    const gatheringsTab = screen.getByText(/Gatherings/i);
    const biosTab = screen.getByText(/Biographies/i);
    const productDisplay = screen.getByText(/featuredProduct1Name/i);

    expect(buttonNext).toBeInTheDocument();
    expect(buttonBack).toBeInTheDocument();
    expect(featuredProductsTab).toBeInTheDocument();
    expect(gatheringsTab).toBeInTheDocument();
    expect(biosTab).toBeInTheDocument();
    expect(productDisplay).toBeInTheDocument();
})