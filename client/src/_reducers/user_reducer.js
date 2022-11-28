import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    //2022.11.28 : 장바구니 담기 액션 추가
    ADD_TO_CART
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        //2022.11.28 : 장바구니 담기 액션 추가 
        case ADD_TO_CART:
            return {
                ...state, 
                userData: {
                    ...state.userData,
                    cart : action.payload
                }
            } 
        default:
            return state;
    }
}