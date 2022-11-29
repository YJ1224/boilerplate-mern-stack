import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Empty } from 'antd';
//2022.11.29 : 카트 정보 가져오는 actions
import {getCartItems, removeCartItem} from "../../../_actions/user_actions"
//2022.11.29 : 카트 UI 컴포넌트 가져오기
import UserCardBlock from './Sections/UserCardBlock'
//2022.11.28 : 상품상세페이지 컴포넌트 생성
function CartPage(props) {
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch();
    const [showTotal, setShowTotal] = useState(false)
    //2022.11.29 : 상품상세페이지에 필요한 데이터 가져오기
    useEffect(() => {
        let cartItems = [];
        //redux에서 카트 정보가 있을경우
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0){
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems,props.user.userData.cart))
                .then(res => {calculateTotal(res.payload)})
            }
        }
    },[props.user.userData])
    
    //2022.11.29 : 총 금액 구하기
    let calculateTotal = (cartDetail) => {
        let total = 0

        cartDetail.map(item => {
            total += parseInt(item.price,10) * item.quantity
        })

        setTotalPrice(total)
        setShowTotal(true)
    }

    //2022.11.29 : 상품삭제 기능 추가
    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then(res => {
            if(res.payload.productInfo.length <= 0){
                setShowTotal(false)
            }
        })
    }
    return (
        <div style={{ width:'85%', margin:'3rem auto'}}>
            <h1>장바구니</h1>
            <div>
                <UserCardBlock products={props.user.cartDetail && props.user.cartDetail}
                removeItem={removeFromCart}
                />
            </div>
            {
                showTotal ?
                    <div style={{marginTop:'3rem'}}>
                        <h2>총 가격 : {totalPrice} 원</h2>
                    </div>
                : <Empty style={{marginTop:'3rem'}} description={false}/>
            }
        </div>
    )
}

export default CartPage
