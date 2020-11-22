import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_IN_CART,
    REMOVE_PRODUCT_FROM_CART,
    APPLY_COUPON_TO_PRODUCT,
    CREATE_NEW_ORDER,
    READ_ORDER_DATA,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const cartReducer = (state = INITIAL_STATE, action) => {
    let cartContents;
    let cartProducts;
    switch (action.type){
        case ADD_PRODUCT_TO_CART:
            cartContents = {...state, cartContents: [...cartContents, action.payload]};  
            return cartContents;
        case UPDATE_PRODUCT_IN_CART:
            cartProducts = state.cartContents.map(item => item.id === action.payload.id ? action.payload : item);
            cartContents = {...state, cartContents: cartProducts};  
            return cartContents;
        case REMOVE_PRODUCT_FROM_CART:
            cartProducts = state.cartContents.filter(item => item.id !== action.id);
            cartContents = {...state, cartContents: cartProducts};
            return cartContents;
        case APPLY_COUPON_TO_PRODUCT:
            cartProducts = state.cartContents.filter(item => item.id === action.payload.id ? action.paylod : item);
            cartContents = {...state, cartContents: cartProducts}
            return cartContents;
        case CREATE_NEW_ORDER:
            cartContents = {...state, cartContents: action.payload}    
            return cartContents;
        case READ_ORDER_DATA:
            cartContents = {...state, cartContents: action.payload}
            return cartContents;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default cartReducer;