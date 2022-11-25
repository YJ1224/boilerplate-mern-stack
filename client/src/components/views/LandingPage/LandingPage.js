import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button, Collapse} from "antd"
import Meta from 'antd/lib/card/Meta';

//2022.11.25 : 상품 이미지 리스트 슬라이드 컴포넌트
import ImageSilder from '../../utils/ImageSilder';
//2022.11.25 : 필터 체크박스 컴포넌트
import CheckBox from '../Sections/CheckBox';
//2022.11.25 : 체크박스를 노출하기 위한 데이터
import {productItem1, productItem2} from "../Sections/Datas";

//2022.11.25 : 상품리스트페이지 추가
function LandingPage() {
    const [products, setProducts] = useState([]); //몽고 DB에서 조회된 상품리스트
    const [skip, setSkip] = useState(0) // 어디서부터 데이터를 가져올지 위치 지정(페이징 ?)
    const [limit, setLimit] = useState(8) //데이터를 몇개씩 가져올건지 지정하기 위해
    const [postSize, setPostSize] = useState(0) //조회된 리스트의 갯수를 구하기 위해

    //2022.11.25 : MongoDB에서 데이터 가져오는 api 연동
    useEffect(() => {
        let body = {
            skip : skip,
            limit : limit
        }
        getProducts(body)
    },[])

    /* 2022.11.25 : 처음 랜딩, 더보기 누를 시 api를 공통적으로 사용하기 위해
        이유 : 공통으로 분리시키지 않으면 2군데 함수에서 각각 호출해야 해서
    */
    const getProducts = (body) => {
        axios.post('/api/product/products',body)
        .then(res => {
            if(res.data.success){
                if(body.loadMore){
                    setProducts([...products, ...res.data.productInfo])
                }else{
                    setProducts(res.data.productInfo)
                }
                setPostSize(res.data.postSize)
            }else{
                alert("상품조회가 실패하였습니다.")
            }
        })
    }

    //2022.11.25 : 상품 더보기 누를 시 리스트 추가를 위해
    const loadMoreHandler = () => {
        let Skip = skip + limit;
        let body = {
            skip: Skip,
            limit: limit,
            loadMore:true
        }
        getProducts(body)
        setSkip(skip+1)
    }

    //필터를 통해 몽고디비를 다시 재조회 하기 위해
    const handleFilters = () => {

    }
    //상품정보 card를 보여주기 위해
    const renderCards = products.map((item,index) => {
        return <Col lg={6} md={8} sm={24} key={index}>
            <Card 
                cover={<ImageSilder images={item.images}/>}
            >
            <Meta 
                title={item.title}
                price={item.price}
                
            />
            </Card>
        </Col>
    })

    return (
        <div style={{ width:'75%', margin:'3rem auto'}}>
             <div style={{ textAlign: 'center'}}>
                <h2>상품 리스트<Icon type="rocket"/></h2>
            </div>
            {/* 필터 */}
            <CheckBox productItem1={productItem1} productItem2={productItem2}
                handleFilters={filter => handleFilters(filter, "test")}
            />
            {/* 검색 */}

            {/* 상품 카드 */}
            <Row gutter={[16,16]}>
                {renderCards}
            </Row>
            {/* postSize가 limit보다 크거나 같으면 버튼 활성화 */}
            {
                postSize >= limit && <div style={{display:'flex', justifyContent: 'center'}}>
                <Button onClick={() => loadMoreHandler()}>더보기</Button>
                </div>
            }
            
        </div>
    )
}

export default LandingPage
