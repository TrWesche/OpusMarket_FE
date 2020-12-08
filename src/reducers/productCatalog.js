import {
    LOAD_FEATURED_PRODUCTS,
    LOAD_BEST_SELLING_PRODUCTS,
    LOAD_CATALOG_PRODUCTS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const catalogReducer = (state = INITIAL_STATE, action) => {
    let productCatalog;
    switch (action.type){
        case LOAD_FEATURED_PRODUCTS:
            productCatalog = {...state, featuredProducts: action.payload.products};  
            return productCatalog;
        case LOAD_BEST_SELLING_PRODUCTS:
            productCatalog = {...state, bestSellingProducts: action.payload.products};  
            return productCatalog;
        case LOAD_CATALOG_PRODUCTS:
            productCatalog = {...state, queryProducts: action.payload.products};  
            return productCatalog;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default catalogReducer;