import {Products} from "../../api";

let initialState = {
    catalog: {},
    products_hot_selling: "",
    products_promotion: {isLoading: false},
    new_products: "",
    categories: "",
    details: "",
    reviews: "",
    review_images: "",
    cart_list: "",
    deleted_product_from_cart: {
        open: false,
        message: "",
        severity: "",
    },
    updated_cart: "",
    added_review: "",
    added_product_to_cart: "",
    byNow: false,
    breadcrumbs: {},
    isLoading: true,
    products_count: 0,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING_PRODUCT": {
            return {
                ...state,
                isLoading: action.data,
            };
        }

        case "SET_PRODUCT_LIST": {
            return {
                ...state,
                catalog: action.data,
            };
        }

        case "SET_PRODUCTS_COUNT": {
            return {
                ...state,
                products_count: action.data,
            };
        }

        case "SET_PRODUCT_LIST_NEXT": {
            return {
                ...state,
                catalog: {
                    data: {
                        ...action.data.data,
                        results: [
                            ...state.catalog.data.results,
                            ...action.data.data.results,
                        ],
                    },
                },
            };
        }

        case "SET_BY_NOW": {
            return {
                ...state,
                byNow: action.data,
            };
        }

        case "SET_PRODUCTS_PROMOTION": {
            return {
                ...state,
                products_promotion: action.data,
                isLoading: action.data.isLoading,
            };
        }

        case "SET_PRODUCTS_PROMOTION_NEXT": {
            return {
                ...state,
                products_promotion: {
                    data: {
                        ...action.data.data,
                        results: [
                            ...state.products_promotion.data.results,
                            ...action.data.data.results,
                        ],
                    },
                },
                isLoading: action.data.isLoading,
            };
        }

        case "SET_NEW_PRODUCTS": {
            return {
                ...state,
                new_products: action.data,
                isLoading: action.data.isLoading,
            };
        }

        case "SET_NEW_PRODUCTS_NEXT": {
            return {
                ...state,
                new_products: {
                    data: {
                        ...action.data.data,
                        results: [
                            ...state.new_products.data.results,
                            ...action.data.data.results,
                        ],
                    },
                },
                isLoading: action.data.isLoading,
            };
        }

        case "SET_PRODUCT_HOT_SELLING": {
            return {
                ...state,
                products_hot_selling: action.data,
                isLoading: action.data.isLoading,
            };
        }

        case "SET_PRODUCT_HOT_SELLING_NEXT": {
            return {
                ...state,
                products_hot_selling: {
                    data: {
                        ...action.data.data,
                        results: [
                            ...state.products_hot_selling.data.results,
                            ...action.data.data.results,
                        ],
                    },
                },
                isLoading: action.data.isLoading,
            };
        }

        case "SET_CATEGORIES_LIST": {
            return {
                ...state,
                categories: action.data,
            };
        }

        case "SET_PRODUCT_DETAILS": {
            return {
                ...state,
                details: action.data,
            };
        }

        case "SET_PRODUCT_REVIEWS": {
            return {
                ...state,
                reviews: action.data,
            };
        }

        case "SET_PRODUCT_REVIEW_IMAGES": {
            return {
                ...state,
                review_images: action.data,
            };
        }

        case "SET_CART_LIST": {
            return {
                ...state,
                cart_list: action.data,
            };
        }

        case "SET_UPDATED_CART": {
            return {
                ...state,
                updated_cart: action.data,
            };
        }

        case "SET_DELETED_PRODUCT_FROM_CART": {
            return {
                ...state,
                deleted_product_from_cart: action.data,
            };
        }

        case "SET_ADDED_REVIEW": {
            return {
                ...state,
                added_review: action.data,
            };
        }

        case "SET_ADDED_PRODUCT_TO_CART": {
            return {
                ...state,
                added_product_to_cart: action.data,
            };
        }

        case "SET_BREADCRUMBS": {
            return {
                ...state,
                breadcrumbs: action.data,
            };
        }

        default:
            return state;
    }
};

export const setLoadingProduct = (data) => ({
    type: "SET_LOADING_PRODUCT",
    data: data,
});

export const setProducts = (data) => ({
    type: "SET_PRODUCT_LIST",
    data: data,
});

export const setProductsByURL = (data) => ({
    type: "SET_PRODUCT_LIST_NEXT",
    data: data,
});

export const setByNow = (data) => ({
    type: "SET_BY_NOW",
    data: data,
});

export const setProductsPromotion = (data) => ({
    type: "SET_PRODUCTS_PROMOTION",
    data: data,
});

export const setProductsPromotionNext = (data) => ({
    type: "SET_PRODUCTS_PROMOTION_NEXT",
    data: data,
});

export const setNewProducts = (data) => ({
    type: "SET_NEW_PRODUCTS",
    data: data,
});

export const setNewProductsNext = (data) => ({
    type: "SET_NEW_PRODUCTS_NEXT",
    data: data,
});

export const setProductsHotSelling = (data) => ({
    type: "SET_PRODUCT_HOT_SELLING",
    data: data,
});

