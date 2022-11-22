import React, { useState } from "react";
import {Typography, Button, Form, Input, Select, Option} from 'antd';

//2022.11.21 : css 파일 import
import './UploadProduct.css'
const {Title} = Typography;
const {TextArea} = Input;

function UploadProdectPage() {
    const [productImages, setProductImages] = useState([]); //상품이미지 
    const [productTitle, setProductTitle] = useState(""); //상품명
    const [description, setDescription] = useState(""); //상품설명
    const [productPrice, setProductPrice] = useState(0); //상품가격
    const [classification1, setClassification1] = useState(1); //상품분류 (1차)
    const [classification2, setClassification2] = useState(1); //상품분류 (2차)

    //상품분류 array로 정의(1depth)
    const productItem1 = [
        {key : 1, value : '아우터'},
        {key : 2, value : '상의'},
        {key : 3, value : '팬츠'},
        {key : 4, value : '스커트/원피스'},
        {key : 5, value : '신발'},
        {key : 6, value : '악세사리'}
    ]

    //상품분류 array로 정의(2depth)
    const productItem2 = [
        [
            {key : 1, value : '코트'},
            {key : 2, value : '가디건'},
            {key : 3, value : '자켓'},
            {key : 4, value : '패딩'}
        ],
        [
            {key : 1, value : '반소매티셔츠'},
            {key : 2, value : '긴소매티셔츠'},
            {key : 3, value : '셔츠'},
            {key : 4, value : '민소매'},
            {key : 5, value : '니트'},
            {key : 6, value : '후드/맨투맨'}
        ],
        [
            {key : 1, value : '롱팬츠'},
            {key : 2, value : '숏팬츠'},
            {key : 3, value : '슬랙스'},
            {key : 4, value : '데님'},
            {key : 5, value : '와이드팬츠'}
        ],
        [
            {key : 1, value : '미니스커트'},
            {key : 2, value : '롱스커트'},
            {key : 3, value : '미니원피스'},
            {key : 4, value : '롱원피스'},
            {key : 5, value : '투피스'}
        ],
        [
            {key : 1, value : '블로퍼/뮬'},
            {key : 2, value : '플랫/로퍼'},
            {key : 3, value : '샌들'},
            {key : 4, value : '스니커즈'},
            {key : 5, value : '슬리퍼/쪼리'},
            {key : 6, value : '힐'},
            {key : 7, value : '워커/부츠'}
        ],
        [
            {key : 1, value : '목걸이'},
            {key : 2, value : '귀걸이'},
            {key : 3, value : '팔찌/발찌'},
            {key : 4, value : '반지'}
        ]

    ]

    //상품명 input onChange
    const titleChangeHandler = (event) => {
        setProductTitle(event.currentTarget.value)
    }

    //상품설명 input onChange
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    //상품가격 input onChange
    const productPriceChangeHandler = (event) => {
        setProductPrice(event.currentTarget.value)
    }

    //상품분류 1차 onChange
    const productItem1ChangeHandler = (event) => {
        setClassification2(1)
        setClassification1(event)
    }

    //상품분류 1차 onChange
    const productItem2ChangeHandler = (event) => {
        setClassification2(event.currentTarget.value)
    }

    return (
        <div style={{ maxWidth: '700px', margin : '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>상품 업로드</Title>
            </div>

            <Form>
                {/* DropZone 영역 */}

                <label>상품이름</label>
                <Input onChange={titleChangeHandler} value={productTitle}/>
                <label>상품설명</label>
                <TextArea onChange={descriptionChangeHandler} value={description}/>
                <label>상품가격(원)</label>
                <Input value={productPrice}/>
                <div className="selectBox">
                    <Select value={classification1} onChange={productItem1ChangeHandler}>
                        {productItem1.map((item,index) => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </Select>
                    <Select value={classification2} onChange={productItem2ChangeHandler}> 
                        {productItem2[classification1-1].map(item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </Select>
                </div>
            
                <div className="btnGroup">
                    <Button>
                        확인
                    </Button>
                    <Button >
                        <a href="/">취소</a>
                    </Button>
                </div>

            </Form>
        </div>
    )
}

export default UploadProdectPage;