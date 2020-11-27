import {
    ADD_PRODUCT_TO_CART,
    UPDATE_PRODUCT_QUANTITY,
    REMOVE_PRODUCT_FROM_CART,
    APPLY_COUPON_TO_PRODUCT,
    CREATE_NEW_ORDER,
    READ_ORDER_DATA,
    ERROR
} from "../actions/actionTypes";

const INITIAL_STATE = {products: []};

const cartReducer = (state = INITIAL_STATE, action) => {
    let id;
    let quantity;
    let checkCart;
    let updatedCart;

    let productList;
    let tempProducts;
    switch (action.type){
        case ADD_PRODUCT_TO_CART:
            // Retrieve unique identified from incoming item
            id = action.payload.id;
            quantity = action.payload.quantity;
            
            // Check if incoming item is in the cart already, if not add to the cart
            checkCart = state.products.findIndex((product) => product.id === id);
            if (checkCart === -1) {
                return {...state, products: [...state.products, action.payload]};;
            }

            // If is in cart already increment the cart quantity by payload quantity
            updatedCart = state.products.map((product, idx) => {
                if (idx === checkCart) {
                    return {...product, quantity: product.quantity + quantity};
                }
                return product;
            });
            return {...state, products: [...updatedCart]};
        case UPDATE_PRODUCT_QUANTITY:
            tempProducts = state.products.map(product => {
                if (product.id === action.payload.id) {
                    return {...product, quantity: action.payload.quantity};
                }
                return product;
            });
            productList = {...state, products: tempProducts};  
            return productList;
        case REMOVE_PRODUCT_FROM_CART:
            tempProducts = state.products.filter(product => product.id !== action.id);
            productList = {...state, products: tempProducts};
            return productList;
        case APPLY_COUPON_TO_PRODUCT:
            tempProducts = state.products.map(product => {
                if (product.id === action.payload.id) {
                    return {...product, 
                        coupon_discount: action.payload.couponData.pct_discount,
                        coupon_id: action.payload.couponData.id,
                        coupon_code: action.payload.couponData.code};
                }
                return product;
            });
            productList = {...state, products: tempProducts}
            return productList;
        case CREATE_NEW_ORDER:
            productList = {...state, products: action.payload}    
            return productList;
        case READ_ORDER_DATA:
            productList = {...state, products: action.payload}
            return productList;
        case ERROR:
            return {...state, error: true};
        default:
            return state;
    }
}

export default cartReducer;