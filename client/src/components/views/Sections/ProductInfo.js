import React from 'react'
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../_actions/user_actions'; //카트담기 redux actions
//2022.11.28 : 상품상세페이지 컴포넌트 생성
function ProductInfo(props) {
    const dispatch = useDispatch();
    //2022.11.28 : 장바구니 담기 누를 시 이벤트 동작
    const cartHandler = () => {
        //해당 데이터 cart필드에 저장
        dispatch(addToCart(props.detail._id))
    } 

    return (
        <div>
            <Descriptions title="상품상세정보" bordered>
                <Descriptions.Item label="상품명" span={3}>{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="상품가격" span={3}>{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="주문가능갯수" span={3}>{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="상품설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <div style={{display:'flex', justifyContent:'center', marginTop:'3rem'}}>
                <Button size='large' shape='round' type='danger' onClick={cartHandler}
                    disabled={props.detail.sold === 0}
                >
                    장바구니 담기
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
