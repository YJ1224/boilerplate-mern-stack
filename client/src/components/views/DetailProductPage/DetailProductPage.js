import React, { useEffect, useState } from 'react'
import axios from 'axios'
//2022.11.28 : 상품상세 이미지 컴포넌트
import ProductImage from '../Sections/ProductImage';
//2022.11.28 : 상품상세정보 컴포넌트
import ProductInfo from '../Sections/ProductInfo';

import { Row, Col } from 'antd'
//2022.11.28 : 상품상세페이지 컴포넌트 생성
function DetailProductPage(props) {
    
    const productId = props.match.params.productId; //상품 ID
    const [product, setProduct] = useState({}); //조회된 상품상세정보
    useEffect(() => {
        axios.get('/api/product/productId?id='+productId)
        .then(res => {
            if(res.data.success){
                setProduct(res.data.product[0]);
            }else{
                alert("상품 정보를 가져오지 못햇습니다.")
            }
        })
    },[])
    return (
        <div style={{width:'100%', padding: '3rem 4rem'}}>
            
            <Row gutter={[16,16]}>
                <Col lg={12} sm={24}>
                    {/* 상품 이미지 컴포넌트 */}
                    <ProductImage detail={product}/>
                </Col>
                <Col lg={12} sm={24}>
                    {/* 상품 정보 컴포넌트 */}
                    <ProductInfo detail={product}/>
                </Col>
            </Row>
            
            
        </div>
    )
}

export default DetailProductPage
