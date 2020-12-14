import {combineReducers} from "redux";
import {authReducer} from "./auth.reducer";
import {productReducer} from "./products.reducer";
import {userdetailsReducer} from "./userdetails.reducer";
import {orderReducer} from "./orders.reducer";
import {reviewsReducer} from "./reviews.reducer";
import {orderProductReducer} from "./orderproducts.reducer";

export const rootReducer = combineReducers({
    login_user: authReducer,
    user_details: userdetailsReducer,
    products: productReducer, // reducer返回的东西赋给products
    orders: orderReducer,
    reviews: reviewsReducer,
    orderproducts: orderProductReducer
});

