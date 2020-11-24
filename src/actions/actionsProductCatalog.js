import axios from 'axios';
import {
    LOAD_CATALOG_PRODUCTS,
    ERROR
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export const fetchCatalogProducts = (searchParamObject = {}) => {
    // Expected parameters
    // s - Search String
    // t - Tag Filters
    // r - Rating Filter
    const searchKeys = Object.keys(searchParamObject);

    let callConstructor = `${BASE_URL}/products/catalog`;

    if (searchKeys.length) {
        callConstructor = callConstructor + '?';
    }

    for (let i = 0; i < searchKeys.length; i++) {
        callConstructor = `${callConstructor}${searchKeys[i]}=${searchParamObject.searchKeys[i]}`;
        if(i < (searchKeys.length - 1)) {
            callConstructor = callConstructor + '&';
        }
    }

    console.log(callConstructor);

    return async function (dispatch) {
        try {
            const { data } = await axios.get(callConstructor);
            dispatch(gotCatalogProducts(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
}

const gotCatalogProducts = (catalogProducts) => {
    return ({
        type: LOAD_CATALOG_PRODUCTS,
        payload: catalogProducts
    })
}


const gotError = () => {
    return ({
        type: ERROR
    })
}
