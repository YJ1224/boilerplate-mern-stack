import React from "react";
import { Carousel} from "antd"
//2022.11.25 : 상품 이미지 리스트 슬라이더 컴포넌트 생성
function ImageSilder(props) {
    return (
        <div>
            <Carousel autoplay>
                {
                    props.images.map((item, index) => (
                        <div key={index}>
                            <img style={{width:'100%', maxHeight:'150px'}}
                                src={'http://localhost:5000/'+item}
                            />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default ImageSilder;