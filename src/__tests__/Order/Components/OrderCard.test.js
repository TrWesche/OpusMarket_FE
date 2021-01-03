import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from "@material-ui/core";
import OrderCard from '../../../components/Order/Components/OrderCard';
import theme from "../../../theme";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-redux"),
    useHistory: jest.fn
}))

const orderCard = {
    id: 1, 
    order_total: 1000, 
    order_status: "created", 
    status_dt: "2020-11-21T20:00:00.000Z"
}


const renderWithProviders = (dataToRender) => {
    return render(
        <ThemeProvider theme={theme}>
            <OrderCard cardData={dataToRender} />
        </ThemeProvider>
    );
}


test('it renders without crashing', () => {
    renderWithProviders(orderCard);
    const orderTotal = screen.getByText("Order Total: $10");
    const orderStatus = screen.getByText(/Status: created/i);
    const viewDetailsButton = screen.getByText(/View Order Details/i);

    expect(orderTotal).toBeInTheDocument();
    expect(orderStatus).toBeInTheDocument();
    expect(viewDetailsButton).toBeInTheDocument();
})