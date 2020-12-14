import {ADD_REVIEW, GET_REVIEWS_BY_PRODUCT_ID, SORT_REVIEWS} from "../actions/review.action";


export const reviewsReducer = (state=null, action) => {
    switch(action.type){
        case ADD_REVIEW:
            return action.payload.data;
        case GET_REVIEWS_BY_PRODUCT_ID:
            return action.payload.data;
        case SORT_REVIEWS:
            return action.payload;
        default:
            return state;
    }
}
