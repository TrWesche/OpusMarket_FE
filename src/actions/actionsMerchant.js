import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_MERCHANT_DETAILS,
    ERROR
} from "./actionTypes";

export const fetchMerchantDetails = (merchantID) => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getMerchantByID(merchantID);
            dispatch(gotMerchantDetails(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const gotMerchantDetails = (merchantData) => {
    return ({
        type: LOAD_MERCHANT_DETAILS,
        payload: merchantData
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};