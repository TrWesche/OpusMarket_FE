import {
    LOAD_MERCHANT_GATHERINGS,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};

const gatheringReducer = (state = INITIAL_STATE, action) => {
    let gatheringData;
    switch (action.type){
        case LOAD_MERCHANT_GATHERINGS:
            gatheringData = {...state, gatherings: action.payload}    
            return gatheringData;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default gatheringReducer;