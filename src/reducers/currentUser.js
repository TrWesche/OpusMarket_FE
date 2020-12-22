import {
    LOAD_USER_PROFILE,
    UPDATE_USER_PROFILE,
    LOAD_MERCHANT_PROFILE,
    UPDATE_MERCHANT_PROFILE,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {};


const currentUser = (state = INITIAL_STATE, action) => {
    let currentUser;
    switch (action.type){
        case LOAD_USER_PROFILE:
            currentUser = {...action.payload};  
            return currentUser;
        case UPDATE_USER_PROFILE:
            currentUser = {...action.payload};  
            return currentUser;
        case LOAD_MERCHANT_PROFILE:
            currentUser = {...action.payload};  
            return currentUser;
        case UPDATE_MERCHANT_PROFILE:
            currentUser = {...action.payload};  
            return currentUser;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default currentUser;