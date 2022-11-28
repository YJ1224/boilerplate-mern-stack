import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'
//2022.11.28 : 상품상세페이지 컴포넌트 생성
function ProductImage(props) {
    const [Images, setImages] = useState([]);

    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0){
            let images = []
            props.detail.images.map(item => {
                images.push({
                    original: 'http://localhost:5000/'+item,
                    thumbnail: 'http://localhost:5000/'+item
                })
            })
            setImages(images)
        }
    },[props.detail])
    
    return (
        <div>
            <ImageGallery items={Images}/>
        </div>
    )
}

export default ProductImage
