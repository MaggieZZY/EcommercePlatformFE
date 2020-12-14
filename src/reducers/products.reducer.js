import {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_BY_SALES,
    SORT_PRODUCTS
} from "../actions/products.action";

export const productReducer = (state=null, action) => {
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return action.payload.data;
        case GET_PRODUCTS_BY_CATEGORY:
            return action.payload.data;
        case GET_PRODUCTS_BY_SALES:
            return action.payload.data;
        case GET_PRODUCT_BY_ID:
            return action.payload.data;
        case SORT_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
}
