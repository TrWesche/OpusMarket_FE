import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

class apiOpus {

    static async request(endpoint, verb = "get", paramsOrData = {}) {
        // console.debug("API Call:", endpoint, paramsOrData, verb);
    
        try {
          return (await axios({
            method: verb,
            // url: `${BASE_URL}/${endpoint}`,
            url: `/${endpoint}`,
            crossDomain: true,
            withCredentials: true,
            [verb === "get" ? "params" : "data"]: paramsOrData})).data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }
        
        catch(err) {
          console.error("API Error:", err.response);
          let message = err.response.data.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    // ╔═══╗╔╗ ╔╗╔════╗╔╗ ╔╗
    // ║╔═╗║║║ ║║║╔╗╔╗║║║ ║║
    // ║║ ║║║║ ║║╚╝║║╚╝║╚═╝║
    // ║╚═╝║║║ ║║  ║║  ║╔═╗║
    // ║╔═╗║║╚═╝║ ╔╝╚╗ ║║ ║║
    // ╚╝ ╚╝╚═══╝ ╚══╝ ╚╝ ╚╝
                                  
    static async loginUser(userData) {
        const res = await this.request("auth/user", "post", userData);
        return res.message;
    }
    
    static async loginMerchant(merchantData) {
        const res = await this.request("auth/merchant", "post", merchantData);
        return res.message;
    }

    static async logoutUser() {
        const res = await this.request("users/logout");
        return res.message;
    }

    static async logoutMerchant() {
        const res = await this.request("merchants/logout");
        return res.message;
    }


    // ╔╗ ╔╗╔═══╗╔═══╗╔═══╗
    // ║║ ║║║╔═╗║║╔══╝║╔═╗║
    // ║║ ║║║╚══╗║╚══╗║╚═╝║
    // ║║ ║║╚══╗║║╔══╝║╔╗╔╝
    // ║╚═╝║║╚═╝║║╚══╗║║║╚╗
    // ╚═══╝╚═══╝╚═══╝╚╝╚═╝

    static async createUser(payloadData) {
        const res = await this.request("reg/user", "post", payloadData);
        return res.message;
    }

    static async getUserDetails() {
        const res = await this.request(`users/details`);
        return res.user;
    }

    static async updateUserDetails(payloadData) {
        const res = await this.request(`users/update`, "patch", payloadData);
        return res.user;
    }

    static async deleteUser() {
        const res = await this.request(`users/delete`, "delete");
        return res.message;
    }



    // ╔═╗╔═╗╔═══╗╔═══╗╔═══╗╔╗ ╔╗╔═══╗╔═╗ ╔╗╔════╗
    // ║║╚╝║║║╔══╝║╔═╗║║╔═╗║║║ ║║║╔═╗║║║╚╗║║║╔╗╔╗║
    // ║╔╗╔╗║║╚══╗║╚═╝║║║ ╚╝║╚═╝║║║ ║║║╔╗╚╝║╚╝║║╚╝
    // ║║║║║║║╔══╝║╔╗╔╝║║ ╔╗║╔═╗║║╚═╝║║║╚╗║║  ║║  
    // ║║║║║║║╚══╗║║║╚╗║╚═╝║║║ ║║║╔═╗║║║ ║║║ ╔╝╚╗ 
    // ╚╝╚╝╚╝╚═══╝╚╝╚═╝╚═══╝╚╝ ╚╝╚╝ ╚╝╚╝ ╚═╝ ╚══╝ 

    // Private Routes
    static async createMerchant(payloadData) {
        const res = await this.request("reg/merchant", "post", payloadData);
        return res.message;
    }

    static async getMerchantDetails() {
        const res = await this.request(`merchants/profile`);
        return res.merchant;
    }

    static async updateMerchantDetails(payloadData) {
        const res = await this.request(`merchants/update`, "patch", payloadData);
        return res.merchant;
    }

    static async deleteMerchant() {
        const res = await this.request(`merchants/delete`, "delete");
        return res.message;
    }


    
    static async createMerchantAbout(payloadData) {
        const res = await this.request(`merchants/about`, "post", payloadData);
        return res.about;
    }

    static async getMerchantAbout() {
        const res = await this.request(`merchants/about`);
        return res.about;
    }

    static async updateMerchantAbout(payloadData) {
        const res = await this.request(`merchants/about`, "patch", payloadData);
        return res.about;
    }

    static async deleteMerchantAbout() {
        const res = await this.request(`merchants/about`, "delete");
        return res.message;
    }

    // Public Routes

    static async getMerchantList(queryParams) {
        const res = await this.request(`merchants${queryParams}`);
        return res;
    }

    static async getMerchantByID(merchantId) {
        const res = await this.request(`merchants/${merchantId}`);
        return res.merchant;
    }

    

    // ╔═══╗╔═══╗╔═══╗╔═══╗╔╗ ╔╗╔═══╗╔════╗╔═══╗
    // ║╔═╗║║╔═╗║║╔═╗║╚╗╔╗║║║ ║║║╔═╗║║╔╗╔╗║║╔═╗║
    // ║╚═╝║║╚═╝║║║ ║║ ║║║║║║ ║║║║ ╚╝╚╝║║╚╝║╚══╗
    // ║╔══╝║╔╗╔╝║║ ║║ ║║║║║║ ║║║║ ╔╗  ║║  ╚══╗║
    // ║║   ║║║╚╗║╚═╝║╔╝╚╝║║╚═╝║║╚═╝║ ╔╝╚╗ ║╚═╝║
    // ╚╝   ╚╝╚═╝╚═══╝╚═══╝╚═══╝╚═══╝ ╚══╝ ╚═══╝

                  
    // Create Routes
    static async createProduct(payloadData) {
        const res = await this.request("products/new", "post", payloadData);
        return res.product;
    }

    static async addProductImage(productId, payloadData) {
        const res = await this.request(`products/${productId}/new/img`, "post", payloadData);
        return res.product_images;
    }

    static async addProductMeta(productId, payloadData) {
        const res = await this.request(`products/${productId}/new/meta`, "post", payloadData);
        return res.product_metas;
    }

    static async addProductPromotion(productId, payloadData) {
        const res = await this.request(`products/${productId}/new/promotion`, "post", payloadData);
        return res.product_promotions;
    }

    static async addProductModifier(productId, payloadData) {
        const res = await this.request(`products/${productId}/new/modifier`, "post", payloadData);
        return res.product_modifiers;
    }

    static async addProductCoupon(productId, payloadData) {
        const res = await this.request(`products/${productId}/new/coupon`, "post", payloadData);
        return res.product_coupons;
    }

    static async addProductReview(productId, payloadData) {
        const res = await this.request(`products/${productId}/new/review`, "post", payloadData);
        return res.product_reviews;
    }

    
    // Read Routes
    static async getProducts(queryParams) {
        const res = await this.request(`products/catalog${queryParams}`);
        return res;
    }

    static async getProductDetails(productId) {
        const res = await this.request(`products/catalog/${productId}`);
        return res.product;
    }

    static async getProductCouponByCode(productId, couponCode) {
        const res = await this.request(`products/${productId}/coupon/${couponCode}`);
        return res;
    }


    // Update Routes
    static async updateProduct(productId, payloadData) {
        const res = await this.request(`products/${productId}`, "patch", payloadData);
        return res.company;
    }
    
    static async updateProductImage(productId, imageId, payloadData) {
        const res = await this.request(`products/${productId}/img/${imageId}`, "patch", payloadData);
        return res.company;
    }

    static async updateProductMeta(productId, metaId, payloadData) {
        const res = await this.request(`products/${productId}/meta/${metaId}`, "patch", payloadData);
        return res.company;
    }

    static async updateProductPromotion(productId, promotionId, payloadData) {
        const res = await this.request(`products/${productId}/promotion/${promotionId}`, "patch", payloadData);
        return res.company;
    }

    static async updateProductCoupon(productId, couponId, payloadData) {
        const res = await this.request(`products/${productId}/coupon/${couponId}`, "patch", payloadData);
        return res.company;
    }

    static async updateProductModifier(productId, modifierId, payloadData) {
        const res = await this.request(`products/${productId}/modifier/${modifierId}`, "patch", payloadData);
        return res.company;
    }

    static async updateProductReview(productId, reviewId, payloadData) {
        const res = await this.request(`products/${productId}/review/${reviewId}`, "patch", payloadData);
        return res.company;
    }


    // Delete Routes
    static async deleteProduct(productId) {
        const res = await this.request(`products/${productId}`, "delete");
        return res.message;
    }                       

    static async deleteProductImage(productId, imageId) {
        const res = await this.request(`products/${productId}/img/${imageId}`, "delete");
        return res.message;
    }       

    static async deleteProductMeta(productId, metaId) {
        const res = await this.request(`products/${productId}/meta/${metaId}`, "delete");
        return res.message;
    }       

    static async deleteProductPromotion(productId, promotionId) {
        const res = await this.request(`products/${productId}/promotion/${promotionId}`, "delete");
        return res.message;
    }       

    static async deleteProductCoupon(productId, couponId) {
        const res = await this.request(`products/${productId}/coupon/${couponId}`, "delete");
        return res.message;
    }  

    static async deleteProductModifier(productId, modifierId) {
        const res = await this.request(`products/${productId}/modifier/${modifierId}`, "delete");
        return res.message;
    }  

    static async deleteProductReview(productId, reviewId) {
        const res = await this.request(`products/${productId}/review/${reviewId}`, "delete");
        return res.message;
    }  



    // ╔═══╗╔═══╗╔════╗╔╗ ╔╗╔═══╗╔═══╗╔══╗╔═╗ ╔╗╔═══╗╔═══╗
    // ║╔═╗║║╔═╗║║╔╗╔╗║║║ ║║║╔══╝║╔═╗║╚╣╠╝║║╚╗║║║╔═╗║║╔═╗║
    // ║║ ╚╝║║ ║║╚╝║║╚╝║╚═╝║║╚══╗║╚═╝║ ║║ ║╔╗╚╝║║║ ╚╝║╚══╗
    // ║║╔═╗║╚═╝║  ║║  ║╔═╗║║╔══╝║╔╗╔╝ ║║ ║║╚╗║║║║╔═╗╚══╗║
    // ║╚╩═║║╔═╗║ ╔╝╚╗ ║║ ║║║╚══╗║║║╚╗╔╣╠╗║║ ║║║║╚╩═║║╚═╝║
    // ╚═══╝╚╝ ╚╝ ╚══╝ ╚╝ ╚╝╚═══╝╚╝╚═╝╚══╝╚╝ ╚═╝╚═══╝╚═══╝

    // Create Routes
    static async createGathering(payloadData) {
        const res = await this.request("gatherings/new", "post", payloadData);
        return res.gathering;
    }

    static async addGatheringMerchants(gatheringId, payloadData) {
        const res = await this.request(`gatherings/${gatheringId}/new/merchant`, "post", payloadData);
        return res.gathering_merchants;
    }

    static async addGatheringImage(gatheringId, payloadData) {
        const res = await this.request(`gatherings/${gatheringId}/new/img`, "post", payloadData);
        return res.gathering_images;
    }

    static async getGatheringDetails(gatheringId) {
        const res = await this.request(`gatherings/${gatheringId}`);
        return res.gathering;
    }

    static async getMerchantGatherings(merchantId) {
        const res = await this.request(`gatherings/merch/${merchantId}`);
        return res.gatherings;
    }

    static async updateGathering(gatheringId, payloadData) {
        const res = await this.request(`gatherings/${gatheringId}/update`, "patch", payloadData);
        return res.gathering;
    }

    static async deleteGathering(gatheringId) {
        const res = await this.request(`gatherings/${gatheringId}`, "delete");
        return res.message;
    }

    static async deleteGatheringMerchant(gatheringId, merchantId) {
        const res = await this.request(`gatherings/${gatheringId}/merchant/${merchantId}`, "delete");
        return res.message;
    }

    static async deleteGatheringImage(gatheringId, imageId) {
        const res = await this.request(`gatherings/${gatheringId}/img/${imageId}`, "delete");
        return res.message;
    }


    // ╔═══╗╔═══╗╔═══╗╔═══╗╔═══╗
    // ║╔═╗║║╔═╗║╚╗╔╗║║╔══╝║╔═╗║
    // ║║ ║║║╚═╝║ ║║║║║╚══╗║╚═╝║
    // ║║ ║║║╔╗╔╝ ║║║║║╔══╝║╔╗╔╝
    // ║╚═╝║║║║╚╗╔╝╚╝║║╚══╗║║║╚╗
    // ╚═══╝╚╝╚═╝╚═══╝╚═══╝╚╝╚═╝
                             
    // Create Routes
    static async createNewOrder(orderData) {
        const res = await this.request(`orders/new`, "post", orderData);
        return res.order;
    }

    // Get Single Order Details
    static async getOrderDetails(orderId) {
        const res = await this.request(`orders/${orderId}`);
        return res;
    }
    
    // Get All User's Orders
    static async getUserOrders() {
        const res = await this.request(`orders/history`);
        return res;
    }


    // Pay Routes
    static async processPaymentSquare(data) {
        const res = await this.request(`sqpay/process-payment`, "post", data);
        return res;
    }

}

export default apiOpus;