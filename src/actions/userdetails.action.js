import axios from "axios";

export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_ALL_USER_DETAILS  = 'GET_ALL_USER_DETAILS';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const ADD_USER_DETAILS = 'ADD_USER_DETAILS';

const API_URL = 'http://ec2-52-15-212-212.us-east-2.compute.amazonaws.com:8080';

export function getUserDetails(user_id, success, failure) {
    const getUserDetailsPromise = axios.get(`${API_URL}/user-details/${user_id}`);
    getUserDetailsPromise
        .then(res => {
            if(res.status === 200){
                success(res);
            }
            else{
                failure(res);
            }
        })
        .catch(err => {
            failure(err);
        });

    return {
        type: GET_USER_DETAILS,
        payload: getUserDetailsPromise
    }
}

export function getAllUserDetails(success, failure) {
    const getAllUserDetailsPromise = axios.get(`${API_URL}/user-details`);
    getAllUserDetailsPromise
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
        type: GET_ALL_USER_DETAILS,
        payload: getAllUserDetailsPromise
    }
}

export function updateUserDetails(user_details, success, failure) {
    const updateUserDetailsPromise = axios.put(`${API_URL}/user-details`, user_details,{withCredentials:true});
    updateUserDetailsPromise
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
        type: UPDATE_USER_DETAILS,
        payload: updateUserDetailsPromise
    }
}


export function addUserDetails(user_details, success, failure) {
    const addUserDetailsPromise = axios.post(`${API_URL}/user-details`, user_details);
    addUserDetailsPromise
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
        type: ADD_USER_DETAILS,
        payload: addUserDetailsPromise
    }
}
