import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_IN_CART,
    REMOVE_PRODUCT_FROM_CART,
    READ_PRODUCTS_FROM_CART,
    APPLY_COUPON_TO_PRODUCT,
    SYSTEM_ORDER_CREATED,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const cartManagement = (state = INITIAL_STATE, action) => {
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
        case READ_PRODUCTS_FROM_CART:
            cartContents = {...action.payload};
            return cartContents;
        case APPLY_COUPON_TO_PRODUCT:
            cartProducts = state.cartContents.filter(item => item.id === action.payload.id ? action.paylod : item);
            cartContents = {...state, cartContents: cartProducts}
            return cartContents;
        case SYSTEM_ORDER_CREATED:
            return cartContents;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default cartManagement;