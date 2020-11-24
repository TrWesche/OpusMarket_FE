import {
    LOAD_CATALOG_PRODUCTS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const catalogReducer = (state = INITIAL_STATE, action) => {
    let productCatalog;
    switch (action.type){
        case LOAD_CATALOG_PRODUCTS:
            productCatalog = {...state, ...action.payload};  
            return productCatalog;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default catalogReducer;