import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_USER_PROFILE,
    UPDATE_USER_PROFILE,
    ERROR
} from "./actionTypes";

export const fetchUserProfile = () => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getUserDetails();
            dispatch(gotUserProfile(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const gotUserProfile = (userData) => {
    return ({
        type: LOAD_USER_PROFILE,
        payload: userData
    })
};


export const updateUserProfile = ({ updateValues }) => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.updateUserDetails(updateValues);
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const updateUserSuccess = (userData) => {
    return ({
        type: UPDATE_USER_PROFILE,
        payload: userData
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};