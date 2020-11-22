import axios from 'axios';
import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_IN_CART,
    REMOVE_PRODUCT_FROM_CART,
    APPLY_COUPON_TO_PRODUCT,
    CREATE_NEW_ORDER,
    READ_ORDER_DATA,
    ERROR
} from "./actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

export const addProductToCart = (quantity, product) => {
    const qty = +quantity;
    return ({
        type: ADD_PRODUCT_TO_CART,
        payload: {...product, qty}
    })
}

export const updateProductInCart = (quantity, product) => {
    const qty = +quantity;
    return ({
        type: UPDATE_PRODUCT_IN_CART,
        payload: {...product, qty}
    })
}

export const removeProductFromCart = (productId) => {
    return({
        type: REMOVE_PRODUCT_FROM_CART,
        id: productId
    })
}

export const fetchOrderData = (orderId) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`);
            dispatch(gotOrderData(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
}

const gotOrderData = (orderData) => {
    return ({
        type:  READ_ORDER_DATA,
        payload: orderData
    })
}


export const fetchCouponData = (prodId, couponCode) => {
    // Takes couponCode and product ID from cart and user input
    // and pulls the coupon information from the backend for user display
    // and couponID appending to the cart data.  This couponID is later
    // used to verify that the selected coupon is correct for the target product
    // when creating the order.
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${BASE_URL}/products/${prodId}/coupon/${couponCode}`);
            dispatch(gotCouponData(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
}

const gotCouponData = (couponData) => {
    // Input Data Structure
    // couponData = {
    //     id: 1,
    //     code: "",
    //     pct_discount: 0.1,.
    // }
    return ({
        type: APPLY_COUPON_TO_PRODUCT,
        payload: couponData
    })
}


export const createOrder = (orderData) => {
    // Takes compiled cart information in the format:
    // { 
    //     order: {
    //         products: [
    //             {
    //                 id: 1,
    //                 quantity: 2,
    //                 modifier_id: 3,
    //                 coupon_id: 1
    //             },
    //             {
    //                 id: 2,
    //                 quantity: 1
    //             }
    //         ]
    // }
    // The returned information represents the order with the 
    // coupons, promotions, etc. applied and validated against 
    // the backend.
    return async function (dispatch) {
        try {
            const { data } = await axios.post(`${BASE_URL}/orders/new`, orderData);
            dispatch(createOrderSuccess(data));
        } catch (error) {
            dispatch(gotError());
        }
    }
}


const createOrderSuccess = (validatedOrder) => {
    // Input Data Structure
    // {
    //     order: {
    //         id: 40,
    //         user_id: 1,
    //         order_total: "59.17" --- TODO: Implement this functionality on the backend (sum of final_prices)
    //         products: [
    //             {
    //                 product_id: 1,
    //                 id: 67,
    //                 product_name: "TestProduct1_Merch1name",
    //                 quantity: 2,
    //                 base_price: "29.99",
    //                 promotion_price: "11.99",
    //                 coupon_discount: "0.2",
    //                 final_price: "19.84" --- TODO: Implement this functionality on the backend (promotion_price * (1-coupon_discount) * quantity)
    //                 modifier_name: "Large",
    //                 promotion: {
    //                     product_id: 1,
    //                     id: 26,
    //                     promotion_id: 1,
    //                     promotion_price: 11.99
    //                 },
    //                 coupon: {
    //                     product_id: 1,
    //                     id: 20,
    //                     coupon_id: 1,
    //                     coupon_code: "MEMORIALDAY",
    //                     pct_discount: "0.2"
    //                 }
    //             },
    //             {
    //                 product_id: 2,
    //                 id: 68,
    //                 product_name: "TestProduct2_Merch1name",
    //                 quantity: 1,
    //                 base_price: "39.99",
    //                 promotion_price: null,
    //                 coupon_discount: null,
    //                 final_price: "39.99" --- TODO: Implement this functionality on the backend (promotion_price * (1-coupon_discount) * quantity)
    //                 modifier_name: null
    //             }
    //         ]
    //     }
    // }
    return ({
        type: CREATE_NEW_ORDER,
        payload: validatedOrder
    })
}


const gotError = () => {
    return ({
        type: ERROR
    })
}
