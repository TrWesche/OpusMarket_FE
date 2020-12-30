import apiOpus from "../utils/apiOpusMarket";
import {
    READ_USER_ORDERS,
    ERROR
} from "./actionTypes";

export const fetchUserOrders = () => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getUserOrders();
            dispatch(gotUserOrders(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
}

const gotUserOrders = (orders) => {
    return ({
        type:  READ_USER_ORDERS,
        payload: orders
    })
}

const gotError = () => {
    return ({
        type: ERROR
    })
}
