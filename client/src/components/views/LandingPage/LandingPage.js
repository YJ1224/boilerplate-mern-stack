import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button} from "antd"
import Meta from 'antd/lib/card/Meta';

//2022.11.25 : 상품 이미지 리스트 슬라이드 컴포넌트
import ImageSilder from '../../utils/ImageSilder';
//2022.11.25 : 필터 체크박스 컴포넌트
import CheckBox from '../Sections/CheckBox';
//2022.11.25 : 체크박스를 노출하기 위한 데이터
import {productItem1, productItem2, price} from "../Sections/Datas";
//2022.11.26 : 가격필터 라디오박스 컴포넌트
import RadioBox from '../Sections/RadioBox';
//2022.11.26 : 검색 컴포넌트
import SearchFeature from '../Sections/SearchFeature';
//2022.11.25 : 상품리스트페이지 추가
function LandingPage() {
    const [products, setProducts] = useState([]); //몽고 DB에서 조회된 상품리스트
    const [skip, setSkip] = useState(0) // 어디서부터 데이터를 가져올지 위치 지정(페이징 ?)
    const [limit, setLimit] = useState(8) //데이터를 몇개씩 가져올건지 지정하기 위해
    const [postSize, setPostSize] = useState(0) //조회된 리스트의 갯수를 구하기 위해
    //필터 상태값
    const [Filters, setFilters] = useState({
        productItem1 : [], //1차 분류
        productItem2 : [], //2차 분류
        price : [] //가격

    })
    const [searchValue, setSearchValue] = useState("") //검색 할 data

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

    //2022.11.26 : 몽고디비 재조회하는 공통 로직
    const showFilteredResults = (filters) => {
        let body = {
            skip: 0, //처음부터 다시 조회하기 위해
            limit: limit,
            filters:filters
        }

        getProducts(body) //조회 api 호출
        setSkip(0) //초기화
    }

    //2022.11.26 : 가격은 범위기 떄문에 별도로 분리
    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key].key === parseInt(value, 10)){
                array = data[key].array
            }
        }
        return array
    }
    //2022.11.26 : 필터를 통해 몽고디비를 다시 재조회 하기 위해 데이터 셋팅
    const handleFilters = (filters,category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters;

        if(category === 'price') {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }

        showFilteredResults(newFilters);
        setFilters(newFilters)
    }

    //상품정보 card를 보여주기 위해
    const renderCards = products.map((item,index) => {
        return <Col lg={6} md={8} sm={24} key={index}>
            <Card 
                cover={<a href={'/product/'+item._id}><ImageSilder images={item.images}/></a>}
            >
            <Meta 
                title={item.title}
                price={item.price}
                
            />
            </Card>
        </Col>
    })

    //2022.11.26 : 검색 컴포넌트에서 전달받은 input값
    const updateValue = (newSearchValue) => {
        let body = {
            skip : 0,
            limit : limit,
            filter : Filters,
            search : newSearchValue
        }
        setSkip(0)
        setSearchValue(newSearchValue);
        getProducts(body)
    }

    return (
        <div style={{ width:'75%', margin:'3rem auto'}}>
             <div style={{ textAlign: 'center'}}>
                <h2>상품 리스트<Icon type="rocket"/></h2>
            </div>
            {/* 필터 */}
            <Row gutter={[16,16]}>
                <Col lg= {12} sx={24}>
                    <CheckBox productItem1={productItem1}
                    handleFilters={filter => handleFilters(filter, "classification1")}
                    />
                </Col>
                
                <Col lg= {12} sx={24}>
                    <RadioBox list={price} 
                    handleFilters={filter => handleFilters(filter, "price")}
                    />
                </Col>
                

            </Row>

            {/* 검색 */}
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SearchFeature updateValue={updateValue}/>
            </div>
            
            {/* 상품 카드 */}
            {
                products.length > 0 ? 
                    <Row gutter={[16,16]}>
                    {renderCards}
                    </Row>
                :
                    <div style={{ textAlign: 'center', marginTop:'3rem'}}>
                        상품 리스트가 없습니다. <Icon type="smile" />
                    </div>
            }
            
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
