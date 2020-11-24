import axios from 'axios';
import {
    LOAD_PRODUCT_DETAILS,
    ERROR
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export const fetchProductDetails = (productID) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}/products/catalog/${productID}`);
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
