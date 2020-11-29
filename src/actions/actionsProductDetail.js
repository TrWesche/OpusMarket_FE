import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_PRODUCT_DETAILS,
    ERROR
} from "./actionTypes";

export const fetchProductDetails = (productID) => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getProductDetails(productID);
            console.log(data);
            dispatch(gotProductDetails(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
}

const gotProductDetails = (productData) => {
    return ({
        type: LOAD_PRODUCT_DETAILS,
        payload: productData
    })
}



const gotError = () => {
    return ({
        type: ERROR
    })
}
