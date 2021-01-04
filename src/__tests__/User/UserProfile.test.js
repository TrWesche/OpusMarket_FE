import React from 'react';
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import { render, screen } from '@testing-library/react';
import UserProfile from '../../components/User/UserProfile';
import theme from "../../theme";
import currentUser from "../../reducers/currentUser";

import { createStore } from "redux"

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn
}))

// const initStoreEmpty = {
    // currentUser:{
    //     email: "",
    //     first_name: "",
    //     last_name: ""
    // }
// }

const initStoreFilled = {
    currentUser:{
        email: "TestMerchant1@test.com",
        first_name: "TestUserFirstName",
        last_name: "TestUserLastName"
    }
}

const createTestStore = (setStoreState) => {
    const store = createStore(currentUser, setStoreState);
    return store;
}


const renderWithProviders = (store) => {
    return render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <UserProfile />
            </ThemeProvider>
        </Provider>
    );
}


test('it renders without crashing', () => {
    const store = createTestStore(initStoreFilled);
    renderWithProviders(store);
    const greetingElement = screen.getByText(/Hi TestUserFirstName/i);
    const updateAccountOption = screen.getByText(/Update Display Name & Email/i);
    const viewOrdersOption = screen.getByText(/View Orders/i);
    expect(greetingElement).toBeInTheDocument();
    expect(updateAccountOption).toBeInTheDocument();
    expect(viewOrdersOption).toBeInTheDocument();
})