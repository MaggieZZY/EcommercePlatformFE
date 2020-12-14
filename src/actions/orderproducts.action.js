import axios from "axios";
export const UPDATE_REVIEW_STATUS = 'UPDATE REVIEW_STATUS';
const API_URL = 'http://ec2-52-15-212-212.us-east-2.compute.amazonaws.com:8080';

export function updateReviewStatus(orderproduct, success, failure) {
    const updateReviewStatusPromise = axios.put(`${API_URL}/orderproducts`, orderproduct, {withCredentials: true});
    updateReviewStatusPromise
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
        type: UPDATE_REVIEW_STATUS,
        payload: updateReviewStatusPromise
    }
}
