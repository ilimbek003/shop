import axios from "axios";
import cookie from "cookie_js";

function get_token() {
    return cookie.get("token_opop");
}

const user = cookie.get("token_opop");

export const instance = axios.create(
    !!user
        ? {
            baseURL: `http://141.8.194.166`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",

                Authorization: `Bearer ${get_token()}`,
            },
        }
        : {
            baseURL: `http://141.8.194.166`,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json; charset=UTF-8",
            },
        }
);

export const Auth = {
    postLogin(data) {
        return instance
            .post("/auth/login/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    sendRegData(data) {
        return instance
            .post("/auth/register/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    sendVerifyData(data) {
        return instance
            .post("/auth/user-verify/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    sendCode(data) {
        return instance
            .post("/auth/send_code/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    forgotPassword(data) {
        return instance
            .patch("/auth/set_new_password/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    resetPassword(data) {
        return instance
            .patch("/auth/set_new_password/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },
};

export const Profile = {
    getProfileData() {
        return instance
            .get("/auth/detail_profile/")
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getPurchaseInfo() {
        return instance
            .get("/auth/purchase_info/")
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getOrderHistory(data) {
        return instance
            .get(`/payments/ordering_list/${data ? data : ""}`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getOrderDetails(id) {
        return instance
            .get(`/payments/ordering_detail/${id}/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getPaymentHistory() {
        return instance
            .get("/payments/payment_list/")
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    updateProfile(data) {
        return instance
            .patch("/auth/update_profile/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getFavoriteList(data) {
        return instance
            .get(`/auth/favorites_list/${data ? data : ""}`)
            .then((response) => response)
            .catch((error) => error.response);
    },

    addOrDeleteToFavorites(id) {
        return instance
            .patch("/auth/favorites_add_delete/", id)
            .then((response) => response)
            .catch((error) => error.response);
    },

    changePhone(data) {
        return instance
            .patch("/auth/set_new_phone/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    changePassword(data) {
        return instance
            .patch("/auth/change_password/", data)
            .then((response) => response)
            .catch((error) => error.response);
    },
};

export const Products = {
    getProductsByURL(data) {
        return instance
            .get(data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getProducts(search) {
        return instance
            .get(`/products/product_list/${search ? search : ""}`)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getProductsPromotion() {
        return instance
            .get(`/products/is_promotion`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getProductsHotSelling() {
        return instance
            .get(`/products/product_selling`)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getNewProducts() {
        return instance
            .get(`/products/product_list/?is_new=true`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getCategories() {
        return instance
            .get("/products/category_list/")
            .then((response) => response.data.results)
            .catch((error) => error.response);
    },

    getProductDetails(id) {
        return instance
            .get(`/products/product_detail/${id}/`)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getProductReviews(id) {
        return instance
            .get(`/products/review_product_list/${id}/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getProductReviewImages(id) {
        return instance
            .get(`/products/review_images/${id}/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getBreadcrumbs(id) {
        return instance
            .get(`/products/category_breadcrumbs/${id}/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    addReview(data) {
        return instance
            .post(`/products/review_product_add/`, data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getCartList() {
        return instance
            .get(`/products/cart_list/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    addToCart(data) {
        return instance
            .post(`/products/cart_create/`, data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    changeCart(id, data) {
        return instance
            .patch(`/products/cart_update/${id}`, data)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    deleteProductFromCart(id) {
        return instance
            .delete(`/products/cart_delete/${id}`)
            .then((response) => ({response: response, id: id}))
            .catch((error) => error.response);
    },
};

export const Order = {
    createOrder(data) {
        return instance
            .post(`payments/ordering_create/`, data)
            .then((response) => response)
            .catch((error) => error.response);
    },
};

export const Main = {
    getBanners() {
        return instance
            .get(`business/banner_list/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getCurrencyList() {
        return instance
            .get(`products/currency_list/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getArticles() {
        return instance
            .get(`/articles/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    getArticleDetails(id) {
        return instance
            .get(`/articles/${id}/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },

    subscribeMail(data) {
        return instance
            .post(`/mailings/subscriber_add/`, data)
            .then((response) => response)
            .catch((error) => error.response);
    },

    getCities() {
        return instance
            .get(`/products/cities/`)
            .then((response) => response.data)
            .catch((error) => error.response);
    },
};
