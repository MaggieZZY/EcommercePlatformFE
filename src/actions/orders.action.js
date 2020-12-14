import axios from "axios";

export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS_BY_USER_ID = 'GET_ORDERS_BY_USER_ID';
export const GET_ORDER_BY_ID = 'GET_ORDER_BY_ID';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
export const UPDATE_DELIVERY_STATUS_TO_1 = 'UPDATE_DELIVERY_STATUS_TO_1';
export const UPDATE_DELIVERY_STATUS_TO_2 = 'UPDATE_DELIVERY_STATUS_TO_2';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const SORT_ORDERS = 'SORT_ORDERS';

const API_URL = 'http://ec2-52-15-212-212.us-east-2.compute.amazonaws.com:8080';

export function addOrder(order, success, failure) {
    const addOrderPromise = axios.post(`${API_URL}/orders`, order, {withCredentials: true});
    addOrderPromise
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
        type: ADD_ORDER,
        payload: addOrderPromise
    }
}

export function getOrdersByUserId(userId, success, failure) {
    const getOrdersByUserIdPromise = axios.get(`${API_URL}/orders/userId/${userId}`);
    console.log(userId);
    getOrdersByUserIdPromise
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
        type: GET_ORDERS_BY_USER_ID,
        payload: getOrdersByUserIdPromise
    }
}


export function getOrderById(id, success, failure) {
    const getOrderByIdPromise = axios.get(`${API_URL}/orders/id/${id}`);
    getOrderByIdPromise
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
        type: GET_ORDER_BY_ID,
        payload: getOrderByIdPromise
    }
}


export function getAllOrders(success, failure) {
    const getAllOrdersPromise = axios.get(`${API_URL}/orders`,{withCredentials:true});
    getAllOrdersPromise
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
        type: GET_ALL_ORDERS,
        payload: getAllOrdersPromise
    }
}


export function updateDeliveryStatusTo1(order, success, failure) {
    const updateDeliveryStatusTo1Promise = axios.put(`${API_URL}/orders`, order, {withCredentials:true});
    updateDeliveryStatusTo1Promise
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
        type: UPDATE_DELIVERY_STATUS_TO_1,
        payload: updateDeliveryStatusTo1Promise
    }
}

export function updateDeliveryStatusTo2(order, success, failure) {
    const updateDeliveryStatusTo2Promise = axios.put(`${API_URL}/orders`, order, {withCredentials:true});
    updateDeliveryStatusTo2Promise
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
        type: UPDATE_DELIVERY_STATUS_TO_2,
        payload: updateDeliveryStatusTo2Promise
    }
}



export function cancelOrder(order_id, success, failure) {
    const cancelOrderPromise = axios.delete(`${API_URL}/orders/${order_id}`, {withCredentials:true});
    cancelOrderPromise
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
        type: CANCEL_ORDER,
        payload: cancelOrderPromise
    }
}

export function sortOrders(orders, sort){
    if(sort === 'old'){
        orders.sort((a,b) => {
            return a.id - b.id;
        })
    }
    else if(sort === 'recent'){
        orders.sort((a,b) => {
            return b.id - a.id;
        })
    }

    return{
        type: SORT_ORDERS,
        payload: orders
    }
}
