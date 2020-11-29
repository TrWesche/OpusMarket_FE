import apiOpus from "../utils/apiOpusMarket";
import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_QUANTITY,
    REMOVE_PRODUCT_FROM_CART,
    APPLY_COUPON_TO_PRODUCT,
    ERROR
} from "./actionTypes";

export const addProductToCart = (quantity, product) => {
    const qty = +quantity;
    return ({
        type: ADD_PRODUCT_TO_CART,
        payload: {...product, quantity: qty}
    })
}

export const updateProductQuantity = (quantity, productId) => {
    const qty = +quantity;
    return ({
        type: UPDATE_PRODUCT_QUANTITY,
        payload: {id: productId, quantity: qty}
    })
}

export const removeProductFromCart = (productId) => {
    return({
        type: REMOVE_PRODUCT_FROM_CART,
        id: productId
    })
}

export const fetchCouponData = (productId, couponCode) => {
    // Takes couponCode and product ID from cart and user input
    // and pulls the coupon information from the backend for user display
    // and couponID appending to the cart data.  This couponID is later
    // used to verify that the selected coupon is correct for the target product
    // when creating the order.
    return async function (dispatch) {
        try {
            const data = await apiOpus.getProductCouponByCode(productId, couponCode);
            dispatch(gotCouponData(productId, data.product_coupon));
        } catch (error) {
            dispatch(gotError());
        }
    }
}

const gotCouponData = (id, couponData) => {
    // Input Data Structure
    // couponData = {
    //     id: 1,
    //     code: "",
    //     pct_discount: 0.1,.
    // }
    return ({
        type: APPLY_COUPON_TO_PRODUCT,
        payload: {id, couponData}
    })
}

const gotError = () => {
    return ({
        type: ERROR
    })
}
