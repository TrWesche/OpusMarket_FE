import {
    LOAD_CATALOG_PRODUCTS,
    LOAD_PRODUCT_DETAILS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const catalogReducer = (state = INITIAL_STATE, action) => {
    let productCatalog;
    let productDetail;
    switch (action.type){
        case LOAD_CATALOG_PRODUCTS:
            productCatalog = {...state, productCatalog: action.payload};  
            return productCatalog;
        case LOAD_PRODUCT_DETAILS:
            productDetail = {...state, productDetail: action.payload};  
            return productDetail;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default catalogReducer;