import apiOpus from "../utils/apiOpusMarket";
import {
    CREATE_NEW_ORDER,
    READ_ORDER_DATA,
    ERROR
} from "./actionTypes";

export const fetchOrderData = (orderId) => {
    return async function (dispatch) {
        try {
            const data = await apiOpus.getOrderDetails(orderId);
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

export const createOrder = (productList) => {
    // Takes list of products in the cart and converts them to the necessary format for the backend
    // as shown below.
    //
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
    const products = productList.map(product => {
        const retObject = {
            id: product.id,
            quantity: product.quantity
        };

        if (product.modifier_id) {
            retObject.modifier_id = product.modifier_id;
        }

        if (product.coupon_id) {
            retObject.coupon_id = product.coupon_id;
        }
        
        return retObject;
    }) 

    const orderData = {
        order: {
            products: products
        }
    }

    // console.log(orderData);

    return async function (dispatch) {
        try {
            const data = await apiOpus.createNewOrder(orderData);
            // const { data } = await axios.post(`${BASE_URL}/orders/new`, orderData);
            console.log("From API Call:", data)
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
