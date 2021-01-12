import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_MERCHANT_GATHERINGS,
    ERROR
} from "./actionTypes";

export const fetchMerchantGatherings = (merchantId) => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getMerchantGatherings(merchantId);
            dispatch(gotMerchantGatherings(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
};

const gotMerchantGatherings = (gatherings) => {
    return ({
        type: LOAD_MERCHANT_GATHERINGS,
        payload: gatherings
    })
};

const gotError = () => {
    return ({
        type: ERROR
    })
};
