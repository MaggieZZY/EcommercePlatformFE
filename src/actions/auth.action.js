import axios from "axios";
import qs from 'qs';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const CHECK_ACCOUNT_EXIST = 'CHECK_ACCOUNT_EXIST';

// environment.js follow same specific syntax/requirement to make it work
const API_URL = 'http://ec2-52-15-212-212.us-east-2.compute.amazonaws.com:8080'

export const login = (user, success, failure) => {
    const loginPromise = axios.post(
        `${API_URL}/login`,
        qs.stringify(user),
        {withCredentials: true});
    loginPromise
        .then(res => {
            console.log(res.data);
            if(res.data.success === true){
                success();
                // res.data.success && success();
            }
            else{
                failure();
            }
        })
        .catch(err => {
            failure();
        })

    return{
        type: LOGIN,
        payload: loginPromise
    }
};


export const signup = (user, success, failure) => {
    console.log("in sign up");
    console.log(user);
    const signupPromise = axios.post(
        `${API_URL}/users`,
        user)
    signupPromise
        .then(res => {
            console.log(res);
            if(res.data.success === true){
                success();
            }
            else{
                failure();
            }
        })
        .catch(err => {
            failure();
        })

    return{
        type: SIGNUP,
        payload: signupPromise
    }

}


export const logout = (success, failure) => {
    const logoutPromise = axios.get(
        `${API_URL}/logout`,
        {withCredentials: true})
    logoutPromise
        .then(res => {
            if(res.data.success === true){
                success();
                // res.data.success && success();
            }
            else{
                failure();
            }
        })
        .catch(err => {
            failure(err);
        })

    return{
        type: LOGOUT,
        payload: logoutPromise
    }
};


export const checkLogin = () => {
    const checkLoginPromise = axios.get(`${API_URL}/checklogin`, {withCredentials: true});
    console.log(checkLoginPromise);
    return {
        type: CHECK_LOGIN,
        payload: checkLoginPromise
    }
};

export const checkAccountExist = (username, success, failure) => {
    const checkAccountExistPromise = axios.get(
        `${API_URL}/users/username/${username}`)
    checkAccountExistPromise
        .then(res => {
            console.log(res);
            if(res.data.success){
                success(res);
            }
            else{
                failure(res);
            }
        })
        .catch(err => {
            failure(err);
        })

    return{
        type: CHECK_ACCOUNT_EXIST,
        payload: checkAccountExistPromise
    }
}