export const setProductsHotSellingNext = (data) => ({
    type: "SET_PRODUCT_HOT_SELLING_NEXT",
    data: data,
});

export const setCategories = (data) => ({
    type: "SET_CATEGORIES_LIST",
    data: data,
});

export const setProductDetails = (data) => ({
    type: "SET_PRODUCT_DETAILS",
    data: data,
});

export const setProductReviews = (data) => ({
    type: "SET_PRODUCT_REVIEWS",
    data: data,
});

export const setCartList = (data) => ({
    type: "SET_CART_LIST",
    data: data,
});

export const setUpdatedCart = (data) => ({
    type: "SET_UPDATED_CART",
    data: data,
});

export const setDeletedProductFromCart = (data) => ({
    type: "SET_DELETED_PRODUCT_FROM_CART",
    data: data,
});

export const setAddedReview = (data) => ({
    type: "SET_ADDED_REVIEW",
    data: data,
});

export const setAddedToCartProduct = (data) => ({
    type: "SET_ADDED_PRODUCT_TO_CART",
    data: data,
});

export const setProductReviewImages = (data) => ({
    type: "SET_PRODUCT_REVIEW_IMAGES",
    data: data,
});

export const setBreadcrumbs = (data) => ({
    type: "SET_BREADCRUMBS",
    data: data,
});
export const setProductsCount = (data) => ({
    type: "SET_PRODUCTS_COUNT",
    data: data,
});

export const getProductsByURL = (data) => (dispatch) =>
    Products.getProductsByURL(data).then((response) =>
        dispatch(setProductsByURL(response))
    );

export const getProducts = (search) => (dispatch) =>
    Products.getProducts(search).then((response) =>
        dispatch(setProducts(response))
    );

export const getProductsCount = (search) => (dispatch) =>
    Products.getProducts(search).then((response) =>
        dispatch(setProductsCount(response.data.count))
    );

export const getProductsPromotion = () => (dispatch) =>
    Products.getProductsPromotion().then((response) =>
        dispatch(setProductsPromotion({data: response, isLoading: false}))
    );

export const getProductsPromotionCatalog = () => (dispatch) =>
    Products.getProductsPromotion().then((response) =>
        dispatch(setProducts({data: response, isLoading: false}))
    );

export const getProductsPromotionNext = (data) => (dispatch) =>
    Products.getProductsByURL(data).then((response) =>
        dispatch(setProductsPromotionNext(response))
    );

export const getNewProducts = () => (dispatch) =>
    Products.getNewProducts().then((response) =>
        dispatch(setNewProducts({data: response, isLoading: false}))
    );

export const getNewProductsNext = (data) => (dispatch) =>
    Products.getProductsByURL(data).then((response) =>
        dispatch(setNewProductsNext(response))
    );

export const addToCart = (data) => (dispatch) =>
    Products.addToCart(data).then((response) =>
        dispatch(
            setAddedToCartProduct({
                open: response.status === 200 || response.status === 201 ? false : true,
                message: response.data,
                severity: response.status,
            })
        )
    );

export const getProductsHotSelling = () => (dispatch) =>
    Products.getProductsHotSelling().then((response) =>
        dispatch(setProductsHotSelling({data: response.data, isLoading: false}))
    );

export const getProductsHotSellingNext = (next) => (dispatch) =>
    Products.getProductsByURL(next).then((response) =>
        dispatch(setProductsHotSellingNext(response))
    );

export const getProductsHotSellingCatalog = () => (dispatch) =>
    Products.getProductsHotSelling().then((response) =>
        dispatch(setProducts(response))
    );

export const getCategories = () => (dispatch) =>
    Products.getCategories().then((response) =>
        dispatch(setCategories(response))
    );

export const getProductDetails = (id) => (dispatch) =>
    Products.getProductDetails(id).then((response) =>
        dispatch(setProductDetails(response))
    );

export const getProductReviews = (id) => (dispatch) =>
    Products.getProductReviews(id).then((response) =>
        dispatch(setProductReviews(response))
    );

export const getProductReviewImages = (id) => (dispatch) =>
    Products.getProductReviewImages(id).then((response) =>
        dispatch(setProductReviewImages(response))
    );

export const getBreadcrumbs = (id) => (dispatch) =>
    Products.getBreadcrumbs(id).then((response) =>
        dispatch(setBreadcrumbs(response))
    );

export const getCartList = () => (dispatch) =>
    Products.getCartList().then((response) => dispatch(setCartList(response)));

export const changeCart = (id, data) => (dispatch) =>
    Products.changeCart(id, data).then((response) =>
        dispatch(setUpdatedCart(response))
    );

export const deleteProductFromCart = (id) => (dispatch) =>
    Products.deleteProductFromCart(id).then((response) =>
        dispatch(
            setDeletedProductFromCart({
                open: true,
                message: response.response.data,
                severity: response.response.status,
                id: response.id,
            })
        )
    );

export const addReview = (data) => (dispatch) =>
    Products.addReview(data).then((response) =>
        dispatch(
            setAddedReview({
                open: true,
                message: response.data,
                severity: response.status,
            })
        )
    );

export default auth;
