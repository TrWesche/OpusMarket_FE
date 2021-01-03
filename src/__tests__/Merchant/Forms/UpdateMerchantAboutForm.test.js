import React from 'react';
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import UpdateMerchantAboutForm from '../../../components/Merchant/Forms/UpdateMerchantAboutForm';
import theme from "../../../theme";
import currentUser from "../../../reducers/currentUser";
import { AuthContext } from "../../../components/App/AuthContext";

import { createStore } from "redux"

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
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
    currentUser:{
        email: "TestMerchant1Email@test.com",
        display_name: "TestMerchant1DisplayName",
        about: {
            id: 1,
            headline: "TestHeadline1Headline",
            about: "TestAbout1",
            logo_wide_url: "http://testlogowideurl.com/1",
            logo_narrow_url: "http://testlogonarrowurl.com/1"
        }
    },
}

const authTokenMerchant = {
    authToken: {
        id: 1,
        type: "merchant",
        display_name: "MerchantAccountName"
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(currentUser, setStoreState);
    return store;
}


const renderWithProviders = (store, user) => {
    return render(
        <Provider store={store}>
            <AuthContext.Provider value={user}>
                <ThemeProvider theme={theme}>
                    <UpdateMerchantAboutForm />
                </ThemeProvider>
            </AuthContext.Provider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    // console.log(store.getState());
    renderWithProviders(store, authTokenMerchant);

    const bannerImageInput = screen.getByText(/Banner Image URL/i);
    const bannerImageValue = screen.getByDisplayValue('http://testlogowideurl.com/1');
    
    const merchantHeadlineInput = screen.getByText(/Header Text/i);
    const merchantHeadlineValue = screen.getByDisplayValue(/TestHeadline1Headline/i);

    const merchantAboutInput = screen.getByText(/About Text/i);
    const merchantAboutValue = screen.getByDisplayValue(/TestAbout1/i);

    const thumbnailImageInput = screen.getByText(/Thumbnail Image URL/i);
    const thumbnailImageValue = screen.getByDisplayValue('http://testlogonarrowurl.com/1');
    
    expect(bannerImageInput).toBeInTheDocument();
    expect(bannerImageValue).toBeInTheDocument();

    expect(merchantHeadlineInput).toBeInTheDocument();
    expect(merchantHeadlineValue).toBeInTheDocument();
    
    expect(merchantAboutInput).toBeInTheDocument();
    expect(merchantAboutValue).toBeInTheDocument();

    expect(thumbnailImageInput).toBeInTheDocument();
    expect(thumbnailImageValue).toBeInTheDocument();
})