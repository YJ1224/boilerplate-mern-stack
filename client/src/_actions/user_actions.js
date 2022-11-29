import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    //2022.11.28 : 장바구니 담기 액션 추가
    ADD_TO_CART,
    //2022.11.29 : 장바구니 정보 가져오는 액션 추가
    GET_CART_ITEMS,
    //2022.11.29 : 장바구니 삭제 액션 추가
    REMOVE_CART_ITEM
    
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

//2022.11.28 : 장바구니 담기 액션 추가
export function addToCart(id){
    let body = {
        productId : id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`,body)
    .then(response => response.data);
    return {
        type: ADD_TO_CART,
        payload: request
    }
}

//2022.11.29 : 장바구니 페이지에 뿌려줄 데이터 가져오기
export function getCartItems(cartItems, userCart){
    const request = axios.get(`/api/product/productId?id=${cartItems}&type=array`)
    .then(response => {
            //cartItems 정보들을 product 콜렉션에서 가져옴 -> quantity 정보를 넣어줌
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id){
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            });

            return response.data;
        });
    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

//2022.11.29 : 장바구니 상품삭제
export function removeCartItem(productId){
    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
    .then(response => {
            //productInfo, cart 정보를 조합해서 cartDatail 생성

            response.data.cart.forEach(item => {
                response.data.productInfo.forEach((product, index) => {
                    if(item.id === product._id){
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });
    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

