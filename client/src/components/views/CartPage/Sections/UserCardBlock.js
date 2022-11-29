import React from 'react'
import './UserCardBlock.css';
//2022.11.29 : 장바구니 UI 컴포넌트
function UserCardBlock(props) {
    //2022.11.29 : 상품이미지를 하나만 노출하기 위한 랜더
    const renderCartImage = (images) => {
        if(images.length > 0){
            let image = images[0]
            return 'http://localhost:5000/'+image
        }
    }

    //2022.11.29 : 상품정보 테이블 랜더
    const renderItems = () => (
        props.products && props.products.map((product,index) => (
            <tr key={index}>
                <td>
                    <img style={{width:'70px'}} alt='product'
                    src={renderCartImage(product.images)} />
                </td>
                <td>
                    {product.title}
                </td>
                <td>
                    {product.quantity}
                </td>
                <td>
                    {product.price}원
                </td>
                <td>
                    <button onClick={() => props.removeItem(product._id)}>
                        상품 삭제
                    </button>
                </td>
            </tr>
        ))
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>상품 가격</th>
                        <th>상품 삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>

        </div>
    )
}

export default UserCardBlock
