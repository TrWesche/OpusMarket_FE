import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_MERCHANT_DETAILS,
    LOAD_MERCHANT_LIST,
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


export const fetchMerchantList = ({ searchParameters }) => {
    // Expected parameters
    // s - Search String (Name Search)
    // mid - Merchant ID search
    // featured - Tag as Featured Product
    const searchKeys = Object.keys(searchParameters);

    let callConstructor = ""

    if (searchKeys.length) {
        callConstructor = callConstructor + '?';
    }

    for (let i = 0; i < searchKeys.length; i++) {
        callConstructor = `${callConstructor}${searchKeys[i]}=${searchParameters[searchKeys[i]]}`;
        if(i < (searchKeys.length - 1)) {
            callConstructor = callConstructor + '&';
        }
    }

    return async function (dispatch) {
        try {
            const data = await apiOpus.getMerchantList(callConstructor);
            dispatch(gotMerchantList(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const gotMerchantList = (merchantList) => {
    return ({
        type: LOAD_MERCHANT_LIST,
        payload: merchantList
    })
};


const gotError = () => {
    return ({
        type: ERROR
    })
};