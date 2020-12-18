import {
    LOAD_MERCHANT_LIST,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const merchantBrowse = (state = INITIAL_STATE, action) => {
    let merchantList;
    switch (action.type){
        case LOAD_MERCHANT_LIST:
            merchantList = {...state, merchants: action.payload.merchants};  
            return merchantList;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default merchantBrowse;