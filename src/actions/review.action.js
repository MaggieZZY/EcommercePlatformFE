import axios from "axios";

export const ADD_REVIEW = 'ADD_REVIEW';
export const GET_REVIEWS_BY_PRODUCT_ID = 'GET_REVIEW_BY_PRODUCT_ID';
export const SORT_REVIEWS = 'SORT_REVIEWS';
const API_URL = 'http://ec2-52-15-212-212.us-east-2.compute.amazonaws.com:8080';


export function addReview(review, success, failure) {
    const addReivewPromise = axios.post(`${API_URL}/reviews`, review, {withCredentials: true});
    addReivewPromise
        .then(res => {
            if(res.status === 200){
                success();
            }
            else{
                failure();
            }
        })
        .catch(err => {
            failure(err);
        });

    return {
        type: ADD_REVIEW,
        payload: addReivewPromise
    }
}

export function getReviewsByProductId(productId, success, failure) {
    const getReviewsByProductIdPromise = axios.get(`${API_URL}/reviews/productId/${productId}`);
    getReviewsByProductIdPromise
        .then(res => {
            if(res.status === 200){
                success(res);
            }
            else{
                failure();
            }
        })
        .catch(err => {
            failure(err);
        });

    return {
        type: GET_REVIEWS_BY_PRODUCT_ID,
        payload: getReviewsByProductIdPromise
    }
}

export function sortReviews(reviews, sort){
    if(sort === 'lowest'){
        reviews.sort((a,b) => {
            return a.generalRating - b.generalRating;
        })
    }
    else if(sort === 'highest'){
        reviews.sort((a,b) => {
            return b.generalRating - a.generalRating;
        })
    }

    return{
        type: 'SORT_REVIEWS',
        payload: reviews
    }
}
