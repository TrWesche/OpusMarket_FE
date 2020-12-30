import {
    READ_USER_ORDERS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const orderList = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case READ_USER_ORDERS:
            return action.payload;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default orderList;