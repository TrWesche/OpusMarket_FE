import {
    CREATE_NEW_ORDER,
    READ_ORDER_DATA,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const orderReducer = (state = INITIAL_STATE, action) => {
    let orderData;
    switch (action.type){
        case CREATE_NEW_ORDER:
            orderData = {...state, order: action.payload}    
            return orderData;
        case READ_ORDER_DATA:
            orderData = {...state, order: action.payload}
            return orderData;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default orderReducer;