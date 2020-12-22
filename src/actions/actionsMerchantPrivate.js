import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_MERCHANT_PROFILE,
    UPDATE_MERCHANT_PROFILE,
    ERROR
} from "./actionTypes";

export const fetchMerchantProfile = () => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getMerchantDetails();
            dispatch(gotMerchantProfile(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const gotMerchantProfile = (merchantData) => {
    return ({
        type: LOAD_MERCHANT_PROFILE,
        payload: merchantData
    })
};


export const updateMerchantProfile = ({ updatedValues }) => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.updateMerchantDetails(updatedValues);
            dispatch(updateMerchantSuccess(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const updateMerchantSuccess = (merchantData) => {
    return ({
        type: UPDATE_MERCHANT_PROFILE,
        payload: merchantData
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};