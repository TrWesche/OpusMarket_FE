import apiOpus from "../utils/apiOpusMarket";
import {
    LOAD_FEATURED_PRODUCTS,
    LOAD_BEST_SELLING_PRODUCTS,
    LOAD_CATALOG_PRODUCTS,
    ERROR
} from "./actionTypes";

export const fetchCatalogProducts = ({searchParameters, searchType}) => {
    // Expected parameters
    // s - Search String
    // t - Tag Filters
    // r - Rating Filter
    // featured - Tag as Featured Product
    //      mid - Merchant ID for Featured Product filtering
    //      site_wide - Flag for site wide filter vs. merchant specific
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

    console.log(callConstructor);

    switch (searchType) {
        case "catalog":
            return async function (dispatch) {
                try {
                    const data = await apiOpus.getProducts(callConstructor);
                    dispatch(gotCatalogProducts(data));
                } catch (error) {
                    dispatch(gotError());
                }
            };
        case "featured":
            return async function (dispatch) {
                try {
                    const data = await apiOpus.getProducts(callConstructor);
                    dispatch(gotFeaturedProducts(data));
                } catch (error) {
                    dispatch(gotError());
                }
            };
        case "bestSelling":
            return async function (dispatch) {
                try {
                    const data = await apiOpus.getProducts(callConstructor);
                    dispatch(gotBestSellingProduct(data));
                } catch (error) {
                    dispatch(gotError());
                }
            };
        default:
            return async function (dispatch) {
                dispatch(gotError());
            };
    };
};

const gotCatalogProducts = (queryProducts) => {
    return ({
        type: LOAD_CATALOG_PRODUCTS,
        payload: queryProducts
    })
};

const gotFeaturedProducts = (featuredProducts) => {
    return ({
        type: LOAD_FEATURED_PRODUCTS,
        payload: featuredProducts
    })
};

const gotBestSellingProduct = (bestSellingProducts) => {
    return ({
        type: LOAD_BEST_SELLING_PRODUCTS,
        payload: bestSellingProducts
    })
};

const gotError = () => {
    return ({
        type: ERROR
    })
};
