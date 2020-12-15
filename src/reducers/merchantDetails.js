import {
    LOAD_MERCHANT_DETAILS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const merchantDetails = (state = INITIAL_STATE, action) => {
    let merchantDetails;
    switch (action.type){
        case LOAD_MERCHANT_DETAILS:
            merchantDetails = {...action.payload};  
            return merchantDetails;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default merchantDetails;