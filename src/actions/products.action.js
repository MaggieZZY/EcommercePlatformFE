import axios from "axios";

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY';
export const GET_PRODUCTS_BY_SALES = 'GET_PRODUCTS_BY_SALES';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const SORT_PRODUCTS = 'SORT_PRODUCTS'

const API_URL = 'http://ec2-52-15-212-212.us-east-2.compute.amazonaws.com:8080';

export function getAllProducts(success, failure) {
    const getProductsByNamePromise = axios.get(`${API_URL}/products`);
    getProductsByNamePromise
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
        type: GET_ALL_PRODUCTS,
        payload: getProductsByNamePromise
    }
}

export function getProductsByCategory(categoryId, success, failure) {
    const getProductsByCategoryPromise = axios.get(`${API_URL}/products/category/${categoryId}`);
    getProductsByCategoryPromise
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
        type: GET_PRODUCTS_BY_CATEGORY,
        payload: getProductsByCategoryPromise
    }
}

export function getProductsBySales(success, failure) {
    const getProductsBySalesPromise = axios.get(`${API_URL}/products/sales`);
    getProductsBySalesPromise
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
        type: GET_PRODUCTS_BY_SALES,
        payload: getProductsBySalesPromise
    }
}


export function sortProducts(products, sort){
    if(sort === 'lowest'){
        console.log('lowest');
        products.sort((a,b) => {
            return a.price - b.price;
        })
    }
    else if(sort === 'highest'){
        console.log('highest');
        products.sort((a,b) => {
            return b.price - a.price;
        })
    }

    return{
        type: 'SORT_PRODUCTS',
        payload: products
    }
}


export function getProductById(id, success, failure) {
    const getProductByIdPromise = axios.get(`${API_URL}/products/id/${id}`);
    getProductByIdPromise
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
        type: GET_PRODUCT_BY_ID,
        payload: getProductByIdPromise
    }
}


