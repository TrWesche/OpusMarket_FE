import {
    LOAD_PRODUCT_DETAILS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const productDetail = (state = INITIAL_STATE, action) => {
    let productDetail;
    switch (action.type){
        case LOAD_PRODUCT_DETAILS:
            productDetail = {...action.payload};  
            return productDetail;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default productDetail;